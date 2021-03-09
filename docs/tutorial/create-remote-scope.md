---
id: create-remote-scope
title: Create a Remote Scope
---

import { Image } from '../../src/components/image';

A scope is where the release versions of Bit components are stored. [Remote scopes](/scope/overview#remote-scope), either on [Bit.dev](https://bit.dev) or other self-hosted Bit servers, store exported components that are available to be used by other web projects.
A single server may host multiple scopes. Each of these scopes groups together components that are related to each other by function or purpose. Each scope naturally corresponds to a specific team of developers (and even non-developers).

You can host a Scope on your own server, or use the bit.dev platform (free for OSS and limited private usage). On top of hosting components, Bit.dev offers useful features for discoverability, documentation, collaboration, component registry, team management, security and more.

## Create a Bit.dev account

By default, Bit is connected to [bit.dev](https://bit.dev) as its default hosting provider. Run the `$ bbit login` command for Bit to open a login/sign-up form for a new personal account.

```shell
bbit login
```

:::note
Bit will look for an active session on bit.dev in your machine. If such is found, it will authenticate it automatically.
:::

Once an account has been created successfully, your terminal will greet you with the following message:

```sh
successfully added @bit as a scoped registry at /Users/<account>/.npmrc
success! logged in as <account name>
```

## Create a Remote Scope

Head over the [create scope](https://bit.dev/~create-collection) screen:

1. Choose your account name.
1. Type `demo-scope` as the scope name.
1. Select **Harmony** as "scope type".
1. Click on "Create".

<Image src="/img/create_scope.png" padding={10} width="60%" />
