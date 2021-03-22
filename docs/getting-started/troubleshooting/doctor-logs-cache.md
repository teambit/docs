---
id: doctor-logs-cache
title: Bit doctor, logs and cache
---

### Bit Doctor

`bit doctor` is a self diagnosis and healing tool for Bit workspaces. Run:

```shell
bit doctor
```

The output is a list of all diagnosis that Bit currently implements. If any of the checks has failed, Bit suggests a fix for it.

At some cases the maintainers will need additional workspace information in order to debug an issue. Doctor is capable of saving the most important data and logs from the workspace in a shareable format.  
Use this file when opening an issue to the [project repository](https://github.com/teambit/bit).

Note, before submitting the output you can open it an validate that no sensitive information is submitted. You can clear such information from the file.

```shell
bit doctor --save doctor-results
```

### Logs

Some errors and additional information are document in Bit's log files but not displayed in the console output. If you're having problems, it's worth checking the log files.

Bit's log files are stored in:

- For Mac/Linux - `~/Library/Caches/Bit/logs`.
- For Windows - `%LOCALAPPDATA%/Bit/logs`. If `%LOCALAPPDATA%` is not defined, user profile directory will be used instead of `%LOCALAPPDATA%`. Further fallback options are available [here](https://github.com/sindresorhus/os-homedir/blob/master/index.js).

The three different log types in Bit are:

- Debug log - `debug.log`.
- Exceptions log - `exceptions.log`.
- Extensions log - `extensions.log`

Each log file's size can be maximum 10MB, and there can be maximum 10 log files of each type. They will be numbered as follows: `debug.log`, `debug1.log`, `debug2.log`, etc.
The log files are actually [winston logs](https://github.com/winstonjs/winston), and are [tailable](https://github.com/winstonjs/winston/blob/master/transports.md).

### Cache

If errors occur, it is worth trying to clear Bit's cache in case it got corrupted. You can clear it using the [clear cache command](/apis/cli-all#clear-cache):

```shell
bit clear-cache
```
