---
id: bit-account
title: Bit.dev Account
---

Since Bit is completely OSS, Bit components can be hosted on your own server. Even so, for simplicity reasons, this tutorial will use [bit.dev's](https://bit.dev) servers.

For that, we'll register a new account and create a Scope to host components.

## Create a Bit.dev account

By default, Bit is connected to [bit.dev](https://bit.dev) as its default hosting provider. Run the `$ bbit login` command for Bit to open a login/sign-up form for a new personal account.

```shell
$ bbit login

Your browser has been opened to visit:
https://bit.dev/bit-login?port=8085&clientId=<my-hashed-id>&responseType=token&deviceName=<my-device>&os=<os>
```

> Bit will look for an active session on bit.dev in your machine. If such is found, it will authenticate it automatically.

Once an account has been created successfully, your terminal will greet you with the following message:

```sh
successfully added @bit as a scoped registry at /Users/<account>/.npmrc
success! logged in as <account name>
```

> **Authenticate your package manager**
>
> Bit.dev supports installing components as packages using npm/yarn/pnpm. Bit automatically configures a local `~/.npmrc` file to set your package manager to fetch packages from Bit.dev.

## Setup a Remote Scope

Head over the the [create scope](https://bit.dev/~create-collection) screen:

1. Choose your account name.
1. type `demo` as the scope name.
1. Select **Harmony** as "scope type".
1. Click on "Create".

<img src="/img/scope_type.png" alt="Choose scope type" width="50%" height="50%"></img>
