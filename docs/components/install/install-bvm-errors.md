---
id: install-bvm-errors
title: Install BVM Errors
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

**If BVM isn't recognized in your terminal after installing it via npm, then please run the following:**

<Tabs
defaultValue="Windows"
values={[
{label: 'Windows', value: 'Windows'},
]}>
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
