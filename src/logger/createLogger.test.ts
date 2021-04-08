import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { createLogger, LoggerFactory } from "./createLogger";

const testLogFile = execSync("mktemp").toString();
beforeEach(() => {
  writeFileSync(testLogFile, "");
});

let logger: LoggerFactory;
beforeEach(() => {
  logger = createLogger({
    transport: {
      type: "file",
      filename: testLogFile,
    },
  });
});

function onLoggerFinish(fn: () => void): Promise<void> {
  return new Promise((resolve, reject) => {
    logger.instance.on("finish", () => {
      // Temporary workaround for winston not flushing the logger before the finish event
      // ( https://github.com/winstonjs/winston/pull/1868 )
      setTimeout(resolve, 100);
    });
    logger.instance.on("error", reject);
    fn();
    logger.instance.end();
  });
}

describe("createLogger", () => {
  // eslint-disable-next-line jest/expect-expect
  it("creates a logger that can be closed", () => {
    logger.instance.end();
  });

  it("can be used to log messages", async () => {
    await onLoggerFinish(() => {
      logger.instance.warn("some warning");
    });
    expect(readFileSync(testLogFile).toString()).toMatch(
      /warn.*:.*some warning/
    );
  });

  it("logAs creates a child logger with a namespace", async () => {
    const childLogger = logger.logAs("apple");
    await onLoggerFinish(() => {
      childLogger.warn("some warning");
    });
    expect(readFileSync(testLogFile).toString()).toMatch(
      /\[apple].*warn.*:.*some warning/
    );
  });
});
