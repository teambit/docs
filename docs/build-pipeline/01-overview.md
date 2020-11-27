---
id: overview
title: Overview
---

The build pipeline is an orchestrator of tasks that act on Bit components in order to test them, analyze them or produce additional artifacts out of them (for example, testing, compiling and bundling). You can think of it as an 'environment-specific CI/CD workflow for components' that can be run locally and remotely.

This (changeable) series of tasks is run on two events:
 * `bbit build`
 * `bbit tag --persist` \ `bbit tag` - when a component is versioned or suggested to be versioned. 

 The build pipeline is another customizable and extendible service used by Bit environments.

> The build pipeline has a few "core" tasks that cannot be overridden using the environments API. Among these tasks are the ['preview'](TODO) and ['package (pkg)'](TODO).

 To override an environment default build pipeline, [see here](/docs/build-pipeline/override-pipeline).

 To create a custom task, [see here](/docs/build-pipeline/create-build-task).

