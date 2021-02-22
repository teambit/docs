---
id: bit-account
title: Set Up a Bit.dev Account
---

Since Bit is completely OSS, Bit components can be hosted on your own server. Even so, for simplicity reasons, this tutorial will use [bit.dev's](https://bit.dev) servers.

For that, we'll register a new account and create a Scope to host components.

## Create a Bit.dev account

By default, Bit is connected to [bit.dev](https://bit.dev) as its default hosting provider. Run the `$ bbit login` command for Bit to open a login/sign-up form for a new personal account.

```shell
$ bbit login
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

## Create a Remote Scope

A scope is where the release versions of independent components are stored.  
Scopes are used both locally and remotely:

- [Local scopes](/docs/scope/overview#local-scope) store "staged" components that are ready to be exported from the local environment to a remote scope. You'll find your local scope in the `.bit` or `.git/bit` directory inside your workspace directory.

- [Remote scopes](/docs/scope/overview#remote-scope), either on Bit.dev or other self-hosted Bit servers, store exported components that are available to be used by other web projects.
  A single server may host multiple scopes. Each of these scopes groups together components that are related to each other by function or purpose. Each scope naturally corresponds to a specific team of developers (and even non-developers).

Head over the [create scope](https://bit.dev/~create-collection) screen:

1. Choose your account name.
1. type `demo-scope` as the scope name.
1. Select **Harmony** as "scope type".
1. Click on "Create".

<img src="/img/create_scope.png" alt="Choose scope type" width="50%" height="50%"></img>
