---
id: bvm
title: BVM
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[BVM](https://github.com/teambit/bvm) is a version manager for Bit.  
Using BVM makes it easier to install and manage multiple versions of Bit in a single environment.

### Features

- **Consistent installation:** All Bit dependencies are bundled together to ensure a consistent and predictable package installation that is not affected by SemVer rules.
- **Fast installation:** A simple and quick installation process that requires no additional time-consuming operations (post-install scripts, etc.)
- **Friendly UX:** Easy upgrades and version management
- **Multiple Bit versions:** Easily switch between Bit versions or even use multiple versions in parallel

### Install BVM

<Tabs
defaultValue="NPM"
values={[
{label: 'NPM', value: 'NPM'},
{label: 'Yarn', value: 'Yarn'},
]}>
<TabItem value="NPM">

```bash
npm i -g @teambit/bvm
```

  </TabItem>
  <TabItem value="Yarn">

```bash
yarn global add @teambit/bvm
```

  </TabItem>
</Tabs>

### Install Bit

#### Install Bit's latest version

```bash
bvm install
```

#### Install A specific Bit version

```bash
bvm install <bit-version>
```

#### Upgrade to Bit's latest version

Install the latest version and remove the version previously used.

```bash
bvm upgrade
```

### Manage versions

#### Get the current version of BVM

```bash
bvm -v
```

#### List all versions of BVM available to be installed

```bash
bvm list --remote
```

#### Get the local and remote versions of Bit and BVM

Get the local used versions, local latest versions and remote latest versions of Bit and BVM

```bash
bvm version
```

#### List all installed Bit versions

```bash
bvm list
```

#### Remove an installed Bit version

```bash
bvm remove <bit-version>
```

#### Link to a specific Bit version

Link a command name to a Bit version (link to binaries in the `PATH` variable).

```bash
bvm link <command> <bit-version>
```

For example, the following line will link Bit's version `0.0.315` to the `bitty` command name
(this will execute Bit's version `0.0.315` whenever the `bitty` command is used).

```
bvm link bitty 0.0.315
```

Validate the link by checking the version number of the new link:

```bash
$ bitty -v

0.0.315 (@teambit/legacy: 1.0.28)
```

:::info Auto-Link Bit's latest version to `bbit`
If a legacy version of Bit (Bit v14) is installed on your machine,
BVM will automatically link the latest version to `bbit` (instead of `bit`) to allow you to use both versions in parallel.
:::

### BVM configurations

#### Get BVM configurations

- `DEFAULT_LINK` - The default command name to be linked to BVM's latest version.  
  `bit` is linked by default unless a legacy version of Bit is installed. In that case, `bbit` will be linked, instead.

- `BVM_DIR` - The location for BVM

```bash
bvm config
```

#### Set BVM configurations

```bash
bvm config set <property> <new-value>
```

For example, to change the default link for Bit, from `bit` to `bitty`:

```bash
bvm config set DEFAULT_LINK bitty
```

### Troubleshooting

#### PATH is missing the installation directory

- [Installation Troubleshooting](/troubleshooting/installation-troubleshooting).
