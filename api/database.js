const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, args) {
    const connection = await mysql.createConnection(config);
    const [results, ] = await connection.execute(sql, args);
    connection.end();

    return results;
}

module.exports = { query };
