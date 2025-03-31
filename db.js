const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'ballast.proxy.rlwy.net',
    user: 'root',
    password: 'sJCuASsxhGJyTgydjvZVYhFOJrgglcXE',
    database: 'railway',
    port: 32436,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool.promise();
