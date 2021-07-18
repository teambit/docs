---
id: component-isolation
title: Component Isolation
---

Components authored in a Bit workspace are created to be completely portable, and thus independent. 
To address that, the build process starts by creating a component 'capsule' which is an isolated instance of a component, generated in a separate directory in your filesystem.

As part of the capsule creation, all packages listed as dependencies of that component will be installed.
This step is necessary to validate there are no dependency-graph issues (a component that is not totally isolated will be able to use packages installed in parent directories in your workspace, by other components.
This will translate into a "false positive" result when testing for dependency-graph issues in a non-isolated location).
