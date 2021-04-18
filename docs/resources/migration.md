---
id: migration
title: Migration
--- 

## Migrating components from bit v14- to Harmony

Harmony and pre-Harmony components and scopes (aka collections) are mutually incompatible. So how do you migrate over your pre-Harmony bit components to Harmony and take advantage of all the great new features? Well, here's how.

### Moving from Legacy Bit to Harmony

There are 3 major steps required to migrate components over from using legacy versions of Bit (14-) to Harmony.

1. Configure your Harmony [Component Development Environment](/building-with-bit/environments)(s) with the compiler, tester, etc configurations (most likely, with those you used when using legacy Bit). If you don't have any complex configurations, it's worth starting with one of our base Environments, which may just do the job out of the box. 
Understanding and configuring (where required) Environments is the central learning curve when using Bit - once the environment is configured correctly, the component life-cycle essentially takes care of itself.
1. Copy over the component code, making sure all components files are contained under a single directory, inside which is the entry file into your component. Then track the components with Bit, in much the same way you would with previous Bit versions.
1. Configure your workspace, specifically the variant/s section to create rules for mapping the relevant environment (built-in or customized) to your components

Those are the major high-level steps that are required for the migration, which we'll elaborate on below. 
In general Harmony works differently under the hood to legacy Bit versions, so some tinkering may be required with configurations such as compiler configs or dependency resolution rules. But in the main, issues you may come across are likely to be documented either in the general [Harmony docs](https://harmony-docs.bit.dev/), on our [community slack](https://join.slack.com/t/bit-dev-community/shared_invite/zt-o2tim18y-UzwOCFdTafmFKEqm2tXE4w) or on [github](https://github.com/teambit/bit/issues).

Once you have the components tracked in your Bit workspace and have configured the relevant environment for them in the workspace's variants section, you should now be able to compile, tag and export them much as you would have with previous versions of Bit - though it's not all 100% the same, so it's worth going through the Harmony intro docs to make sure you're familiar with what's changed (and what hasn't). 
And now you have a whole raft of new features at your disposal - not least the local development UI, try it by running `bit start`!

:::note Harmony components can only be exported to Harmony scopes
Make sure to create your Harmony scope/s on bit.dev as required and map your components to the relevant remote scope via the workspace configuration **before** exporting your ported components
:::

## More Detail

### Environments rather than Compilers

A major new introduction in Harmony is the [Component Development Environment](/building-with-bit/environments). While in the past you would select a single compiler, tester, etc for your entire workspace, now all component life-cycle processes (compilation, linting, testing, etc) are managed by the Environment, and all configurations for these environments are customizable.

What this means is that a first step for migrating over your components is setting up the development Environment - either by simply selecting the relevant [base Environment](/building-with-bit/environments#pre-built-environments) that Bit supplies (react, node, react-native for now - Angular, Vue etc coming soon!), or by [extending these base Environments](building-with-bit/environments#customizing-environments) by customizing configurations, e.g. by adding your own tsconfig.


### Porting over components

This stage should mainly be a simple copy-paste job - see [here](/building-with-bit/pre-existing-components#add-pre-existing-components) for details of adding existing components and basic requirements that Harmony has introduce for component structure.

### Configure the workspace

Our [workspace documentation](/building-with-bit/workspace) details exactly how to configure your `workspace.jsonc` file to set environments, dependency configurations and more as required.


## New Features in Harmony

One of the main leaps forward we've made with Harmony is that it is extremely extendible - both by ourselves and by users themselves - so Harmony's feature set is constantly expanding.
That said, these are the major new features that have been introduced with Harmony
- **Component Development Environments** Shareable components which contain the configurations for the full component lifecycle, to both reduce setup time and to introduce component development standardization across the organization  
- **Documentation** Use `.docs.` files to document your components at source
- **Compositions** Use `.compositions.` files to demonstrate and illustrate your component with its variants and inside complex application contexts, all rendered as part of your component's documentation
- **Ripple CI** Propagating CI along the dependency tree, so you know how changes upstream will affect dependencies, even before they adopt the changes