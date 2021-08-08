const fs = require('fs')
const path = require('path')
// const { DateTime } = require('luxon')

// const get_current_date = () => {
//   return DateTime.local().toFormat("yyyy-MM-dd")
// }

const write_log_cb = (date_str, message, cb) => {
  fs.appendFileSync(`${path.join(process.cwd(), 'logs', date_str.split(" ")[0])}.txt`, `${date_str} ${message}\n`, 'utf8')
  cb()
}

module.exports = {
  write_log_cb
}