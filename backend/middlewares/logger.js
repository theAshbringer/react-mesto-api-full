const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.resolve('./log', 'request.log') }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.resolve('./log', 'error.log') }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
