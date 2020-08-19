---
id: composing-environments
title: Composing Environments
---

Environments are designed as isolated modules you can use to compose more concrete instances of them for your needs.

> **Guide for composing environment**
>
> Oops! This document does not explain *how* to compose new environments from existing ones. Please head over to [this guide](TODO).

## Environment composition

Think about an environment like a UI component that comes with its own set of defaults and works out-of-the-box. You can then create a more concrete composition of it by wrapping it in your own component.  
The same process if how you can use any environment and use it to your needs.

When you compose `environment-b` using `environment-a` you create a dependency between them. This way when `environment-a` gets updated with a new version, you can quickly update `environment-b`.  
This method allows for a more standard approach for managing zero-config tools. For example, if you use `create-react-app` with `react-scripts`, you can eject all configuration and take full control over the configuration. However, there's no going back once you took this rout. Moreover, you loose ability to get future updates for `react-scripts`.

## Using environment from your workspace

A workspace can use extensions implemented in itself. This means that you can keep the code of your composite environment alongside with the components affected by it. This makes the process of maintaining the environment a part of your workspace development workflow.

## Sharing composite environment

Bit is a tool made to help sharing isolated components between projects. You can do just the same for environments, as they are managed as Bit components.  
By sharing your environment you can standardize component development across your projects, as you could use the same environment. Projects can also update their environment when new versions are available.
