import winston from "winston";

export type LogLevel = "error" | "warn" | "info" | "debug" | "silly";

export type LoggerTransport =
  | { type: "console" }
  | { type: "file"; filename: string };

export interface CreateLoggerOpts {
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

export interface LoggerFactory {
  instance: Logger & Pick<winston.Logger, "on" | "end">;
  logAs(name: string): Logger;
}

export function createLogger({
  minLevel = "info",
  transport = { type: "console" },
}: CreateLoggerOpts = {}): LoggerFactory {
  const transports =
    transport.type === "file"
      ? [
          new winston.transports.File({
            filename: transport.filename,
          }),
        ]
      : [new winston.transports.Console({ handleExceptions: true })];

  const logger = winston.createLogger({
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

  const factory: LoggerFactory = {
    instance: logger,
    logAs(name) {
      return logger.child({ name });
    },
  };

  return factory;
}
