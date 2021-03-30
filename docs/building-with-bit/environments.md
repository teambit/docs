---
id: environments
title: Environments
---

import CreateExtensions from '@site/docs/components/extensions/create-extensions.md'

**Component Development Environment** (or Environment in short) standardize component development and maintanence. **Environment** taketake direct inspiration from `react-scripts`.  
Each component must have an environment configured, this way Bit "knows" how to build, test, lint and document components.

## Benefits of Environments

* Composing all your tools and prefered configurations to a single module to streamline your development.
* Share Environments between teams and projects and use semantic versioning to communicate config changes.
* Maintain a set of environments for different use cases, use them on multiple components in the same workspace simultaniusaly.
* Extend and customize environments by adding new tools and capabilities to your workflow.

## Pre-built Environments

Bit has a set of ready-made Environments you can use for building your components.

* [React](/aspects/react) - for building React components and hooks
* [React Native](/aspects/react-native) - for building React Native components and hooks
* [Node](/aspects/node) - for building components as node modules; relevant for any backend, middleware and even framework-less components in the browser
* **Aspect** - for building new [Bit Aspects](/aspects/aspects-overview)

These environments offer Bit's support for different frameworks. You can use either of them, customize them for your needs or even implement a new environment to add support for additional frameworks.

## Configure Environment for Components

The defaul environment Bit sets for all components is [Node](/aspects/node). We can override it when using the [`teambit.workspace/variants`](/aspects/variants) config in `worksapce.jsonc` file. This is how we can determine different configurations for components according to their location in the workspace.

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "movies/pages": {
      "teambit.react/react": {}
    },
    "movies/models": {
      "teambit.harmony/node": {}
    }
  }
}
```

### See configured enviroments

There are several ways you can see which environment is configured for your component.

* `bit env` - prints a simple table with all components in workspace and their environments
* `bit show <component>` - prints all information on component including environment
* `bit start` - browse the **component tree** to see component's environment

## Costumizing environments

There's no "single-config to rule them all" for component lifecycle, this is why we made environments composable. You can take any environment and use it as a base for another, and in the process either change any of its default configuration (for compilation or testing, for example) or even compose with new features.

### Extend an environment

The first step of creating an environment is creating a new component with the specific extension template. Each of the pre-built environments contains a template for creating extension. You can also head over to each environment's documentation page to learn more about the APIs it allows you to use for customization.

<CreateExtensions />

After you created your extension you need configure it to be a [Bit Aspect](/aspects/aspects-overview). This is because environments are actually aspects that extends Bit's core functionality to support your development workflow. To do this edit your `workspace.jsonc` and set `teambit.harmony/aspect` as the environment applied on the extension you created:

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "path/to/your/extension": {
      "teambit.harmony/aspect": {}
    },
  }
}
```

Validate it by running `bit env` and see that the extension-component has `teambit.harmony/aspect` set as an environment.

> Bit is lacking an automated mechanism for rebuilding extensions on configuration and code changes. You need to run the `compile` command to have Bit rebuild your extension:
>
> ```sh
> bit compile
> ```

#### Use extension in your project

Now that you extended an environment with your own configuration you can apply it as the **Component Development Environment** for your components. This is done in the same way as you would set any of Bit's built-in environments:

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "movies/pages": {
      "acme/my-react-exntesion": {}
    },
    "movies/models": {
      "acme/my-node-exntesion": {}
    }
  }
}
```

#### Publish your extension

An extension works just like any other component in Bit. You can version it with `bit tag` and export to a Bit Scope with the `bit export` command.  
Once you have an extension exported to a remote Scope you can configure it in any `workspace.jsonc` as if its part of Bit's built-in environments. Reusing extensions like components can help you standardize component development across your organization.
