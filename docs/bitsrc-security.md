---
id: bitsrc-security
title: Security and Data Policy
permalink: docs/bitsrc-security.html
layout: docs
prev: bitsrc-plans.html
next: bitdev-permissions.html
---

Outlined in this document are the practices and policies Bit (Cocycles Ltd.) takes to make sure we release stable, secure software and keep all hosted data secured.

## Contact Us

If you need to report a security vulnerability, or have any question, please contact us at [security@bit.dev](mailto:security@bit.dev).

## Employee Data Access

All new hires are introduced to our security policy as part of their on-boarding process.  
All access rights to the private data stored on [bit.dev](https://bit.dev) is limited only to the owners of the data. No Cocycles employees ever get access to private code hosted on the platform unless required to do so for support purposes and after being granted temporary access by the owners of the hosted code.

When handling a support issue we do our best to respect your privacy as much as possible, we will only access the files and settings needed to resolve your issue. When employees are granted access to hosted code by the code’s owners for support purposes, all code and information regarding the code used will be deleted thereafter.

Employees working directly on the file storage are granted access to compressed files only and in no manner and under no circumstances are granted access to hosted code in plain text format (as granted to the code’s owner).

No third party has access to any code privately hosted on the platform. You can read more about the data shared with third parties in the [Privacy Policy](https://bit.dev/legals/privacy).

## Separation of Duties and Authorization

Developers are given access to key Bit services (such as GCE, etc.) when it is required for the purpose of their job. We also use [IAM](https://cloud.google.com/iam/) to limit permissions on GCE accounts, to minimize damage if an account is compromised.

## Platform and Network Security

We employ these measures to ensure the platform is kept secured.

* System installations using hardened, patched OS.
* Dedicated firewall and VPN to block unauthorized system access.
* System access logs are tracked for security audit.
* Documented change management procedures.
* Keeping all software dependencies up-to-date to latest security upgrades.
* Employ wide range of monitoring solutions for preventing and eliminating attacks.
* All data exchanged with [bit.dev](https://bit.dev) is transmitted over SSL.
* All importing and exporting of private data is done over SSH authenticated with keys.

## Distribution of Cloud Services

[bit.dev](https://bit.dev) is hosted in a multi-zone architecture on GCE services. This is to make sure that if there's an outage in a region, all services and data will still be available for all accounts. All data is fully replicated across all zones the platform uses.

## Storage and Backups

All data written to [bit.dev](https://bit.dev) is duplicated and replicated across at least three servers, in order to ensure site reliability in case of data outage. Every modification and variation to hosted code is saved, in real-time. We focus on making our infrastructure and network as secure and reliable as possible, and keep a full access logs for all read/write operations on the file system.

In case of disaster, we are able to restore any hosted code at any given timeframe, even in case it was accidentally deleted by the user.

## Maintaining Security

These are the design methodologies we use to build a stable and secure software.

* **Logging Practices** - Logs are important both for debugging and detecting security breaches. We log all requests arriving to the platform, as well as all actions done by our users. All logs are backed-up in a cloud storage. The logs do not contain any secrets or private data.
* **Limiting Software Access** - Each internal service has a specific, and limited access to the internal resources and data it needs to operate, using security groups.
* **Security Audits and Penetration Tests** - We regularly perform security audits and penetration tests to make sure our systems are secured.
* **Code Reviews** - No code is deployed without at least another developer reviewing it.

## Credit Card Safety

When you sign up to a paid account we do not store any of your card information on our servers. It is handled by [BlueSnap](https://www.bluesnap.com), a company dedicated to storing sensitive data on [PCI-compliant](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard) servers.
