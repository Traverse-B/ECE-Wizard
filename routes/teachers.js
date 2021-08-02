const express = require('express');
const teacherRouter = express.Router();
const db = require('../queries.js');


/********************************************************* 
                                                         
 Teacher Router:  Creating & Deleting Individual Education Plans          
  
*********************************************************/

// Set default query parameters
teacherRouter.use('/', (req, res, next) => {
    req.table = 'teacher';
    req.identifier = ['login'];
    req.idType = ['%L']; // [string]
    next();
})

// Get all teachers
teacherRouter.get('/', db.selectAll, db.returnQuery);

// Create teacher
teacherRouter.post('/', db.insert, db.returnQuery);

// Validate data for :id parameter and attach to req object as req.id parameter
teacherRouter.param('id', db.checkExists);

// Get teacher by login string
teacherRouter.get('/:id', db.select(), db.returnQuery);

// Update teacher by login string
teacherRouter.put('/:id', db.updateTeacher, db.runQuery);

// Delete teacher by login string
teacherRouter.delete('/:id', db.deleteRows, db.runQuery);

// Get active IEPs for all students assigned to a teacher
teacherRouter.get(
    '/:id/dataform', 
    db.custom(
        ` WITH active_ieps AS (
            WITH students AS (
              SELECT teachers_students.student_id, role, coteacher_login FROM teachers_students
              WHERE teacher_login = %L `, 0),
    db.custom(
              `AND NOW() > start_date
              AND NOW() < end_date
              EXCEPT SELECT excluded.student_id, role, coteacher
              FROM (SELECT date, exclude.student_id, coteacher, reporter 
                  FROM (SELECT DISTINCT DATE(timestamp) AS date, student_id, reporter, coteacher FROM attendance
                  WHERE CURRENT_DATE = DATE(attendance.timestamp)) AS exclude
                  WHERE reporter = %L `, 0),
    db.custom(
              `or coteacher = %L) AS excluded 
              JOIN teachers_students 
              ON excluded.student_id = teachers_students.student_id 
              AND excluded.reporter = teachers_students.teacher_login 
            )
          SELECT iep.student_id, id, role, coteacher_login FROM students, iep
          WHERE iep.student_id = students.student_id
          AND start_date < CURRENT_DATE
          AND end_date > CURRENT_DATE)
        SELECT DISTINCT ON (student.id) student.id AS student_id, active_ieps.id, first_name, last_name, role, coteacher_login
        FROM active_ieps, student
        WHERE active_ieps.student_id = student.id`, 0),
    
    db.returnQuery
);

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
                      AND start_date < CURRENT_DATE AND end_date > CURRENT_DATE
                    )
                    SELECT first_name, last_name, student_id, start_date, end_date, disability FROM students 
                    JOIN student ON students.student_id = student.id`, 0
                  ),
                  db.returnQuery
)



// Export router
module.exports = teacherRouter;
