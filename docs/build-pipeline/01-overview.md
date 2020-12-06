---
id: overview
title: Overview
---

The build pipeline is an orchestrator of 'build tasks'. These orchestrated tasks are defined by the environment. That makes the build pipeline an environment-specific CI, that affects only those components handled by the corresponding environment.

The build pipeline runs on your local environment and remotely, on a CI server of your choice.

Commands that trigger the build pipeline: 
 * `bbit build` - will run the build pipeline. The output data will not persist. (most often used for testing and debugging the build process).
 * `bbit tag` - will run the build pipeline before registering the component as 'pending to be versioned'. The output data will not persist.
 * `bbit tag --persist` - will run the build pipeline before creating a new (committed) component version. The output data will persist.


####  To create a new task or override an environment default build pipeline [see here](/docs/build-pipeline/create-build-task).

> The build pipeline has a few pre-configured "core" tasks that cannot be overridden using the environments API. Among these tasks are the ['preview'](TODO) task and ['package (pkg)'](TODO) task.


For more information regarding the '@teambit/builder' aspect, [see here](TODO)