const { DateTime } = require("luxon");

function format_response(data) {
  if (data.length == 0) return {};
  let books = [];
  data.forEach(({ book_id }) => {
    books.push(book_id);
  });
  return {
    ...data[0],
    date_of_birth: DateTime.local().toFormat(
      "dd/MM/yyyy",
      data[0].date_of_birth
    ),
    books,
  };
}

module.exports = {
  format_response,
};
