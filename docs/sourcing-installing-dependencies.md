---
id: sourcing-installing-dependencies
title: Installing Dependencies for Sourced Components
permalink: docs/sourcing-installing-dependencies.html
layout: docs
category: Getting Started
---

Most components have external dependencies and those can be installed in different ways.

Components can have dependencies - [external packages](/docs/adding-package-dependencies.html) or [other bit components](/docs/adding-file-dependencies.html).

```bash
$ bit install
```

[bit install](/docs/cli-install.html) installs all dependencies, whether they are external packages or other bit components.
External packages will be installed by a package manager such as NPM or Yarn, whereas component dependencies can be either installed using a package manager (which is the default option), or sourced.

## Installing dependencies using a package manager

By default, Bit would try to use Yarn to leverage [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) for optimized installation of all dependencies. Otherwise, if an installation of Yarn was not found, Bit would use NPM.

> **Note**
>
> To learn more on how to configure NPM and Yarn to install Bit components, please see [Installing Components](/docs/installing-components-using-package-managers.html#configuring-bit-as-a-registry-in-npm-and-yarn-clients).

### Yarn workspaces

[Yarn Workspaces](https://yarnpkg.com/en/docs/workspaces) is a Yarn feature that allows you to install dependencies from multiple `package.json` files in subdirectories of a single root `package.json` file.  
As components have separate `package.json` files, [Yarn Workspaces](https://yarnpkg.com/en/docs/workspaces) is ideal for the installation of component dependencies.  
To configure Bit to use Yarn for dependencies installation, configure the following in your project's [bit](/docs/conf-bit-json.html#packagemanager--string) config.

```js{2}
{
  "packageManager": "yarn"
}
```

### NPM

Dependencies can be configured to be installed with NPM.  
To configure Bit to use NPM for dependencies installation, configure the following in your project's [bit](/docs/conf-bit-json.html#packagemanager--string) config.

```js{2}
{
  "packageManager": "npm"
}
```

## Sourcing component dependencies

Component dependencies are installed as node modules by default, but they can also be sourced. 

### Sourcing a component after it has been installed as package

If you choose to source (`bit import`) a component that was earlier installed as a package, Bit will create `link files`, to ensure that when you require the component, its sourced version will be used, and not the installed package.

For example, you've imported component `A`, which depends on component `B`. Component `B` was installed as a package, by npm, so component `A` uses the packaged component `B`. Now you use `bit import` again, but this time to source component B. Bit will add a link file in component `A`'s `node_modules` directory, which directs it to the source file of component `B`. This is so that `A` will use the sourced code of `B` and will get the latest local changes.

The links bit adds to the `node_modules` directory can be overrun by package manager when those modify the contents of the `node_modules` directory.

If bit's links were overrun, you can explicitly run [bit link](/docs/cli-link.html) in order to recreate the link.

```bash
$ bit link
```

### Sourcing component dependencies by default

You can choose to install all component dependencies as sourced components (and not as packages) by default. When you choose this route, Bit will `import` the source files of each dependency to your project. Their package dependencies will be installed as usual.

To configure Bit to source component dependencies, configure the following in your project's [bit](/docs/conf-bit-json.html#savedependenciesascomponents--bool) config.

```js{2}
{
  "saveDependenciesAsComponents": "true"
}
```