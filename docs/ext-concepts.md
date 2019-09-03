---
id: ext-concepts
title: Extending Bit
permalink: docs/ext-concepts.html
layout: docs
category: Extending Bit
next: ext-using-extensions.html
prev: bit-on-the-server.html
---

Bit's extension system allows you to add custom actions during a component's lifecycle, and invoke custom commands on a bit component, in its [isolated environment](#what-is-an-isolated-component-environment).

## Why?

During our work on bit, we've realized there are many actions performed on a component that are not (or should not be) an inherent part of Bit's code. Those include actions integrating with external tools, such as packing and publishing a component to npm, or parsing its documentation, as well as actions that are just user-specific.

## What is an Extension?

An *Extension* is simply a code component that can perform actions on isolated components (during the component's lifecycle, or by invoking it as a command). It can add additional functionality, such as [packing a component](https://bit.dev/bitsrc/extensions/npm/pack).

## What is an isolated component environment?

Creating an isolated component environment for a component allows Bit to run tasks such as test/build outside the context of a project, thus ensuring a component is completely decoupled from any project.

When you manually copy and paste a piece of functionality from one project to another, you can't ignore the fact that the piece of functionality lives within the project, and thus has its own context. That context can be defined by the packages it uses, other files it requires, etc. In order to make the few lines of code usable on another project, one will need to provide all the missing dependencies.

Bit solves most of the problem - all the dependencies and external files are calculated when a component is being tracked and tagged.

So this means that if we are to take all the dependencies, and put them in a single place for the tracked Bit component to use, we can create an **isolated component environment** outside the context of *any* project.

The main benefit behind complete component isolation is the ability to validate that Bit can recreate the entire component environment on any other project, without affecting its functionality. 
In addition, Running extensions on components, without a project, allows actions such as building, testing, generating docs and even bundling individual components and publishing them to external package managers.

### How does it work?

When creating an *isolated component environment*, Bit imports the component to a separate directory, along with its dependencies. This creates a clean environment in which Bit can perform actions on the component without the 'noise' of the rest of the project.

### Isolated component environment and extensions

[Extensions](#what-is-an-extension) can utilize the *isolated component environment* for their own needs. Just imagine how many custom actions require an *isolated component environment* - pack, publish, lint...

Want to learn how? head over to the [extensions development](/docs/ext-developing-extensions.html#creating-an-isolated-environment) section.


## How to use an extension?

If you want to learn how to use and consume extensions, head over [here](/docs/ext-using-extensions.html).


## How does it work?

Now that we know what is an extension, let's dive deeper...

### Extension as a command

Some extensions are actually custom Bit commands. Those are useful when there's a need to run a command on a component, in an [isolated environment](#what-is-an-isolated-component-environment). 
For example, Let's say we want to pack a component as an npm package - We can create a `pack` extension that defines a Bit command, and then use it as follows:

```bash
bit pack foo/bar
```

Want to develop your own custom Bit command? You can learn all about it [here](/docs/ext-developing-extensions.html#registering-a-command).

### Hooks

An extension can also register an action to a hook, and thus the action will run whenever the hook is triggered.
When multiple actions are registered to the same hook, they will run in parallel when that hook is triggered.
Some hooks are registered by bit, and more hooks can be registered by extensions, and subsequently used by other extensions.

Want to develop an extension that registers to hooks? You can learn all about it [here](/docs/ext-developing-extensions.html#registering-an-action-to-a-hook).

#### Bit's core hooks

Bit registers hooks related to the component's lifecycle. Any extension can register to those hooks.
Some examples for core hooks: pre-tag, post-tag, pre-import, post-import, pre-export, post-export.

### Registration lifecycle

As you can probably guess, there's a complex system of hooks and triggers that Bit needs to handle under the veil.

Before every Bit command, Bit runs over the [non-disabled](/docs/ext-using-extensions.html#options) extensions listed in [Bit's configuration](/docs/conf-bit-json.html#extensions--object), and does the following actions, by that order:

* [init](/docs/ext-developing-extensions.html#init) function is run and results are collected.
* All new hooks are registered.
* All new commands are registered.
* Actions that have been registered to hooks (both core hooks and custom hooks) are registered on Bit.

## Extensions vs. Environments

An *Environment* is a special kind of extension - a [compiler](/docs/building-components.html) or a [tester](/docs/testing-components.html). It is imported, consumed and developed in a different fashion.

## Developing your own extensions

It's easy and straightforward to develop your own extensions.

### Developing a compiler

You can develop compilers that will build components using your specific build tools and configuration. You can learn all about it [here](/docs/ext-compiling.html).

### Developing a tester

You can develop testers that will test components using your specific testing tools and configuration. You can learn all about it [here](/docs/ext-testing.html).

### Developing a custom extension

You can develop custom extensions for various purposes, and take advantage of the hooks and commands mechanisms that were previously introduced. You can learn all about it [here](/docs/ext-developing-extensions.html).
