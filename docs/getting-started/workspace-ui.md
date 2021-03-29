---
id: workspace-ui
title: Workspace UI
---

To see a component in the workspace you first need to [create a component](/getting-started/creating-components). Starting the workspace with no component will result in an error.

## Starting the dev server

The start command starts our dev server, compiles our component and watches for changes using Hot Module Replacement. It runs different workspace tasks through workers, such as testing, linters and any workspace tasks that are defined by the component.

```sh
bit start
```

This will open-up your browser on [localhost:3000](http://localhost:3000), or any other available port, and display your workspace with your components.

:::note Building the UI

The first time you run the start command it can take a bit of time as it needs to build the whole UI.
:::

<!-- Once you click on your component it will take you to the Overview page. -->

<!-- :arrow_right: Learn more about the [Workspace UI](/building-with-bit/worksapce). -->

## Local Workspace

### Overview

See an overview of your component complete with a live playground. Documentation of our component is created from the `button.docs.mdx` file.

<!-- :arrow_right: Learn more about [Component Documenting](/building-with-bit/documenting). -->

### Compositions

Compositions show you how your component is composed. Compositions are created from the `buttom.compositions.tsx` file.

<!-- :arrow_right: Learn more about [Component Compositions](/building-with-bit/compositions). -->

### Tests

See passing or failing tests. Tests are created from the `button.spec.tsx` file.

<!-- :arrow_right: Learn more about [Component Testing](/building-with-bit/testing-components). -->

### Dependencies

Shows any dependencies that your component has.

<!-- :arrow_right: Learn more about [Component Dependencies](/aspects/dependency-resolver). -->

### Code

See all the code files your component has and inspect them as well as a list of your component's dependencies and dev dependencies.

### ChangeLog

See the changelog of your component for when you export and create new versions.

### Use

Shows you how to use your component either by importing a component into your workspace or installing a component into your application using a package manager.

<!-- :arrow_right: Learn more about [Importing Components](/building-with-bit/importing-components).

:arrow_right: Learn more about [Installing Components](/building-with-bit/installing-components). -->

## What's Next?

After Rending the workspace UI you can either create more components, [compose components](composing-components) or create a [Remote Scope](remote-scope) so you can see you component on the [Bit.dev](https://bit.dev) cloud and then export it and import it into another application.
