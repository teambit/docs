---
id: installing-components
title: Installing
---

## Use installed component

To use a component, you can use the `bit install`  command or a package manager installation: 

```bash
npm install @bit/owner.collection.namespace.namespace.comp-id
or
yarn add @bit/owner.collection.namespace.namespace.comp-id
```

Once installing the component, the component resides in the  `node_modules` directory.  

To use the component in the code, import the code as follow:  

```bash
import { something } from '@bit/owner.collection.namespace.namespace.comp-id';
```

If you want to modify the code of the component, you should [import](/docs/modifying-sourced-components) the component into your workspace. After modifying the component and re-exporting the change, you can revert to the pacakge mode by using the [`bit eject`](/docs/apis/cli-all#eject) command.  

## Configuring bit registry

Bit supports CommonJS API for consuming components as packages.

To install components with npm or yarn we first need to configure `@bit` as a [scoped registry](https://docs.npmjs.com/misc/scope#associating-a-scope-with-a-registry). Bit does it by default as part of the `bit login` process.

To configure the registry manually, use the `npm config` command.

```bash
npm config set '@bit:registry' https://node.bit.dev
```

To install private components use npm login. Use your Bit credentials to login.

```bash
npm login --registry=https://node.bit.dev --scope=@bit
```

## Installing all Components

To install dependencies for all the imported components use:

```bash
bit install
```

Add the `--verbose` flag to get detailed output.  

You can also install dependencies for a specific component:

```bash
bit install foo/bar
```

If you need to pass extra arguments to npm or yarn, use double dash `--`, and after it add the additional arguments:  

```bash
bit import -- --production --no-optional
```
