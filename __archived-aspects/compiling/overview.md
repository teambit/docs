---
id: overview
title: Overview
---

//TODO compiler as an aspect should be added this is more a tutorial on how to compile components

Compilation is a crucial step in making a component an independent module that can be used by other web projects as well as internally, by other components in the same workspace.
When Bit starts tracking a component, a new directory is created for it inside the workspace' `node_modules` directory. When a component gets compiled, the output of that process is placed inside the root of that directory.

For example:

```sh
├── node_modules
    ├── @my-org
        ├── react-ui.button
          ├── dist
              ├── index.js
              ├── index.js.map
              ├── button.js
              ├── button.js.map
          ├── ...
```

- __Compile in the workspace__ - Components are compiled in 'watch mode' (on every change) when running Bit's dev server (`bit start`) and on various compilations commands.


- __Compile as a build task__ - 
Components are compiled as part of the component build pipeline (on `bit build` and `bit tag`).
The compilation task runs on the component's 'capsule' (generated as part of the build process) and not on the workspace.
Since the build pipeline runs not only on the modified components but also on all dependents of that component, so does the the compilation process.


