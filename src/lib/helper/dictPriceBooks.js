const { getBooks, getBooksRecommendation } = require("./books");

require("dotenv").config();

const BOOK_URL =
  process.env.BOOK_URL || "https://scb-test-book-publisher.herokuapp.com";

const getDictBooks = async () => {
  try {
    let books = await getBooks();
    let booksRecommendation = await getBooksRecommendation();
    let list = [...booksRecommendation, ...books];
    let dict = {};
    list.forEach((book) => {
      dict[book.id] = book;
    });

    return dict;
  } catch (error) {
    return error;
  }
};

const getExitsBooks = (dict, arrBooksID) => {
  try {
    let arrBooksIDExits = [];
    arrBooksID.forEach((bookID) => {
      if (dict[bookID]) arrBooksIDExits.push(bookID);
    });

    return arrBooksIDExits;
  } catch (error) {
    return error;
  }
};

const getTotalPriceBook = (dict, arrBooksID) => {
  try {
    let totalPrice = 0;
    arrBooksID.forEach((bookID) => {
      totalPrice += dict[bookID].price;
    });

    return totalPrice;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getDictBooks,
  getTotalPriceBook,
  getExitsBooks,
};
