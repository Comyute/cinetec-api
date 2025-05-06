const pg = require('pg')
const { ssl } = require('pg/lib/defaults')
const { Pool } = pg

require("dotenv").config()
 
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAMEDB,
  //ssl: true 
})

pool.connect((err) =>{
    if(err) throw err
    console.log("Coneccion a PostgreSQL correcta")
})

module.exports = pool