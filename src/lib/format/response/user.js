const { DateTime } = require("luxon");

function format_response(data) {
  if (data.length == 0) return {};
  let books = [];
  data.forEach(({ book_id }) => {
    books.push(book_id);
  });
  return { ...data[0], books };
}

module.exports = {
  format_response,
};
