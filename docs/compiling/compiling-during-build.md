---
id: compiling-during-build
title: Compiling During Build
---


- **Compile as a build task** -
  Components are compiled as part of the component build pipeline (on `bit build` and `bit tag`).
  The compilation task runs on the component's 'capsule' (generated as part of the build process) and not on the workspace.
  Since the build pipeline runs not only on the modified components but also on all dependents of that component, so does the the compilation process.
