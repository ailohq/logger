import { TestLoggerFactory } from "./TestLoggerFactory";

describe("TestLoggerFactory", () => {
  it("can be used to log messages and read them", () => {
    const factory = new TestLoggerFactory();
    const a = factory.logAs("a");
    a.error("1");
    a.info("2");

    const b = factory.logAs("b");
    b.info("3");

    expect(factory.loggers).toEqual({ a, b });
    expect(a.logs).toEqual([
      ["error", "1"],
      ["info", "2"],
    ]);
    expect(b.logs).toEqual([["info", "3"]]);
  });
});
