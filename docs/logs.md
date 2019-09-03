---
id: logs
title: Checking Bit's logs
permalink: docs/logs.html
layout: docs
category: Troubleshooting
prev: clearing-bit-cache.html
next: bitsrc-component-ci.html
---

Some errors and additional information are document in Bit's log files but not displayed in the console output. If you're having problems, it's worth checking the log files.

## Logs location

Bit's log files are stored in the following directory:

* For Mac/Linux - `~/Library/Caches/Bit/logs`.
* For Windows - `%LOCALAPPDATA%/Bit/logs`. If `%LOCALAPPDATA%` is not defined, user profile directory will be used instead of `%LOCALAPPDATA%`. Further fallback options are available [here](https://github.com/sindresorhus/os-homedir/blob/master/index.js).

## Log types

There are three different log types:

* Debug log - `debug.log`.
* Exceptions log - `exceptions.log`.
* Extensions log - `extensions.log`.

## Logs properties

Each log file's size can be maximum 10MB, and there can be maximum 10 log files of each type. They will be numbered as follows: `debug.log`, `debug1.log`, `debug2.log`, etc.
The log files are actually [winston logs](https://github.com/winstonjs/winston), and are [tailable](https://github.com/winstonjs/winston/blob/master/docs/transports.md).