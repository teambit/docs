---
id: workspace-configuration
title: Workspace Configuration
---

import ReactEnvironment from '@site/docs/components/workspace/react-environment.md'

import DefaultScopeName from '@site/docs/components/workspace/default-scope-name.md'

## Setting the Default Scope Name

Once you have your account setup on [Bit.dev](https://bit.dev/) and have created a remote scope you will need to set this in your workspace.jsonc so that you can add your components to your remote workspace.

<DefaultScopeName />

## Setting the React Environment

<ReactEnvironment />

### Reset your dev server

Any change in the `workspace.jsonc` file requires a restart of the local dev-server. We can stop our server using (Ctl/cmd + c) and run it again using the start command.

```shell
bit start
```
