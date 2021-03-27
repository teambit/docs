---
id: installing-bit
title: Installing Bit
---

import BVMIntro from '@site/docs/components/install/bvm-intro.md'
import InstallBVM from '@site/docs/components/install/install-bvm.md'
import InstallBVMErrors from '@site/docs/components/install/install-bvm-errors.md'
import InstallBit from '@site/docs/components/install/install-bit.md'
import BVMVersion from '@site/docs/components/install/bvm-version.md'

import LegacyWarning from '@site/docs/components/install/legacy-warning.md'

To use Bit you will need to install it. You can do this by first installing BVM, a version manger for Bit and then installing Bit.

## 1. Install BVM

<BVMIntro />
<InstallBVM />

<InstallBVMErrors />


:arrow_right: Learn more about [BVM](/building-with-bit/bvm) and it's commands.

## 2. Install Bit

<InstallBit />

## BVM and Bit Versions

<BVMVersion />

### Upgrading BVM

To upgrade to the latest version of BVM:

<InstallBVM />

### Upgrading Bit

To upgrade to the latest version of Bit:

```sh
bvm upgrade
```

## Installing Bit on a Project with a package.json file

Bit uses Yarn2 or PNPM (NPM7 support coming soon) to manage component and workspace dependencies. When using Bit in a workspace, Bit manages dependencies in the `workspace.jsonc` and propagate to `package.json` for both dependency installation (during bit install) and dependency definition for components. You can choose to use Bit for dependency management for your entire project.

**Potential side-effects:**

- New package-lock file created (for PNPM or yarn2, if you are not using these tools)
- Install all dependencies from package.json and workspace.jsonc,
- Newly installed dependencies (bit install 'package name') will be added to workspace.jsonc

If you wish to keep using your current package manager for dependency management and keep all dependencies in your package.json file, you can still do that. Just make sure to run bit link after each dependency you install, as package managers may remove local component modules from node_modules directory. In such cases it is recommended to add bit link command as a post-install script in the package.json file.

Using bit install to manage dependencies in your workspace allows for several advanced dependency management features. For example, if some components require a different version of a dependency, Bit will automate the creation of workspaces (using either Yarn2 or PNPM). If you decide not to use Bit, this and similar features will not be supported.

**We recommend using Bit to manage all workspace dependencies.**

<br />

<LegacyWarning />

## What's next?

Once you have installed Bit and BVM you can then [initialize a workspace](initializing-workspace) so you can manage your components.
