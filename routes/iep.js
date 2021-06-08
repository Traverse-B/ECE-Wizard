const express = require('express');
const format = require('pg-format');
const iepRouter = express.Router();
const db = require('../queries.js');
const iepGoalRouter = require('./iep-goal.js');


/********************************************************* 
                                                         
 IEP Router:  Reading and Accessing features of IEP          
  
*********************************************************/

// Set default query parameters
iepRouter.use('/', (req, res, next) => {
    req.table = 'iep';
    req.identifier = ['id'];
    req.idType = ['%s']; // [integer]
    next();    
})

// Get an IEP by ID
iepRouter.get('/', db.select(), db.returnQuery);

// Update an IEP by ID
iepRouter.put('/', db.update, db.select(), db.returnQuery)

// Delete an IEP (for admin purposes only)
iepRouter.delete('/', db.deleteRows, db.runQuery);

// Access goals:  configure default parameters
iepRouter.use('/goals', db.config({table: 'iep_goal', identifier: 'iep_id'}));

// Get all goals for an IEP
iepRouter.get('/goals', db.select(), db.returnQuery);

// Create a new IEP goal 
iepRouter.post('/goals', db.insert, db.returnQuery);


module.exports = iepRouter;