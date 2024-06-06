const db = require('../models/db');
const bcrypt = require ('bcryptjs');
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError');
const { v1: uuidv1 } = require('uuid');

let connection;

class logisticsController {
    
    
    async arrivalAdd(req, res, next) {
        const { name, flag, port_of_dep, crew, pier, date } = req.body;
        const formattedDate = new Date(date).toISOString().split('T')[0];

        try {
            connection = await db.getConnection();

            await connection.beginTransaction();

            const [result] = await connection.query(
                `INSERT INTO ship_arrivals (name, flag, port_of_dep, crew, pier, date) VALUES (?, ?, ?, ?, ?, ?)`,
                [name, flag, port_of_dep, crew, pier, formattedDate]
            );

            const insertId = result.insertId;

            await connection.commit();

            res.json({ message: 'Ship arrival added successfully', id: insertId });
        } catch (e) {
            if (connection) {
                await connection.rollback();
            }
            next(e);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
    
    async containersAdd(req, res, next) {
        const { containers, arrivalId } = req.body;

        try {
            connection = await db.getConnection();

            await connection.beginTransaction();

            for (const container of containers) {
                await connection.query(
                    'INSERT INTO containers (`arr_id`, `plat_id`, `name`, `desc`) VALUES (?, ?, ?, ?)',
                    [arrivalId, container.platform, container.containerNumber, container.description]
                );
            }

            await connection.commit();

            res.json({ message: 'Containers added successfully' });
        } catch (e) {
            if (connection) {
                await connection.rollback();
            }
            next(e);
        } finally {

            if (connection) {
                connection.release();
            }
        }
    } 

    async platformsGet (req, res, next) {
        try {
            connection = await db.getConnection();

            await connection.beginTransaction();

            const result = await connection.query(
                'SELECT * FROM platforms'
            );
            
            await connection.commit();

            res.json ({info: result[0]})

        } catch (e) {
            if (connection) {
                await connection.rollback();
            }
            next(e);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
      
    async containersGet (req, res, next) {
        try {
            connection = await db.getConnection();

            await connection.beginTransaction();

            const result = await connection.query(
                'SELECT * FROM containers'
            );
            
            await connection.commit();

            res.json ({info: result[0]})

        } catch (e) {
            if (connection) {
                await connection.rollback();
            }
            next(e);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    async containersMove(req, res, next) {
        const { containerId, newPlatId } = req.body;
        
        try {
            connection = await db.getConnection();

            await connection.beginTransaction();

            const result = await connection.query(
                'UPDATE containers SET plat_id = ? WHERE id = ?', [newPlatId, containerId]
            );
            
            await connection.commit();

            res.json ({info: result[0]})

        } catch (e) {
            if (connection) {
                await connection.rollback();
            }
            next(e);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    async departure(req, res, next) {
        const { rowsId, given } = req.body;
        // Совпадений не будет, потому что uuid берёт временную метку и mac адрес
        const uuid_group = uuidv1();
    
        try {
            connection = await db.getConnection();
    
            await connection.beginTransaction();
    
            for (let i = 0; i < rowsId.length; i++) {
                const id = rowsId[i];
                
                const [rows] = await connection.query(
                    'SELECT * FROM containers WHERE id = ?', [id]
                );
    
                if (rows.length === 0) {
                    throw new Error(`Record with id ${id} not found`);
                }
    
                const record = rows[0];
    
                await connection.query(
                    'DELETE FROM containers WHERE id = ?', [id]
                );
    
                await connection.query(
                    `INSERT INTO departed_containers (id, arr_id, plat_id, name, \`desc\`, given_to, group_uuid) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [record.id, record.arr_id, record.plat_id, record.name, record.desc, given, uuid_group]
                );
            }
    
            await connection.commit();
    
            res.json({ info: 'Записи успешно перемещены' });
    
        } catch (e) {
            if (connection) {
                await connection.rollback();
            }
            next(e);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
    
    async arrivalsGet (req, res, next) {
        try {
            connection = await db.getConnection();

            await connection.beginTransaction();

            const result = await connection.query(
                'SELECT * FROM ship_arrivals;'
            );
            
            await connection.commit();
            res.json ({info: result[0]})

        } catch (e) {
            if (connection) {
                await connection.rollback();
            }
            next(e);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

async arrivalContainersGet(req, res, next) {
    const { id } = req.query;

    let connection;
    
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();
        
        const [result] = await connection.query(
        `SELECT id, plat_id, name, 'На складе' AS source 
        FROM containers 
        WHERE arr_id = ?
        UNION ALL
        SELECT id, plat_id, name, 'Отправлен' AS source 
        FROM departed_containers 
        WHERE arr_id = ?;`, [id, id]);
        
        await connection.commit();
        res.json({ info: result });

    } catch (e) {
        if (connection) {
            await connection.rollback();
        }
        next(e);
    } finally {
        if (connection) {
            connection.release();
        }
    }
}



}

module.exports = new logisticsController();