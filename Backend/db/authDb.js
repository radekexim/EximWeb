const Pool = require("pg").Pool;
require('dotenv').config()
const pool = new Pool({
    user: process.env.AUTHDB_USER,
    host: process.env.AUTHDB_HOST,
    database: process.env.AUTHDB,
    password: process.env.AUTHDB_PSS,
    port: process.env.AUTHDB_PORT
})

module.exports = pool;