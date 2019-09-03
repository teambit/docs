---
id: troubleshooting-doctor
title: Troubleshooting with Doctor
permalink: docs/troubleshooting-doctor.html
layout: docs
category: Troubleshooting
prev: latest-version.html
next: authentication-issues.html
---

`bit doctor` is a self diagnosis and healing tool for Bit workspaces.

## Running diagnosis on workspaces

Starting from version `14.1.0` Bit features a self diagnosis and healing tool call `bit doctor`. Run this command in case you encounter blocking issues in your workspace.

```sh
bit doctor
```

The output is a list of all diagnosis that Bit currently implements. If any of the checks has failed, Bit suggests a fix for it.

### Saving diagnosis to a file

At some cases the maintainers will require additional workspace information in order to debug an issue. Doctor is capable of saving the most important data and logs from the workspace in a shareable format.  
Use this file when opening an issue to the [project repository](https://github.com/teambit/bit).

Note, before submitting the output you can open it an validate that no sensitive information is submitted. You can clear such information from the file.

```sh
bit doctor --save doctor-results
```
