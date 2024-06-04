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
    
    containersAdd (req,res,next) {
        
        try {
            
            const {arr_id, plat_id, name, desc} = req.body;

        } catch (e) {
            next(e);
        }
    }
      
      

}

module.exports = new logisticsController();