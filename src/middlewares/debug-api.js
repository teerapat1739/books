const path = require("path");
const fs = require("fs");

const DRY_RUN_PATH = path.join(process.cwd(), "dry-run");

function apiDebugger() {
  return function (req, res, next) {
    if (process.env.DEBUG === "YES" && req.locals.debugPrefix) {
      const { debugPrefix } = req.locals;
      const { _method, _uri } = res.locals;
      const file_name = `${encodeURIComponent(_uri.split("?")[0])}_${_method}_${
        debugPrefix == "dry-run" ? "SUCCESS" : "FAIL"
      }.json`;
      let response_data = {};
      try {
        response_data = JSON.parse(
          fs.readFileSync(path.join(DRY_RUN_PATH, file_name), "utf8")
        );
      } catch {
        response_data = {
          status_code: 404,
          data: "Not found",
        };
      }
      if (response_data.response_headers) {
        Object.entries(response_data.response_headers).forEach((header) =>
          res.append(header[0], header[1])
        );
      }

      res
        .status(response_data.status_code || 500)
        .json(response_data.data || "Internal Server Error");
    } else {
      next();
    }
  };
}

module.exports = apiDebugger;
