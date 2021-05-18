---
id: using-bvm
title: Using BVM
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InstallBVMErrors from '@site/docs/components/install/install-bvm-errors.md'
import InstallBVMSolution from '@site/docs/components/install/install-bvm-solution.md'

import InstallBVM from '@site/docs/components/install/install-bvm.md'

[BVM](https://github.com/teambit/bvm) is a version manager for Bit.  
Using BVM makes it easier to install and manage multiple versions of Bit in a single environment.

## Features

- **Consistent installation:** All Bit dependencies are bundled together to ensure a consistent and predictable package installation that is not affected by SemVer rules.
- **Fast installation:** A simple and quick installation process that requires no additional time-consuming operations (post-install scripts, etc.)
- **Friendly UX:** Easy upgrades and version management
- **Multiple Bit versions:** Easily switch between Bit versions or even use multiple versions in parallel

## Install BVM

<InstallBVM />

<InstallBVMErrors />

**Solution:**

Run the following command:

<InstallBVMSolution />

## Install Bit

```bash title="Install Bit's latest version"
bvm install
```

```bash title="Upgrade Bit's version"
bvm upgrade
```

## Using v15 and v14

If you have a previous version of Bit installed (`bit-bin`), the default binary name for v15 will be `bbit`.

You can change the binary name for Harmony by running the following command after installing BVM and before installing Bit.

```sh
bvm config set DEFAULT_LINK <new-value>
```

## Manage versions

```bash title="Get version information"
bvm version
```

```bash title="List available versions"
bvm list --remote
```

```bash title="List installed versions"
bvm list
```

```bash title="Remove a local version"
bvm remove <bit-version>
```

## BVM configurations

BVM has several configurations

- `DEFAULT_LINK` - The default command name to be linked to BVM's latest version.  
  `bit` is linked by default unless a legacy version of Bit is installed. In that case, `bbit` will be linked, instead.
- `BVM_DIR` - The location for BVM

```bash title="Get BVM configurations"
bvm config
```

```bash title="Set BVM configurations"
bvm config set <property> <new-value>
```
