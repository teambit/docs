---
id: authentication-issues
title: Authentication Issues
permalink: docs/authentication-issues.html
layout: docs
category: Troubleshooting
prev: troubleshooting-doctor.html
next: troubleshooting-isolating.html
---

There are several things you can do if you encountered `fatal: permission to Collection <collectionname> was denied` error message.

## Timeout after a long hang time

Bit uses SSH to communicate with remote servers. A long hang time and authentication failure is usually the result of a firewall blocking the connection.  
To see if that's the case, try and connect to the Bit remote server directly. If you are unable to connect, check the firewall configuration. If this test passes, email us at [support@bit.dev](support@bit.dev).

**MacOS/Linux**

```sh
$ ssh hub.bit.dev
```

**Windows**

```sh
$ telnet hub.bit.dev 22
```

## Bit.dev account issues

Some issues may relate to simply account configuration issues.

### You are not signed up to bit.dev

In order to import/export components hosted on [bit.dev](https://bit.dev) you need an to have an active account.  
If you haven't signed up already, head over [here](https://bit.dev/signup).

### Wrong username/password combination

In case you are not using [SSH key for authentication](/docs/setup-authentication.html), Bit will ask for your username/password combination for your [bit.dev](https://bit.dev) account. Make sure you have provided with the correct combination of it.  
In case you have forgotten your password, head to your [setting page](https://bit.dev/settings/profile) to reset it.

### No permission to the Collection

It may be that you do not have permissions to access the Collection in question.

- If the Collection is public, you can import component from it, but you have to have write permissions to export to it.
- If the Collection is private, you must have read/write permission in order to import/export components to it.

## SSH keys issues

Bit uses SSH as the communication protocol between Bit and [bit.dev](https://bit.dev). In order to make this process works smoothly, you require to either configure Bit to use a specific SSH key, [as seen here](/docs/setup-authentication.html).  
There are several configuration issues that may occur if you hit any permission issues when working with SSH keys and remote Collections.

**If the SSH connection is not established due to issues with SSH keys, Bit will fail to authenticate.**

> *Bit and SSH Agent*
>
> In you are using SSH agent to store and manage your private SSH keys, Bit will communicate with it to use them when opening a remote connection.

### Private SSH key not found

Check for the location of the private SSH key that is either configured to your SSH agent. If the configured path points to a wrong location, Bit will not be able to authenticate.

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

Check if you are using the right public SSH key for your profile.