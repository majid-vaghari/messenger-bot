const winston = require('winston')
const logDir = require('./config').log.dir
const path = require('path')

const transports = [
  new (winston.transports.File)({
    name: 'info-file',
    filename: path.resolve(logDir, 'messages.log'),
    level: 'info',
    timestamp: true,
    json: false,
    prettyPrint: true
  }),
  new (winston.transports.File)({
    name: 'warn-file',
    filename: path.resolve(logDir, 'warnings.log'),
    level: 'warn',
    timestamp: true,
    json: false,
    prettyPrint: true
  }),
  new (winston.transports.File)({
    name: 'error-file',
    filename: path.resolve(logDir, 'errors.log'),
    level: 'error',
    timestamp: true,
    json: false,
    prettyPrint: true,
    handleExceptions: true
  })
]

if (process.env.NODE_ENV !== 'production') {
  transports.push(new (winston.transports.Console)({
    name: 'debug-console',
    level: 'debug',
    colorize: true,
    timestamp: true,
    prettyPrint: true
  }))
}

const logger = new (winston.Logger)({ transports: transports })

module.exports = logger
