const yup = require("yup");

const { DateTime } = require("luxon");
const validate_input = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().trim().min(6).required(),
  name: yup.string().trim().min(6).required(),
  surname: yup.string().trim().min(6).required(),
  date_of_birth: yup.mixed().test({
    test: (value) => {
      var dt2 = DateTime.fromFormat(value, "dd/MM/yyyy").toISODate();
      if (dt2 === null) {
        return false;
      }
      return dt2;
    },
  }),
});
const validate_login = yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().trim().min(6).required(),
});

const validate_orders = yup.object().shape({
  orders: yup.lazy((val) =>
    Array.isArray(val) ? yup.array().of(yup.number()) : yup.number()
  ),
});

module.exports = {
  validate_input,
  validate_login,
  validate_orders,
};
