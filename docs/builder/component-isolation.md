---
id: component-isolation
title: Component Isolation
---

Components authored in a Bit workspace are created to be independent.
To address that, the build process starts by creating a component ‘capsule’ which is an isolated instance of a component, generated in a separate directory in your filesystem.
Running the build in an isolated environment validates that a component is not coupled, in any way, to its workspace (a component that is not isolated may be able to use files and packages in the workspace.
For example, we may get false-positive results when testing for dependency-graph issues).