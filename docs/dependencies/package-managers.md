---
id: package-managers
title: Package Managers
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

:::note A single workspace may use only a single package manager
Package manager are only configurable at th workspace configuration root-level. That means, different components in the same workspace cannot use different package manager.
:::

:::note Installing packages available on npm
Packages on npm will be installed from Bit.dev's registry instead of NPM's. This will be done using the user's Bit credentials.
:::

## pnpm

:::caution Do not use pnpm with React Native
pnpm cannot be used with the React Native environment.
:::

:::note pnpm's deduping algorithm
The pnpm aspect uses Bit's deduping algorithm (not pnpm's).
It searches for a common version that satisfies most components using the same dependency (taking into consideration permitted version ranges configured for each component) and installs it at the workspace root directory, where it can be shared by multiple dependent components.
Versions that are used by a minority of components will be installed nested in each component directory.
:::

## Yarn

:::note Yarn v2
Yarn is a Bit aspect that enables the use of the Yarn **v2** package manager in a Bit workspace (the Yarn aspect utilizes Yarn's programmatic API).
:::