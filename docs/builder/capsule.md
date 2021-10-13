---
id: capsule
title: Capsule
---

A capsule is an isolated component environment. It is mainly implemented as a directory that hosts a component outside its workspace directory.

Capsules provide a context-free setting for component build tasks. They play an essential role in validating that a component is truly decoupled from its workspace, and will be able to function properly in other host projects.

For example, a component that does not hove 'module-a' in its dependency graph, but needs it in order to function, may be able to function in its workspace (provided the module was installed in the workspace), but will fail to function in a Capsule, where packages are only installed for that specific component.

```bash title="Example: component-a is coupled to the workspace"
.
├── page
    └── node_modules
        └── module-a # installed due to 'component-a'
    └── scope
        └── component-a # has module-a in its dependency graph
        └── component-b # does not have module-a in ist dependency graph although it does need it
```

## Capsule directory structure

Capsules are located in Bit's `capsule` directory:

- macOS: `~/Library/Caches/Bit/capsules/`

- Windows: `%LOCALAPPDATA%\Bit\capsules\`

Capsules are grouped inside a root directory, which is generated for each build, and named with a hash based on the absolute path of the corresponding workspace directory. This directory may also include shared assets like the preview bundles for components of the same Env.

For example:

```
├── /Users/eden/Library/Caches/Bit/capsules/f170673b3ef2c76c19d7c6ca9e37decddac38e6d
    ├── company.scope_envs
        └── my-react@0.0.1-preview         # preview assets for Env 'envs/my-react'
    ├── company.scope_envs_my-react@0.0.1  # component capsule
    ├── company.scope_ui_heading@0.0.1     # component capsule
    └── company.scope_ui_text@0.0.1        # component capsule
```

:::note Capsules are temporary
Each build starts by removing the capsule that was previously generated for the same workspace.

:::
