---
id: setup-authentication
title: bit.dev Authentication
sidebar_label: Authentication
---

You can install and import public components on anonymous mode, i.e. without authenticating with bit.dev.  
To export components to bit.dev and to import from private collections you need to setup [a free account](https://bit.dev/signup) on [bit.dev](https://bit.dev).  

Exporting components to bit.dev requires that Bit client (Bit cli) on your machine is logged in to the account. Bit tries to log into the server according to the steps defined [here](/docs/bit-server#authentication).  

> A token or a key is associated with a single user, and the privileges, such as collections visibility and access, are determined according to that user's privileges.  

bit.dev server is using the following IP addresses:  

- 104.154.235.126:22  
- 35.184.176.52:443  

## Authenticate with Token

Use [bit login](/docs/apis/cli-all#login) to generate an authentication token for a [bit.dev]. Bit uses the token to configure the local Bit configuration.

To authenticate your Bit client, run the following command:

```bash
$ bit login
Your browser has been opened to visit: https://bit.dev/bit-login?redirect_uri=http://localhost:8085...
```

The browser opens to a login page. Enter your [bit.dev](https://bit.dev) account credentials. The authentication token is generated and configured to [bit config](/docs/apis/cli-all#config).

### Additional Tokens

bit.dev stores a token per machine. When re-logging on the same machine, the previous token expires and a new token is created. If you want to a permanent token (e.g. for CI), you can set a machine name in the login. The token will be associated with that machine name, and only expires when performing another login with the same machine name:  

```bash
bit login --machine-name=ci_server
```

To see a list of all logged-in devices, go to [profile settings](https://bit.dev/settings).  
You can remove tokens, forcing Bit clients to re-authenticate themselves with the account.

> You can send a specific token for each command you are running and is accessing a remote collection by specifying the `--token` flag with the relevant token.

## Authenticate with SSH

It is also possible to work with SSH key pair to authenticate with bit.dev.  

Follow the steps described [here](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) for generating SSH keys.

If you know how to generate your SSH key, you can skip the next part and move to [authenticate your SSH Key to bit.dev](#upload-public-ssh-key-to-bitsrcio).
Follow the steps below to generate SSH keys:  

### Generate SSH key

<!--DOCUSAURUS_CODE_TABS-->
<!--MacOS / Linux-->

1. Open a terminal application.
1. Run this command (replace ‘email’ with the email associated with your Bit.dev account): `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
1. Accept the default location for the key file.
1. Start the SSH agent: `eval "$(ssh-agent -s)"`
1. Add the private key we’ve created in the last step: `ssh-add ~/.ssh/id_rsa`

<!--Windows-->

1. Download and start the [puttygen.exe generator](https://winscp.net/eng/docs/ui_puttygen).
1. In the "Parameters" section choose **SSH2 DSA** and press **Generate**.
1. Move your mouse on the small screen to generate the key pairs.
1. Enter a key comment, which identifies the key (useful when you use several SSH keys).
1. Click "Save private key" to save your private key.
1. Click "Save public key" to save your public key.

<!--END_DOCUSAURUS_CODE_TABS-->

### Upload public SSH key to bit.dev

1. Log in to your [bit.dev](https://bit.dev/login) account.
1. Click on the user icon to open the user actions menu.
1. Click on the ‘Settings’ link to reach the user settings section. Once inside, click on ‘SSH Keys’ in the left pane.
1. In the ‘SSH Keys’ section, click on ‘new SSH key’.
1. Type a name for the key. The key name documents the key, and will not affect the behavior of the system.
1. `Key` - Copy the content of the file that you generated and ends with `.pub`.
1. Click on ‘Add SSH key’.  

A new item is added to the SSH key list. This means that you are now connected via SSH and can export and import components from the [bit.dev](https://bit.dev).

## Configure local Bit client

To set your username and email in Bit, use the [bit config command](/docs/apis/cli-all#config).

- If you've used `bit login` to authenticate, the username and email is set according to the Bit account.
- If no configuration values are defined for Bit, it falls back to read the values from `git config`.

```bash
bit config set user.name "mickey mouse"
bit config set user.email mickey@example.com
```

## Authentication issues

Several things you can do if you encountered `fatal: permission to Collection <collectionname> was denied` error message:

### Timeout after a long hang time

Bit uses SSH to communicate with remote servers. A long hang time and authentication failure is usually the result of a firewall blocking the relevant port (22).  
To see if that's the case, try and connect to the Bit remote server directly. If you are unable to connect, check the firewall configuration. If this test passes, email us at [support@bit.dev](mailto:support@bit.dev).

Make sure you have telnet installed, and run the following command. If you get the response bellow, you have access to your account with SSH.  

```sh
$ telnet hub.bit.dev 22
Trying 104.154.25.145...
Connected to hub.bit.dev.
Escape character is '^]'.
SSH-2.0-ssh2js0.4.6srv
```

### Bit.dev account issues

Some issues may relate to simply account configuration issues.

#### You are not signed up to bit.dev

In order to import/export components hosted on [bit.dev](https://bit.dev) you need an to have an active account.  
If you haven't signed up already, head over [here](https://bit.dev/signup).

#### Wrong username/password combination

In case you are using `bit login`, Bit will ask for your username/password combination for your [bit.dev](https://bit.dev) account. Make sure you have provided with the correct combination of it.  
In case you have forgotten your password, head to your [setting page](https://bit.dev/settings/profile) to reset it.

#### No permission to the Collection

It may be that you do not have permissions to access the Collection in question.

- If the Collection is public, you can import component from it, but you have to have write permissions to export to it.
- If the Collection is private, you must have read/write permission in order to import/export components to it.

### SSH keys issues

Several configuration issues may occur if you hit any permission issues when working with SSH keys and remote collections.

**If the SSH connection is not established due to issues with SSH keys, Bit will fail to authenticate.**

> *Bit and SSH Agent*
>
> In you are using SSH agent to store and manage your private SSH keys, Bit will communicate with it to use them when opening a remote connection.

#### Private SSH key not found

Check for the location of the private SSH key that is either configured to your SSH agent. If the configured path points to a wrong location, Bit will not be able to authenticate.

#### SSH Agent process is down

Check if the SSH agent process is running correctly, and you key is configured.  
Run these command to start the process and add the correct private key.

```bash
eval "$(ssh-agent -s)"
ssh-add -K ~/.ssh/id_rsa
```

#### SSH key has a passphrase

In case you use `bit config ssh_key_file` to point Bit to the location of your private key, and that key has a passphrase, Bit will not be able to use it properly. In such cases, please refer to using an [SSH agent](https://www.ssh.com/ssh/agent#sec-Starting-code-ssh-agent-code) instead.

#### No/Wrong public key uploaded to bit.dev

Check if you are using the right public SSH key for your profile.  
