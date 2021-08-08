const express = require("express");
const apiDebugger = require("../../middlewares/debug-api");
const { create_response } = require("../../lib/http-response");
const tokenSecretKey = process.env.tokenSecretKey;
const jwt = require("jsonwebtoken");
const {
  getDictBooks,
  getTotalPriceBook,
  getExitsBooks,
} = require("../../lib/helper/dictPriceBooks");

const {
  register_user,
  check_exit_email,
  get_user,
} = require("../../../model/api/register");
const { create_order } = require("../../../model/api/order");

const {
  validate_input,
  validate_orders,
} = require("../../lib/validate/api/register");
const { format_data } = require("../../lib/format/api/register");
const { format_order } = require("../../lib/format/api/order");
const { format_response } = require("../../lib/format/response/user");

const validator = require("../../middlewares/validator");
const { authen_token_api } = require("../../middlewares/authen");
module.exports = () => {
  const router = express.Router();

  router.post(
    "/",
    // validator({
    //   body: validate_input,
    // }),
    apiDebugger(),
    async (req, res, next) => {
      try {
        let username = await check_exit_email(req.body.username);
        if (username.length > 0) {
          create_response(res, "Username Duplicate", 400);
          return next();
        }
        let format_insert = format_data(req.body);
        let data = await register_user(format_insert);

        if (data == 0) {
          create_response(res, "Insert Fail", 400);
          return next();
        }
        create_response(res, "Add Data Success");
        next();
      } catch (e) {
        create_response(res, "Err", 400);
        next();
      }
    }
  );

  router.get("/", authen_token_api(), apiDebugger(), async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : "";

      const data = jwt.verify(token, tokenSecretKey);
      let user = await get_user(data.id);
      user = format_response(user);
      create_response(res, user);
      next();
    } catch (e) {
      create_response(res, "Err", 400);
      next();
    }
  });

  router.post(
    "/orders",
    authen_token_api(),
    validator({
      body: validate_orders,
    }),
    apiDebugger(),
    async (req, res, next) => {
      try {
        const token = req.headers.authorization
          ? req.headers.authorization.split(" ")[1]
          : "";

        const data = jwt.verify(token, tokenSecretKey);
        // getDictPriceID
        let dict_books = await getDictBooks();
        let exits_books = await getExitsBooks(dict_books, req.body.orders);
        let format_insert = format_order(exits_books, data.id);
        let orders_created = await create_order(format_insert);

        if (orders_created == 0) {
          create_response(res, "Insert Fail", 400);
          return next();
        }

        let price = await getTotalPriceBook(dict_books, exits_books);

        create_response(res, { price: price });
        next();
      } catch (e) {
        console.log(e);
        create_response(res, "Err", 400);
        next();
      }
    }
  );
  router.post("/test", apiDebugger(), async (req, res, next) => {
    try {
      create_response(res, "req.body");
      next();
    } catch (e) {
      create_response(res, "Err", 400);
      next();
    }
  });

  return router;
};
