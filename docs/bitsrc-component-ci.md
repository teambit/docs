---
id: bitsrc-component-ci
title: Component CI
permalink: docs/bitsrc-component-ci.html
layout: docs
category: Bitsrc
next: my-account.html
prev: logs.html
---

bit.dev runs all build/test tasks for all components it hosts in their own isolated container.

When you are using Bit to export a component to a remote Collection hosted in [bit.dev](https://bit.dev), a container running Bit will import the new component, set up an isolated runtime environment for it, containins all the definitions found for the code component (pacakges, dependencies, etc). The output of it will be then populate the component page.  
This is so all developers using [bit.dev](https://bit.dev) will get build/test results for each component in a truly isolated environment on a remote container, which is purged after its done.

## Limitations

There are several limitations put into place when running component CI:

- 10 minute time limit.
- 2GB RAM.
- 0.5 CPU core.

## What is installed on each container

- Ubuntu jessie
- headless chrome driver
- latest version of Bit
- node 6.12