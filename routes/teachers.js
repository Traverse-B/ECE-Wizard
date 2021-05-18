const express = require('express');
const teacherRouter = express.Router();
const db = require('../queries.js');

teacherRouter.use('/', (req, res, next) => {
    req.table = 'teacher';
    req.identifier = 'login';
    next();
})

// Get all teachers
teacherRouter.get('/', db.getAllFromTable);

// Create teacher
teacherRouter.post('/', db.addToTable, db.getRowFromTable);

teacherRouter.param('id', db.checkExists);

// Get teacher by login
teacherRouter.get('/:id', db.getRowFromTable);

// Update teacher
teacherRouter.put('/:id', db.updateTable, db.getRowFromTable);

// Delete teacher
teacherRouter.delete('/:id', db.deleteFromTable);

// Export router
module.exports = teacherRouter;
