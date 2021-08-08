const { pool } = require("../../src/lib/db");

require("dotenv").config();

const table = "t_user_order";

const create_order = async (data) => {
  try {
    const sql_query = `INSERT INTO ${table} (user_id, book_id) VALUES  ?`;
    const rows = await pool.query(sql_query, [data]);
    return rows.insertId;
  } catch (err) {
    console.error("SQL error", err);
    return err;
  }
};

module.exports = {
  create_order,
};
