---
id: overrides
title: Overriding Configuration
sidebar_label: Overrides
---

When a component is packed for distribution, it contains the component's source code, a dependency graph of all the components is depends upon, and a set of tools, i.e. compiler and tester, for building the component.  

Bit let's you modify the component's tools, dependencies and configuration, without making any changes to the component's code, by configuring an **overrides** section.  

The overriding function has 2 parts:  

- Overriding rules - determine what components will be impacted
- Overriding options - the component's features that can be modified

## Overriding Rules

You can override the component configuration in one of two places:  

- In workspace configuration - override will be applied on all components exported and imported inside the workspace.  
- In an imported component's `package.json` file - applied on that specific component

### `overrides` in workspace configuration

In the original project, a component is embedded in the original code and does not have a `package.json`, and all overrides are defined in the [workspace configuration](/docs/conf-bit-json#overrides) using the overrides key in the workspace's `package.json`.  

The overrides are defined as a set of patterns that are applied on all the components that match the pattern. A pattern may also be a specific component such as `foo/bar`.  

```json
{
    "bit" : {
        "overrides" : {
            "utils/is-string" : {...options},
            "utils/*" : {...options}
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

### Propagation

By default, each component will only have only the most specific rule applied to it. If you want another rule to be applied in addition to other rules, you should specify `propagate: true` for the rule.  

### Exclusion

Inside each rule you may specify a pattern or an array of patterns that will define the components that are excluded from the rule. E.g. this rule is applied on all components, except for those that are under the `bar` namespace.  

```json
"overrides": {
    "*": {
    "exclude": "bar/*",
    }
};
```

### Overrides precedence

The following rules apply when specifying precedence from highest to lowest (this applies for the same rules. Multiple rules can be applied from different specifications):  

- Component's package json  
- Component's definition in workspace overrides
- Glob pattern overrides are applied with right most specifity has higher priority. I.e. if you have a `foo/bar/component`, `*/bar/*` will have higher priority over `foo/*/*`.  

Once the relevant rule apply, a state may occur when the same dependency appears as dependency, dev dependency and peer dependency. In this case Bit will apply the following priorities: peerDeps => Deps => devDeps. I.e. if a dependency is both dependency and peer dependency, it will only exist as a peerDependency.  

## Overriding Options

You can use override to perform the following changes:

- Set Bit tools - compilers and testers
- Adding and removing dependencies of all types and changing dependencies classification
- Overriding package.json values for a component

### Bit Tools

Use the `env` key under overridesto set Bit tools, such as compiler and tester, you need to specify the path to the collection of the compiler and a specific version.  

```json
"env": {
    "compiler": "bit.envs/compilers/react@0.0.3",
},
"overrides": {
    "utils/*": {
        "env": {
            "compiler": "bit.envs/compilers/babel@1.0.0"
        }
    }
}
```

In this example, all components will use the react compiler, while the components under `utils` use the babel compiler.

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

You may specify a specific version of the tool, or you may use a special annotation. Use "+" to specify Bit to use the workspace's tool for a set of components. Use "-" to specify Bit to remove the compiler for specific components. Such as:  

```json
"env": {
    "compiler": "bit.envs/compilers/react@0.0.3",
    "tester": "bit.envs/testers/jest@0.0.3",
},
"overrides": {
    "utils/*": {
        "env": {
            "compiler": "-"
        }
    },
    "utils/snippets/*": {
        "env": {
            "compiler": "+"
        }
    }
}
```

The components under `utils` will not have a compiler, while the ones under `utils/snippets` will have the default one assigned.

### Component's Dependencies

For each component, Bit resolves the dependencies defined inside the component as dependencies. Node modules are resolved according to their actual package version.  

Bit uses packages defined as `dependencies`, `devDependencies` and `peerDependencies`.  

With Bit overrides you can add, remove and change packages version, as well as move packages from one type (regular dependency to peerDependency), by using the override section.  

Here is an example of specifying dependencies:  

```json
{
    "overrides" : {
        "*": {
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
}
```

You may specify a specific version of the package, or you may use a special annotations to determine the version from the package.json. Use "+" to specify Bit to use the version that exists in the workspace `package.json`. Use "-" to specify Bit to remove the dependency for specific components.  

### Ignore Dependency Files

You can instruct Bit to ignore files that are required as dependencies inside a component.  
To override a certain file, just add it as follow:  

```js
// comp1.js
require('../comp2')
```

```json
// config  
"overrides": {
    "comp1": {
        "dependencies": {
            "file://comp2.js": "-"
        }
    }
}
```

This ignores this file. In the component that consumes this project, you need to supply a file that provides this config file.  

You can also ignore multiple files in a single rule:  

```js
// comp1.js
require('../utils/sort')
require('../utils/get')
require('../utils/unique')
```

```json
// config  
"overrides": {
    "comp1": {
        "dependencies": {
            "file://utils/*": "-"
        }
    }
}
```

### package.json keys

You an add any `package.json` keys to the overrides section, and they will be added or override keys in the components `package.json`. This is useful when you want to extend a component with a unique functionality, for example - adding a `bin` key to a component (creating an executable component). The following keys cannot be modified:

- name
- version
- main
