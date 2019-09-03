---
id: cli-login
title: Login
permalink: docs/cli-login.html
layout: docs
category: CLI Reference
prev: cli-log.html
next: cli-logout.html
---

Log the CLI into Bit.

## Synopsis

```bash
bit login |[-p|--port] <port_id> | --npmrc-path | --skip-registry-config | --suppress-browser-launch
```

## Examples

### Login to an account

Open an authentication session to a remote, and configure your default `.npmrc` file with `@bit` as a scoped registry.

```bash
$ bit login
Your browser has been opened to visit: http://bit.dev/bit-login?redirect_uri=http://localhost:8085...
```

### Login to an account using a different port

Open an authentication session to a remote using a different port.

```bash
$ bit login --port 8086
Your browser has been opened to visit: http://bit.dev/bit-login?redirect_uri=http://localhost:8086...
```

### Do not open a browser for login

```bash
$ bit login --suppress-browser-launch
```

### Do not configure @bit to .npmrc

```bash
$ bit login --skip-registry-config
```

### Configure scoped registry to a non-default .npmrc file

```bash
$ bit login --npmrc-path ~/my-configuation
```

## Options

**-p, --port**

```bash
$ bit login --port 8086
```
