---
id: installing-bit
title: Installing Bit
---

import BVMIntro from '@site/docs/components/install/bvm-intro.md'
import InstallBVM from '@site/docs/components/install/install-bvm.md'
import InstallBit from '@site/docs/components/install/install-bit.md'
import BVMVersion from '@site/docs/components/install/bvm-version.md'
import LegacyWarning from '@site/docs/components/install/legacy-warning.md'
import QuickGuide from '@site/docs/components/quick-guide.md'
import InstallBVMSolution from '@site/docs/components/install/install-bvm-solution.md'

To use Bit you will need to install it globally. You can do this by first installing BVM, a version manger for Bit and then installing Bit.

<iframe width="560" height="315" src="https://www.youtube.com/embed/7afMBwj5fR4?start=135" title="Let's Build with Bit" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Quick Guide

<QuickGuide />

1. Install BVM (Bits Version Manager)

<InstallBVM />

2. Install Bit using BVM

```bash
bvm install
```

---

## Install BVM

<BVMIntro />

<InstallBVM />

You should see a progress bar while BVM is installing and once finished you can use BVM to install Bit.

> :arrow_right: Learn more about [BVM](/reference/using-bvm) and it's commands, including troubleshooting information.

---

## Install Bit

<InstallBit />

:::note

If you get a warning or the `bvm` command is not available you will need to run the code below. You can learn more about this in the [BVM guide](/reference/using-bvm).

<InstallBVMSolution />
:::

:::tip
Use `bit --help` or `bit -h` to get a list of available options.

:::

---

## BVM and Bit Versions

<BVMVersion />

### Upgrading BVM

To upgrade to the latest version of BVM:

<InstallBVM />

### Upgrading Bit

To upgrade to the latest version of Bit:

```bash
bvm upgrade
```

<br />

<LegacyWarning />

---

## What's next?

Once you have installed Bit and BVM you can then [initialize a workspace](/getting-started/initializing-workspace) so you can manage your components.
