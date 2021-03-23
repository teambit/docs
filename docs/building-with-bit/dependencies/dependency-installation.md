---
id: dependency-installation
title: Dependency installation
---

Dependency installation is handled by the [Dependency Resolver extension](https://bit.dev/teambit/dependencies/dependency-resolver).

Dependency Resolver directs the package manager to install the right packages at the right place in the workspace file structure.

## Install command

:::note install and import
The 'install' process includes importing components (listed in the workspace `.bitmap` file) and linking them to the `node_modules` directory.
:::

:::note registry authentication
By default, the Dependency Resolver installs packages from Bit.dev's registry. The authentication for that is done using your Bit.dev token, listed under `@bit`, in your `.npmrc` file.
If that token cannot be found in the `.npmrc` file, it will look for it in your global Bit configurations (use the `bit config` command to output your `user.token` property).

If your npm is configured to use a registry different than npmjs's - the Dependency Resolver will use that configured registry, instead.
:::

### Install all dependencies listed in the Dependency Resolver configuration

```shell
bit install
```

### Install the latest version of a package

```shell
bit install <package>

// For example
bit install lodash
```

### Install a specific version of a package

```shell
bit install <package>@<version>

// For example
bit install lodash@1.0.0
```

### Install packages that are already listed in the Dependency Resolver policies

When trying to install a specific package that is already listed in the Dependency Resolver policies, an error will be thrown.  
To override it:

```shell
bit install <package> --update-existing
```

-OR-

```shell
bit install <package> -u
```

### Install packages without importing components

The 'install' process includes importing components listed in the `.bitmap` file and linking them to the `node_modules` directory.
To disable importing and install all packages and components as standard packages use:

```shell
bit install --skip-import
```

## Enforce the installation of a specific package version

The dependency resolver determines the package version that best fits the requirements of most components consuming the same package.
It then installs it at the root of the workspace to make it available to all components sharing the same package (those that cannot use it will have their dependency installed inside their own directory).

It may happen that a package installed by the Dependency Resolver is not with the same version that was specified in the Dependency Resolver policy.
To enforce the installation of the exact version specified in the policy, set the `preserve` property to `true`.

```json
{
  "teambit.dependencies/dependency-resolver": {
    "policy": {
      "dependencies": {
        "lodash": {
          "version": "3.0.0",
          "preserve": true
        }
      }
    }
  }
}
```

## Set a proxy for outgoing HTTP/HTTPS requests

The package manager can be configured to use a proxy for outgoing network requests.

`proxy` - A URL for a proxy to be used in both HTTP and HTTPS requests.

`httpsProxy` - A URL specific for HTTPS requests (this will override the value set in proxy for HTTPS requests).

```json title="workspace.json"
{
  "teambit.dependencies/dependency-resolver": {
    "proxy": "http://domain-one.proxy.com:8080",
    "httpsProxy": "http://domain-two.proxy.com:8080"
  }
}
```

#### A proxy can also be set in NPM's and Bit's global configurations.

#### To get the value for 'proxy'

```shell
bit config get proxy
```

#### To get the value for 'https-proxy'

```shell
$ bit config get https-proxy
```

#### To set a new 'proxy'

```shell
$ bit config set proxy <url>
```

For example:

```shell
$ bit config set proxy http://domain-one.proxy.com:8080
```

#### To set a new 'https-proxy'

```shell
$ bit config set https-proxy <url>
```

For example:

```shell
$ bit config set https-proxy http://domain-one.proxy.com:8080
```
