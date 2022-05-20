import winston from "winston";
import {
  Logger,
  LoggerFactoryInterface,
  LoggerFactoryOptions,
  LogLevel,
} from "./LoggerFactoryInterface";

// eslint-disable-next-line
const isREPL = !!require("repl").repl;

export class LoggerFactory implements LoggerFactoryInterface {
  readonly minLevel?: LogLevel;

  private winstonLogger: winston.Logger;

  constructor({
    minLevel = "info",
    transport = { type: "console" },
    handleExceptions = !isREPL,
  }: LoggerFactoryOptions = {}) {
    this.minLevel = minLevel ?? undefined;

    const transports =
      transport.type === "file"
        ? [
            new winston.transports.File({
              filename: transport.filename,
            }),
          ]
        : [new winston.transports.Console({ handleExceptions })];

    this.winstonLogger = winston.createLogger({
      level: this.minLevel ?? "none",
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
        winston.format.colorize({ all: true, colors: { debug: "cyan" } }),
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
        : undefined,
    });
  }

  get instance(): Logger & Pick<winston.Logger, "on" | "end"> {
    return this.winstonLogger;
  }

  logAs(name: string): Logger {
    const logger = this.winstonLogger.child({ name }) as Logger;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (logger as any).minLevel = this.minLevel;
    return logger;
  }
}
