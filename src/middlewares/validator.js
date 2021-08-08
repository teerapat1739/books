const { ObjectSchema, ValidationError } = require("yup");

function validator({ body, params, query }) {
  return async function (req, res, next) {
    let errors = [];
    if (body && body instanceof ObjectSchema) {
      try {
        await body.validate(req.body);
        const fields = Object.keys(body.fields);
        const backup_data = { ...req.body };
        for (i = 0; i < fields.length; i++) {
          delete backup_data[fields[i]];
        }
        if (Object.keys(backup_data).length > 0) {
          throw new ValidationError("Service does not accept unknown field");
        }
      } catch (e) {
        res.status(400).json({ error: "Not correct" });
        //throw new ValidationError('Service does not accept unknown field')
        // errors = [...errors, ...e.errors];
      }
    }
    if (params && params instanceof ObjectSchema) {
      try {
        await params.validate(req.params);
      } catch (e) {
        errors = [...errors, ...e.errors];
      }
    }
    if (query && query instanceof ObjectSchema) {
      try {
        await query.validate(req.query);
        const backup_data = { ...req.query };
        for (i = 0; i < fields.length; i++) {
          delete backup_data[fields[i]];
        }
        if (Object.keys(backup_data).length > 0) {
          throw new ValidationError("Service does not accept unknown field");
        }
      } catch (e) {
        errors = [...errors, ...e.errors];
      }
    }

    if (errors.length > 0) {
      res.status(400).json({ error: errors });
    } else {
      next();
    }
  };
}

module.exports = validator;
