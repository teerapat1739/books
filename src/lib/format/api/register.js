const { DateTime } = require("luxon");
const crypto = require("crypto");

const CREATED_DATE = DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss", {
  zone: "utc+7",
});
const STATUS = 2;
const jwt = require("jsonwebtoken");
const secret = process.env.tokenSecretKey;
const url_send_mail = process.env.register_send_mail;

require("dotenv").config();
function format_data(data) {
  return {
    username: data.username,
    password: crypto
      .createHmac("sha256", secret)
      .update(data.password)
      .digest("hex"),
    name: data.username,
    surname: data.username,
    date_of_birth: DateTime.local().toFormat("yyyy-MM-dd", data.date_of_birth),
    status: STATUS,
    created_on: CREATED_DATE,
    updated_on: CREATED_DATE,
    logged_on: CREATED_DATE,
  };
}

module.exports = {
  format_data,
};
