---
id: component-dependencies
title: Dependencies
---

We depend on each other's code and components so we don't have to re-implement code. Bit implements a set of features for a mostly hands-off work for component dependency management.

This topic describes how to add local components and npm packages as dependencies for React components.

:::note

See [learn harmony example](https://todo) for a working example containing the code snippets in this topic.

:::

---

## Prerequisites

To create a Bit component, verify you met the following:

1. [Install Bit CLI.](/getting-started/installing-bit)
1. [Create a Bit workspace](/getting-started/initializing-workspace) on a fresh Git repository.
1. [Create a component](/bit-components/component-overview) with a [composition.](/bit-components/component-compositions)

---

## Adding Package Dependency

First we'll create an `image` component:

```sh
bit create react-component image
```

Then we install the package dependency to the workspace with the `install` command:

```sh
bit install classnames
```

Bit installs `classnames` as a dependency to your workspace and adds it to the dependency policy in your `workspace.json`:

```js {6} title="workspace.jsonc"
...
"teambit.dependencies/dependency-resolver": {
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      "dependencies": {
        "classnames": "2.3.1"
      }
    }
}
...
```

`classnames` is installed for the workspace but is not added as a dependency to any component.

### Add dependency to a component

Bit automates dependency management by finding all `import` statements in your code and resolving them to the installed dependency in your workspace. To add `classnames` as a package dependency, build `image` as follows:

```typescript {2,16} title="image.tsx"
import React from 'react';
import classNames from 'classnames';
import styles from './img.module.scss';

export type ImgProps = {
  /**
   * image src
   */
  src: string;
  /**
   * image alternative text
   */
  alt: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export function Img({ alt, src, className }: ImgProps) {
  return (
    <img className={classNames(styles.img, className)} alt={alt} src={src} />
  );
}
```

### See dependencies in the UI

To see all component dependencies, including `classnames` in start the local dev server:

```sh
bit start
```

Then head over the `image` component, and open the code view. On the right side-panel you can see all dependencies, including `classnames`.

TODO IMAGE

### See dependencies in the CLI

To view component dependencies from the terminal run the `show` command:

```sh
bit show image
```

This lists all information Bit keeps on the component, including its dependencies.

---

## Remove Package Dependency

TODO:

1. automated process
1. simply remove `import`
1. see dependency is removed

---

## Change Package Dependency Version

TODO:

1. versioning is controled from what's available in the workspace
1. change version in worksapce.json and see this is changing

---

## Control Dev and Runtime Dependencies

TODO:

1. a package may be a runtime for one component but dev for another
1. controlled by the type of file depending

---

## Dependencies Between Components

Components of the same workspace may depend on each other. Create a `image-grid` component with Bit

```sh
bit create react-component image-grid
```

This component should depend on other components of the same workspace and use them in its implementation.

```typescript {3-5,20-26,12} title="image-grid.tsx"
import React from 'react';
import classNames from 'classnames';
import { Img } from '@learn-harmony/ecommerce.ui.img';
import { Product } from '@learn-harmony/ecommerce.product.model.product';
import { mockProductList } from '@learn-harmony/ecommerce.product.model.product';
import styles from './img-grid.module.scss';

export type ImgGridProps = {
  /**
   * a list of products
   */
  list: Product[];
} & React.HTMLAttributes<HTMLDivElement>;

export function ImgGrid({ list, className }: ImgGridProps) {
  return (
    <>
      {list.length > 0 ? (
        <div className={classNames(styles.grid, className)}>
          {list.map((product) => (
            <Img
              key={product.title}
              {...product}
              className={classNames(styles.img, className)}
            />
          ))}
        </div>
      ) : (
        'No images to display'
      )}
    </>
  );
}
```

### See component dependencies

### See composed rendering

---

## Dependency Policy

## Workspace and component dependnecies

---

## Manage Dependencies

### Control dependency version

### Dev and runtime dependencies

### Peer dependencies

### Force a dependency

---

## Summary

* ???

---

## Next Steps

* ???

---

## FAQ

### can i control the automated dep-resolution?

### can i manually set type of dependency (dev/runtime)

### can i add a dependency without importing it

### can different components in the same workspace depend on different versions of the same component
