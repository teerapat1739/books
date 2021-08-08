const {
  getDictBooks,
  getTotalPriceBook,
  getExitsBooks,
} = require("../src/lib/helper/dictPriceBooks");

const { getBooks, getBooksRecommendation } = require("../src/lib/helper/books");
jest.mock("../src/lib/helper/books");
jest.mock("circular-json");
describe("test helper", () => {
  let recommend_books = [
    {
      author_name: "Kristin Hannah",
      id: 4,
      price: 495,
      book_name: "The Great Alone: A Novel Kristin Hannah",
    },
    {
      author_name: "Annejet van der Zijl, Michele Hutchison",
      id: 5,
      price: 149,
      book_name: "An American Princess: The Many Lives of Allene Tew",
    },
  ];

  let books = [
    {
      author_name: "Lisa Wingate",
      id: 1,
      price: 340,
      book_name: "Before We Were Yours: A Novel",
    },
    {
      author_name: "Barbara Davis",
      id: 2,
      price: 179,
      book_name: "When Never Comes",
    },
  ];
  it("should return dict of book", async () => {
    await getBooks.mockImplementation(() => books);
    await getBooksRecommendation.mockImplementation(() => recommend_books);
    const got = await getDictBooks();
    const want = {
      4: {
        author_name: "Kristin Hannah",
        id: 4,
        price: 495,
        book_name: "The Great Alone: A Novel Kristin Hannah",
      },
      5: {
        author_name: "Annejet van der Zijl, Michele Hutchison",
        id: 5,
        price: 149,
        book_name: "An American Princess: The Many Lives of Allene Tew",
      },
      1: {
        author_name: "Lisa Wingate",
        id: 1,
        price: 340,
        book_name: "Before We Were Yours: A Novel",
      },
      2: {
        author_name: "Barbara Davis",
        id: 2,
        price: 179,
        book_name: "When Never Comes",
      },
    };
    expect(want).toEqual(got);
  });

  it("should return array book existing in dict", async () => {
    const dict_books = {
      4: {
        author_name: "Kristin Hannah",
        id: 4,
        price: 495,
        book_name: "The Great Alone: A Novel Kristin Hannah",
      },
      5: {
        author_name: "Annejet van der Zijl, Michele Hutchison",
        id: 5,
        price: 149,
        book_name: "An American Princess: The Many Lives of Allene Tew",
      },
    };
    let got = await getExitsBooks(dict_books, [4, 5, 6, 7, 8, 9]);
    const want = [4, 5];
    expect(want).toEqual(got);
  });
});
