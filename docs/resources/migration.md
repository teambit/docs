---
id: migration
title: Migration
--- 

## Migrating components from Bit v14- to Harmony

Harmony and pre-Harmony components and scopes (aka collections) are mutually incompatible. So how do you migrate over your pre-Harmony bit components to Harmony and take advantage of all the great new features? 

Here's how.

## What's changed

First let's go through the fundamental changes between legacy version of Bit and Harmony:

**Component structure** - Harmony is opinionated when it comes to structuring components in the file-system. Now each component must be in its own directory, so you'll potentially have to move some files around to suit this new requirement.   
**Dependencies** - Harmony doesn't allow relative import statements between components. Each Bit component always has a local, compiled module in node_modules - use them for all Bit component import statements in your code.  
**Environments** - Harmony features a new approach for compilers/testers/etc called environments. Take the base environment per your component's stack (react, node, react-native) and customize it to fit any specific configuration requirement.  
**Configuration** - In harmony config is managed in a new file format - `workspace.jsonc` and not in your `package.json`.  
**Module names** - In harmony we removed the @bit prefix, and instead components are now pre-fixed by @<account_name>. Your import statements are likely to need updating.  


### Moving from Legacy Bit to Harmony

Now that we've outlined the above, the major steps required to migrate components over from using legacy versions of Bit (14-) to Harmony are as follows (details for each below).

:::note Install Harmony via the new BVM tool
Check out installation instructions [here](/getting-started/installing-bit), including simulataneously running both legacy and Harmony versions of bit on your computer 
:::

1. Reset your bit workspace to be a Harmony workspace - if you would like to maintain your legacy workspace as well (recommended), then you'll need to create a fresh clone of the project before resetting
1. Copy over the component code, making sure all components files are contained under a single directory, including the entry file into your component. Then track the components with Bit, in much the same way you would with previous Bit versions.
1. Configure your workspace, specifically the variant/s section to create rules e.g. for mapping the relevant environment (built-in or customized) to your components
1. Configure your Bit development environment (or just use one of Bit's built-in environments)
1. Track your components - `bit add <path_of_component_root_folder>`
1. Tag your component = `bit tag <component_id>` or `bit tag --all`  (this will also build the component and check that it is fully isolated)
1. Export your component to your Harmony scope (collection) on bit.dev. 

:::note Harmony components can only be exported to Harmony scopes
Make sure to create your Harmony scope/s on bit.dev as required and map your components to the relevant remote scope via the workspace configuration **before** exporting your ported components
:::

Those are the major high-level steps that are required for the migration, we'll elaborate on them below. 

In general Harmony works differently under the hood to legacy Bit versions, so some tinkering may be required with configurations such as compiler configs or dependency resolution rules. But in the main, any issues you may come across are likely to be documented either in the general [Harmony docs](https://harmony-docs.bit.dev/), on our [community slack](https://join.slack.com/t/bit-dev-community/shared_invite/zt-o2tim18y-UzwOCFdTafmFKEqm2tXE4w) or on [github](https://github.com/teambit/bit/issues).


## The Detail

### Resetting a Bit Workspace

Harmony and legacy workspaces are mutually incompatible, and a repo aint big enough for the two of them. So in order to now work in a Harmony workspace you have to reset your Bit workspace as follows (we recommend cloning the current repo and Harmony-ising the clone):
1. If you are maintaining your legacy Bit workspace, clone your repository 
1. Remove all bit-related files and directories from your project - `bit init --reset-hard`. This will remove any legacy bit configurations and files.
1. Initialise a Harmony bit workspace in your project - `bit init --harmony`

### Porting over components

This stage should mainly be a simple copy-paste job - see [here](/building-with-bit/pre-existing-components#add-pre-existing-components) for details of adding existing components and basic requirements that Harmony has introduced for component structure.

### Configure the workspace

Our [workspace documentation](/building-with-bit/workspace) details exactly how to configure your `workspace.jsonc` file to set environments, dependency configurations and more as required.


### Environments rather than Compilers

A major new introduction in Harmony is the [Component Development Environment](/building-with-bit/environments). While in the past you would select a single compiler, tester, etc for your entire workspace, now all component life-cycle processes (compilation, linting, testing, etc) are managed by the Environment, and all configurations for these environments are customizable.

What this means is that a first step for migrating over your components is setting up the development Environment - either by simply selecting the relevant [base Environment](/building-with-bit/environments#pre-built-environments) that Bit supplies (react, node, react-native for now - Angular, Vue etc coming soon!), or by [extending these base Environments](building-with-bit/environments#customizing-environments) by customizing configurations, e.g. by adding your own `tsconfig`.


Once you have the components tracked in your Bit workspace and have configured the relevant environment for them in the workspace's variants section, you should now be able to compile, tag and export them much as you would have with previous versions of Bit, as listed in earlier in this page - though it's not all 100% the same, so it's worth going through the Harmony intro docs to make sure you're familiar with what's changed (and what hasn't). 
And now you have a whole raft of new features at your disposal - not least the local development UI, try it by running `bit start`!


## New Features in Harmony

Why go through all the trouble? you may ask yourself. Well, here's just a sample of the added features that Harmony provides, and the list is ever growing.

One of the main leaps forward we've made with Harmony is that it is extremely extendible - both by ourselves and by users themselves - so Harmony's feature set is constantly expanding.
That said, these are the major new features that have been introduced with Harmony:
- **Component Development Environments** Shareable components which contain the configurations for the full component lifecycle, to both reduce setup time and to introduce component development standardization across the organization  
- **Documentation** Use `.docs.` files to document your components at source
- **Compositions** Use `.compositions.` files to demonstrate and illustrate your component with its variants and inside complex application contexts, all rendered as part of your component's documentation
- **Ripple CI** Propagating CI along the dependency tree, so you know how changes upstream will affect dependencies, even before they adopt the changes