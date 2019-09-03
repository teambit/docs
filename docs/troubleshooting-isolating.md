---
id: troubleshooting-isolating
title: Troubleshooting Component Isolation
permalink: docs/troubleshooting-isolating.html
layout: docs
category: Troubleshooting
prev: authentication-issues.html
next: troubleshooting-install-components.html
---

There are several issues you may encounter when Bit tries to isolate components in a project.

> **TIP**
>
> To validate a dependency issue is resolved, rerun `bit status`.

## Missing package dependencies

This error mainly occur on two distinct isolation issues. It may be that some of the project's package dependencies are not installed, or that you are using Custom Module Definition, or `NODE_PATH` environment variable in your project and Bit is unaware of that.

### Installing missing packages dependencies

As described in [this section](/docs/isolating-and-tracking-components.html#tracking-a-component-with-package-dependencies), Bit has different strategies to determine a package dependency version. If all of them fail, Bit will prompt you to install the missing package dependencies.  
Use your package manager of choice to resolve the issue.

```sh
npm install
```

### Configuring Custom Module Resolution

Bit issues a `missing package dependency` error for tracked components, in a project, that have file dependencies to absolute paths, using Custom Module Definition feature. See here how to configure Bit with your project's [Custom Module Resolution](/docs/tracking-dependencies.html#custom-module-resolution).

## Untracked file dependencies

This isolation error occur when one of the component's tracked files has a file dependency that is not tracked by Bit. There are several ways to resolve this issue, choose one of the option that goes with the specific implementation of your component and project.

[Learn more](/docs/tracking-dependencies.html#file-dependencies) about tracking components with file dependencies.

## Components with Relative Import Statements

Bit expects the dependency tree of components to be defined using absolute `require` or `import` statements. This is because Bit create and manage a set of link files (bindings) between imported components. So when you are using an imported component from another tracked component, or modifying an imported component, and adding an `import` statement to another imported component, Bit will trigger this isolation issue.

In order to resolve this, you need to understand that Bit creates a link file for each of the project's imported component within the `node_modules` directory. This allows you to require a component just as you would require a Bit package dependency with the same name, as [shown here](/docs/installing-components.html#package-naming-convention).

To resolve this issue you will need to refactor the `import` or `require` statement in your code to the component dependencies, using Bit's package naming convention, and save the changes.

```js
require ('@bit/<owner>.<collection>.<namespace>.<component-name>')
```

## Missing Components

This issue happens if some (or all) of your project component dependencies are missing. To resolve it you need to either run `bit import` or `npm install` (depends how your project depends on the component).

## Non-existing Dependency Files

When Bit tracks files in your project, it evaluates their dependency tree. If one of the files in the component's dependency tree is not found within your project, Bit will throw this isolation error. To resolve this issue, open the file, and ensure that the `import` or `require` statement points to the correct file.  
If you encounter this issue, this indicates that there's a high probability that this is because an error within your project that affects your project's stability.

## Missing Links

When Bit installs components, it creates a set of binding files to ensure that all imported component's dependency trees are working correctly. If any of these files is missing, Bit will prompt this isolation error. To fix this, you need to run the `bit bind` command. Bit will ensure all link files are in place.