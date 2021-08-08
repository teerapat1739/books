const { createLogger, format, transports } = require('winston');

level = 'info';

const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level,
  format: format.combine(format.colorize(), format.splat(), format.simple()),
  transports: [new transports.Console()]
});

module.exports = logger;
