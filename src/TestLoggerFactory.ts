/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoggerFactoryInterface, LogLevel } from "./LoggerFactoryInterface";

class TestLogger {
  logs: [LogLevel, string][] = [];

  error(message: any) {
    this.logs.push(["error", message]);
  }

  warn(message: any) {
    this.logs.push(["warn", message]);
  }

  info(message: any) {
    this.logs.push(["info", message]);
  }

  debug(message: any) {
    this.logs.push(["debug", message]);
  }

  silly(message: any) {
    this.logs.push(["silly", message]);
  }
}

export class TestLoggerFactory implements LoggerFactoryInterface {
  loggers: { [key: string]: TestLogger | undefined } = {};

  logAs(name: string): TestLogger {
    const logger = new TestLogger();
    this.loggers[name] = logger;
    return logger;
  }
}
