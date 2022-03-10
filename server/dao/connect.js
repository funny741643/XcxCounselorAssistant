const mysql = require('mysql');
const config = require('../conf/db').mysql;

const pool = mysql.createPool(config)
module.exports = pool;