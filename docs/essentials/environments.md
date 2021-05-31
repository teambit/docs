---
id: environments
title: Development Environments
---

**Component Development Environment** (or **Envs** in short) are [Bit Aspects](/aspects/overview) that standardize component development.

## Standard Tools

Envs uses tools from the JavaScript eco-system configured and composed together to integrate them to Bit and streamline their operations. Each envs may compose different tools to create an opinionated workflow. For example, an env can use TypeScript or Babel for compilation.  

### Development Services

Envs register different services for components. These services handle the development lifecycle of a components. Each service hooks into different APIs in Bit to run a task on a component when needed. Each service may use any tool with your preferred configuration. For example:

* Compilation - provide workspace compilation by integrating to the `compile` and `watch` commands.
* Test - runs component test capabilities for the local dev server and `test` and `watch` commands.
* Documentation - generates documentation for components by running static code analytics on component and parsing MDX files.

### Compose Your Env

There's no "single-config to rule them all" for component lifecycle, this is why we made environments composable. You can take any environment and use it as a base for another, and in the process either change any of its default configuration (for compilation or testing, for example) or even compose with new features.

## Component Configuration

Bit is a component-first platform where the dev-workflow is decided per-component. Envs are [aspects](/essentials/aspects) configured for components, not on the workspace. This have several benefits:

* Granular control over component operations and configurations.
* Components using different frameworks and tools in the same workspace.
* Share envs as components using Bit's capabilities for component management.

### Programmatic API

Writing scripts that run different CLI tools and grepping their outputs can be cumbersome and get out of hard, as it's not modular and hard to reuse in different projects without copy/paste. This can cause difficulties for managing and streamlining dev-workflow across several projects.  
All operations run 

## FAQ

### What are the benefits for Envs?

* Composing all your tools and preferred configurations to a single module to streamline your development.
* Share Environments between teams and projects and use semantic versioning to communicate config changes.
* Maintain a set of environments for different use cases, use them on multiple components in the same workspace simultaneously.
* Extend and customize environments by adding new tools and capabilities to your workflow.
