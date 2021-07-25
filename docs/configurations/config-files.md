---
id: config-files
title: Config Files
---

## Bit config

Bit's (global) configuration is registered in the `~/Library/Caches/Bit/config/config.json` file.

Learn more about it [here](./global-configurations.md).

## npm config `.npmrc`

npm's configuration (read by Yarn, as well). Use it to configure your organization/username on Bit Cloud as a [scoped registry](https://docs.npmjs.com/cli/v7/using-npm/scope). That will enable you to install your components using npm or Yarn.


### Set a scoped registry using npm CLI

```shell
npm config set '@owner:registry' https://node.bit.dev
```
> The 'owner' is your organization or username.

### Set a scoped registry manually

To set it manually choose the `.npmrc` file to modify:

* per-project config file (/path/to/my/project/.npmrc)
* per-user config file (~/.npmrc)
* global config file ($PREFIX/etc/npmrc)
* npm builtin config file (/path/to/npm/npmrc)

```
@<owner>:registry=https://node.bit.dev
@teambit:registry=https://node.bit.dev
//node.bit.dev/:_authToken=${BIT_TOKEN}
always-auth=true
```

* When running `bit login` the `.npmrc` file is updated with the `_authToken`. However, there could be cases where a `bit login` is not executed (for example, on a remote CI).
In these cases, you can set the `_authToken` value manually. Get the Bit token from a logged-in machine, by running `bit config get user.token`.

* `@teambit` should also be configured to get access to Bit dependencies.