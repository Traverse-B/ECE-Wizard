const { response } = require('express');
const format = require('pg-format');
const { Pool } = require('pg');
const { string } = require('pg-format');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/*
for testing!
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecedata',
    password: 'Lyle3mail',
    port: 5432
});
*/

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
    const arr = Object.values(req.body);
    const values = arr.filter(value => value !== '');
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
    req.queryString += ' COMMIT; '
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
    const queryString = format(`SELECT id FROM iep WHERE student_id = %s AND start_date < CURRENT_DATE
    AND end_date > CURRENT_DATE;`, req.id[0])
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

const getMissing = (req, res, next) => {
    const queryString = format(
        `WITH missing_list AS
         (WITH timespan AS (
            WITH first_inq AS (
                SELECT 	start_date AS teacher_start_date, 
                          end_date AS teacher_end_date, 
                          student_id,
                          coteacher_login
                  FROM teachers_students 
                WHERE (teacher_login = %L 
                OR coteacher_login = %L)
                AND NOT role = 'Case Manager'
            )
            SELECT teacher_start_date, teacher_end_date, sec_inq.student_id, 
                start_date AS iep_start_date, end_date AS iep_end_date, coteacher_login, id 
            FROM first_inq JOIN (SELECT * FROM iep WHERE start_date < CURRENT_DATE
                AND end_date > CURRENT_DATE) AS sec_inq
            ON first_inq.student_id = sec_inq.student_id
            )
            SELECT DATE(date) AS date, timespan.student_id FROM calendar, timespan
            WHERE date > teacher_start_date 
                AND date > iep_start_date
                AND date < teacher_end_date
                AND date < iep_end_date
                AND date < CURRENT_DATE
            EXCEPT SELECT DATE(timestamp) AS date, student_id FROM attendance 
                WHERE reporter = %L
                    OR coteacher = %L
            ORDER BY date) 
            SELECT date, student_id, first_name, last_name FROM missing_list
            JOIN student ON missing_list.student_id = student.id
            ORDER BY date DESC;
            `, req.id, req.id, req.id, req.id
    );
    console.log(queryString)
    pool.query(queryString, (error, results) => {
        if (error) {
            console.log(error);
            res.status(400).send();
        } else {
            // Using results, create an array of objects = {date:date, missingStudents: [a, b, c]}
            const missingStudents = [];
            results.rows.forEach(entry => {
                if (
                    missingStudents.length === 0 || 
                    JSON.stringify(missingStudents[missingStudents.length - 1].date) !== JSON.stringify(entry.date)
                ) {
                    missingStudents.push({date: entry.date, students: [{id: entry.student_id, name: `${entry.first_name} ${entry.last_name}`}]});
                } else {
                    missingStudents[missingStudents.length - 1].students.push({id: entry.student_id, name: `${entry.first_name} ${entry.last_name}`});
                }
            })
            console.log('Whew!  That was a big query!  Sent!')
            res.send(missingStudents);
        }
    })
}

const iepForDate = (req, res, next) => {
    const queryString = format(
        `With info AS (
            WITH active_iep AS (
              SELECT id, student_id FROM iep 
              WHERE student_id = %s
                  AND start_date < DATE(%L)
                  AND end_date > DATE(%L)
            )
            SELECT active_iep.student_id, id, role
            FROM teachers_students, active_iep
            WHERE active_iep.student_id = teachers_students.student_id
                AND %L = teachers_students.teacher_login
                AND NOT role = 'Case Manager')
            SELECT DISTINCT iep_goal.id, iep_goal.data_question, iep_goal.response_type, iep_goal.id, info.student_id, info.id AS iep_id
            FROM iep_goal, info
            WHERE info.id = iep_goal.iep_id
            AND (iep_goal.area = role OR iep_goal.area IN('All', 'BIP', 'meta'));`, req.id, req.body.date, req.body.date, req.body.teacher
    );
    console.log(queryString);
    pool.query(queryString, (error, results) => {
        if (error) {
            console.log(error);
            res.status(400).send();
        } else {
            res.send(results.rows);
        }
    })
}

