---
id: package-managers
title: Package Managers
---

Bit's [Package Manager Aspect](package-manager/overview) encapsulates [Yarn](yarn/overview), [pnpm](pnpm/overview), [NPM](npm/overview) or any other [supported CommonJS package manager](package-manager/) using the `bit install` command. 

For package managers to work properly, Bit uses Workspace features such as [Yarn Workspaces](/) or [NPM Workspaces](/) that allow the installation of independent components with conflicting dependencies on the same [Workspace](workspace/overview).

Package Managers such as Yarn, pnpm and NPM In Bit are responsible for `node_modules` installation. Bit works with any of them, making sure to interact with their latest APIs, deduping component dependencies properly prior to `node_modules` installation.

## Deduping of dependencies
Bit handles depuping of component dependencies in the [Workspace](/workspace/overview). This means every component can be resolved with a different version of a specific package in case of conflicts in Component versions between different Workspace Components.

// @gilad to complete

```bash
├── base-ui
    ├── ui
        ├── button
          ├── node_modules -> created in case of conflicts in Component versions between different Workspace Components
          ├── index.ts
          ├── button.ts
          ├── button.spec.ts
          ├── button.docs.md
          ├── ...
    ├── hooks
        ├── use-product
          ├── index.ts
          ├── use-product.ts
          ├── button.spec.ts
          ├── button.docs.md
          ├── ...
├── ecommerce
    ├── ui
        ├── button
          ├── node_modules -> created in case of conflicts in Component versions between different Workspace Components.
          ├── index.ts
          ├── button.ts
          ├── button.spec.ts
          ├── button.docs.md
          ├── ...
├── ...
```


## Yarn
Bit supports Yarn 2.0, and uses Yarn Workspaces to make sure proper deduping between components.

## pnpm

## NPM (coming soon)

Clarifying things