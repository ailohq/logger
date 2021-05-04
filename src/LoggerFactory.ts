import winston, { Logger } from "winston";
import {
  LoggerFactoryInterface,
  LoggerFactoryOptions,
} from "./LoggerFactoryInterface";

const isREPL =
  process.execArgv.includes("-i") ||
  process.argv.length === 0 ||
  process.argv.length === 1;

export class LoggerFactory implements LoggerFactoryInterface {
  private winstonLogger: winston.Logger;

  constructor({
    minLevel = "info",
    transport = { type: "console" },
    handleExceptions = !isREPL,
  }: LoggerFactoryOptions = {}) {
    const transports =
      transport.type === "file"
        ? [
            new winston.transports.File({
              filename: transport.filename,
            }),
          ]
        : [new winston.transports.Console({ handleExceptions })];

    this.winstonLogger = winston.createLogger({
      level: minLevel === null ? "none" : minLevel,
      levels: {
        none: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
        silly: 5,
      },
      transports,
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, name }) =>
          name
            ? `${timestamp} [${name}] ${level}: ${message}`
            : `${timestamp} ${level}: ${message}`
        )
      ),
      exceptionHandlers: handleExceptions
        ? [
            new winston.transports.File({
              filename: "/dev/stderr",
              level: "silly",
            }),
          ]
        : [],
    });
  }

  get instance(): Logger & Pick<winston.Logger, "on" | "end"> {
    return this.winstonLogger;
  }

  logAs(name: string): Logger {
    return this.winstonLogger.child({ name });
  }
}
