---
id: usage-analytics
title: Usage Analytics
---

Bit's maintainers use anonymous analytics and error reporting to improve the overall quality of Bit.

## Anonymous Aggregate User Behavior Analytics

To help prioritize new features and bug fixes, Bit can collect anonymous statistics about its usage.

You will be notified of it the first time you run a Bit command on a new installation of Bit.

## Why?

Most actions using Bit are done locally, and not all errors are reported back to Bit. As a result, it is hard to understand what are the outstanding issues in Bit, and which parts of the system require more maintenance. Additionally, Bit tracks some usage metrics to better understand how developers are using the system, in order to help prioritize new features and areas which require additional work on the developer experience.

## What?

### Masking Sensitive Information

Error messages and commands may contain private information such as the name of a component, remote Collection and occasionally names of files in a project. We consider it as private data, and thus will not send it to the analytics platform. Bit masks all private data in a command or an error message prior to sending it, so only actual usage data is sent.

> If you want to unmask information, as this would help to better triage issues, you can do it by simply changing the default value of the `anonymous_reporting` configuration to `false`:
>
> ```bash
> bit config set anonymous_reporting false
> ```

### Command Usage Tracking

An event is sent on any command triggered. The name of the event is the command’s name. Each event contains the properties data by default:

- Operating system - The name and version of the operating system running Bit.
- Node version - The version of node.js in the system running Bit.
- Bit version - The installed version of Bit.
- Installation ID - The randomly generated ID for each installation of Bit.
- Command flags - The list of flags used.

Additionally, some properties are added on specific events:

- Authentication method - The authentication method a user used when communicating with a remote Collection. This is sent only when a local command requires accessing a remote Collection.
- Local components issue statistics - When running `bit status`, to see data and status of your workspace, Bit sends statistics such as ‘total number of components with missing dependencies’, and ‘total number of components with untracked files’.

### Anonymous Error Reporting

To help figure out where most errors occur, and handle unreported issues, Bit also sends additional reporting when an error is thrown. Unlike the regular event analytics, here more detailed information is required. However, [as explained before](#masking-sensitive-inforamtion), no sensitive information is being sent.

In order to help the maintainers of Bit figure out where the issue has occurred, Bit sends the following properties:

- Error message - The error message that the Bit prompt to the user.
- Stacktrace - The stacktrace that was thrown.
- Breadcrumbs - Trail of events which happened prior to an issue.

## Where?

Bit’s analytics are sent throughout Bit’s execution to analytics.bit.dev over HTTPS.

## Who?

Bit’s detailed analytics are accessible only to Bit’s current maintainers. [Contact us](https://bit.dev/support) if you are a maintainer and need access.

## Opting Out

Bit analytics helps us maintainers and leaving it on is appreciated. By default, Bit _does not_ track your usage and errors. However, if you have opted-in and wish to opt out of Bit analytics, you can unset the `analytics_reporting` and `error_reporting` configuration variables:

```bash
bit config set analytics_reporting false
bit config set error_reporting false
```
