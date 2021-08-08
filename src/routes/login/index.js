const express = require("express");
const apiDebugger = require("../../middlewares/debug-api");
const { create_response } = require("../../lib/http-response");

const { check_login, log_login } = require("../../../model/api/login");
const { validate_login } = require("../../lib/validate/api/register");

const { genarate_token } = require("../../lib/format/api/login");
const validator = require("../../middlewares/validator");

module.exports = () => {
  const router = express.Router();

  router.post(
    "/",
    validator({ body: validate_login }),
    apiDebugger(),
    async (req, res, next) => {
      console.log("ssssss");
      let data = await check_login(req.body);
      if (data.length == 0) {
        create_response(res, "Username or password not correct", 400);
        return next();
      }
      delete data[0].password;

      let payload = genarate_token(data[0].id, true);
      let update = await log_login(data[0].id, payload);
      if (update < 1) {
        create_response(res, "error genarate token ", 400);
        return next();
      }
      data[0].access_token = payload.token;
      data[0].refresh_token = payload.refresh_token;
      data[0].logged_on = payload.dt;
      create_response(res, data);
      next();
    }
  );

  return router;
};
