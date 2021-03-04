---
id: bit-account
title: Set Up a Bit.dev Account
---
import { Image } from '../../src/components/image';

When working with Bit, we use remote Scopes in order to share and collaborate on components across projects and teams.  

You can host a Scope of components locally on any server, or use the bit.dev platform (free for OSS and limited private usage). On top of hosting components, Bit.dev offers useful features for discoverability, documentation, collaboration, component registry, team management, security and more.  

To keep things simple we'll use Bit.dev for this tutorial. Let's create a new account and set up a Scope on Bit.dev! This Scope will be set as our default scope by bit, for all the components we are about to add to our workspace. Later, we will export our components to the scope we now create.


:::info Skipping this step

**We do not recommend skipping this step**. Still, you can choose to skip this step and not sign up to Bit.dev. Everything in your local workspace will still work normally and you can continue the tutorial. But, before you export your components, you will still have to create a remote Scope on Bit.dev or choose to create and host your own remote Scope. Then, you will have to go back and [configuere your remote Scope as the default Scope in your workspace](https://harmony-docs.bit.dev/scope/set-up-remote-scope#configure-remotes-scopes-in-the-workspace). For simplicity we recommend following this step first so Bit can automate everything for you.
:::

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

A scope is where the release versions of Bit components are stored. [Remote scopes](/docs/scope/overview#remote-scope), either on [Bit.dev](https://bit.dev) or other self-hosted Bit servers, store exported components that are available to be used by other web projects.
A single server may host multiple scopes. Each of these scopes groups together components that are related to each other by function or purpose. Each scope naturally corresponds to a specific team of developers (and even non-developers).

Head over the [create scope](https://bit.dev/~create-collection) screen:

1. Choose your account name.
1. Type `demo-scope` as the scope name.
1. Select **Harmony** as "scope type".
1. Click on "Create".

<Image src="/img/create_scope.png" padding={10} width="60%" />
