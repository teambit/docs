---
id: sourcing-components
title: Sourcing Components With Bit
permalink: docs/sourcing-components.html
redirect_from:
  - "docs/importing-components.html"
layout: docs
category: Getting Started
prev: installing-components.html
next: modifying-sourced-components.html
---

Bit allows importing component's source code to a consumer project.

With Bit, we can develop components from any repository. Local modifications can be either contributed back or kept in the repository. Bit's distributed model preserved a single source of truth across all repositories.

> **Note**
>
> The project’s SCM should track imported components.

## Importing component's source code

To import a component's code to a project, use [bit import](/docs/cli-import.html).

```bash
$ bit import bit.utils/string/left-pad
```

> **Import entire collection**
>
> You can use glob patterns to import an entire collection, or a part of it
>
> ```
> bit import bit.utils/*        # import entire collection
> bit import bit.utils/array/*  # import entire namespace
> ```

This command imports the component's source code to the project. Bit also fetches all resources and dependencies it needs to build and test the component. This makes the component usable in any project.

As part of the import process, Bit creates a set of binding files in the project's `node_modules` directory. This allows importing components like any other package:

```js
import component from '@bit.<owner>.<collection>.<namespace>.<component-name>';
```

### Dependencies of sourced components

Bit makes sure to install all dependencies of sourced components. By default Bit installs component dependencies them as packages, using the configured package manager in the [bit config](/docs/conf-bit-json.html) file. We can override this behavior and configure Bit to source the component dependencies instead.  
Bit installs package dependencies using the configured package manager. It is not possible to override this behavior, as node registries only support a single API for package installation.

### Import a component to a specific path

Setting a destination to the imported component is possible. Bit writes the files there instead of the default location.

```bash
$ bit import bit.utils/string/left-pad --path src/components
```

### Import a specific version

To import a specific version, specify it after the `@` sign:

```bash
$ bit import bit.examples/string/left-pad@0.0.11
```

## Sourcing a packaged component

Bit handles sourcing of packaged components by modifying the binding files. In case we have installed a component using NPM, and now we need to source it, the step we need to do is to run `bit import`. Bit overrides the package with its binding files. This means that there's no need to change the code that imports the component.

## Default directory convention

Set a default directory for component sourcing in your project's [bit config](/docs/conf-bit-json.html#componentsdefaultdirectory--string).

```js{2}
{
  "componentsDefaultDirectory": "src/{namespace}-{name}"
}
```
