const { pool } = require("../../src/lib/db");

const { DateTime } = require("luxon");
require("dotenv").config();

const table = "t_user";
const table_order = "t_user_order";

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
const get_user = async (id) => {
  try {
    const sql = `
    SELECT 
      tb1.id,
      tb1.name,
      tb1.surname,
      tb1.date_of_birth,
      tb2.user_id,
      tb2.book_id
    FROM ${table} tb1
    LEFT JOIN  ${table_order}  tb2
    ON tb1.id = tb2.user_id 
    WHERE tb1.id = ?
    `;
    const rows = await pool.query(sql, [id]);
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
  get_user,
};
