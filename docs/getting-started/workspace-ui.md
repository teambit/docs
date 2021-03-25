---
id: workspace-ui
title: Workspace UI
---
## Starting the dev server

The start command starts our dev server, compiles our component and watches for changes using Hot Module Replacement. It runs different workspace tasks through workers, such as testing, linters and any workspace tasks that are defined by the component.

```shell
bit start
```

This will open-up your browser on [localhost:3000](http://localhost:3000), or any other available port, and display your workspace and tracked (added) components.

The first time you run the start command it can take a bit of time as it needs to build the whole UI.

:::note
While your waiting have a look in your node modules folder in your project and we will see your component inside your scope directory which in this case is 'my-scope'.
:::

Once you click on your component it will take you to the Overview page.

:arrow_right: Learn more about the [Workspace UI](/building-with-bit/worksapce).

## Overview

Here you will see an overview of your component complete with a live playground. We can add further documentation to our component by creating a `myComponent.docs.mdx` file.

:arrow_right: Learn more about [Component Documenting](/building-with-bit/documenting).

## Compositions

Compositions show you how your component is composed. Compositions are created by adding a `myComponent.compositions.tsx` file.

:arrow_right: Learn more about [Component Compositions](/building-with-bit/compositions).

## Tests

If we had written any tests they would appear here. Tests are created by adding a `myComponent.spec.tsx` file.

:arrow_right: Learn more about [Component Testing](/building-with-bit/testing).

## Dependencies

This shows you any dependencies that your component has.

:arrow_right: Learn more about [Component Dependencies](/building-with-bit/dependencies).

## Code

You can see all the code files your component has and inspect them. You can also see a list of dependencies and dev dependencies your component has.

## ChangeLog

See the changelog of your component for when you export and create new versions.

:arrow_right: Learn more about the [Component ChangeLog](/building-with-bit/components).

## Use

This shows you how to use your component either by importing a component into your workspace or installing a component into your application using a package manager.

:arrow_right: Learn more about [Importing Components](/building-with-bit/components).

:arrow_right: Learn more about [Installing Components](/building-with-bit/components).
