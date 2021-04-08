/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoggerFactoryInterface, LogLevel } from "./LoggerFactoryInterface";

class TestLogger {
  logs: { [key in LogLevel | "log"]: string[] } = {
    error: [],
    warn: [],
    info: [],
    debug: [],
    silly: [],
    log: [],
  };

  error(message: any) {
    this.logs.error.push(message);
  }

  warn(message: any) {
    this.logs.warn.push(message);
  }

  info(message: any) {
    this.logs.info.push(message);
  }

  debug(message: any) {
    this.logs.debug.push(message);
  }

  silly(message: any) {
    this.logs.silly.push(message);
  }

  log(message: any) {
    this.logs.log.push(message);
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
