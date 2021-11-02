---
id: remote-scope
title: Creating a Remote Scope
---

import CreateBitAccount from '@site/docs/components/remote-scopes/create-bit-account.md'
import CreateRemoteScope from '@site/docs/components/remote-scopes/create-remote-scope.md'
import DefaultScopeName from '@site/docs/components/workspace/default-scope-name.md'
import ResetDevServer from '@site/docs/components/workspace/reset-dev-server.md'
import QuickGuide from '@site/docs/components/quick-guide.md'

You can create a remote scope before or after [initializing a Bit workspace](initializing-workspace).

## Quick Guide

<QuickGuide />

1. Create an account on [Bit.dev](https://bit.dev/) and login

```bash
bit login
```

2. Create a new scope on [Bit.dev](https://bit.dev/)
3. Update your default scope in the `workspace.jsonc` file with the name of your scope

---

## What is a Scope?

[Scope](/essentials/scopes) is a virtual storage for components. Bit uses Scopes to save versions of [Bit Components](/essentials/components) and access them as needed. Set Remote scopes on [Bit.dev](https://bit.dev) or self-hosted Bit servers to share components.

---

## Create a Bit.dev account

<CreateBitAccount />

---

## Create a Remote Scope

<CreateRemoteScope />

<br />

<!-- :arrow_right: Learn more about [Setting up a Remote Scope](/building-with-bit/scoping-components).

:arrow_right: Learn more about [Self Hosting a Bit Scope](/reference/bit-oss-server). -->

---


Now in our node modules we can see we have these components under the correct scope.

## Updating the Default Scope

Once you have setup a [remote scope](/getting-started/remote-scope) you may need to configure the `workspace.jsonc` to reflect the correct username and scope.

<DefaultScopeName />

---

### Linking your Node Modules

As we have changed the default scope we now need to make sure our node modules are linked correctly. We can do that with the `bit link` command.

```jsx
bit link
```
### Resetting the Dev Server

<ResetDevServer />

---

## What's Next?

Once you have created your remote scope and configured your defaultScope you can then create more components, compose components or [export your components](exporting-components) to the remote scope so they can be published and installed in other Bit workspaces or in other web projects.
