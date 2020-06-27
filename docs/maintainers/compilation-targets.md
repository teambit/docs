---
id: compilation-targets
title: Component compilation
---

## Component compilation

Components should only be compiled to a reusable target a bundler can consume. This process has several benefits:

- No bundled duplicate dependencies.
- No loss of data (CSS classes turned to hash).
- Enhances bundler features like tree-shaking and code splitting.

If we accept this reasoning, the ideal target format for components is - **ESM2015**.

### How Bit handles shared styles and assets

It is essential to understand how component sharing works with the different techniques of styling in Web development. Each technique affects the consumer differently.

#### Native CSS

This method refers to having a basic .css file alongside the component. While there are inherent issues with the global scope, which makes it inadvisable for styling components, some projects still prefer this method.

When such method is used, the consuming app should handle it by bundling the .css files of its dependencies. This is why when an Environment finds this type of file, it merely copies it and ships it with the transpiled output of the component.

#### Style pre-processors and CSS Modules

This method refers to using CSS transpilers like Less, Sass and Scss. Using such tools is very helpful, as different bundlers can use these styles to create vars, scoped classes, and other features. This styling method, much like the way native CSS works, needs to be managed by the consuming project's bundler. This is usually done by configuring a specific plugin that handles the type of pre-processor.

#### CSS in JS

CSS-in-JS is a methodology that uses Javascript objects which describe the different styles. It styles the component during runtime, while the JavaScript code is being evaluated. Components designed using this method should be handled like any other JavaScript code. Unlike the previously discussed styling options, here, the consumer does not need to do anything, as Bit already transpiles the JS objects alongside the implementation itself.

## Application bundling

We use tools like WebPack and Rollup to bundle a web application to a single target that contains all dependencies and assets. It is the application's responsibility to create runnable bundles for the browser.
