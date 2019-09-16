---
id: dependencies
title: Components Dependencies
sidebar_label: Dependencies
---

There are two types of dependencies that a javascript can rely on, using a require or import statements: 

- Packages that are installed as node_modules
- Files and directories from inside the project, or referenced in decorators (e.g. in Angular)

For each component, Bit builds a **dependency graph** by analyzing all the dependencies. When a new version of component is tagged, Bit saves the dependency graph together with the component sources. The dependency graph is used to generate a `package.json` file for each component when the component is installed or imported.  

## Dependency resolution  

When a component is tracked, the following flow runs to resolve the dependencies:  

1. Read all the tracked files to identify the dependencies
2. Bit splits the imported modules to packages and files
3. Bit parses the `package.json` file at the root of the project (and all nested `package.json` files, if available), to get a complete list of the installed packages' versions.

**Packages Resolution flow**

The following diagram describes the packages (i.e. node_modules installed) resolution flow: 

![Package Resolution Flow](https://storage.googleapis.com/static.bit.dev/docs/images/package_resolution.png)

**Files resolution flow**

The following diagram describes the flow to resolve dependency for relative files:  

![Package Resolution Flow](https://storage.googleapis.com/static.bit.dev/docs/images/file_resolution.png)
