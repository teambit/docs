---
id: installation
title: Installing Bit
---

Check if bit is installed using:

```bash
bit --version
```

- [MacOS](#macos)
  - [Install with Homebrew](#install-with-homebrew)
  - [Download Bit executable](#download-bit-executable)
- [Windows](#windows)
  - [Download Bit executable](#download-bit-executable-1)
- [Unix](#unix)
  - [Using Package Installers](#using-package-installers)
  - [Download Bit executable](#download-bit-executable-2)
- [Install via NPM / Yarn](#install-via-npm--yarn)
- [Latest Version](#latest-version)

Once installed, verify the installation by running the following command:

## MacOS

### Install with Homebrew

To install Bit with [Homebrew](https://brew.sh) run:

```sh
$ brew install bit
```

### Download Bit executable

```sh
$ curl -Lo bit https://github.com/teambit/bit/releases/download/v14.4.1/bit-bin-macos && chmod +x bit
```

You can copy the bit executable to a directory in your path, or any directory that will be added to your path:

```sh
$ sudo cp bit /usr/local/bin/ && rm bit
```

## Windows

### Download Bit executable

- Download the Windows `.exe` file from [here](https://github.com/teambit/bit/releases/download/v14.4.1/bit-bin-win.exe)
- Rename it to `bit.exe` and add it to your `PATH`:
- Add file location to windows path:

```sh
set PATH=%PATH%;C:\bit\
```

## Unix

### Using Package Installers

<!--DOCUSAURUS_CODE_TABS-->
<!--Debian-->

```sh
sudo sh -c "echo 'deb [trusted=true] https://bitsrc.jfrog.io/bitsrc/bit-deb all stable' >> /etc/apt/sources.list"
sudo apt-get update && sudo apt-get install bit
```

<!--Ubuntu-->

```sh
sudo apt-get update && sudo apt-get install ca-certificates
sudo sh -c "echo 'deb [trusted=true] https://bitsrc.jfrog.io/bitsrc/bit-deb all stable' >> /etc/apt/sources.list"
sudo apt-get update && sudo apt-get install bit
```

<!--CentOS / Fedora / RHEL-->

```sh
sudo curl --silent --location https://static.bit.dev/rpm/bit.repo | sudo tee /etc/yum.repos.d/bit.repo
sudo yum install bit
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Download Bit executable

```sh
$ curl -Lo bit https://github.com/teambit/bit/releases/download/v14.4.1/bit-bin-linux && chmod +x bit
```

You can copy the bit executable to a directory in your path, or any directory that will be added to your path:

```bash
$ sudo cp bit /usr/local/bin/ && rm bit
```

## Install via NPM / Yarn

> Requires node 8.12 and above.

```bash
npm install bit-bin --global
    or
yarn global add bit-bin  
```

## Latest Version

```bash
$ bit -V
14.4.1
```

If you are experiencing issues when using an old version of Bit, please try installing the latest one according to your installation method from above.
