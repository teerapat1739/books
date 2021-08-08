const { pool } = require("../../src/lib/db");

const { DateTime } = require("luxon");
require("dotenv").config();

const table = "t_user";
const check_exit_email = async (username) => {
  try {
    const rows = await pool.query(
      `SELECT * FROM ${table} where username = '${username}'`
    );
    return rows;
  } catch (err) {
    console.error("SQL error", err);
    return err;
  }
};
const register_user = async (data) => {
  try {
    const sql_query = `INSERT INTO ${table} SET ?`;
    const rows = await pool.query(sql_query, data);
    return rows.insertId;
  } catch (err) {
    console.error("SQL error", err);
    return err;
  }
};
const update_status_user = async (id, status) => {
  try {
    const data = {
      status: status,
    };
    const sql_query = `UPDATE  ${table} SET ? WHERE id =` + id;
    const rows = await pool.query(sql_query, data);
    return rows.affectedRows;
  } catch (err) {
    console.error("SQL error", err);
    return err;
  }
};
module.exports = {
  register_user,
  check_exit_email,
  update_status_user,
};
