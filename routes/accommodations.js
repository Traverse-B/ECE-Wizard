const express = require('express');
const accommodationsRouter = express.Router();
const db = require('../queries.js');

accommodationsRouter.post('/accommodations', db.addToTable);



module.exports = accommodationsRouter;