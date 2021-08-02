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

// Get student who haven't been assigned to a TOR
studentRouter.get('/available', 
    db.custom(
        `WITH available AS (SELECT id FROM student
            EXCEPT (SELECT student_id FROM teachers_students
                             WHERE role = 'TOR')
            )
            SELECT student.id, first_name, last_name 
            FROM available JOIN student
            ON student.id = available.id; `
    ),
    db.returnQuery
)

// Create a student
studentRouter.post('/', db.newStudent, db.returnQuery);

// Validate data for :id parameter
studentRouter.param('id', db.checkExists);

// Get a student by id integer
studentRouter.get('/:id', db.select(), db.returnQuery);

// Update a student by id integer
studentRouter.put('/:id', db.updateStudent, db.runQuery);

// Delete a student by id integer
studentRouter.delete('/:id', db.deleteRows, db.runQuery);

// Access teacher assignments
const assignRouter = require('./assign.js');
studentRouter.use('/:id/assign', assignRouter);

// Access student IEP information
studentRouter.use('/:id/iep', iepAdminRouter);

// Access student active iep for a given date;
studentRouter.post('/:id/backdateiep', db.iepForDate);

//Get all goals for a given date
studentRouter.get('/:id/allgoals', db.custom(
    `WITH active_iep AS (SELECT * FROM iep 
        WHERE student_id = %L
        AND start_date < CURRENT_DATE
        AND end_date > CURRENT_DATE
     )
     SELECT * FROM active_iep JOIN iep_goal
     ON iep_id = active_iep.id;`, 0
    ), db.returnQuery
)






// Export students router
module.exports = studentRouter;