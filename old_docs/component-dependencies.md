---
id: component-dependencies
title: Component Dependencies
---

Bit resolves all component dependencies automatically. This section aims to explain the process and how to manipulate it.

A JavaScript file has two types of dependencies it can require. They are either **Packages** that are installed as node modules by tools like npm or yarn or other **files and directories** from the project.  
Bit automates the process of managing these dependencies for the components you track. It does so by parsing all `import` or `require` statements and building a **dependency graph** for each component. When we tag a version for a component Bit saves the dependency graph. It uses it to create a `package.json` for each component.

## Dependency resolution flow

These are the steps Bit does to create a dependency graph for each component. The process starts when we track a set fo files as a component.

1. Bit reads through all tracked files to find all `import` and `require` statements.
2. Bit splits the list of required modules to packages and files (and directories).
3. Bit parses the `package.json` file at the root of the project (and all nested `package.json` files, if available), to get a complete list of the installed packages.
4. A matching process for each required package starts:
    1. If a package is required by an implementation file, but is configured as `peerDependency` in the `package.json`, Bit sets it as a `peerDependency` for the component.
    2. If the package is required by a [test file](/docs/add-and-isolate-components.html#tracking-a-component-with-testspec-files)) of the component, Bit defines it as `devDependency`.
    3. For any other case, Bit defines the package as a `dependency`.
    4. If a package is not found, Bit triggers an error about [missing package dependencies](/docs/add-and-isolate-components#missing-package-dependencies).
5. The package version is the one currently installed and required by the file.
6. Another matching process starts for each required file:
    1. If a required file is already tracked by another component, Bit sets it as a `dependency` (or a `devDependency` if the file is required by a test file), otherwise it prompts an error for [untracked file dependencies](/docs/add-and-isolate-components#untracked-file-dependencies).
    2. If the file is not found, it prompts an error for [non existing dependency file](/docs/add-and-isolate-components#non-existing-dependency-files).
7. When the parsing process completes successfully Bit can create an immutable dependency graph for the component.

> **Dependencies Edge Cases and Gotchas**
>
> * A package listed both as a `peerDependency` and a `dependency` or `devDependency` in the `package.json`,  will be considered as a `peerDependency`.
> * A package required by both test-file and implementation-file is a `dependency`.
> * A file required using a absolute path feature like Webpack resolve, tsconfig resolving, etc requires configuring [custom module resolution](/docs/add-and-isolate-components#custom-module-resolution) for Bit.

### Working with the automated dependency resolution

The value fo using Bit's ability to manage component dependencies is that you don't need to modify the component's `package.json` file. By modifying the component's actual implementation, Bit updates the dependency graph.  
This means that in order to add/remove a dependency you need only to add/remove a `require` statement from the code. For changing the version of the dependency, install the version you'd like the component to use.

## Overriding component dependencies

Use `overrides` to bypass Bit's automated dependency definition. Add the `overrides` key. You can use it either in the [component configuration](/docs/conf-files.html#component-configuration) or the [workspace configuration](/docs/conf-files.html#workspace-configuration):

### `overrides` in component configuration

it generates a `package.json` file in the root folder of each imported component. Open it and locate the `bit` key. Add an object named `overrides`.  
For example:

```json
{
    "bit" : {
        "overrides" : {}
    }
}
```

Now you can modify the component's `dependencies`, `devDependencies` and `peerDependencies`.

### `overrides` in workspace configuration

Components don't have their own `package.json` files their original project. To manage them use `overrides` in the [workspace configuration](/docs/conf-files.html#workspace-configuration) file.  
In your project's `package.json` locate the `bit` configuration key (or your project's `bit.json`). Add select which component you want to override dependencies for.  
For example:

```json
{
    "bit" : {
        "overrides" : {
            "utils/is-string" : {},
            "utils/*" : {}
        }
    }
}
```

> **Overriding groups of components**
>
> You can either specify explicit component, and even glob patterns, to control groups of components.

### Manually set dependency version

To set a version manually, use `overrides` and set any specific version or a SemVer range.  
For example:

```json
{
    "overrides" : {
        "dependencies" : {
            "lodash" : "2.3.1"  # set a specific package version
        },
        "devDependencies" : {
            "@bit.utils/is-string" : "2.1.1"   # set a specific component version
        }
    }
}
```

### Manually add dependency

You can manually add dependencies for components using `overrides`. You can either set a specific version, or let Bit set the version of the package.  
For example:

* Add `@bit.utils/is-string` as a `devDependency` in version `1.2.3`.
* Add `react-dom` as a `peerDependency`, and let Bit define its version according the version in the project.

```json
{
    "overrides" : {
        "devDependencies" : {
            "@bit.utils/is-string" : "1.2.3"   # add a specific version of dependency
        },
        "peerDependencies" : {
            "react-dom" : "+"                  # add a dependency, and let Bit define the version
        }
    }
}
```

> **`peerDependencies` for components**
>
> Some `peerDependencies` are not required by neither the implementation or test files of a component. This means that Bit is unable to define them as such. For example, `react-dom` is never explicitly imported but is required as a dependency for any react component to work. Use the `overrides` feature to define `peerDependencies` for such cases.

### Manually remove a dependency

To force Bit to remove any dependency from being either `dependency`, `peerDependency` or `devDependency`, add the specific dependency type to the `overrides` object. In it, write the name of the dependency to remove, and set the version number to `-`.  
For example:

* Remove the dependency for the file `./src/enums.js`.
* Remove the dependency for the component `@bit.utils/is-string`.
* Remove the dependency to the package `react`.

```json
{
    "overrides" : {
        "dependencies" : {
            "file://./src/enums.js" : "-"
        },
        "devDependencies" : {
            "@bit.utils/is-string" : "-"
        },
        "peerDependencies" : {
            "react" : "-"
        }
    }
}
```

> **Be careful!**
>
> While Bit fully supports the manual removal of dependencies, be careful when doing so. This may harm the consumers of your components, as they will lack dependencies.
