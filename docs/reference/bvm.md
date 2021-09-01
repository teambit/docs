---
id: bvm
title: BVM
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[BVM](https://github.com/teambit/bvm) is a version manager for Bit.  
Using BVM makes it easier to install and manage multiple versions of Bit in a single environment.

## Features

- **Consistent installation:** All Bit dependencies are bundled together to ensure a consistent and predictable package installation that is not affected by SemVer rules.
- **Fast installation:** A simple and quick installation process that requires no additional time-consuming operations (post-install scripts, etc.)
- **Friendly UX:** Easy upgrades and version management
- **Multiple Bit versions:** Easily switch between Bit versions or even use multiple versions in parallel

## Install BVM

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

**If BVM isn't recognized in your terminal after installing it via npm, then please run the following:**

<Tabs
defaultValue="MacOSLinux"
values={[
{label: 'MacOS / Linux', value: 'MacOSLinux'},
{label: 'Windows', value: 'Windows'},
]}>
<TabItem value="MacOSLinux">

<Tabs
defaultValue="Bash"
values={[
{label: 'Bash', value: 'Bash'},
{label: 'ZSH', value: 'ZSH'},
]}>
<TabItem value="Bash">

```bash
# npm
echo 'export PATH=$(npm bin -g):$PATH' >> ~/.bashrc && source ~/.bashrc
# yarn
echo 'export PATH=$(yarn global bin):$PATH'  >> ~/.bashrc && source ~/.bashrc
```

  </TabItem>
  <TabItem value="ZSH">

```bash
# npm
echo 'export PATH=$(npm bin -g):$PATH' >> ~/.zshrc && source ~/.zshrc
# yarn
echo 'export PATH=$(yarn global bin):$PATH'  >> ~/.zshrc && source ~/.zshrc
```

  </TabItem>
  </Tabs>

</TabItem>
<TabItem value="Windows">

```bash
setx path "%path%;%AppData%\npm" and re-open your terminal
```

</TabItem>
</Tabs>

---

**If you get the following error while installing bit via BVM:**

<Tabs
defaultValue="MacOSLinux"
values={[
{label: 'MacOS / Linux', value: 'MacOSLinux'},
{label: 'Windows', value: 'Windows'},
]}>
<TabItem value="MacOSLinux">

```bash
global Bit install location was not found in your PATH global variable.
please add the following command to your bash/zsh profile then re-open the terminal:
export PATH=$HOME/bin:$PATH
```

  </TabItem>
  <TabItem value="Windows">

```bash
global Bit install location was not found in your PATH global variable.
please run the following command and then re-open the terminal:
setx path "%path%;C:\Users\USER\AppData\Local\.bvm" and re-open your terminal
```

  </TabItem>
</Tabs>

**Solution:**

Run the following command:

<Tabs
defaultValue="MacOSLinux"
values={[
{label: 'MacOS / Linux', value: 'MacOSLinux'},
{label: 'Windows', value: 'Windows'},
]}>
<TabItem value="MacOSLinux">

<Tabs
defaultValue="Bash"
values={[
{label: 'Bash', value: 'Bash'},
{label: 'ZSH', value: 'ZSH'},
]}>
<TabItem value="Bash">

```bash
echo 'export PATH=$HOME/bin:$PATH' >> ~/.bashrc && source ~/.bashrc
```

  </TabItem>
  <TabItem value="ZSH">

```bash
echo 'export PATH=$HOME/bin:$PATH' >> ~/.zshrc && source ~/.zshrc
```

  </TabItem>
  </Tabs>

</TabItem>
<TabItem value="Windows">

```bash
setx path "%path%;%LocalAppData%\.bvm"
```

</TabItem>
</Tabs>

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
