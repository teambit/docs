---
id: installing-components
title: Installing Components
permalink: docs/installing-components.html
redirect_from:
  - "docs/install-components.html"
layout: docs
category: Getting Started
next: sourcing-components.html
---

Bit supports CommonJS API for consuming components as packages.

To install components with npm or yarn we first need to configure `@bit` as a scope registry. Bit does it by default as part of the `bit login` process.

## Configuring Bit as a scoped registry for NPM and Yarn

> **Note**
>
> Bit does this step automatically after a successful `bit login`.

To configure [scoped registry](https://docs.npmjs.com/misc/scope#associating-a-scope-with-a-registry) we use the `npm config` command.

```bash
npm config set '@bit:registry' https://node.bit.dev
```

To install private components use npm login. Use your Bit credentials to login.

```bash
npm login --registry=https://node.bit.dev --scope=@bit
```

To learn more about NPM scoped registries, please refer to [NPM's documentation](https://docs.npmjs.com/misc/scope#associating-a-scope-with-a-registry).

## Package naming convention

Package naming convention includes the Bit owner, Collection name and the component ID (including namespaces).  
For example:

```bash
yarn add <owner>.<collection>.<component-ID>
```

## Using a packaged component

After installing the component as a package, import/require it in the following format:

```js
import component from '@bit.<owner>.<collection>.<component-ID>';
```