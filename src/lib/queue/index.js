const path = require('path')
const Queue = require('better-queue')
const { EVENTS } = require('./constants')

const logger = require('../../../logger')

const { write_log_cb } = require('./log-queue')
const { save_response_cb } = require('./dry-run')

let q = null

const queueWorker = (input, cb) => {
  switch (input.type) {

    case EVENTS.WRITE_LOG:
      const { date_str, message } = input.payload
      write_log_cb(date_str, message, cb)
      break;

    case EVENTS.DRY_RUN:
      const { method, uri, status_code, data, response_headers } = input.payload
      save_response_cb(method, uri, status_code, data, response_headers, cb)
      break;

    default:
      logger.error("Invalid queue type")
      logger.error(JSON.stringify(input))
      cb("Invalid queue type")

  }

}

const createQueueObject = () => {
  q = new Queue(queueWorker, {
    // store: {
    //   type: 'sqlite',
    //   dialect: 'sqlite',
    //   path: path.join(process.cwd(), 'queue', 'queue.sqlite3'),
    // },

  })
  q.on('drain', () => {
    console.info(`QUEUE-DRAIN: ${JSON.stringify(q.getStats())}`);
  });

  q.on('task_queued', () => {
    console.info(`QUEUE-QUEUE: ${JSON.stringify(q.getStats())}`);
  });

  q.on('task_finish', (taskId, result, stats) => {
    console.info(`QUEUE-FINISH: ${JSON.stringify(q.getStats())} (${stats.elapsed} ms)`);
  });

  q.on('task_failed', (taskId, result, stats) => {
    console.info(`QUEUE-FAILED: ${JSON.stringify(result)} (${stats.elapsed} ms)`);
  });

}

const add_queue = (event_type, data_object) => {
  if (!q) {
    createQueueObject()
  }
  return q.push({ type: event_type, payload: data_object })
}


module.exports = {
  createQueueObject, add_queue, EVENTS
}
