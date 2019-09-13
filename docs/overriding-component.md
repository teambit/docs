---
id: overriding-components
title: Overriding Component Configuration
---

When a component is packages for distribution, it contains the component's source code and a graph of all the components is depends upon.  

Bit let's modify the component's graph, without making any changes to the component's code, by configuring an **overrides** section.  

The overriding function has 2 parts:  

- Overriding rules - determine what components will be impacted
- Overriding options - the component's features that can be impacted

## Overriding Rules

You can override the component configuration in one of two places:  

- In workspace configuration - override will be applied on all components exported and imported inside the workspace.  
- In an imported component's `pacakge.json` file - applied on that specific component

If the same override is defined in both the workspace configuration and the component configuration, the component's configuration will take precedence.  

### `overrides` in workspace configuration

In the original project, a component is embedded in the original code and does not have a `pacakge.json`, and all overrides are defined in the [workspace configuration](/docs/conf-bit-json#overrides) using the overrides key in the workspace's `package.json`.  

The overrides is defined as a set of patterns that are applied on all the components that match the pattern. A pattern may also be a specific component such as `foo/bar`.  

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

### `overrides` in component configuration

A component that was imported from Bit has a `package.json` file in the root folder of each imported component. You can override it by locating (or adding) the `bit` key and specifying an overrides object:  

```json
{
    "bit" : {
        "overrides" : {}
    }
}
```

### Overrides precedence

The following rules apply when specifying precedence from highest to lowest (this applies for the same rules. Multiple rules can be applied from different specifications):  

- Component's package json  
- Component's definition in workspace overrides
- Glob pattern overrides are applied with right most specifity has higher priority. I.e. if you have a `foo/bar/component`, `*/bar/*` will have higher priority over `foo/*/*`.  

### Propagation

By default, each component will only have only the most specific rule applied on it. If you want the rule to be applied with other rules, you should specify `propagate: true` for the rule.  

## Overriding Options

You can use override to perform the following changes:

- Set Bit tools - compilers and testers
- Adding and removing dependencies of all types and changing dependencies classification
- Overriding package.json values for a component  

### Set Bit Tools

Use the `env` key to set Bit tools, such as compiler and tester, you need to specify the path to the collection of the compiler and a specific version.  

```json
"env": {
    "compiler": "bit.envs/compilers/react@0.0.3",
}
```

You can specify the `none` value to bypass using a compiler or a tester.  

For testing purposes, you can also specify a local file name to be the root of the compiler or tester:  

```json
"compiler": {
    "meta": {
        "options": {
            "file": "me/project/compiler.js"
        }
    }
}
```

### Modify Component Dependencies

For each component, Bit resolves the dependencies defined inside the component as dependencies. Node modules are resolved according to their actual package version.  

Bit uses packages defined as `dependencies`, `devDependencies` and `peerDependencies`. 

With Bit overrides you can add, remove and change packages version, as well as move packages from one type (regular dependency to peerDependency), by using the override section. 

Here is an example of specifying dependencies: 

```json
{
    "overrides" : {
        "dependencies" : {
            "lodash" : "2.3.1",  # Resolve the package to specific version
        },
        "devDependencies" : {
            "debug": "^4.0.0", # Add as devDep with version that matches
            "@bit.utils/is-string" : "+" # Add as devDep according to version in package.json or latest
        },
        "peerDependencies" : {
            "chalk" : "-", # Remove the package from peerDependencies
            "react-dom": "+" # Add as peer according to project's version or latest if not exist
        }
    }
}
```

Bit will resolve as follow:  

- Build the original required packages tree according to the component source. Files found in source files will be resolved as dependencies and files found in test files will be resolved as devDeps.  
- Apply the changes defined in all the overrides for each section (deps, devDeps, peerDeps)
- Squash the changes according to the following priorities: peerDeps => Deps => devDeps. So if the same dependency is found in both peerDep and Deps, it will only remain as peerDeps. If a dependency is found both in deps and devDeps it remains in deps only.  

### Overriding package.json keys

You an add any `package.json` keys to the overrides section, and they will be added or override keys in the components `package.json`. The following keys cannot be modified:

- name
- version
- main
