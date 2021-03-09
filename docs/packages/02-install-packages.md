---
id: install-packages
title: Installing Packages
---

## Use installed component

Components are installed (as standard packages) using the `bit install` command.

```shell
$ bit install @scope-owner/scope-name.namespace.component-id
```

Once installed, the component can be found in the workspace `node_modules` directory and used as any other package/

```javascript
import { ComponentName } from '@scope-owner/scope-name.namespace.component-name';
```

To modify a component, [import](/modifying-sourced-components) it first into your workspace.

## Configuring bit registry

Bit supports CommonJS API for consuming components as packages.

To install components with npm or yarn we first need to configure the scope owner name as a [scoped registry](https://docs.npmjs.com/misc/scope#associating-a-scope-with-a-registry) (for example `@my-org`). Bit does it by default as part of the `bit login` process.

To configure the registry manually, use the `npm config` command.

```shell
npm config set @scope-owner:registry https://node.bit.dev
```

To install private components use npm login. Use your Bit credentials to login.

```shell
npm login --registry=https://node.bit.dev --scope=@scope-owner
```

## Installing all Components

To install dependencies for all imported components, use:

```shell
bit install
```

Add the `--verbose` flag to get detailed output.

You can also install dependencies for a specific component:

```shell
bit install foo/bar
```

If you need to pass extra arguments to npm or yarn, use double dash `--`, and after it add the additional arguments:

```shell
bit import -- --production --no-optional
```
