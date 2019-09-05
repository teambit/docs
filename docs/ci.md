---
id: ci
title: CI & Deployment
---

If you want to deploy a project using bit components on CI or on a deployment server you need to handle 2 cases:  

- Deploy a project with **installed** @bit components
- Deploy a project with **imported** Bit components

## Get a Bit token

The first thing to do is get a Bit token that has has access to all the collections that have the components to be installed.  
You can create a dedicated user such as dev@company.com for the deployment, or use an existing user's token.  
You can get the bit token from a logged-in user by running:  

```bash
bit config get user.token
```

Set the token as an environment parameter on your server named BIT_TOKEN.  

## Bit installed components

Bit components are stored on the bit registry located in `https://node.bit.dev`.  

When installing @bit component with npm or yarn, they will try to install the components starting with `@bit` by resolving the @bit registry. This configuration is stored in an `.npmrc` configuration file. Npm and yarn respect the following file locations:  

- per-project config file (`/path/to/my/project/.npmrc`)
- per-user config file (`~/.npmrc`)
- global config file (`$PREFIX/etc/npmrc`)
- npm builtin config file (`/path/to/npm/npmrc`)

Npm and yarn do not check `.npmrc` per package.

When working locally, bit login sets the registry pointer in the user's `.npmrc` file, so any installation is resolved from this location.  

When trying to install a @bit component on a CI or deployment server (CircleCI, Travis, Zeit, Netlify, Gitlab etc.), server that does not have the `.npmrc` configuration, you may encounter errors like these:  

**NPM**

```bash
failed running npm install at /Users/user/devenv/example-npm-error/components/utils/string/pad-left
npm ERR! code E404
npm ERR! 404 Not Found: @bit/bit.utils.string.pad-left@0.0.1
```

**Yarn**

```bash
failed running yarn install at /Users/user/devenv/example-npm-error/components/utils/string/pad-left
error An unexpected error occurred: "https://registry.yarnpkg.com/@bit%2fbit.utils.string.pad-left: Not found".
```

This should be solved by making sure that one of the `.npmrc` files has the configuration prior to running npm install. The solutions vary per vendor (see bellow), but there are few ways to resolve the issue:  

- Define `.npmrc` in the project.
- Generate .npmrc file for the CI user
- Extend `.npmrc` configuration with vendor's tools  

### Add `.npmrc` to the project

You can add a `.npmrc` in your project with the following:  

```bash
@bit:registry=https://node.bit.dev
//node.bit.dev/:_authToken=${BIT_TOKEN}
always-auth=true
```

> the always-auth=true is required when using Yarn. It is not required for npm.  

Define the BIT_TOKEN as a secret global variableon the server.

However, this will result that every time you will run npm install in a project that has this `npmrc` configuration, it will look first in this configuration. If the token is not set on the local machine, it will err.  

You can define the BIT_TOKEN in your shell environment parameter, yby running following command, or adding it to the shell configuration:  

```bash
export BIT_TOKEN=$(bit config get user.token)
```

### Generate `.npmrc` on server

> The file should be generated before running npm install, and the server should read it  

To generate the file dynamically, you need to run the following script (e.g. create a `bit_npm.sh` script):  

```bash
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

### Zeit

On Zeit, use the now.json configuration to extend npmrc configuration as follow:  

Add the following to `now.json`:  

```json
{
  "name": "bit",
  "version": 2,
  "builds": [{
    "src": "next.config.js",
    "use": "@now/next"
  }],
  "build": {
    "env": {
      "NPM_RC": "//registry.npmjs.org/:_authToken=NPM_TOKEN\n@bit:registry=https://node.bit.dev\n//node.bit.dev/:_authToken=_BIT_TOKEN"
    }
  }
}
```

> Make sure you are on Now 2

Add the BIT_TOKEN as [environment variable](https://zeit.co/docs/v2/build-step#using-environment-variables-and-secrets).

### Gitlab

In `.gitlab-ci.yml` run the script that [generates the file for the user](#) as initial step, before running npm install.  

Add the BIT_TOKEN as [environment variable](https://docs.gitlab.com/ee/ci/variables/)

## Bit imported components

If you have Bit imported components you may work in one of 2 ways:  

- Commit Bit components build artifacts to the Github repo.  
- Run `bit build` on the CI before building your project.  

If the built artifacts are deployed, you do not need to add any steps.  
To run bit build on yor project, you need to do the following:  

### Install bit-cli

According to the CI or deployment server, you can install it globally or locally in the project. You can install it locally on the project, simply by adding it as a develoment dependency in your project:  

```bash
npm install -D bit-bin
```

### Configure bit-cli

To configure bit on the server, you need to run the following commands:  

```bash
bit config set analytics_reporting false
bit config set anonymous_reporting false
bit config set user.token ${BIT_TOKEN}
```

You can do it by committing a `bit-ci.sh` file at the root of your project. Make sure the config file has execution permissions by running `chmod +x ./bit-ci.sh`.  

To run bit build add an npm script in your package.json:  

```bash
"bit-build": "bit build",
```

Run `npm run build` before running the project build. For example:

```bash
./bit-ci.sh
npm run bit-build
...rest of your project build
```

## Common Errors

### 'package not found' when importing a component

NPM or Yarn throws 'package not found' when importing a component. This is likely because the component has a dependency on a @bit component. Make sure [npmrc is configured](#bit-installed-components).

### Unauthorized (401) when installing a component

Possible reasons:  

- npmrc is not properly [configured](#bit-installed-components)
- You do not have the right permissions on the Collection that the components are hosted in, and unable to access its components. Make sure you have at least read permissions to the collection that host the components.  
- Yarn does not send authentication token when installing packages from a `yarn.lock` file. This is a [known issue](https://github.com/yarnpkg/yarn/issues/4451). Make suer `always-auth` is [configured in `.npmrc`](#bit-installed-components).
