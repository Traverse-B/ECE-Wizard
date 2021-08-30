const express = require('express');
const format = require('pg-format');
const responseRouter = express.Router();
const db = require('../queries.js');


/********************************************************* 
                                                         
 Response Router:  Create and Access IEP Data responses          
  
*********************************************************/

// Set default query parameters
responseRouter.use('/', (req, res, next) => {
    req.table = 'goal_data';
    req.identifier = ['iep_goal_id'];
    req.idType = ['%s']; // integer
    next();
})

// Create responses
responseRouter.post('/', db.postResponse, db.runQuery)

// Get raw data for interval by goal ID
responseRouter.get('/rawdata', db.select(), db.returnQuery);

// Get compiled data for interval by goal ID
// (Boolean data averaged every 2 days; Percentage data compiled every 2 weeks)
responseRouter.get('/compiled', db.compile);


module.exports = responseRouter;