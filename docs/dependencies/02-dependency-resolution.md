---
id: dependency-resolution
title: Dependency Resolution
---

`dependency-resolver` parses your component's code and finds all `import` statements to other modules. It then resolves each statement to figure out if it's an external component or a library (i.e. not an internal file from this component) and if so checks the version and creates a dependency graph for the component.  
You can see the resulting `package.json` file in the component's compiled module output (which is created when running `bit compile`) on the workspace root `node_modules`.

> Note, you won't see a package.json file in the component's directory in the workspace, it is only created for the compiled component in `node_modules`  
>
> Read more about this process and component dependencies [here](/docs/component/dependencies).

### Workspace dependency graph

When all import statements of all components in the workspace have been parsed, Bit creates a complete dependency graph for the workspace. The main benefit this provides is Bit's ability to calculate how a modification in one component affects the other components in the workspace.  

A key feature this allows is to mark all dependents of a modified component as modified as well. In this way, Bit helps you understand how a change in a single component  affect the entire workspace - in effect Bit keeps track of component inter-dependencies so that you don't have to. Bit then recompiles, and can even test, all affected components. Additionally, when you upgrade an external library, you get a list of all affected components.
