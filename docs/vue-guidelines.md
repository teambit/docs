---
id: vue-guidelines
title: vue Guidelines
permalink: docs/vue-guidelines.html
layout: docs
category: tutorials
---

> **Vue support is in public beta.**  
> Everything should work fine, but please do share any issues and feedback: support@bit.dev

Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds vue specific best practices on top of [Bit's general Best Practices](/docs/best-practices.html).

vue sharing was tested on vue 8 version and requires Node 10.9+ which is vue 8 pre requisite. Bit should be compliant with prior versions that are ng-packagr compliant.

## Vue Compiler

Each Bit component is linked with a compiler. The Bit compiler is compiling or transpiling the source code to build files that can run in another project.
The officially supported vue Compiler can be found [here](https://bit.dev/bit/envs/compilers/vue). This compiler is based on the [ng-packagr project](https://github.com/ng-packagr/ng-packagr), the same project used by vue CLI to build vue libs. The compiler is compiling the vue typescript to AOT (Ahead of Time) code. The build results are in the vue Package Format (APF), for smooth importing into any vue project.

The practices described bellow are aimed to work best with this Bit team compiler.  

## vue Tester

Each Bit component may be linked with a tester that will run the unit tests of the compiler. vue testers are still WIP.  

## Use symlinks false in target project


## Add vue Libraries as Peer Dependencies

In the origin project, the vue run time dependencies (`@vue/core`, `@vue/common` etc.) should be defined both as project dependencies and project peer dependencies.

vue cannot run when multiple instances of the vue runtime libraries exist, the vue dependencies should be defined as peer dependencies. When Bit extracts component dependencies, peer dependencies get higher priority, and the @vue libraries will be defined as peer dependencies, even if they are also defined as dependencies.

