---
id: pre-existing-components
title: Pre-existing Components
---

Bit can be used on pre-existing projects and components can be added using the `bit add` command. If you would like to [create new components](/getting-started/creating-components) we suggest you use the `bit create` command.

## Add Pre-existing Components

If you want to add pre-existing components make sure all your component files are in the component's folder and have an `index.ts` as main entry file.

To add your component to the workspace run the `bit add` command followed by the namespace. The namespace is the the component folder structure you would like to see in your workspace.

```sh
bit add button --namespace ui
```

:::note Tip
You can use -n which is short for --namespace
:::

Learn more about [tracking components](/building-with-bit/tracking-components) and [removing components](building-with-bit/removing-components)

## Managing Project Dependencies

When you initialize Bit in a pre-existing project you can choose to use Bit to manage workspace dependencies or keep your current workflow.

### Using `bit install` for workspace dependencies

Bit manages all dependencies in `workspace.jsonc` by default so it is recomended to move all dependnecies from `package.json` to it. If you keep `package.json` alongside `workspace.json` Bit will concat both files when running `bit install`.

Using `bit install` to manage dependencies in your workspace allows for several advanced dependency management features. For example, if some components require a different version of a dependency, Bit will automate the creation of workspaces (using either Yarn2 or PNPM). If you decide not to use Bit, this and similar features will not be supported.

### Using your current package manager

You can keep using your current package manager for dependency management and keep all dependencies in your `package.json` file. In this case, it is important to use `bit link` after you install dependnecies. This is because package managers often delete "unkown" files from `node_modules`, and `bit link` re-creates all component-modules.  
We recomend adding `bit link` as a `post-install` action on your `package.json` file to simplify dev-experience.
