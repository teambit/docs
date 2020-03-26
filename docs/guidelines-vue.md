---
id: vue-guidelines
title: Vue Guidelines
sidebar_label: Vue
---

> **Vue support is in public beta.** Known issues:  
> Playground does not support specific webpack configuration such as Vuetify. 

Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds vue specific best practices on top of [Bit's general Best Practices](/docs/best-practices.html).

Vue playground was tested on vue 2 and vue-cli 3. Bit should be compliant with prior versions.

*Note: Try the [Bit for Vue tutorial](https://docs.bit.dev/docs/tutorials/bit-vue-tutorial)*.

## Vue Compiler

The Bit vue compiler can be found [here](https://bit.dev/bit/envs/compilers/vue).  
The compiler is generating a [Vue library](https://cli.vuejs.org/guide/build-targets.html#library). The pacakge.json reference the compiled files as follow:  

- The main file is pointing to a commonjs format.  
- The browser entry is pointing to the UMD format.  

To install it in your project run:  

```bash
$bit import bit.envs/compilers/vue --compiler
the following component environments were installed
- bit.envs/compilers/vue@0.0.7
```

## Vue Tester

Each Bit component may be linked with a tester that will run the unit tests of the compiler. Vue testers are still WIP.  

## Sharing Components with VueX

Read [here](/docs/best-practices#state-managers) for suggestion on how to share components that use state managers.  

## Handling Assets and Styles

Refer to the general guidelines on how to [handle assets](/docs/best-practices#handling-assets) amd [styles](/docs/best-practices#handling-styles).
