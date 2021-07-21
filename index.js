const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
const db = require('./queries.js');
const cors = require('cors');

// Get Routes
const teacherRouter = require('./routes/teachers.js');
const studentRouter = require('./routes/students.js');
const iepRouter = require('./routes/iep.js');
const iepGoalRouter = require('./routes/iep-goal.js');
const responseRouter = require('./routes/response.js');
const metaRouter = require('./routes/meta-data.js');

// set up CORS
app.use(cors());

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
app.use('/response', responseRouter); // <-- post goal data responses
app.use('/meta', metaRouter) // <-- post meta data, such as attendance, behavioral factors, and comments

// Get last calendar date
app.get('/lastdate', db.custom(`SELECT MAX(date) FROM CALENDAR; `), db.returnQuery);
 

// Start Router
app.listen(PORT, console.log(`Server listening on local port ${PORT}`));
