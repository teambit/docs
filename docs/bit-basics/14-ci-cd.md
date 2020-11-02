---
id: ci-cd
title: Add to CI/CD
---

The CI process here is supporting two different use cases:  

- If you want to only install components on the CI using NPM or Yarn, follow the steps bellow to [get a token](#get-a-bit-token), and [configure .npmrc on CI](#config-npmrc-on-ci).
- If you want to run Bit commands on server, such as import or build, follow the steps above and also the steps to [run bit commands](#run-bit-commands).

### Examples

- [Bit with GitHub Actions](https://github.com/teambit/bit-with-github-actions)
- [Bit with Azure DevOps](https://github.com/teambit/bit-with-azure-devops)

## Get a Bit token

The first thing to do is get a Bit token that has has access to all the collections that have the components to be installed.  
You can create a dedicated user such as `dev@company.com` for the deployment, or use an existing user's token.
If you are using an existing user's token, follow the steps described [here](/docs/setup-authentication#additional-tokens) to generate a token that does not expire on local logins.  

Login with the CI user to get the user's token:  

```shell
bit config get user.token
```

Set the token as an environment parameter on your server named BIT_TOKEN.  

## Config npmrc on CI

Bit components are stored on the bit registry located in `https://node.bit.dev`.  

When installing @bit component with npm or yarn, they will try to install the components starting with `@bit` by resolving the @bit registry. This configuration is stored in an `.npmrc` configuration file. Npm and yarn respect the following file locations:  

- per-project config file (`/path/to/my/project/.npmrc`)
- per-user config file (`~/.npmrc`)
- global config file (`$PREFIX/etc/npmrc`)
- npm builtin config file (`/path/to/npm/npmrc`)

Npm and yarn do not check `.npmrc` per package.

When working locally, bit login sets the registry pointer in the user's `.npmrc` file, so any installation is resolved from this location.  

When trying to install a @bit component on a CI or deployment server (CircleCI, Travis, ZEIT Now, Netlify, Gitlab etc.), server that does not have the `.npmrc` configuration, you may encounter errors like these:  

**NPM**

```shell
failed running npm install at /Users/user/devenv/example-npm-error/components/utils/string/pad-left
npm ERR! code E404
npm ERR! 404 Not Found: @bit/bit.utils.string.pad-left@0.0.1
```

**Yarn**

```shell
failed running yarn install at /Users/user/devenv/example-npm-error/components/utils/string/pad-left
error An unexpected error occurred: "https://registry.yarnpkg.com/@bit%2fbit.utils.string.pad-left: Not found".
```

The error is solved by making sure that one of the `.npmrc` files has the configuration prior to running npm install. The solutions vary per vendor (see bellow), but the main methods are:  

- Define `.npmrc` in the project.
- Generate .npmrc file for the CI user
- Extend `.npmrc` configuration with vendor's tools  

### Add `.npmrc` to the project

You can add a `.npmrc` in your project with the following:  

```shell
@bit:registry=https://node.bit.dev
//node.bit.dev/:_authToken=${BIT_TOKEN}
always-auth=true
```

> the always-auth=true is required when using Yarn. It is not required for npm.  

Define the BIT_TOKEN as a secret global variableon the server.

However, this will result that every time you will run npm install in a project that has this `npmrc` configuration, it will look first in this configuration. If the token is not set on the local machine, it will err.  

You can define the BIT_TOKEN in your shell environment parameter, yby running following command, or adding it to the shell configuration:  

```shell
export BIT_TOKEN=$(bit config get user.token)
```

### Generate `.npmrc` on server

> The file should be generated before running npm install, and the server should read it  

To generate the file dynamically, you need to run the following script (e.g. create a `bit_npm.sh` script):  

```shell
echo "Adding bit.dev to npm registry"
echo "always-auth=true" >> ~/.npmrc
echo "@bit:registry=https://node.bit.dev" >> ~/.npmrc
echo "//node.bit.dev/:_authToken={$BIT_TOKEN}" >> ~/.npmrc
echo "Completed adding bit.dev to npm registry"
```

> the always-auth=true is required when using Yarn. It is not required for npm.  

### Netlify

On Netlify, [you cannot generate the file dynamically](https://community.netlify.com/t/common-issue-using-private-npm-modules-on-netlify/795/11), and you should [add `.npmrc` file in your project](#define-npmrc-in-the-project).  

Add the BIT_TOKEN as [environment variable](https://www.netlify.com/docs/continuous-deployment/#environment-variables)

### ZEIT Now

On ZEIT Now, use the `now.json` configuration file to add an [environment variable](https://zeit.co/docs/v2/build-step#using-environment-variables-and-secrets) containing the contents of your `~/.npmrc` file.

First, add the following to `now.json`:  

```json
{
  "name": "my-app",
  "version": 2,
  "build": {
    "env": {
      "NPM_RC": "@my-app-npmrc"
    }
  }
}
```

Then, create a secret with the contents of your `~/.npmrc`.

```shell
now secrets add my-app-npmrc "$(cat ~/.npmrc)"
```

Note that `my-app-npmrc` is the name of the secret and can be named anything you wish.

### Gitlab

In `.gitlab-ci.yml` run the script that [generates the file for the user](#generate-npmrc-on-server) as initial step, before running npm install.  

Add the BIT_TOKEN as [environment variable](https://docs.gitlab.com/ee/ci/variables/)

### GitHub actions

Add the BIT_TOKEN as a [secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) in GitHub.

In the GitHub workflow file create a step before npm install section:

```shell
- name: init bit.dev
  run: |
    echo "Adding bit.dev to npm registry"
    npm config set @bit:registry https://node.bit.dev
    npm config set //node.bit.dev/:_authToken ${BIT_TOKEN}
    echo "Completed adding bit.dev to npm registry"
  env:
    BIT_TOKEN: ${{ secrets.BIT_TOKEN }}
```

### Heroku

To generate npmrc before installing dependencies, run a pre build script as described [here](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps).

Add the BIT_TOKEN as [environment variable](https://devcenter.heroku.com/articles/config-vars#managing-config-vars)

### Azure pipelines

Use the [npm authenticate task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/package/npm-authenticate?view=azure-devops) to setup the `.npmrc` configuration in your pipeline.  

## Run Bit commands

You can run the CI when importing Bit components in multiple ways:  

|Committed Items in VCS | Action to perform on CI |
|---|---|
| .bitmap file only, but no components source code | Bit import. Component is imported with built artifacts. |
| .bitmap and components source code without built artifacts | Bit import & Bit build. Component will be built from source code |
| Components source and built artifacts | No need to run build command |

### Install bit-cli

If you need to run a bit command (import or build) you need to install bit-cli on the CI machine.  

According to the CI or deployment server, you can install it globally or locally in the project. To install locally on the project, simply add it as a development dependency in your project:  

```shell
npm install -D bit-bin
```

### Configure bit-cli

To configure bit on the server, you need to run the following commands:  

```shell
bit config set analytics_reporting false
bit config set error_reporting false
bit config set user.token ${BIT_TOKEN}
```

You can do it by committing a `bit-ci.sh` file at the root of your project. Make sure the config file has execution permissions by running `chmod +x ./bit-ci.sh`.  

### Run Bit command

To run bit build add an npm script in your package.json:  

```shell
"bit-build": "bit build",
```

or  

```shell
"bit-import": "bit import",
```

Run the relevant bit command `npm run bit-build` or `npm run bit-import`  before running the project build. For example:

```shell
./bit-ci.sh
npm run bit-build
...rest of your project build
```

## Common Errors

### 'package not found' (404) when importing a component

NPM or Yarn throws 'package not found' when importing a component. This is likely because the component has a dependency on a @bit component. Make sure [npmrc is configured](#bit-installed-components).

### Unauthorized (401) when installing a component

Possible reasons:  

- npmrc is not properly [configured](#bit-installed-components)
- You do not have the right permissions on the Collection that the components are hosted in, and unable to access its components. Make sure you have at least read permissions to the collection that host the components.  
- Yarn does not send authentication token when installing packages from a `yarn.lock` file. This is a [known issue](https://github.com/yarnpkg/yarn/issues/4451). Make suer `always-auth` is [configured in `.npmrc`](#bit-installed-components).