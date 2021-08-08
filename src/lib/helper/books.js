const axios = require("axios");
require("dotenv").config();

const BOOK_URL =
  process.env.BOOK_URL || "https://scb-test-book-publisher.herokuapp.com";

const getBooks = async () => {
  try {
    let res = await axios.get(`${BOOK_URL}/books`);
    return res.data;
  } catch (error) {
    return error;
  }
};

const getBooksRecommendation = async () => {
  try {
    let res = await axios.get(`${BOOK_URL}/books/recommendation`);
    return res.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getBooks,
  getBooksRecommendation,
};
