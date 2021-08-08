require("dotenv").config();
function format_order(orders, id) {
  let arr = [];
  orders.map((i) => {
    arr.push([id, i]);
  });
  return arr;
}

module.exports = {
  format_order,
};
