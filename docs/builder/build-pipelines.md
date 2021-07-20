---
id: build-pipelines
title: Build Pipelines
---

There are three pipelines: `build`, `tag` and `snap`.

- `bit build` runs the build pipeline.
- `bit tag` runs the build pipeline and then the tag pipeline.
- `bit snap` runs the build pipeline and then the snap pipeline.

## List Build Tasks

To get a list of all the tasks that will be running per pipeline on a specific component, run `bit build --list-tasks <id>`.
Here is an example of the relevant part from the output:

```
➜  bit build --list-tasks ui/tooltip
Tasks List
id:    teambit.design/ui/tooltip@0.0.347
envId: teambit.react/react

Build Pipeline Tasks:
teambit.harmony/aspect:CoreExporter
teambit.compilation/compiler:TSCompiler
teambit.defender/tester:TestComponents
teambit.pkg/pkg:PreparePackages
teambit.pkg/pkg:PublishDryRun
teambit.preview/preview:GeneratePreview

Tag Pipeline Tasks:
teambit.harmony/application:build_ui_application
teambit.pkg/pkg:PublishComponents

Snap Pipeline Tasks:
<N/A>
```