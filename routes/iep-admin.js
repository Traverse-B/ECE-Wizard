const express = require('express');
const format = require('pg-format');
const iepAdminRouter = express.Router();
const db = require('../queries.js');
const iepRouter = require('./iep.js');


/********************************************************* 
                                                         
 IEP Admin Router:  Creating & Deleting Individual Education Plans          
  
*********************************************************/


// Set default query parameters
iepAdminRouter.use('/', (req, res, next) => {
    req.table = 'iep';
    req.identifier = ['student_id', 'id'];
    req.idType = ['%s', '%s']; // [integer]
    next();    
})


// Get all IEPs for a student
iepAdminRouter.get('/', db.select(), db.returnQuery);


// Create a new IEP and update old IEP
iepAdminRouter.post('/', 
    db.begin,
    db.newIep, 
    db.commit,
    db.returnQuery
);

// Access active IEP for student
iepAdminRouter.use('/active', db.getActive,
    iepRouter
);




module.exports = iepAdminRouter;         