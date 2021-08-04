---
id: overview
title: Overview
---

import { Image } from '@site/src/components/image'

The Compiler aspect standardizes and simplifies the process of compiling components.

Using the Compiler aspect, developers can compile any component by running a set of standard Bit commands like `bit compile`.

A developer can compile a components' code without knowing anything about the compiler in use.
Moreover, running a single `bit compile`
It also means, running a single `bit compile` (on multiple components) may use different compilers or compiler configs, for different components, all in the same workspace.

<Image src="/img/diagrams/running_compiler.png" alt="Running the compiler aspect" />

## Standardized compilation processes

### Manually compiling code to use in development

The Compiler aspect compiles each components' code by running the `bit compile` command inside the root of the workspace directory.

When Bit starts tracking a component, a new directory is created for it inside the workspace' `node_modules` directory.
When a component gets compiled using the `bit compile` command, the output of that process is placed inside the root of that directory.

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

Learn more, [here](#).

### Recompiling modified code - 'watch mode'

The Compiler aspect automatically recompiles modified components in a Bit workspace by running `bit watch`, or as part of the dev server process, by running `bit start`.

Code that was automatically recompiled **will not** be written into the dist files of the components' corresponding module directory.

Learn more, [here](#).

### Compiling for distribution

A component's code is compiled for distribution during its build process. This is done by adding a build task (provided by Compiler) to the component's Env.

As with any other build task, the compiled code is generated in the component's 'capsule'.

The compilation task is executed (as part of the build process) by running `bit build` or `bit tag`.

It's important to note the configuration for the build task is not identical to the one set for development purposes.

Learn more, [here](#).
