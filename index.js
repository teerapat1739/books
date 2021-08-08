const server = require('./server')
const logger = require('./logger')
require('dotenv').config()

server.listen(process.env.SERVER_PORT, '127.0.0.1', () => {
  // console.log(process.env)
  logger.info(`Server is started on port ${process.env.SERVER_PORT}`)
})