const express = require('express');
const studentRouter = express.Router();
const db = require('../queries.js');
const iepAdminRouter = require('./iep-admin.js');

/********************************************************* 
                                                         
        Student Router:  Managing Student Roster          
  
**********************************************************/

// Set default query parameters
studentRouter.use('/', (req, res, next) => {
    req.table = 'student';
    req.identifier = ['id'];
    req.idType = ['%s']; // [integer]
    next()    
})


// Get all students
studentRouter.get('/', db.selectAll, db.returnQuery);

// Create a student
studentRouter.post('/', db.insert, db.returnQuery);

// Validate data for :id parameter
studentRouter.param('id', db.checkExists);

// Get a student by id integer
studentRouter.get('/:id', db.select(), db.returnQuery);

// Update a student by id integer
studentRouter.put('/:id', db.update, db.select(), db.returnQuery);

// Delete a student by id integer
studentRouter.delete('/:id', db.deleteRows, db.runQuery);

// Add teacher to a student
const assignRouter = require('./assign.js');
studentRouter.use('/:id/assign', assignRouter);

// Access student IEP information
studentRouter.use('/:id/iep', iepAdminRouter);






// Export students router
module.exports = studentRouter;