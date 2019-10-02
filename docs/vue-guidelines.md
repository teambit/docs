---
id: vue-guidelines
title: Vue Guidelines
---

> **Vue support is in public beta.**  
> Everything should work fine, but please do share any issues and feedback: support@bit.dev

Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds vue specific best practices on top of [Bit's general Best Practices](/docs/best-practices.html).

vue sharing was tested on vue 2 and vue-cli 3. Bit should be compliant with prior versions.

## Vue Compiler

Each Bit component is linked with a compiler. The Bit compiler is transpiling and bundling the source code to build files that can run in another project.  
The officially supported vue Compiler can be found [here](https://bit.dev/bit/envs/bundlers/vue).  
To install it in your project run:  

```bash
$bit import bit.envs/bundlers/vue --compiler
the following component environments were installed
- bit.envs/bundlers/vue@2.6.10
```

The compiler is based on the Vue webpack configuration. Check out the exact configuration [here](https://bit.dev/bit/envs/bundlers/vue/~code#webpack.config.js).

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

## Vue Tester

Each Bit component may be linked with a tester that will run the unit tests of the compiler. vue testers are still WIP.  
