--- 
id: scoped-registry
title: Scoped Registry
---

To install components with npm or yarn you might need to configure @YourScopeName as a [scoped registry](https://docs.npmjs.com/misc/scope#associating-a-scope-with-a-registry).

```shell
npm config set '@YourScopeName:registry' https://node.bit.dev
```