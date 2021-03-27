--- 
id: install-bvm-errors
title: Install BVM Errors
--- 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**If you get the following error while installing BVM:
**
<Tabs
  defaultValue="MacOSLinux"
  values={[
    {label: 'MacOS / Linux', value: 'MacOSLinux'},
    {label: 'Windows', value: 'Windows'},
  ]}>
  <TabItem value="MacOSLinux">

```sh
global Bit install location was not found in your PATH global variable.
please add the following command to your bash/zsh profile then re-open the terminal:
export PATH=$HOME/bin:$PATH
```

  </TabItem>
  <TabItem value="Windows">

```sh
global Bit install location was not found in your PATH global variable.
please run the following command and then re-open the terminal:
setx path "%path%;C:\Users\USER\AppData\Local\.bvm" and re-open your terminal
```

  </TabItem>
</Tabs>

**Solution:**

Run the following command:

<Tabs
  defaultValue="Bash"
  values={[
    {label: 'Bash', value: 'Bash'},
    {label: 'ZSH', value: 'ZSH'},
    {label: 'Shell', value: 'Shell'},
  ]}>
  <TabItem value="Bash">

```shell
echo 'export PATH=$HOME/bin:$PATH' >> ~/.bashrc && source ~/.bashrc
```

  </TabItem>
  <TabItem value="ZSH">

```shell
echo 'export PATH=$HOME/bin:$PATH' >> ~/.zshrc && source ~/.zshrc
```

  </TabItem>
<TabItem value="Shell">

```shell
setx path "%path%;%LocalAppData%\.bvm"
```

  </TabItem>
</Tabs>

