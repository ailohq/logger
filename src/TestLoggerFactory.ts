import stripColor from "strip-color";
import { LoggerFactoryInterface, LogLevel } from "./LoggerFactoryInterface";

class TestLogger {
  _logs: [LogLevel, string][] = [];

  stripColor: boolean;

  constructor({
    stripColor: stripColorOption = true,
  }: {
    /**
     * Strip colors from messages?
     * @default true
     */
    stripColor?: boolean;
  } = {}) {
    this.stripColor = stripColorOption;
  }

  get logs(): [LogLevel, string][] {
    return this._logs.map(([level, msg]) => [
      level,
      this.stripColor ? stripColor(msg) : msg,
    ]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: any) {
    this._logs.push(["error", message]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(message: any) {
    this._logs.push(["warn", message]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(message: any) {
    this._logs.push(["info", message]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(message: any) {
    this._logs.push(["debug", message]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  silly(message: any) {
    this._logs.push(["silly", message]);
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
