const express = require('express');
const teacherRouter = express.Router();
const db = require('../queries.js');


/********************************************************* 
                                                         
 Teacher Router:  Creating & Deleting Teachers          
  
*********************************************************/

// Set default query parameters
teacherRouter.use('/', (req, res, next) => {
    req.table = 'teacher';
    req.identifier = ['login'];
    req.idType = ['%L']; // [string]
    next();
})

// Get all teachers
teacherRouter.get('/', db.custom(
  `SELECT * FROM teacher ORDER BY name;`
), db.returnQuery);

// Create teacher
teacherRouter.post('/', db.insert, db.returnQuery);

// Validate data for :id parameter and attach to req object as req.id parameter
teacherRouter.param('id', db.checkExists);

teacherRouter.post('/:id/authenticate', db.authenticate);

// Get teacher by login string
teacherRouter.get('/:id', db.select(), db.returnQuery);

// Update teacher by login string
teacherRouter.put('/:id', db.updateTeacher, db.runQuery);

// Delete teacher by login string
teacherRouter.delete('/:id', db.deleteRows, db.runQuery);

// Get active IEPs for all students assigned to a teacher
teacherRouter.get('/:id/dataform', db.dataform, db.returnQuery);

// Get list of dates and students who are missing data
teacherRouter.get('/:id/missingdata', db.getMissing);

teacherRouter.get('/:id/assigned',  
  db.custom(`WITH assigned AS (SELECT student_id from teachers_students 
              WHERE teacher_login = %L `, 0),
  db.custom(
            `AND role = 'TOR' OR role = 'ADMIN'
            AND CURRENT_DATE > start_date AND CURRENT_DATE < end_date
            )
            SELECT student_id, first_name, last_name, disability,
            EXISTS (SELECT 1 FROM iep WHERE student_id = assigned.student_id 
            AND end_date > CURRENT_DATE) AS iep_exists 
            FROM assigned JOIN student
            ON student_id = id`),      
  db.returnQuery
)

teacherRouter.get('/:id/caseload', 
                  db.custom(
                    `WITH students AS (
                      SELECT student_id, start_date, end_date FROM teachers_students
                      WHERE teacher_login = %L
                      AND role = 'TOR'
                      AND start_date <= CURRENT_DATE AND end_date > CURRENT_DATE
                    )
                    SELECT first_name, last_name, student_id, start_date, end_date, disability FROM students 
                    JOIN student ON students.student_id = student.id`, 0
                  ),
                  db.returnQuery
)



// Export router
module.exports = teacherRouter;
