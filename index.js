const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Get Routes
const teacherRouter = require('./routes/teachers.js');
const accommodationsRouter = require('./routes/accommodations.js');

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

// Set Routes
app.use('/teachers', teacherRouter);
app.use('/accommodations', accommodationsRouter)

// Start Router
app.listen(PORT, console.log(`Server listening on local port ${PORT}`));
