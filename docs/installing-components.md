---
id: installing-components
title: Installing
---

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

## Package names

Package naming convention includes the Bit owner, Collection name and the component ID (including namespaces).  
For example:

```bash
yarn add <owner>.<collection>.<component-ID>
```

After installing the component as a package, import/require it in the following format:

```js
import component from '@bit/<owner>.<collection>.<component-ID>';
```

## Installing Components

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
