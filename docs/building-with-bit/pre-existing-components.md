---
id: pre-existing-components
title: Pre-existing Components
---

Bit can be used on pre-existing projects and components can be added using the `bit add` command.

## Installing Bit on a Project with a package.json file

Bit uses Yarn2 or PNPM (NPM7 support coming soon) to manage component and workspace dependencies. When using Bit in a workspace, Bit manages dependencies in the `workspace.jsonc` and propagate to `package.json` for both dependency installation (during bit install) and dependency definition for components. You can choose to use Bit for dependency management for your entire project.

**Potential side-effects:**

- New package-lock file created (for PNPM or yarn2, if you are not using these tools)
- Install all dependencies from package.json and workspace.jsonc,
- Newly installed dependencies (bit install 'package name') will be added to workspace.jsonc

If you wish to keep using your current package manager for dependency management and keep all dependencies in your package.json file, you can still do that. Just make sure to run bit link after each dependency you install, as package managers may remove local component modules from node_modules directory. In such cases it is recommended to add bit link command as a post-install script in the package.json file.

Using bit install to manage dependencies in your workspace allows for several advanced dependency management features. For example, if some components require a different version of a dependency, Bit will automate the creation of workspaces (using either Yarn2 or PNPM). If you decide not to use Bit, this and similar features will not be supported.

**We recommend using Bit to manage all workspace dependencies.**

## Add Pre-existing Components

If you want to add pre-existing components make sure all your component files are in the component's folder and have an `index.ts` as main entry file.

To add your component to the workspace run the `bit add` command followed by the namespace. The namespace is the the component folder structure you would like to see in your workspace.

```sh
bit add button --namespace ui
```

:::note Tip
You can use -n which is short for --namespace
:::
