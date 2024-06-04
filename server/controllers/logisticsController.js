const db = require('../models/db');
const bcrypt = require ('bcryptjs');
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError');

class logisticsController {
    
    async arrivalAdd(req, res, next) {
        try {
            const { name, flag, port_of_dep, crew, pier, date } = req.body;
            const formattedDate = new Date(date).toISOString().split('T')[0];
    
            const [result] = await db.query(
                `INSERT INTO ship_arrivals (name, flag, port_of_dep, crew, pier, date) VALUES (?, ?, ?, ?, ?, ?)`,
                [name, flag, port_of_dep, crew, pier, formattedDate]
            );
    
            // Get the inserted ID
            const insertId = result.insertId;
    
            res.json({ message: 'Ship arrival added successfully', id: insertId });
        } catch (e) {
            next(e);
        }
    }
    
    async containersAdd (req, res, next) {
        try {
            const { containers, arrivalId } = req.body;
    
            // Create an array of promises for each container insertion
            const insertPromises = containers.map(container => {
                return new Promise((resolve, reject) => {
                    db.query(
                        'INSERT INTO containers (`arr_id`, `plat_id`, `name`, `desc`) VALUES (?, ?, ?, ?)',
                        [arrivalId, container.platform, container.containerNumber, container.description],
                        (error, results) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(results);
                            }
                        }
                    );
                });
            });

            await Promise.all(insertPromises);
    
            res.status(200).send('Containers added successfully');
        } catch (e) {
            next(e);
        }
    }
      
      

}

module.exports = new logisticsController();