---
id: overview
title: Overview
---

Compilation is a crucial step in making a component an independent module that can be used by other web projects as well as internally, by other components in the same workspace.
When Bit starts tracking a component, a new directory is created for it inside the workspace' `node_modules` directory. When a component gets compiled, the output of that process is placed inside the root of that directory.

```bash
├── node_modules
    ├── @my-org
        ├── ui.button
          ├── dist
              ├── index.js
              ├── index.js.map
              ├── button.js
              ├── button.js.map
          ├── ...
```

- **Compile in the workspace** - Components are compiled in 'watch mode' (on every change) when running Bit's dev server (`bit start`) and on various compilations commands.

- **Compile as a build task** -
  Components are compiled as part of the component build pipeline (on `bit build` and `bit tag`).
  The compilation task runs on the component's 'capsule' (generated as part of the build process) and not on the workspace.
  Since the build pipeline runs not only on the modified components but also on all dependents of that component, so does the the compilation process.

## Choosing a Compiler

Bit's Compiler is an Environment Service.
The type of compiler (Babel, TypeScript, etc.) as well as its configurations, are set by the various [environments](/bit-environments/environments) that use it as a service.
That means, the (specific) compiler is never run directly but only via the Compiler service. That also means, a single workspace may run different compilers for different components, each according to its own environment.
To customize an environment's compiler, [see here](/bit-environments/environments).
