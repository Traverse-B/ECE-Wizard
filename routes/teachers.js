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
teacherRouter.put('/:id', db.update, db.select(), db.returnQuery);

// Delete teacher by login string
teacherRouter.delete('/:id', db.deleteRows, db.runQuery);

// Get active IEPs for all students assigned to a teacher
teacherRouter.get(
    '/:id/dataform', 
    db.custom('WITH prev_inq AS (SELECT student_id, role FROM teachers_students '),
    db.custom('WHERE teacher_login = %L) ', 0),
    db.custom('SELECT iep.id FROM prev_inq JOIN iep ON prev_inq.student_id = iep.student_id '),
    db.custom("WHERE iep.active = TRUE AND role != 'Case Manager';"),
    db.returnQuery
);


// Export router
module.exports = teacherRouter;
