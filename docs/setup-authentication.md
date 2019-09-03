---
id: setup-authentication
title: Setup bit.dev Authentication
---

Before working with [bit.dev](https://bit.dev), configure your Bit client to your bit.dev account.

## Signup to bit.dev

[Create a free account](https://bit.dev/signup) on [bit.dev](https://bit.dev).

## Connect Bit CLI to your bit.dev account

There are two methods to authenticate a local Bit client to your [bit.dev](https://bit.dev) account.

> **Bit communication protocol**
>
> Bit uses **SSH** as its network protocol, as in most cases it is already set up, and if not, it's easy to do so. SSH is also an authenticated network protocol; and because it’s ubiquitous, it’s generally easy to set up and use.
> This makes SSH the preferred method for collaboration.

### Authenticate Bit using 'bit login'

Use [bit login](/docs/cli-login.html) to generate an authentication token for a [bit.dev]. Bit uses the token to configure the local Bit configuration.

To authenticate your Bit client, run the following command:

```bash
$ bit login
Your browser has been opened to visit: https://bit.dev/bit-login?redirect_uri=http://localhost:8085...
```

The browser opens to a login page. Enter your [bit.dev](https://bit.dev) account credentials. The authentication token is generated and configured to [bit config](/docs/cli-config.html).

#### Manage authenticated devices

To see a list of all logged-in devices, go to [profile settings](https://bit.dev/settings).  
You can remove tokens, forcing Bit clients to re-authenticate themselves with your account.

### Authenticate Bit using SSH key-pair

If you know how to generate your SSH key, you can skip the next part and move to [authenticate your SSH Key to bit.dev](#upload-public-ssh-key-to-bitsrcio).

#### Generate SSH key for macOS/Linux

To generate an SSH key follow these steps:

1. Open a terminal application.
2. Run this command (replace ‘email’ with the email associated with your Bit.dev account):

`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

3. Accept the default location for the key file.
4. To add a private key to the SSH-agent please follow the steps below:

Start the SSH agent: `eval "$(ssh-agent -s)"`

Add the private key we’ve created in the last step: `ssh-add ~/.ssh/id_rsa`

#### Generate SSH key for Windows

To generate an SSH key, please follow these steps:

1. Download and start the [puttygen.exe generator](https://winscp.net/eng/docs/ui_puttygen).
2. In the "Parameters" section choose **SSH2 DSA** and press **Generate**.
3. Move your mouse on the small screen to generate the key pairs.
4. Enter a key comment, which identifies the key (useful when you use several SSH keys).
5. Click "Save private key" to save your private key.
6. Click "Save public key" to save your public key.

#### Upload public SSH key to bit.dev

1. Log in to your [bit.dev](https://bit.dev/login) account.
2. Click on the user icon to open the user actions menu.
3. Click on the ‘Settings’ link to reach the user settings section. Once inside, click on ‘SSH Keys’ in the left pane.
4. In the ‘SSH Keys’ section, click on ‘new SSH key’.
5. Type a name for the key. The key name documents the key, and will not affect the behavior of the system.
6. `Key` - Copy the content of the file `id_rds.pub`.
7. Click on ‘Add SSH key’.

A new item is added to the SSH key list. This means that you are now connected via SSH and can export and import components from the [bit.dev](https://bit.dev) community hub.

## Configure your local Bit client

To set your username and email in Bit, use the [bit config command](/docs/cli-config.html).

* If you've used `bit login` to authenticate, the username and email is set according to the Bit account.
* If no configuration values are defined for Bit, it falls back to read the values from `git config`.

```bash
$ bit config set user.name "mickey mouse"
$ bit config set user.email mickey@example.com
```
