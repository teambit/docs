---
id: migration
title: Migration
--- 

Bit v15 (Harmony) and Bit v14 are mutually incompatible. To take advantage of Harmony's new features and capabilities, you need to migrate your workspace and collections manually.

## Key Differences

First, let's go through the fundamental changes between the legacy version of Bit and Harmony:

**Component structure** - Harmony is opinionated when it comes to structuring components in the file system. Each component must be in its own directory.  
**Dependencies** - Harmony doesn't allow relative import statements between components. Each Bit component always has a local, compiled module in `node_modules` - use them for all Bit component import statements in your code.  
**Environments** - Harmony features a new approach for compilers/testers called [environments](building-with-bit/environments).  
**Configuration** - In harmony config is managed in a new file format - `workspace.jsonc`.  
**Module names** - In harmony we removed the `@bit` prefix, and instead components are now pre-fixed by `@<account_name>`.  
**Scopes** - Collections in v15 are called **Scopes**.  
**Documentation** - Component docs is now a local development workflow feature using MD/MDX formats.  
**Live playground** - Live component playground is now a local development workflow feature and not managed in [bit.dev](https://bit.dev)  

### New Features

One of the main leaps forward in Harmony is that it is extremely extendible - so Harmony's feature set is constantly expanding.  
That said, here's a sample of the major new features that have been introduced with Harmony:

* **Component Development Environments** Shareable components which contain configurations for the full component lifecycle, to both reduce environment setup time and to introduce component development standardization across the organization  
* **Documentation** Use `.docs.` files to document your components at source
* **Compositions** Use `.compositions.` files to demonstrate and illustrate your component with its variants and inside complex application contexts, all rendered as part of your component's documentation
* **Ripple CI** Propagating CI along the dependency tree, so you know how changes upstream will affect dependents, even before they adopt the changes

## Version Incompatibility

There are strict limitations regarding using both v14 and v15

* v14 components can't depend on v15 and vice-versa.
* v14 and v15 components can't live in the same scope.
* You must run two installations of Bit with different binary-names for using v14 and v15 simultaneously. [Learn more](/reference/using-bvm#using-v15-and-v14)
* You can't have the same local workspace with both v14 and v15 content in `.git/bit` directory.

## Moving from Legacy Bit to Harmony

Now that we've outlined the above, the major steps required to migrate components over from using legacy versions of Bit (14-) to Harmony are as follows (details for each below).

### Resetting a Bit Workspace

Harmony and legacy workspaces are mutually incompatible, and a repo ain't big enough for the two of them. So to now work in a Harmony workspace you have to reset your Bit workspace, as follows (we recommend cloning the current repo and Harmony-ising the clone):

1. If you are maintaining your legacy Bit workspace, clone your repository.
1. Create a new branch for Harmony migration.
1. Remove all bit-related files and directories from your project - `bit init --reset-hard`.
1. Initialise a Harmony bit workspace in your project - `bbit init --harmony`.

### Sort components and track

As v15 mandates a structure where components are directories, you may need to restructure the codebase to fit this rule. Once done, use `bbit add` to track components.

> Note that now each component in the workspace has a `node_module` with its component ID. Use it when importing components as dependencies.

### Configure the workspace

Our [workspace documentation](/building-with-bit/workspace) details exactly how to configure your `workspace.jsonc` file to set environments, dependency configurations and more, as required. It is important to configure `defaultScope` correctly in `variants`, as this defines the target remote scope for each component.

### Environments rather than Compilers

A major new introduction in Harmony is the [Component Development Environment](/building-with-bit/environments). While in the past you would select a single compiler, tester, etc for your entire workspace, now all component life-cycle processes (compilation, linting, testing, etc) are managed by the Environment, and all configurations for these environments are customizable.

What this means is that a first step for migrating over your components is setting up the development Environment - either by simply selecting the relevant [base Environment](/building-with-bit/environments#pre-built-environments) that Bit supplies (react, node, react-native for now), or by [extending these base Environments](building-with-bit/environments#customizing-environments) with your own configuration files (e.g. `tsconfig`).

### Render components and add docs

Once you have the components tracked in your Bit workspace and have configured the relevant environment for them in the workspace's variants section run:

```sh
bit start
```

This starts the local development server. See that components can render, add docs, compositions and live playground examples as needed.

## Export Harmony Components

It's recommended to start with creating a different set of scopes for this flow when you get started, as you can't create Harmony scopes with the same names as existing v14 collections.

### Create scopes

Head over to [bit.dev](https://bit.dev) and create the required set of scopes for your setup.

### Versioning

Versioning workflow works just the same. Use `bbit tag --all` to version your components and set them to be exported.

### Exporting

Export your components to their predefined scopes by running the `bbit export` command without setting a target scope.  
In Harmony the target scope is defined in `workspace.json` using `variants`, per the configuration step.
