export type LogLevel = "error" | "warn" | "info" | "debug" | "silly";

export interface LogMethod {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (message: string, ...meta: any[]): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (message: any): void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  (infoObject: object): void;
}

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
  /**
   * @default true if not in REPL
   */
  handleExceptions?: boolean;
}

export type Logger = { [key in LogLevel]: LogMethod };

export interface LoggerFactoryInterface {
  logAs(name: string): Logger;
}
