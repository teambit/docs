---
id: creating-components
title: Creating Components
---

import ExampleButton from '@site/docs/components/examples/button.md'

To create a component you will first need to [initialize a Bit workspace](/getting-started/initializing-workspace).

## Components Folder Structure

Bit tracks component folders so everything belonging to that component should live in that folder and should have an `index.ts` as main entry file.

## Use Bit Create

We can use the `bit create` command to create an example button component with the namespace of `ui/button`. 

```sh
bit create react-example-button ui/button
```

The following files will have been created for you:

<ExampleButton />



<!-- ## The Index file

:arrow_right: Learn more about [Bit Components](/building-with-bit/components).


The `index.ts` file is the file that exports the component



## The Component file

The `button.tsx` file is where we create and export our component


```

:arrow_right: Learn more about [Bit Components](/building-with-bit/components).

## The Composition file

The `button.composition.tsx` file is needed so that we can visualize our component in our workspace.


```

:arrow_right: Learn more about [Bit Compositions](/building-with-bit/compositions).

## The Docs file

This `button.docs.mdx` file is not needed but is very helpful as adds documentation for your component as well as a live playground.


:arrow_right: Learn more about [Bit Documenting](/building-with-bit/documenting). -->

## Install Dependencies

As we had added a test file that includes dependencies we will need to install them:

```sh
bit install @testing-library/react chai
```

<!-- :arrow_right: Learn more about [Bit Dependency Installation](/building-with-bit/dependencies). -->

## What's Next?

Once you have created a component and installed the dependencies you can then [add your component](adding-components) to the workspace so you can see it locally. 