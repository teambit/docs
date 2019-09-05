---
id: troubleshooting-install-components
title: Installation Errors
---

There are several issues you may encounter when you install or import a component from [bit.dev](https://bit.dev).

## NPM or Yarn throws 'package not found' when importing a component

If you are importing a component using `bit import`, and you get a message similar to these:

**NPM**

```bash
failed running npm install at /Users/iteymendel/devenv/example-npm-error/components/utils/string/pad-left
npm ERR! code E404
npm ERR! 404 Not Found: @bit/bit.utils.string.pad-left@0.0.1
```

**Yarn**

```bash
failed running yarn install at /Users/iteymendel/devenv/example-npm-error/components/utils/string/pad-left
error An unexpected error occurred: "https://registry.yarnpkg.com/@bit%2fbit.utils.string.pad-left: Not found".
```

This means that when a component you are importing from [bit.dev](https://bit.dev) has other component dependencies, by default Bit will try to install the dependencies as node modules, using NPM or Yarn. This means that your package manager needs to have `@bit` defined as a scoped registry, so it can install packages from there.

To do so, run the following command and use your [bit.dev](https://bit.dev) credentials.

```bash
npm login --registry=https://node.bit.dev --scope=@bit
```

Or without authentication to Bit (for public component only):

```bash
npm config set '@bit:registry' https://node.bit.dev
```

Read more about this feature [here](/docs/installing-components-using-package-managers.html).

## Getting unauthorized (401) when installing a component

### Not sufficient permissions to the remote Collection

You do not have the right permissions on the Collection that the components are hosted in, and unable to access its components.

To resolve this issue contact the Collection admin, and request for Read permissions.

### Yarn does not send the authentication token with the install command

If you have the required permission to install components from a Collection, and you are pulling a repository which has a committed yarn.lock file, and the installation of components returns an error saying it is 'unauthorized' (HTTP 401), this means that you encounter an [open issue](https://github.com/yarnpkg/yarn/issues/4451) that causes Yarn not to send its authentication token when installing packages from a `yarn.lock` file.

To resolve this set the always-auth parameter to true in the project's `.npmrc`. This will force the authentication token to each package installation.

### Failing to Install Font Awesome Pro

If you try to install a component from bit that is dependent on font-awesome pro, you might end up getting the standard font-awesome as published to npm.

This is resulting from the fact that Font Awesome Pro is installed on a private registry, defined in the `.npmrc` file with a dedicated authentication token.

The problem is that npm and yarn only respect `.npmrc` installed in the following locations:

- per-project config file (`/path/to/my/project/.npmrc`)
- per-user config file (`~/.npmrc`)
- global config file (`$PREFIX/etc/npmrc`)
- npm builtin config file (`/path/to/npm/npmrc`)

npm and yarn simply do not check the .npmrc file installed for a specific package.

Sadly, this cannot really be worked around with the current version of npm / yarn and bit and require that the registry definition will be configured per machine. It also means that the bit.dev component playground will fail to load. This is planned to be solved in a future bit version.

Alternatively, you can download and wrap the icons library as a dependency, with frequent updates from the font-awesome registry.
