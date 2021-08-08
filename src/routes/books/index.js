const express = require("express");
const apiDebugger = require("../../middlewares/debug-api");
const { create_response } = require("../../lib/http-response");
const { getBooks, getBooksRecommendation } = require("../../lib/helper/books");

const axios = require("axios");

const { authen_token_api } = require("../../middlewares/authen");
module.exports = () => {
  const router = express.Router();

  router.get("/", authen_token_api(), apiDebugger(), async (req, res, next) => {
    try {
      let books = await getBooks();
      let booksRecommendation = await getBooksRecommendation();
      create_response(res, { books: [...booksRecommendation, ...books] });
      next();
    } catch (e) {
      create_response(res, "Err", 400);
      next();
    }
  });
  router.post("/test", apiDebugger(), async (req, res, next) => {
    try {
      create_response(res, req.body);
      next();
    } catch (e) {
      create_response(res, "Err", 400);
      next();
    }
  });

  return router;
};
