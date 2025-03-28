const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Animesh@123',
    database: 'movies_db'
});

module.exports = pool.promise();