const newIep = (req, res, next) => {
    req.queryString += format(
                              ` UPDATE iep SET end_date = %L 
                                WHERE student_id = %s
                                AND start_date < CURRENT_DATE 
                                AND end_date > CURRENT_DATE; 
                                INSERT INTO iep VALUES 
                                    (%L, %L, %s);`,
                                req.body.start_date, 
                                req.body.student_id,
                                req.body.start_date, req.body.end_date, req.body.student_id 
                       );
    req.body.goals.forEach(goal => {
        req.queryString += format(
                                    ` INSERT INTO iep_goal  
                                      SELECT MAX(id), '%s', '%s', '%s', '%s', %s, %s, %L FROM iep;`,
                                      goal.area, goal.goal, goal.data_question, goal.response_type, goal.baseline, goal.goal_percent, goal.description
                                );
    })
    next();
}

const newStudent = (req, res, next) => {
    req.queryString += format(
        `BEGIN;
         DELETE FROM teachers_students WHERE student_id = %s; `, req.body.student_id
    );
    req.queryString += format(
        `INSERT INTO student VALUES (%s, %L, %L, %L, true);
         INSERT INTO teachers_students VALUES 
        `,
        req.body.student_id, req.body.first_name, req.body.last_name, req.body.disability
    );
    // format array of values
    const values = req.body.scheduledTeachers.map(teacher => {
            return format(`(%L, %s, %L, %L, %L, %L)`, 
                                        teacher.teacher_login,
                                        teacher.student_id, 
                                        teacher.role,
                                        teacher.start_date,
                                        teacher.end_date,
                                        teacher.coteacher_login);
    })
    req.queryString += values.join(', ');
    req.queryString += format(`; INSERT INTO teachers_students VALUES
                           (%L, %s, 'TOR', CURRENT_DATE, (SELECT MAX(date) FROM calendar));
                           COMMIT; `, req.body.TOR, req.body.student_id);
    next();
}

const updateStudent = (req, res, next) => {
    req.queryString += format(
        `BEGIN;
         DELETE FROM teachers_students WHERE student_id = %s
         AND NOT role = 'TOR' AND NOT role = 'ADMIN'; `, req.body.student_id
    );
    req.queryString += format(
        `UPDATE student SET (first_name, last_name, disability) = (%L, %L, %L)
         WHERE id = %s; 
         INSERT INTO teachers_students VALUES 
        `,
        req.body.first_name, req.body.last_name, req.body.disability, req.body.student_id
    );
    // format array of values
    const values = req.body.scheduledTeachers.map(teacher => {
            return format(`(%L, %s, %L, %L, %L, %L)`, 
                                        teacher.teacher_login,
                                        teacher.student_id, 
                                        teacher.role,
                                        teacher.start_date,
                                        teacher.end_date,
                                        teacher.coteacher_login);
    })
    req.queryString += values.join(', ');
    req.queryString += (`; COMMIT; `);
    next();
}

const updateTeacher = (req, res, next) => {
    req.queryString += format(
        `BEGIN;
         DELETE FROM teachers_students WHERE teacher_login = %L
         AND role = 'TOR'; `, req.body.login
    );
    req.queryString += format(
        `UPDATE teacher SET (name, secret, email, user_type) = (%L, %L, %L, %L)
         WHERE login = %L; `,
        req.body.name, req.body.secret, req.body.email, req.body.user_type, req.body.login
    );
    
    if (req.body.assignedStudents.length > 0) {
        req.queryString += `INSERT INTO teachers_students VALUES `
        // format array of values
        const values = req.body.assignedStudents.map(student => {
        return format(`(%L, %s, 'TOR', %L, %L, %L)`, 
                                    student.teacher_login,
                                    student.student_id,
                                    student.start_date,
                                    student.end_date,
                                    student.coteacher_login,);
})
req.queryString += values.join(', ');
    }
    req.queryString += (`; COMMIT; `);
    next();
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
    compile,
    getMissing,
    iepForDate,
    newIep,
    newStudent,
    updateStudent,
    updateTeacher,
}