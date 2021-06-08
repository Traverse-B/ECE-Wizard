const express = require('express');
const format = require('pg-format');
const iepGoalRouter = express.Router();
const db = require('../queries.js');
const responseRouter = require('./response.js');

iepGoalRouter.use('/', (req, res, next) => {
    req.table = 'iep_goal';
    req.identifier = ['id'];
    req.idType = ['%s']; // integer
    req.id = [];
    next();
})

/********************************************************* 
                                                         
 IEP Goal Router:  Accessing IEP Goal Information         
  
*********************************************************/

// Validate id parameter and attach to req.id
iepGoalRouter.param('id', db.checkExists);

// Get goal by ID
iepGoalRouter.get('/:id', db.select(), db.returnQuery);

// Update goal by ID
iepGoalRouter.put('/:id', db.update, db.select(), db.returnQuery);

// Delete goal by ID
iepGoalRouter.delete('/:id', db.deleteRows, db.runQuery);

// Access goal data
iepGoalRouter.use('/:id/responses', responseRouter)


module.exports = iepGoalRouter;