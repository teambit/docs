---
id: migration
title: Migration
--- 

## Migrating components from bit v14- to Harmony

Harmony and pre-Harmony components and scopes (aka collections) are mutually incompatible. So how do you migrate over your pre-Harmony bit components to Harmony and take advantage of all the great new features. Well, here's how.

### Environments rather than Compilers

A major new introduction in Harmony is the [Component Development Environment](/building-with-bit/environments). While in the past you would select a single compiler, tester, etc for your entire workspace, now all component life-cycle processes (compilation, linting, testing, etc) are managed by the Environment, and all configurations for these environments are customizable.

What this means is that a first step for migrating over your components is setting up the development Environment - either by simply selecting the relevant base Environments that Bit supplies (react, node, react-native for now - Angular, Vue etc coming soon!), or by extending these base Environments by customizing configurations, e.g. by adding your own tsconfig.

See this basic example for how to do that - and then use our built-in templates to make your own customized environment.

The process of migrating over to Harmony mostly involves in getting to know how Harmony manages and processes your components - i.e. in understanding how to use and configure Harmony’s development environments.
These development environments manage the full lifecycle of your components, so if in the past you would have imported a compiler, and then a tester, etc in order to compile and test your component, now you only associate an Environment with your components (via various groupings you can set on your workspace), and then this environment compiles, tests, lints, transpiles, builds etc your component. Environments are also bit components, so can be shared around your organisation as a way to standardise all the steps of development.
The environments come with default configurations for all of the above, and we currently have 3 base compilers - node, react and react-native.
All the configurations can be overriden, and once they are you have an environment setup you need to process all the lifestyle processes (test, compile, build etc) for your Bit components via with Harmony.
Adding components in Harmony is the same as legacy - bit add <component_location> - however with Harmony, as Gilad mentioned, you must have each component in its own directory (it can of course contain sub-directories, which are all part of that component’s code - it just cant be a single/collection of standalone files).
So the process of migrating to Harmony, including an estimate of how long each stage would take:
Ensuring all your components are inside their own directory - only files inside that directory can be included in the component (a minute or two per component that needs refactoring)
Environment setup - minutes if you’re using a base bit Environment (react, react-native or node - Angular etc coming v soon), up to a couple of hours if you’re creating a customised env with your own configs (via bit’s built-in templates, e.g. for react env customisation)
Adding components to your Harmony workspace - around 30 seconds per component, or per component group if adding as groups.
Associating environments to components - a few minutes to set and adjust the workspace config
Configure destination scopes for various components - same as 4
Running tests (jest only currently, mocha and others coming soon) - single command bit test, will take as long as tests take to run :slightly_smiling_face:
Tagging - single command bit tag --all for all the new components. Can take up to 15 minutes to process for large numbers of components
Export - single command bit export which will export your components to their various remote scopes/collections. Usually a few minutes at most to process.
That seems like a lot of stages, but most of them are either one-time setups (and wont need to be done for future components added) or single commands to process your entire library of components.
I’d expect that a library of your size would take 2-3 days to port over to Harmony, taking into account unexpected errors and the such.
