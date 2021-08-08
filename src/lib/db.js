require('dotenv').config()
const mysql = require('mysql2')

let api_db = null



const config = require('../../database.json');
const host = config.defaultEnv == "local" ? config.local.host :process.env.API_DB_HOST
const user= config.defaultEnv == "local" ? config.local.user :process.env.API_DB_USER
const password = config.defaultEnv == "local" ? config.local.password :process.env.API_DB_PASSWORD
const database = config.defaultEnv == "local" ? config.local.database :process.env.API_DB_NAME



const util = require('util')
const pool = mysql.createPool(get_api_db_connection_config())

  pool.getConnection((err, connection) => {
    if (err) {
      console.log("errDb",err.code)
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
      if (err.code == 'ER_ACCESS_DENIED_ERROR')
      {
        console.error('Database conection not correct.')
        throw 'Database conection not correct.';
      } 
    }
  
    if (connection) connection.release()
  
    return
  })
  function get_api_db_connection_config() {
    return {
      user: user,
      password: password,
      host: host,
      database: database,
   
    }
  }
pool.query = util.promisify(pool.query)
  


module.exports = {
  get_api_db_connection_config,
  pool,
}