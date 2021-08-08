const { format_response } = require("../src/lib/format/response/user");

describe("test format response", () => {
  it("should return format reponse follow expectation", async () => {
    const data = [
      {
        id: 3,
        name: "qweqweqweqweqweqwe",
        surname: "qweqweqweqweqweqwe",
        date_of_birth: "2021-08-06T17:00:00.000Z",
        user_id: 3,
        book_id: 1,
      },
      {
        id: 3,
        name: "qweqweqweqweqweqwe",
        surname: "qweqweqweqweqweqwe",
        date_of_birth: "2021-08-06T17:00:00.000Z",
        user_id: 3,
        book_id: 4,
      },
    ];
    let got = await format_response(data);
    const want = {
      id: 3,
      name: "qweqweqweqweqweqwe",
      surname: "qweqweqweqweqweqwe",
      date_of_birth: "08/08/2021",
      user_id: 3,
      book_id: 1,
      books: [1, 4],
    };
    expect(want).toEqual(got);
  });
});
