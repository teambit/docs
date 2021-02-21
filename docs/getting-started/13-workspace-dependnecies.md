---
id: manage-dependencies
title: Dependencies in Workspace
---

Bit automatically manages dependencies for each component by running static code analysis.
These dependencies can be packages or components that are handled by the same workspace. By tracking which component depends on which,
Bit can help you understand how changes propagate in your workspace.

## Create Dependent Component

Let's start by tracking the `notification-box` component to Bit and modify it to depend on `button`.

```shell
$ bbit add components/react/ui/notification-box --namespace react/ui
```

We'll `import` the `@mowner.demo/react/ui/button` component into `notification-box.tsx` using its node module name (note that your IDE should give you autocomplete suggestion at this point).

```tsx title="components/react/ui/notification-box/notification-box.tsx" {4}
import React from 'react';
import cs from 'classnames';
import styles from './notification-box.module.scss';
import { Button } from '@mowner/demo.react.ui.button';

export type NotificationBoxProps = {
  /** The notification box content. */
  children: any;
  /** A className for customization */
  className?: string;
  /** Determines whether to style the notification box as "floating" */
  floatEffect?: boolean;
};

export const NotificationBox = ({
  className,
  children,
  floatEffect = true,
}: NotificationBoxProps) => {
  return (
    <div
      className={cs(
        styles.container,
        floatEffect ? styles.float : null,
        className
      )}
    >
      {children}
      <div className={styles.actions}>
        <Button variant="secondary">Approve</Button>
        <Button variant="primary">Decline</Button>
      </div>
    </div>
  );
};
```

### Visual Dependency Graph

Run your workspace UI (`bbit start`) and head over to the 'Dependencies' tab of our new 'Notification Box' component. You'll see a diagram of `tech-jokes-viewer` dependency graph.

<img src="/img/tech-jokes-deps.png" alt="Dependency Graph Diagram" width="70%" height="70%"></img>

### Get Dependencies in Terminal

To examine dependencies (packages and Bit components) we'll head over to our terminal and use the `bbit show` command:

```shell {17,18,20}
$ bbit show ui/tech-jokes-viewer

  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ dev files    │ tech-jokes-viewer.docs.md (teambit.docs/docs)                │
  │              │ tech-jokes-viewer.composition.tsx                            │
  │              │ (teambit.compositions/compositions)                          │
  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ extensions   │ teambit.react/react                                          │
  │              │ teambit.component/dev-files                                  │
  │              │ teambit.compositions/compositions                            │
  │              │ teambit.pkg/pkg                                              │
  │              │ teambit.docs/docs                                            │
  │              │ teambit.envs/envs                                            │
  │              │ teambit.dependencies/dependency-resolver                     │
  │              │ teambit.pipelines/builder                                    │
  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ dependencies │ @demo-org/tech-jokes.hooks.use-jokes@0.0.1- (component)      │
  │              │ @demo-org/tech-jokes.ui.button@0.0.1------- (component)      │
  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ dev          │ @demo-org/tech-jokes.ui.app-bar@0.0.1- (component)           │
  │ dependencies │ react@16.14.0------------------------- (package)             │
  │              │ @babel/runtime@^7.11.2---------------- (package)             │
  │              │ @types/react-router-dom@^5.1.5-------- (package)             │
  │              │ @types/jest@~26.0.9------------------- (package)             │
  │              │ @types/react@16.9.43------------------ (package)             │
  │              │ core-js@^3.6.5------------------------ (package)             │
  │              │ @types/node@^12.12.27----------------- (package)             │
  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ peer         │ react-dom@^16.13.1- (package)                                │
  │ dependencies │                                                              │
  └──────────────┴──────────────────────────────────────────────────────────────┘
```

A few things to notice here:

1. use-jokes and button are both dependencies of the tech-jokes-viewer component.
2. The app-bar is... dev becaus eit used in a composition

## Work in Component Monorepo

Bit has a smart management features for components in the same workspace that depend on each other. Before we can demo these capabilities, we start by versioning the `notification-box` component.

```shell
$ bbit tag --persist react-ui/notification-box --message "initial version"
```

### Affected Components

Bit uses its generated dependency graphs to test and build all components affected by a change in their dependency graph. In this case, when we modify `button` we will see `notification-box` gets marked as "modified" by affiliation.

Add the following styling to the `button` component `.base` class (in its SCSS file):

```scss title="components/ui/tech-jokes-viewer/tech-jokes-viewer.module.scss"
font: 15px;
```

Our Workspace UI already notifies us of that change, and since 'tech-jokes-viewer' is dependent on 'button' both wil be shown as modified:

<img src="/img/button_bbit tag modified.png" alt="Modified component in the Workspace UI" width="50%" height="50%"></img>

Let's examine this further using the `status` command:

```shell {2,9}
$ bbit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > ui/button ... ok


components pending to be tagged automatically (when their dependencies are tagged)
     > demo-org.tech-jokes/ui/tech-jokes-viewer ... ok
bad-jokes-feb (main) $ bbit test ui/button
testing total of 1 components in workspace 'getting-started'
testing 1 components with environment teambit.react/react
```

In the above output, Bit notifies us of three important things:

1. 'Notification Box' is a staged component (it is versioned and ready to be exported to a remote scope)
2. 'Button' is a modified component (to be 'modified', a component has to first be tagged)
3. 'Notification Box' will be tagged automatically when its dependencies are tagged

### Dependents Auto Versioning

Let's tag our `button` component to save the previous change made to it:

```shell title="Auto-tag process for dependents" {1,8,10}
$ bbit tag ui/button --persist --message "decrease font size"
2 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag" to unstage versions)

changed components
(components that got a version bump)
     > demo-org.tech-jokes/ui/button@0.0.2
       auto-tagged dependents:
            demo-org.tech-jokes/ui/tech-jokes-viewer@0.0.2
```

As expected, the tag process creates a **ripple effect** where all other components dependent on it got auto-tagged as well.

And, if we look at our local scope status, we'll see both component appear there with a new bumped version number:

```shell
$ bbit list
┌──────────────────────────────────────────┬─────────┬─────────┐─────────┬─────────┐
│ component ID                                                 │ local   │ used    │
│                                                              │ version │ version │
├──────────────────────────────────────────┼─────────┼─────────┤         │         │
│ demo-org.tech-jokes/hooks/use-jokes                          │ 0.0.1   │ 0.0.1   │
├──────────────────────────────────────────┼─────────┼─────────┤         │         │
│ demo-org.tech-jokes/ui/app-bar                               │ 0.0.1   │ 0.0.1   │
├──────────────────────────────────────────┼─────────┼─────────┤         │         │
│ demo-org.tech-jokes/ui/button                                │ 0.0.2   │ 0.0.2   │
├──────────────────────────────────────────┼─────────┼─────────┤         │         │
│ demo-org.tech-jokes/ui/tech-jokes-viewer                     │ 0.0.2   │ 0.0.2   │
└──────────────────────────────────────────────────────────────┴─────────┴─────────┘
```
