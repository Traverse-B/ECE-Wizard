const format = require('pg-format');
const { Pool } = require('pg');
const { string } = require('pg-format');
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'ecewizard',
    password: 'Lyle3mail',
    port: 5432
});
const dates = [] ;
for (let i = 0; i < 13; i++) {
    dates.push( `('2021-08-${1+i}')`)
}
const values = dates.join(', ')
const queryString = `INSERT INTO calendar VALUES ` + values + ';';
console.log(queryString)

pool.query(queryString, (error, result) => {
    if (error) console.log(error);
    if (result) console.log('done!  check')
});