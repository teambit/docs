---
id: conf-files
title: Project Configuration
---

This document explains project configuration in details

Bit project configuration can be separated into two parts:

- Workspace Configuration
- Imported Components Configuration

We manage both in the [workspace configuration](#workspace-configuration) object. While most components that originate from the same project likely share configurations, we can [set specifics](#setting-specific-component-configurations) for each component.  

Additionally, each **imported component** comes with its configuration. Bit separates the configuration of the imported component from the project's config.

### Workspace Configuration

The first step in any Bit project is to create the base config by running `bit init` in the repository root. Bit treats the location of the workspace configuration as the logical root of the project.  
After running the command, Bit generates the **workspace configuration**. If your project has a `package.json` file, open it to locate the `bit` key, otherwise, Bit generates a `bit.json` file to manage the configuration.  
Here's the base `bit` workspace configuration:

```js
"bit": {
    "env": {},
    "componentsDefaultDirectory": "components/{name}",
    "packageManager": "npm"
}
```

> **Workspace default configuration location**
>
> By default, Bit manages the workspace configuration as a `bit` key in your project's root `package.json` file. It is also possible to split it to another file and name it `bit.json`.

### Configure your development workflow

Bit reads the configuration set in the project's root whenever you run any Bit command. So you can define specific behaviors for Bit. Take the time and to get familiar with the [available configurations](/docs/conf-bit-json) and their defaults. Below are some of the configurations and their use-cases:

- `componentsDefaultDirectory` - Define a default directory for all imported components. Use `bit import --path` to override if needed.
- `saveDependenciesAsComponents` - Bit install all the component dependencies of components as node packages by default. If your components are not available to install via a registry, you should change Bit's default.
- `resolveModules` - In case your project uses costume module definition feature to support absolute paths when requiring a component, you should configure Bit's workspace with the same configuration, So Bit's automated dependency definition to work in such environment.
- `packageManager` - If you use a specific package manager, it is best to have Bit use the same tool to install the package dependencies of components.
- `dist` - Define the location for the build outputs of components in the project.

### Set default configuration for components

Bit manages two types of configurations for components. `env` for defining build and test configurations, and component dependencies. While `env` is manual, [dependency management is automated](/docs/add-and-isolate-components#component-dependencies).  
During the versioning process, Bit saves the current component configuration as part of the component-version.

#### Default component environment

Components in a project usually require the same build/test configuration and tooling. The various default pipelines for build and test are defined in the `env` parameter of the workspace configuration.
When we set a [build](/docs/building-components.html) or [test](/docs/testing-components.html) environment Bit sets them as default for the components tracked in the workspace. You can open your `package.json` file after setting a compiler and see the result.

```shell
$ bit import bit.envs/compilers/babel
$ cat package.json
...
"bit": {
    "env": {
        "compiler": "bit.envs/compilers/babel@6.0.0"
    }
}
```

#### Component dependency definition

While Bit's [automatically resolves and defines component dependencies](/docs/add-and-isolate-components#component-dependencies) according to the implementation of the component itself. This means that when you modify a component's implementation and add/remove an `import` statement to a package, file or a component - Bit changes the component dependencies configuration.

### Specific component configurations

Usually, most components in a project have the same configuration. However, if that's not the case, we can use Bit to set configs for any subset of components as well as for individual components.  
Use the `overrides` config to modify either component's `env`, as well as its dependencies.  
Here's a short snippet from a config that demos it:

- All new components has the default `react@6.0.0` compiler.
- Using `override`, we modified `utils/sort-array` to use `babel@6.0.0`.
- By setting a glob-pattern, all components in the `ui` namespace use the `react@16.8.6` compiler, and `react-dom@16.8.6` as `peerDependencies`.

```json
"bit": {
    "env": {
        "compiler": "bit.envs/compilers/react@6.0.0"
    },
    "componentsDefaultDirectory": "components/{name}",
    "packageManager": "npm",
    "overrides": {
        "utils/sort-array": {
            "env": {
                "compiler": "bit.envs/compilers/babel@6.0.0"
            }
        },
        "ui/*": {
            "peerDependencies": {
                "react": "16.8.6",
                "react-dom": "16.8.6"
            }
        }
    }
}
```

> **Note**
>
> You can use `overrides` to [modify](/docs/add-and-isolate-components#modify-dependency-version), [add](/docs/add-and-isolate-components#add-dependency) or [remove](/docs/add-and-isolate-components#remove-dependency) dependencies.

## Imported Component Configuration

Imported components have a different configuration from the workspace. Bit manages in the `package.json` of each imported component. You can find this file in the root directory of the component.  
Bit uses component configuration to create an environment for imported components with all dependencies and configurations.

To see a component's configuration, import a component, locate its `package.json`, and in it the `bit` key. For example, run the `import` command and print the `package.json`:

```shell
$ bit import bit.utils/array/diff
$ cat components/array/diff/package.json
{
    "name": "@bit/bit.utils.array.diff",
    "version": "1.0.0",
    "homepage": "https://bit.dev/bit/utils/array/diff",
    "main": "dist/src/array/diff.js",
    "dependencies": {},
    "devDependencies": {
        "chai": "^4.1.2"
    },
    "peerDependencies": {},
    "componentRootFolder": "components/array/diff",
    "license": "SEE LICENSE IN LICENSE",
    "bit": {
        "env": {
            "compiler": "bit.envs/compilers/flow@0.0.10",
            "tester": "bit.envs/testers/mocha@0.0.5"
        },
        "overrides": {}
    }
}
```

Here we see the component configuration file. This file is auto-generated from the component data. This means that to modify it we need to modify the component data. The data is located in the `bit` key.

### Modify a compiler or tester

To modify a compiler or tester for imported components, edit the right key with a new value, and run `bit build` or `bit test`. Bit automatically fetches the required environment and uses it to build it for the component.

### Modify dependencies

Use `overrides` to [modify](/docs/add-and-isolate-components#modify-dependency-version), [add](/docs/add-and-isolate-components#add-dependency) or [remove](/docs/add-and-isolate-components#remove-dependency) dependencies.

## Bit Configuration Example

The following is a detailed example of the Bit workspace configuration with multiple options. Learn more about each configuration [here](/docs/conf-bit-json)

```json
{
    "env": {
        "compiler": "bit.envs/compilers/react@0.0.3",
        "tester": "bit.envs/testers/karma-mocha-react@0.0.18"
    },
    "saveDependenciesAsComponents": "true",
    "packageManager": "yarn",
    "packageManagerArgs": ["--production", "--no-optional"],
    "packageManagerProcessOptions": {
        "shell": true
    },
    "useWorkspaces": "",
    "manageWorkspaces": "true",
    "componentsDefaultDirectory": "components/{name}",
    "dependenciesDirectory": "components/.dependencies",
    "dist": {
        "entry": "src",
        "target": "dist"
    },
    "extensions": {
        "ext-docs-parser": {
            "config": {},
            "options": {
                "core": true
            }
        }
    },
    "resolveModules": {
        "modulesDirectories": ["src"],
        "aliases": {
            "@": "someDir"
        }
    },
    "overrides": {
        "ui/*": {
            "peerDependencies": {
                "react-dom": "+"
            },
            "env": {
                "compiler": "react@16.0.0"
            }
        }
    }
}
```
