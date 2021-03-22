---
id: installation
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. Install BVM

[BVM](/aspects/bvm) is a version manager for Bit.
Using BVM makes it easier to install and manage multiple versions of Bit in a single environment.

<Tabs
  defaultValue="NPM"
  values={[
    {label: 'NPM', value: 'NPM'},
    {label: 'Yarn', value: 'Yarn'},
  ]}>
  <TabItem value="NPM">

```shell
npm i -g @teambit/bvm
```

  </TabItem>
  <TabItem value="Yarn">

```shell
yarn global add @teambit/bvm
```

  </TabItem>
</Tabs>

## 2. Install Bit

Once BVM is installed you can install Bit using BVM.

```shell
bvm install
```

Check that Bit is installed

```shell
bit --version
```

<br />

:::info Have a legacy version of bit installed on your machine?
Use the `bbit` command to run Bit's latest version and the `bit` command for Bit's legacy version.
:::