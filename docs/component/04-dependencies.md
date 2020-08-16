---
id: dependencies
title: Dependencies
---

Each time you use `import` statement in a component, Bit logs it and adds that module to the component's dependency graph. This way Bit helps you manage dependencies for each component.  
To view the dependency graph for the component view the component on the [workspace UI](TODO) and see it's "dependencies" graph.

> ADD IMAGE

## Parsing import statements

[`@teambi/dependency-resolver`](TODO) does static code analysis to find all import statements to other modules in the code. Each of these import statements adds the imported module to the component's dependency graph.

```javascript
// Other component in the workspace
import { default } from '@acme.base-ui/button';

// Component from a different scope
import { default } from '@acme.billing/purchase-form';

// Module installed from a public registry
import LeftPad from 'left-pad';
```

> **Dynamic imports**
>
> Bit does static code analysis to parse dependencies. This means that it does not support dynamic import statements to external modules.

### Dependency type

`button` might import a library to use as a helper for its tests, while `dropDown` needs it for its runtime. The task of having you keep notes and manage these complicated relationships is automated by `dependency-tesolver` as well. Bit understands that there are two types of files for a component. The files that actually implement the business functionality and all files that are required to support it (tests, docs, compositions, etc).  
The type of file that imports a dependency determines the type of dependency in the graph. This means that:

* If a module is imported by a **test file** it'll be a `devDependency`.
* If a module is imported by an **implementation file** it'll be a `dependency`.
* If a module is imported both by **test file** and **implementation file** it'll be a `dependency`.

### Versions

The version for the dependency is defined using the dependency policy configured in the `workpsace.json`. So aligning dependency versions for the same library can be as simple as updating the root of the workspace.  
When `component-a` imports `component-b` from the same workspace, the version is set according to the specific version of `component-b` as available in the workspace (more about individual component versions [here](TODO)).
