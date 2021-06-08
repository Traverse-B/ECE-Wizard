const { response } = require('express');
const format = require('pg-format');
const { Pool } = require('pg');
const { string } = require('pg-format');
const pool = new Pool({
    user: 'pi',
    host: 'localhost',
    database: 'pi',
    password: 'Lyle3mail',
    port: 5432
});


// Begin a multiple query call
const begin = (req, res, next) => {
    req.queryString += 'BEGIN; ';
    next();
}


// Check to see if the ID(s) exists
const checkExists = (req, res, next, id) => {
    req.id.push(id);
    let queryString = format('SELECT EXISTS (SELECT 1 FROM %I WHERE %I = ' + req.idType[0], req.table, req.identifier[0], req.id[0]);
    if (req.id.length > 1) {
        queryString += format(' AND %I = ' + req.idType[1], req.identifier[1], req.id[1]);
    }
    if (req.id.length > 2) {
        queryString += format(' AND %I = ', + req.idType[2], req.identifier[2], req.id[2]);
    }
    queryString += ');'
    console.log(queryString);
    pool.query(queryString, (error, result) => {
        if (error) {
            next(error)
        } else if (!result || !result.rows[0].exists) {
            res.status(404).send();
        } else {
            console.log(`Parameter verified, ${id} added; req.id = ${req.id}`) 
            next();
        }
    })
}


// Get all from table
const selectAll = (req, res, next) => {
    req.queryString += format('SELECT * FROM %I; ', req.table);
    next();
}

// Add to a specific table
const insert = (req, res, next) => {
    const values = Object.values(req.body);
    req.queryString += format('INSERT INTO %I VALUES %L RETURNING %I; ', req.table, [values], Object.keys(req.body));
    req.id.push(req.body[req.identifier[0]]);
    next();
}

// Add multiple rows to a table at once

const insertMultiple = (req, res, next) => {
    const values = req.body.values.map(value => value = Object.values(value))
    req.queryString += format('INSERT INTO %I VALUES %L; ', req.table, values);
    next();
}

// Update table
const update = (req, res, next) => {
    const values = Object.values(req.body);
    const columns = Object.keys(req.body);
    if (columns.length === 1) {
        req.queryString += format(
            'UPDATE %I SET %s = %L WHERE %I = %L; ', 
            req.table, 
            columns, 
            values, 
            req.identifier[0], 
            req.id[0]
        );
    } else { 
        req.queryString += format(
            'UPDATE %I SET %s = %L WHERE %I = %L; ', 
            req.table, 
            [columns], 
            [values], 
            req.identifier[0], 
            req.id[0]
        );
    }
    next();
}


// Get a specific row from table
function select(columns = '*') {
    return (req, res, next) => {
        req.queryString += format('SELECT %s FROM %I WHERE %I = ' + req.idType[0], columns, req.table, req.identifier[0], req.id[0]);
        if (req.id.length > 1) {
            req.queryString += format(' AND %I = ' + req.idType[1], req.identifier[1], req.id[1]);
        }
        if (req.id.length > 2) {
            req.queryString += format(' AND %I = ' + + req.idType[2], req.identifier[2], req.id[2]);
        }
        req.queryString += '; '
        next();
    }   
}



// Delete a specific row from table
const deleteRows = (req, res, next) => {
    console.log(req.table)
    console.log(req.identifier)
    console.log(req.id)
    req.queryString += format('DELETE FROM %I WHERE %I = ' + req.idType[0], req.table, req.identifier[0], req.id[0])
    if (req.id.length > 1) {
        req.queryString += format('AND %I = ' + req.idType[1], req.identifier[1], req.id[1]);
    }
    if (req.id.length > 2) {
        req.queryString += format('AND %I = ' + + req.idType[2], req.identifier[2], req.id[2]);
    }
    req.queryString += '; '
    next();
}

function custom(string, index = undefined) {
    return (req, res, next) => {
        if (typeof index === 'number') {
            req.queryString += format(string, req.id[index]);
        } else {
            req.queryString += string;
        }
        next();
    }
}

// Close a multiple query call
const commit = (req, res, next) => { 
    req.queryString += 'COMMIT;'
    next();
}

function config(obj) {
    return (req, res, next) => {
        if (obj.table) req.table = obj.table;
        if (obj.identifier) {
            if (typeof req.identifier === 'array') { 
                req.identifier = obj.identifier;
            } else {
                req.identifier = [obj.identifier];
            }
        }
        if (obj.idType) req.idType = obj.idType;
        if (obj.id) req.id = obj.id;
        console.log(`Configured: req.table = ${req.table}`);
        console.log(`req.identifier = ${req.identifier}`);
        console.log(`req.idType = ${req.idType}`);
        console.log(`req.id = ${req.id}`);
        next();
    }
}


// Run a query without returning results
const runQuery = (req, res, next) => {
    console.log(req.queryString)
    pool.query(req.queryString, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).send();
        } else {
            res.status(204).send();     
        }
    })
}

// Run a query and return the requested information
const returnQuery = (req, res, next) => {
    console.log(req.queryString)
    pool.query(req.queryString, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).send();
        } else {
            if (result[1]) {
                results = result.filter(result=> result.rows.length > 0).map(result => result.rows);
                res.send(results);
            } else {
                res.send(result.rows);

            }     
        }
    })
}

const getActive = (req, res, next) => {
    const queryString = format("SELECT id FROM iep WHERE student_id = %s AND active = 'true';", req.id[0])
    pool.query(queryString, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).send();
        } else {
            req.id = [result.rows[0].id];
            next();     
        }
    })
}

const compile = (req, res, next) => {
    let compileDates = [];
    // Query raw data from goal_data table
    let rawData = [];
    req.queryString = format('SELECT * FROM goal_data WHERE iep_goal_id = %s ORDER BY timestamp', req.id);
    console.log(req.queryString);
    pool.query(req.queryString, (error, results) => {
        if (error) {
            console.log(error);
            res.status(400).send();
        } else {
            rawData = results.rows;
            // Query compile dates from compile_dates table
            req.queryString = format('SELECT date FROM compile_dates WHERE type = %L ORDER BY date', results.rows[0].type.toLowerCase());
            console.log(req.queryString);
            pool.query(req.queryString, (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(400).send();
                } else {
                    compileDates = results.rows;
                    // iterate through data; average results that fall between dates
                    const compiled = [];
                    // average all data before first date
                    let firstDate = rawData.filter(data => data.timestamp < compileDates[0].date);
                    let average = 0;
                    firstDate.forEach(data => average += data.response);
                    average /= firstDate.length;
                    // add a reponse object to array
                    compiled.push({date: compileDates[0].date, average: average});
                    // iterate through compile dates and average data that falls between dates
                    for (let i = 1; i < compileDates.length; i++) {
                        let intervalData = rawData.filter(data => {
                            return data.timestamp.getTime() <= compileDates[i].date.getTime() && data.timestamp.getTime() > compileDates[i - 1].date.getTime();
                        })
                        average = 0;
                        intervalData.forEach(data => average += data.response);
                        average /= intervalData.length;
                        if (Number.isNaN(average)) average = 0;
                        compiled.push({date: compileDates[i].date, average: average});
                    }
                    // return the compile dates and the compiled data
                    res.send(compiled);
                }
            })
        }
    })
}


module.exports = {
    begin,
    checkExists,
    selectAll,
    insert,
    insertMultiple,
    update,
    select,
    deleteRows,
    custom,
    runQuery,
    returnQuery,
    commit,
    config,
    getActive,
    compile
}