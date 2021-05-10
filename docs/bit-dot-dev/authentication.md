---
id: authentication
title: Authentication
---

You can install and import public components on anonymous mode, i.e. without authenticating with bit.dev.  
To export components to bit.dev and to import from private scopes you need to setup [a free account](https://bit.dev/signup) on [bit.dev](https://bit.dev).

Exporting components to bit.dev requires that Bit client (Bit cli) on your machine is logged in to the account.

> A token or a key is associated with a single user, and the privileges, such as scopes visibility and access, are determined according to that user's privileges.

bit.dev server is using the following IP addresses: `35.184.176.52:443`

## Authenticate with Token

Use `bit login` to generate an authentication token for a [bit.dev]. Bit uses the token to configure the local Bit configuration.

To authenticate your Bit client, run the following command:

```shell
bit login
```

The browser opens to a login page. Enter your [bit.dev](https://bit.dev) account credentials. The authentication token is generated and configured to `bit config`.

### Additional Tokens

bit.dev stores a token per machine. When re-logging on the same machine, the previous token expires and a new token is created. If you want to a permanent token (e.g. for CI), you can set a machine name in the login. The token will be associated with that machine name, and only expires when performing another login with the same machine name:

```shell
bit login --machine-name=ci_server
```

To see a list of all logged-in devices, go to [profile settings](https://bit.dev/settings).
You can remove tokens, forcing Bit clients to re-authenticate themselves with the account.

> You can send a specific token for each command you are running and is accessing a remote scope by specifying the `--token` flag with the relevant token.

## Authenticating package managers

It is possible to consume components exported to bit.dev using `npm` or `yarn`.  
When you run `bit login`, Bit automatically configures your token in your users' [npmrc file](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc). Once done, any `npm i` or `yarn add` operation can fetch components from Bit.

## Configure local Bit client

To set your username and email in Bit, use the `bit config command`.

- If you've used `bit login` to authenticate, the username and email is set according to the Bit account.
- If no configuration values are defined for Bit, it falls back to read the values from `git config`.

```shell
bit config set user.name "mickey mouse"
bit config set user.email mickey@example.com
```

## Authentication issues

Several things you can do if you encounter the `fatal: permission to Scope <scopename> was denied` error message:

### Timeout after a long hang time

Bit uses HTTPS to communicate with remote servers. A long hang time and authentication failure is usually the result of a firewall blocking the relevant port (443).  
To see if that's the case, try and connect to the Bit remote server directly. If you are unable to connect, check the firewall configuration. If this test passes, email us at [support@bit.dev](mailto:support@bit.dev).

### Bit.dev account issues

Some issues may relate to simple account configuration issues.

#### You are not signed up to bit.dev

In order to import/export components hosted on [bit.dev](https://bit.dev) you need an to have an active account.  
If you haven't signed up already, head over [here](https://bit.dev/signup).

#### Wrong username/password combination

When authenticating via `bit login`, Bit will ask for your username/password combination for the relevant [bit.dev](https://bit.dev) account. Make sure you have provided the login command with the correct combination.  
In case you have forgotten your password, head over to your [settings page](https://bit.dev/settings/profile) to reset it.

#### No permissions for the Scope

It may be that you do not have permissions to access the Scope in question.

- If the Scope is public, you can import component from it, but you have to have write permissions to export to it.
- If the Scope is private, you must have read/write permission in order to import/export components from/to it.
