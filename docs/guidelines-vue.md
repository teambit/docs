---
id: vue-guidelines
title: Vue Guidelines
sidebar_label: Vue
---

> **Vue support is in public beta.** Known issues:  
> Playground does not support specific webpack configuration such as Vuetify.

Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds vue specific best practices on top of [Bit's general Best Practices](/docs/best-practices.html).

Vue playground was tested on vue 2 and vue-cli 3. Bit should be compliant with prior versions.

_Note: Try the [Bit for Vue tutorial](https://docs.bit.dev/docs/tutorials/bit-vue-tutorial)_.

## Vue Compiler

The Bit vue compiler can be found [here](https://bit.dev/bit/envs/compilers/vue).  
The compiler is generating a [Vue library](https://cli.vuejs.org/guide/build-targets.html#library). The pacakge.json reference the compiled files as follow:

- The main file is pointing to a commonjs format.
- The browser entry is pointing to the UMD format.

To install it in your project run:

```shell
$bit import bit.envs/compilers/vue --compiler
the following component environments were installed
- bit.envs/compilers/vue@0.0.7
```

## Styling components

This technique is useful when you want to create a customized theme based on some standard UI library. The example is using Bootstrap, but the same method can apply to other UI libraries (Bulma, Element, etc.)
In the authoring environment (such as the design library), create CSS files customized to your needs.  
For example, you can create customized colors:

```css
# styles/variables.scss
$primary:                    #42a17d;
$secondary:                  #434352;
```

Create a global css file that contains the global styles:

```css
# styles/global.scss
@import url('https://fonts.googleapis.com/css?family=Comic+Neue:100,300,400,500,600,700&display=swap');
font-family: 'Comic Neue', cursive;
@import "~bootstrap/scss/_variables.scss";
@import "./variables.scss";
```

> Note that partials (files starting with `_`) are included with the actual name, including the `_`.

Create an index file that imports the global variables:

```javascript
//styles/index.js
export * from './global.scss';
```

Add the files as a Bit component:

```shell
bit add styles/index.js styles/global.scss styles/variables.scss --main styles/index.js --id styles
```

The command above creates a component called styles with all the different styles included in it.

Next, tag and export your component. Let's assume we exported to a user called "me" and to a scope called "my".

To include all the styles in your consuming application, import the component in your main.js:

```javascript
//main.js
import '@bit/me.my.styles';
```

To use a variable in one of the components in the consuming application:

```html
<style lang="scss">
  @import '~@bit/me.my.styles/variables';
  #app {
    background: $primary;
  }
</style>
```

You canso Refer to the general guidelines on how to [handle assets](/docs/best-practices#handling-assets) and [styles](/docs/best-practices#handling-styles) for more information.

## Vue Tester

Each Bit component may be linked with a tester that will run the unit tests of the compiler. Vue testers are still WIP.

## Sharing Components with VueX

Read [here](/docs/best-practices#state-managers) for suggestion on how to share components that use state managers.
