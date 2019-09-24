---
id: vue-guidelines
title: Vue Guidelines
---

> **Vue support is in public beta.**  
> Everything should work fine, but please do share any issues and feedback: support@bit.dev

Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds vue specific best practices on top of [Bit's general Best Practices](/docs/best-practices.html).

vue sharing was tested on vue 2 and vue-cli 3. Bit should be compliant with prior versions.

## Vue Compiler

Each Bit component is linked with a compiler. The Bit compiler is compiling or transpiling the source code to build files that can run in another project.
The officially supported vue Compiler can be found [here](https://bit.dev/bit/envs/compilers/vue). This compiler is based on the [ng-packagr project](https://github.com/ng-packagr/ng-packagr), the same project used by vue CLI to build vue libs. The compiler is compiling the vue typescript to AOT (Ahead of Time) code. The build results are in the vue Package Format (APF), for smooth importing into any vue project.

The practices described bellow are aimed to work best with this Bit team compiler.  

## Use symlinks false in target project

When importing components, Bit is using symlinks to point to the component location (similar to npm link). In order to compile the application, you need to enhance the bit webpack configuration to properly work with symlinks.  

If you do not have a webpack configuration in your project, add a new file `vue.config.js` with the following configuration:  

```js
module.exports = {
    configureWebpack: {
        resolve: {
            symlinks: false // support npm link
        },
    }
}
```

If you already have a configuration, you just need to add the relevant key in the proper place. This tells Vue webpack to retain the symlinks.

## vue Tester

Each Bit component may be linked with a tester that will run the unit tests of the compiler. vue testers are still WIP.  
