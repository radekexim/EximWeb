const Pool = require("pg").Pool;
const pg = require('pg');
require('dotenv').config()
pg.types.setTypeParser(1114, function (value) {
    return value
})
pg.types.setTypeParser(1082, function (value) { //date
    return value;
});
const pool = new Pool({
    user: process.env.WINCONDB_USER,
    host: process.env.WINCONDB_HOST,
    database: process.env.WINCONDB,
    password: process.env.WINCONDB_PSS,
    port: process.env.WINCONDB_PORT
})

module.exports = pool;