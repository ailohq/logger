import winston from "winston";

export type LogLevel = "error" | "warn" | "info" | "debug" | "silly";

export type LoggerTransport =
  | { type: "console" }
  | { type: "file"; filename: string };

export interface LoggerFactoryOptions {
  /**
   * Log only if `message.level` is less than or equal to this level.
   *
   * If given `null`, will disable all the logs.
   *
   * @default "info"
   */
  minLevel?: LogLevel | null;
  /**
   * @default { type: "console" }
   */
  transport?: LoggerTransport;
}

export type Logger = Pick<winston.Logger, LogLevel | "log">;

export class LoggerFactory {
  private winstonLogger: winston.Logger;

  constructor({
    minLevel = "info",
    transport = { type: "console" },
  }: LoggerFactoryOptions = {}) {
    const transports =
      transport.type === "file"
        ? [
            new winston.transports.File({
              filename: transport.filename,
            }),
          ]
        : [new winston.transports.Console({ handleExceptions: true })];

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
      exceptionHandlers: [
        new winston.transports.File({
          filename: "/dev/stderr",
          level: "silly",
        }),
      ],
    });
  }

  get instance(): Logger & Pick<winston.Logger, "on" | "end"> {
    return this.winstonLogger;
  }

  logAs(name: string): Logger {
    return this.winstonLogger.child({ name });
  }
}
