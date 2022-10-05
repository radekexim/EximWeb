const Pool = require("pg").Pool;
const pg = require('pg');
pg.types.setTypeParser(1114, function (value) {
    return value
})
pg.types.setTypeParser(1082, function (value) { //date
    return value;
});
const pool = new Pool({
    user: 'postgres',
    host: '192.168.10.252',
    database: 'wincon2022',
    password: 'postgres',
    port: '5432'
})

module.exports = pool;