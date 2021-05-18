const { response } = require('express');
const { Pool } = require('pg');
const pool = new Pool({
    user: 'pi',
    host: 'localhost',
    database: 'pi',
    password: 'Lyle3mail',
    port: 5432
});


/*
Plan for maximum flexibility:

Create functions for each query that create the query string and the necessary parameters.

Create a function to execute a single query

Create a function to execute multiple queries

Create a function to return results (which will be attached to res.results )

That way, multiple queries could be executed in a row

*/


// A helper function to create a string of place holders for values (ie "($1, $2, ...$n)")
function placeHolders(number) {
    if (number <= 1) return '$1';
    const placeHolders = []; let i = 1
    Array(number).fill(0).forEach(iteration => placeHolders.push(('$' + (i++).toString())));
    return '(' + placeHolders.join(', ') + ')';
}

function columns(body) {
    const columns = Object.keys(body);
    if (columns.length === 1) return columns[0]   
    return '(' + columns.join(', ') + ')';
}

// Check to see if the ID exists

const checkExists = (req, res, next, id) => {
    const queryString = 'SELECT EXISTS (SELECT 1 FROM ' + req.table + ' WHERE ' + req.identifier + ' = $1)';
    pool.query(queryString, [id], (error, results) => {
        console.log(results.rows[0].exists)
        if (error) {
            next(error)
        } else if (!results.rows[0].exists){
            res.status(404).send();
        } else {
            next();
        }
    })
}

// Get all from table
const getAllFromTable = (req, res, next) => {
    req.queryString = 'BEGIN; SELECT * FROM ' + req.table + '; COMMIT;';
    pool.query(req.queryString, (error, result) => {
        if (error) {
            next(error);
        } else {
            console.log(result[1])
            res.send(result[1].rows);
        }
    })
}

// Add to a specific table
const addToTable = (req, res, next) => {
    const values = Object.values(req.body);
    const queryString = 'INSERT INTO ' + req.table + ' VALUES ' + placeHolders(values.length);
    pool.query(queryString, values, (error, results) => {
        if (error) {
            next (error);
        } else {
            req.params.id = req.body[req.identifier];
            next();
        }
    })
}

// Update table
const updateTable = (req, res, next) => {
    const values = Object.values(req.body);
    const queryString = 'UPDATE ' + req.table + ' SET ' + columns(req.body) + ' = ' + placeHolders(values.length);
    pool.query(queryString, values, (error, results) => {
            if (error) {
                next (error);
            } else {
                next();
            }
        })
}

const getRowFromTable = (req, res, next) => {
    const queryString = 'SELECT * FROM ' + req.table + ' WHERE ' + req.identifier + ' = $1'
    pool.query(queryString, [req.params.id], (error, results) => {
        if (error) {
            next (error);
        } else {
            res.send(results.rows);
        }
    })
}

const deleteFromTable = (req, res, next) => {
    const queryString = 'DELETE FROM ' + req.table + ' WHERE ' + req.identifier + ' = $1';
    pool.query(queryString, [req.params.id], (error, results) => {
        if(error) {
            next(error);
        } else {
            res.status(204).send();
        }
    })
}




module.exports = {
    checkExists,
    getAllFromTable,
    addToTable,
    updateTable,
    getRowFromTable,
    deleteFromTable
}