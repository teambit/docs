---
id: remote-scope
title: Creating a Remote Scope
---

import CreateBitAccount from '@site/docs/components/remote-scopes/create-bit-account.md'
import CreateRemoteScope from '@site/docs/components/remote-scopes/create-remote-scope.md'
import DefaultScopeName from '@site/docs/components/workspace/default-scope-name.md'
import ResetDevServer from '@site/docs/components/workspace/reset-dev-server.md'

You can create a remote scope before or after [initializing a Bit workspace](initializing-workspace).

## What is a Scope?

A scope is where the release versions of Bit components are stored. Remote scopes, either on [Bit.dev](https://bit.dev) or other self-hosted Bit servers, store exported components that are available to be used by other web projects.

## Create a Bit.dev account

<CreateBitAccount />

## Create a Remote Scope

<CreateRemoteScope />

<br />

<!-- :arrow_right: Learn more about [Setting up a Remote Scope](/building-with-bit/scopes).

:arrow_right: Learn more about [Self Hosting a Bit Scope](/building-with-bit/scopes). -->

## Updating the Default Scope

Once you have setup a [remote scope](remote-scope) you may need to configure the `workspace.jsonc` to reflect the correct username and scope.

<DefaultScopeName />

### Resetting the Dev Server

<ResetDevServer />

## What's Next?

Once you have created your remote scope and configured your defaultScope you can then create more components, compose components or [export your components](/exporting-components) to the remote scope so they can be published and installed in other Bit workspaces or in other web projects.
