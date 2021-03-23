---
id: remote-scope
title: Creating a Remote Scope
---

import { Image } from '@site/src/components/image';

A scope is where the release versions of Bit components are stored. [Remote scopes](aspects/scopes/overview#remote-scope), either on [Bit.dev](https://bit.dev) or other self-hosted Bit servers, store exported components that are available to be used by other web projects.

## Create a Bit.dev account

By default, Bit is connected to [bit.dev](https://bit.dev) as its default hosting provider. Run the `bit login` command for Bit to open a login/sign-up form for a new personal account.

```shell
bit login
```

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

<Image src="/img/create_scope_new.png" padding={10} width="60%" />