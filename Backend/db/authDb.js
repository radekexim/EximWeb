const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    host: '192.168.10.252',
    database: 'eximorder',
    password: 'postgres',
    port: '5432'
})

module.exports = pool;