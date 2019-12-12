---
id: installation
title: Installation
---

Check if bit is installed using:

```bash
$bit --version
14.7.1
```

## Install via NPM / Yarn

> Requires node 8.12 and above.

```bash
npm install bit-bin --global
yarn global add bit-bin  
```

## MacOS

Install with Homebrew:

To install Bit with [Homebrew](https://brew.sh) run:

```sh
brew install bit
```

Or download Bit executable and copy the bit executable to a directory in your path, or any directory that will be added to your path:

```sh
curl -Lo bit https://github.com/teambit/bit/releases/download/v14.7.1/bit-bin-macos  
chmod +x bit
sudo cp bit /usr/local/bin/  
rm bit
```

## Windows

Download Bit executable Windows `.exe` file from [here](https://github.com/teambit/bit/releases/download/v14.7.1/bit-bin-win.exe). Rename it to `bit.exe` and add it to your `PATH`:

```sh
set PATH=%PATH%;C:\bit\
```

## Unix

Use a package installer:

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

Or download Bit executable and copy it to a directory in your path, or any directory that will be added to your path:

```sh
curl -Lo bit https://github.com/teambit/bit/releases/download/v14.7.1/bit-bin-linux
chmod +x bit
sudo cp bit /usr/local/bin/  
rm bit
```

If you are experiencing issues when using an old version of Bit, please try installing the latest one according to your installation method from above.
