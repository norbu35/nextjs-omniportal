// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger, format, transports } from 'winston';

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const { timestamp, combine, printf } = format;
const myFormat = printf(({ level, message, time }) => {
  return `${time}: ${level} -> ${message}`;
});

const logger = createLogger({
  level: 'debug',
  levels: logLevels,
  format: combine(timestamp(), myFormat),
  transports: [new transports.File({ filename: './logs/error.log', level: 'error' }), new transports.File({ filename: './logs/combined.log' })],
  exceptionHandlers: [new transports.File({ filename: 'exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'rejections.log' })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

export { logger };
