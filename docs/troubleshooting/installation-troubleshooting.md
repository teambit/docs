---
id: installation-troubleshooting
title: Installation troubleshooting
---

## PATH is missing the installation directory

### MacOS / Linux

The error message:

```
global Bit install location was not found in your PATH global variable.
please add the following command to your bash/zsh profile then re-open the terminal:
export PATH=$HOME/bin:$PATH
```

**Solution:**

#### Bash

Run the following command:

```shell
echo 'export PATH=$HOME/bin:$PATH' >> ~/.bashrc && source ~/.bashrc
```

#### ZSH (Z Shell)

Run the following command:

```shell
echo 'export PATH=$HOME/bin:$PATH' >> ~/.zshrc && source ~/.zshrc
```

### Windows

The error message:

```
global Bit install location was not found in your PATH global variable.
please run the following command and then re-open the terminal:
setx path "%path%;C:\Users\USER\AppData\Local\.bvm" and re-open your terminal
```

**Solution:**

Run the following command:

```shell
setx path "%path%;%LocalAppData%\.bvm"
```

If you're running VSCODE - restart it (learn why [here](https://github.com/microsoft/vscode/issues/47816)).
