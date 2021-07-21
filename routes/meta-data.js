const express = require('express');
const format = require('pg-format');
const metaRouter = express.Router();
const db = require('../queries.js');


// Post attendance data

metaRouter.post('/attendance', db.config({table: 'attendance'}), db.insert, db.returnQuery);


// Post other metadata

metaRouter.post('/', db.config({table: 'meta_data'}), db.insert, db.returnQuery);

module.exports = metaRouter;

