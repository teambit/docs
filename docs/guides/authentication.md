---
id: authentication
title: Bit User Authentication
sidebar_label: User Authentication
---

This guide describes how to connect bit client (cli) to work with the [Bit cloud](https://bit.dev) account. 

## Connect Bit Client to Bit Account

You should have a [bit.dev](https://bit.dev) account or [Create one](https://bit.dev/signup).

There are two methods to authenticate a local Bit client with [bit.dev](https://bit.dev) account: 

- Using login credentials
- Using SSH

> **Using SSH in Bit**
>
> SSH is the preferred network protocol when using Bit. Bit uses **SSH** as its network protocol, as in most cases it is already set up, and if not, it's easy to do so. SSH is also an authenticated network protocol; and because it’s ubiquitous, it’s generally easy to set up and use.

### Authenticate with Bit-Login

The `bit login` command generates a private SSH token for the specific computer and configures it automatically to the logged-in account. It is still uses the SSH protocol for establishing the connection and sending/receiving data.  
From the command line run:  

```bash
bit login
```

The [bit login](/docs/cli-login.html) command opens the browser window to log into the [bit.dev](https://bit.dev) account.

Upon successful login, a new authentication token will be created and placed in the bit client configuration. The token can be seen by running:  

```bash
bit config
```

### Authenticate with SSH Keys

For authentication with SSH keys, as explained [here](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html), the public SSH key should be uploaded to `bit.dev`:

1. Log in to your [bit.dev](https://bit.dev/login) account.
1. Click on the user icon to open the user actions menu.
1. Click on the ‘Settings’ link to reach the user settings section. Once inside, click on ‘SSH Keys’ in the left pane.
1. In the ‘SSH Keys’ section, click on ‘new SSH key’.
1. Type a name for the key. The key name documents the key, and will not affect the behavior of the system.
1. `Key` - Copy the content of the file `id_rds.pub`.
1. Click on ‘Add SSH key’.

A new item is added to the SSH key list. This means that you are now connected via SSH and can export and import components from the [bit.dev](https://bit.dev) hub.

## Manage authentication Tokens

To see a list of all logged-in devices, go to [profile settings](https://bit.dev/settings).  
You can remove tokens, forcing Bit clients to re-authenticate themselves with the account.

## Configure Bit Client User Credentials

User data should be set using the bit [CLI tool](docs/cli-config.html).  

```bash
bit config set user.name "Tuko Whaff"
bit config set user.email tuko@bit-dev.com
```

> If `bit login` was used, the username and email is set according to the Bit account.
> If no data is set in the user credentials, Bit will attempt to use the git configuration on the local machine.  

## Common Authentication Problems

If you are using SSH agent to store and manage your private SSH keys, Bit will communicate with it to use them when opening a remote connection.

The following error message can show up if there are authentication problems:

```sh
fatal: permission to Collection <collectionname> was denied
```

### Timeout after a long hang time

Bit uses SSH to communicate with remote servers. A long hang time and authentication failure is usually the result of a firewall blocking the connection.  
To see if that's the case, try and connect to the Bit remote server directly. If you are unable to connect, check the firewall configuration. If this test passes, email us at [support@bit.dev](support@bit.dev).

#### MacOS / Linux

```sh
ssh hub.bit.dev
```

#### windows

```sh
telnet hub.bit.dev 22
```

### You are not signed up to bit.dev

In order to import/export components hosted on [bit.dev](https://bit.dev) you need an to have an active account.  
If you haven't signed up already, head over [here](https://bit.dev/signup).

### Wrong username/password combination

In case you are not using SSH key for authentication Bit will ask for your username/password combination for your [bit.dev](https://bit.dev) account. Make sure you have provided with the correct combination of it.  
In case you have forgotten your password, head to your [setting page](https://bit.dev/settings/profile) to reset the password.

### No permission to the Collection

It may be that you do not have permissions to access the collection in question.

- If the Collection is public, you can import component from it, but you have to have write permissions to export to it.
- If the Collection is private, you must have read/write permission in order to import/export components to it.

### Private SSH key not found

Check for the location of the private SSH key that is  configured to your SSH agent. If the configured path points to a wrong location, Bit will not be able to authenticate.

### SSH Agent process is down

Check if the SSH agent process is running correctly, and you key is configured.  
Run these command to start the process and add the correct private key.

```bash
eval "$(ssh-agent -s)"
ssh-add -K ~/.ssh/id_rsa
```

### SSH key has a passphrase

In case you use `bit config ssh_key_file` to point Bit to the location of your private key, and that key has a passphrase, Bit will not be able to use it properly. In such cases, please refer to using an SSH agent instead.

### No/Wrong public key uploaded to bit.dev

Go to you profile settings and make sure the correct public key was uploaded to Bit.  

### Verbose SSH log data

In case you encounter an SSH connectivity issue, you can add an environment variable prior to running the Bit remote command. For example:

```sh
BIT_LOG=ssh bit import ...
BIT_LOG=ssh bit export ...
BIT_LOG=ssh bit list ...
```

#### SSH Uses a non-default port

The default port for the SSH protocol is 22. If you have a connectivity issue with a collection hosted on [bit.dev](https://bit.dev). In some cases, the OS default port for SSH is different. When you run Bit with `BIT_LOG=ssh`, you might see this error:

```sh
ssh, failed to connect using token. failed to authenticate with user token. generate a new token by running `bit logout && bit login`. due to an error "connect ETIMEDOUT 104.154.25.145:10"
```

Note that Bit tried to connect to the remote server using port 10 (104.154.25.145:**10**), you can force port 22 by running:

```sh
bit config set hub_domain hub.bit.dev:22
```
