# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.3.4](https://github.com/ailohq/logger/compare/v2.3.3...v2.3.4) (2022-05-20)

### [2.3.3](https://github.com/ailohq/logger/compare/v2.3.2...v2.3.3) (2022-05-20)

### [2.3.2](https://github.com/ailohq/logger/compare/v2.3.1...v2.3.2) (2022-05-20)

### [2.3.1](https://github.com/ailohq/logger/compare/v2.3.0...v2.3.1) (2022-05-20)

## [2.3.0](https://github.com/ailohq/logger/compare/v2.2.0...v2.3.0) (2022-05-20)


### Features

* change debug log colour to cyan for readability ([79f8e64](https://github.com/ailohq/logger/commit/79f8e64301743b8e38d32062f8fc7f1791b86440))

## [2.2.0](https://github.com/ailohq/logger/compare/v2.1.4...v2.2.0) (2021-06-02)


### Features

* Add `readonly minLevel?: LogLevel` property to logger factory and logger instances ([3a976b5](https://github.com/ailohq/logger/commit/3a976b5564a82c8a6844161c3277a36adbfe370c))

### [2.1.4](https://github.com/ailohq/logger/compare/v2.1.3...v2.1.4) (2021-05-05)

### [2.1.3](https://github.com/ailohq/logger/compare/v2.1.2...v2.1.3) (2021-05-04)


### Bug Fixes

* Don't handle exceptions when in REPL ([fdae0d4](https://github.com/ailohq/logger/commit/fdae0d4dbf6afd9c02577b0d81a2d821c44f8b95))

### [2.1.2](https://github.com/ailohq/logger/compare/v2.1.1...v2.1.2) (2021-04-08)


### Bug Fixes

* Strip colors from test logger messages ([d251857](https://github.com/ailohq/logger/commit/d2518575d98b510c5acceae379f91e04f9a9baab))

### [2.1.1](https://github.com/ailohq/logger/compare/v2.1.0...v2.1.1) (2021-04-08)


### Bug Fixes

* Improve interface of `TestLoggerFactory` ([b3274ad](https://github.com/ailohq/logger/commit/b3274adbd2aa6d8cc7571ede2c2ae09dc3bfcdaa))

## [2.1.0](https://github.com/ailohq/logger/compare/v2.0.0...v2.1.0) (2021-04-08)


### Features

* Extract `LoggerFactoryInterface` from `LoggerFactory`; add `TestLoggerFactory` ([6ea37c9](https://github.com/ailohq/logger/commit/6ea37c91eddf12ff0a55088a66a1f1d06f3f486a))

## [2.0.0](https://github.com/ailohq/logger/compare/v1.0.1...v2.0.0) (2021-04-08)


### ⚠ BREAKING CHANGES

* use `new LoggerFactory(...)` instead of `createLogger(...)`.

### ref

* Rename `function createLogger` to `class LoggerFactory` ([6c2d0fb](https://github.com/ailohq/logger/commit/6c2d0fb7de7a4f6ed50c25be3ca3ffdda411f014))

### 1.0.1 (2021-04-08)

### 1.0.1 (2021-02-11)
