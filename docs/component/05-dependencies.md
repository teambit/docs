---
id: dependencies
title: Dependencies
---

Bit creates a dependency graph for each component by parsing it's code and using the dependency policies as defined for the [workspace](LINK). Each time you use `import`, Bit finds the imported module and then decides what's the actual imported module, its version and if it is a runtime, development or a peer dependency.

### See component dependency graph

You can browse a component dependency graph using Bit's local dev server, when choosing the 'dependencies' tab or run the following command:

```sh
$ show button
# TODO output
```

### Parsing import statements

Each of the implementation files of the component may contain several `import` statements. Each of the imported modules differs from one another and affects the component's dependency graph.

```javascript
// Module installed from a public registry
import LeftPad from 'left-pad';

// Other component in the workspace
import { default } from '@acme.base-ui/button';

// Internal file of the component
import { default } from './user-service/client'
```

1. Modules installed from registries are marked as **dependencies**. Their version is set according to the workspace dependency resolution extension and the policies defined in your `workspace.json` file.
1. Other components from the workspace are marked as **dependencies** as well. Their version is set according to their current version in the workspace (see [versioning](LINK) for additional details).
1. Internal files are not registered as dependencies as they are a part of the implementation of the component. However, if any internal file has more dependencies - they will be registered as ones.

This means that the component dependency graph depends on it's implementation. So to add or remove a dependency you should modify the component's implementation.

### Types of dependencies

There are three types of dependencies. When Bit registers a new dependency for a component, it sets its type as well.

- **Development dependencies** are all dependencies of the test, documentation and composition files.
- **Runtime dependencies** are all dependencies of the component's implementation.
- **Peer dependencies** are defined for each component by its configured environment and the workspace dependency policy.

### Dependency policies

TODO
