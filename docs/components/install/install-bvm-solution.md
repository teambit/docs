---
id: install-bvm-solution
title: Install BVM Solutions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
