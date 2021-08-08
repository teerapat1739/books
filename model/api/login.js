
const { get_api_db_connection_config, get_tbroker_db_connection_config, pool, get_tbroker_connection,get_table_name } = require("../../src/lib/db")

const { DateTime } = require('luxon')
require('dotenv').config()
const crypto = require('crypto');

const table = 't_user'
const token_secret = process.env.tokenSecretKey
const check_login = async(data) =>{
    try {
   
        const password = crypto.createHmac('sha256', token_secret).update(data.password).digest('hex')
        const rows = await pool.query(`SELECT * FROM ${table} where username = '${data.username}' AND password = '${password}'`);
        return rows
    }catch (err) {
        console.error('SQL error', err);
        return err
    }
}
const log_login = async(id,payload) =>{
    try {
        rows = await pool.query(`UPDATE ${table} SET logged_on = ?, access_token = ?, refresh_token = ?, refresh_token_iat = ?, refresh_token_exp = ? WHERE id = ?`, [payload.dt, payload.token, payload.refresh_token, payload.refresh_token_iat, payload.refresh_token_exp, id]);
        return rows.affectedRows
    } catch(err) {
        return err
    }   

}
module.exports = {
    check_login,
    log_login
 
}