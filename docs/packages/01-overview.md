---
id: overview
title: Overview
---
Bit components can be thought of as a super-set of standard packaged node modules. Each component contains a consumable package in addition to its documentation, history, Bit configurations and more. 

Components are not only consumed as standard packages but can also be [published to NPM](/docs/packages/publish-to-npm) or any other package registry (in addition to being 'exported' to a remote scope on a bit server).

Each component package configurations is determined by its environment and by the `workspace.jsonc` configuration file.

Bit offers two package managers (encapsulated in a "Bit aspect wrapping"): `teambit.dependencies/yarn` and `teambit.dependencies/pnpm`. Package managers are used and directed by the [`@teambit.depndencies/dependency-resolver`](/docs/dependencies/overview) aspect. To configure it to use your package manager of choice, set the package manger (in the `dependency-resolver` field in the `workspace.jsonc` configuration file). 

For example:

```json
"teambit.dependencies/dependency-resolver": {
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {}
}
```