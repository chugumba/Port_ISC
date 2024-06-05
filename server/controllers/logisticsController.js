const db = require('../models/db');
const bcrypt = require ('bcryptjs');
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError');

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


}

module.exports = new logisticsController();