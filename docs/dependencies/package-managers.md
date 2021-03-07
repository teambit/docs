---
id: package-managers
title: Package managers
---

The Dependency Resolver extension does not replace package managers - it uses them and directs them.
To choose between 'Yarn' and 'pnpm', set the packageManager property to either of the two:

- [`teambit.dependencies/yarn`](https://bit.dev/teambit/dependencies/yarn)
- [`teambit.dependencies/pnpm`](https://bit.dev/teambit/dependencies/pnpm)

```json title="At the root-level of the workspace configuration JSON (workspace.jsonc)"
{
  "teambit.dependencies/dependency-resolver": {
    "packageManager": "teambit.dependencies/yarn"
  }
}
```

:::caution A single workspace can only use a single package manager
Package manager are only configurable at th workspace configuration root-level. That means, different components in the same workspace cannot use different package manager.
:::

:::caution Do not use pnpm with React Native
pnpm cannot be used with the React Native environment.
:::

:::note pnpm's deduping algorithm
The pnpm aspect uses Bit's deduping algorithm (not pnpm's).
It searches for a common version that satisfies most components using the same dependency (taking into consideration permitted version ranges configured for each component) and installs it at the workspace root directory, where it can be shared by multiple dependent components.
Versions that are used by a minority of components will be installed nested in each component directory.
:::