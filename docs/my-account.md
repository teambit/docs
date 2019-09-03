---
id: my-account
title: My account
permalink: docs/my-account.html
layout: docs
prev: bitsrc-component-ci.html
next: bitsrc-plans.html
---

Manage your account. Make it awesome.

## My profile page

To view your profile page, log-in and click on your avatar at the top right page corner. Then click on "My Profile":

![alt text](https://storage.googleapis.com/bit-docs/myprofile1.png "Myprofile 1")

You will find all of your Collections under this page.

## Generating and Adding an SSH Key

A common transport protocol for Bit when self-hosting is over SSH. This is because SSH access to servers is already set up in most places – and if it isn’t, it’s easy to do. SSH is also an authenticated network protocol; and because it’s ubiquitous, it’s generally easy to set up and use.

This makes SSH the preferred method for collaboration when developing components for remote Collections.

### Generating an SSH key with MacOS

To generate an SSH key simply follow these steps:

1. Open the terminal application.
2. Run this command (replace ‘email’ with the email associated with your bit account):

`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

3. Accept the default location for the key file.
4. To add a private key to the SSH-agent please follow the steps below:

Start the SSH agent: `eval "$(ssh-agent -s)"`

Add the private key we’ve created in the last step: `ssh-add ~/.ssh/id_rsa`

### Generating an SSH key with Windows

To generate an SSH key, please follow these steps:

1. Download and start the [puttygen.exe generator](https://winscp.net/eng/docs/ui_puttygen).
2. In the "Parameters" section choose **SSH2 DSA** and press **Generate**.
3. Move your mouse randomly in the small screen in order to generate the key pairs.
4. Enter a key comment, which will identify the key (useful when you use several SSH keys).
5. Type in the passphrase and confirm it. The passphrase is used to protect your key. You will be asked for it when you connect via SSH.
6. Click "Save private key" to save your private key.
7. Click "Save public key" to save your public key.

## Changing profile Settings

To change your profile settings:
Click the avatar on the top right side and click "Settings":

![alt text](https://storage.googleapis.com/bit-docs/profilesettings1.png "Profile settings 1")

Change your avatar, password, or profile information

### Managing Emails

Go to profile settings and choose "Emails".
There you can manage your account's Emails, add Emails and set your primary Email.

![alt text](https://storage.googleapis.com/bit-docs/Screen%20Shot%202017-12-18%20at%206.08.36%20PM.png "Email settings 1")

## Changing my Avatar

To change your avatar:
Go to your Settings page (by clicking the avatar on the top right side).
Click "upload new avatar" next to your Avatar.
You will be redirected to [Gravatar](https://en.gravatar.com/site/signup).
Sign up and follow the steps to change your avatar.

## Updating my password

To update your password: 
Go to your Settings page (by clicking the avatar on the top right side).
Under the change password section, click "request a new one here." 
A password reset link will be sent to your registered email.
Follow the email instructions.

Note:
The link is valid for 24 hours.

If you face any problems, you can email us at [team@bit.dev](mailto:team@bit.dev).
