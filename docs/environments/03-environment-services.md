---
id: environment-services
title: Environment Services
---

Each environment composes together different services to extend components' functionality and integrate to operations and features in Bit.  

Listed below are the most important cross-cutting functions environments implement for components.

## Icon

Define and manage an `svg` icon to present in different locations in the workspace-UI.

## Documentation

Automated documentation for creating component docs. Most docs services utilize a `*.docs.*` file to allow manual modifications and manipulations for the auto-generated docs.

## Preview (DevServer)

Local development server for the component. Used when rendering in an isolated component environment for features like [compositions](/docs/compositions/develop-in-isolation).

## Runtime

Manage all runtime requirements for a component using peer dependencies.

## Compile

Component compilation instruction to transform source files to executable code.

## Bundle

Bundling instructions for components. Relevant only for Web-based components like React, Angular and Vue.

## Package

Create a node-module package, compatible for installation with npm, yarn and pnpm.

## Test

Testing instructions and result rendering.

## Lint

Define lint rules for source code to ensure code standards.