const { EVENTS } = require('./queue/constants')
const { add_queue } = require('./queue')
const { DateTime } = require('luxon')

const write_log = message => {
  return add_queue(EVENTS.WRITE_LOG, {
    message: `[INFO] ${message}`,
    date_str: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss")
  })
}

const write_error_log = message => {
  return add_queue(EVENTS.WRITE_LOG, {
    message: `[ERROR] ${message}`,
    date_str: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss")
  })
}

module.exports = {
  write_log,
  write_error_log
}