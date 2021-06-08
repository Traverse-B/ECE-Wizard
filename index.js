const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const db = require('./queries.js');

// Get Routes
const teacherRouter = require('./routes/teachers.js');
const studentRouter = require('./routes/students.js');
const iepRouter = require('./routes/iep.js');
const iepGoalRouter = require('./routes/iep-goal.js');

// Parse Incoming Data
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Temporary Landing Page
app.get ('/', (req, res) => {
    res.json({info: 'ECE Wizard API -- Coming Soon!'})
})

// Initialize Query String
app.use('/', (req, res, next) => {
    req.queryString = '';
    req.id = [];
    req.identifier = [];
    next()
})

// Verify id parameter (when accessing IEP directly)
app.use('/iep',  db.config({table: 'iep', identifier: ['id'], idType: ['%s']}));
app.param('id', db.checkExists);

// Set Routes
app.use('/teachers', teacherRouter); // <-- access student information
app.use('/students', studentRouter); // <-- access teacher information (including data collection requirements)
app.use('/iep/:id', iepRouter); // <-- access an IEP directly by ID
app.use('/goal', iepGoalRouter); // <-- access an IEP goal directly by ID
 

// Start Router
app.listen(PORT, console.log(`Server listening on local port ${PORT}`));
