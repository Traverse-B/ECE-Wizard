const express = require('express');
const assignRouter = express.Router();
const db = require('../queries.js');


/********************************************************* 
                                                         
    Assign Router:  Assigning Teachers to Students          
  
**********************************************************/

// Set default query parameters
assignRouter.use('/', (req, res, next) => {
    req.table = 'teachers_students';
    req.identifier = ['student_id', 'teacher_login'];
    req.idType = ['%s', '%L']; // [integer, string]
    next();
})

/********************************************************* 
                                                         
 Assignment Router:  Assigning teachers to students (and students to teachers)     
  
*********************************************************/

// Get all teachers assigned to student
assignRouter.get('/',  
                db.custom(`WITH teachers AS (
                            SELECT teacher_login, start_date, end_date, role, coteacher_login
                            FROM teachers_students WHERE student_id = %s)
                           SELECT teacher_login, name, start_date, end_date, role, coteacher_login
                           FROM teachers JOIN teacher
                           ON teachers.teacher_login = teacher.login;
                
                `, 0), 
                db.returnQuery);

// Assign a teacher to a student
assignRouter.post('/', db.insert, db.returnQuery);

// Assign a full roster of teachers to a student
assignRouter.post('/multiple', db.begin, db.deleteRows, db.insertMultiple, db.commit, db.select(), db.returnQuery);

// Validate data for :teacherLogin parameter
assignRouter.param('teacherLogin', db.checkExists);

// Get the role of a specific teacher for a specific student
assignRouter.get('/:teacherLogin', db.select(), db.returnQuery);

// Delete the assignment of a specific teacher to a specific student
assignRouter.delete('/:teacherLogin', db.deleteRows, db.runQuery);




module.exports = assignRouter;