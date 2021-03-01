---
id: bit-account
title: Set Up a Bit.dev Account
---

[Bit](https://github.com/teambit/bit) is open source and can be used by one team through a self-hosted Scope (which is like a Repository in the Git model). [Bit.dev](https://bit.dev/) helps the organization scale to any amount of scopes owned by different teams, inter-connecting them into a single enterprise-grade collaboration experience with a lot of powerful features like search, permissions, security, and even a built-in component registry.  

Through Bit.dev you can also tap into the power of Ripple CI to continuously integrate changes to components across all projects and teams in your organization, and greatly boost development speed and efficiency.  

Let's create a new user account and setup a Scope on Bit.dev!  

## Create a Bit.dev account  

By default, Bit is connected to [bit.dev](https://bit.dev) as its default hosting provider. Run the `$ bbit login` command for Bit to open a login/sign-up form for a new personal account.

```shell
$ bbit login
```

:::note
Bit will look for an active session on bit.dev in your machine. If such is found, it will authenticate it automatically.
:::

Once an account has been created successfully, your terminal will greet you with the following message:

```sh
successfully added @bit as a scoped registry at /Users/<account>/.npmrc
success! logged in as <account name>
```

:::note
Bit.dev supports installing components as packages using npm/yarn/pnpm.
Bit automatically configures a local `~/.npmrc` file to set your package manager to fetch packages from Bit.dev.
:::

## Create a Remote Scope

A scope is where the release versions of Bit components are stored. [Remote scopes](/docs/scope/overview#remote-scope), either on [Bit.dev](https://bit.dev) or other self-hosted Bit servers, store exported components that are available to be used by other web projects.
A single server may host multiple scopes. Each of these scopes groups together components that are related to each other by function or purpose. Each scope naturally corresponds to a specific team of developers (and even non-developers).

Head over the [create scope](https://bit.dev/~create-collection) screen:

1. Choose your account name.
1. Type `demo-scope` as the scope name.
1. Select **Harmony** as "scope type".
1. Click on "Create".

<div style={{textAlign: 'center'}}>
    <img src="/img/create_scope.png"  style={{boxShadow: '3px 3px 15px 3px rgba(0,0,0,0.20)', width: '60%', padding: 10, marginTop: 10}}></img>
</div>
