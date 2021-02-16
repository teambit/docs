---
id: manage-dependencies
title: Dependencies in Workspace
---

Bit automatically manages dependencies for each component by running static code analysis. These dependnecies can be packages or other components from the same workspace. By tracking which component depends on which, Bit can help you understand how changes propagate in your workspace.

## Create Dependent Component

Let's start by tracking the `notification-box` component to Bit and modify it to depend on `button`.

```shell
$ bbit add components/react/ui/notification-box --namespace react/ui
```

We'll `import` the `@mowner.demo/react/ui/button` component into `notification-box.tsx` using its node module name (note that your IDE should give you autocomplete suggestion at this point).

```tsx title="components/react/ui/notification-box/notification-box.tsx" {4}
import React from 'react';
import cs from 'classnames'
import styles from './notification-box.module.scss'
import { Button } from '@mowner/demo.react.ui.button'

export type NotificationBoxProps = {
    /** The notification box content. */
    children: any,
    /** A className for customization */
    className?: string;
    /** Determines whether to style the notification box as "floating" */
    floatEffect?: boolean
}

export const NotificationBox = ({className, children, floatEffect = true} : NotificationBoxProps) => {
    return(
     <div className={cs(styles.container, floatEffect ? styles.float : null, className)}>
        {children}
        <div className={styles.actions}>
            <Button variant='secondary'>Approve</Button>
            <Button variant='primary'>Decline</Button>
        </div>
     </div>   
    )
}
```

### Visual Dependency Graph

Run your workspace UI (`bbit start`) and head over to the 'Dependencies' tab of our new 'Notification Box' component. You'll see a diagram of `notification-box` dependency graph.

<img src="/img/deps-notification-box.png" alt="Dependency Graph Diagram" width="50%" height="50%"></img>

### Get Dependnecies in Terminal

To examine dependencies which are external packages, as well as Bit components, we'll head over to our terminal and use the `bbit show` command:

```shell
$ bbit show react-ui/notification-box
...
├──────────────────┼───────────────────────────────────────────────────────┤
│ dependencies     │ react@17.0.1 (package)                                │
│                  │ core-js@^3.6.5 (package)                              │
│                  │ @types/react@16.9.43 (package)                        │
│                  │ @types/jest@~26.0.9 (package)                         │
│                  │ @types/react-router-dom@^5.1.5 (package)              │
│                  │ @my-scope/react-ui.button@0.0.1 (component)           │
├──────────────────┼───────────────────────────────────────────────────────┤
│ dev dependencies │ react@17.0.1 (package)                                │
│                  │ core-js@^3.6.5 (package)                              │
│                  │ @types/react@16.9.43 (package)                        │
│                  │ @types/jest@~26.0.9 (package)                         │
│                  │ @types/react-router-dom@^5.1.5 (package)              │
├──────────────────┼───────────────────────────────────────────────────────┤
│ peer             │ react@^16.13.1 (package)                              │
│ dependencies     │ react-dom@^16.13.1 (package)                          │
└──────────────────┴───────────────────────────────────────────────────────┘
```

## Work in Component Monorepo

Bit has a smart management features for components in the same workspace that depend on each other. Before we can demo these capabilities, we start by versioning the `notification-box` component.

```shell
$ bbit tag --persist react-ui/notification-box --messge "initial version"
```

### Affected Components

Bit uses its generated dependency graphs to test and build all components affected by a change in their dependnecy graph. In this case, when we modify `button` we will see `notification-box` gets marked as "modified" by affiliation.

Add the following styling to the `button` component `.base` class (in its SCSS file):

```scss title="components/react/ui/button/button.module.scss"
text-transform: uppercase;
```

Our Workspace UI already notifies us of that change:

<img src="/img/ws-ui-button-modified.png" alt="Modified component in the Workspace UI" width="50%" height="50%"></img>

Let's examine this further using the `status` command:

```shell {6,15}
$ bbit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > react-ui/button ... ok

staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > react-ui/button. versions: 0.0.1 ... ok
     > react-ui/notification-box. versions: 0.0.1 ... ok

components pending to be tagged automatically (when their dependencies are tagged)
     > react-ui/notification-box ... ok
```

In the above output, Bit notifies us of three important things:

1. 'Notification Box' is a staged component (it is versioned and ready to be exported to a remote scope)
2. 'Button' is a modified component (to be 'modified', a component has to first be tagged)
3. 'Notification Box' will be tagged automatically when its dependencies are tagged

### Dependents Auto Versioning

Let's tag our `button` component to save the previous change made to it:

```shell title="Auto-tag process for dependents" {1,8,10}
$ bbit tag --persist react-ui/button --message "update text transform"
2 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag (--persisted)" to unstage versions)

changed components
(components that got a version bump)
     > react-ui/button@0.0.2
       auto-tagged dependents:
            react-ui/notification-box@0.0.2
```

As expected, the tag process creates a **ripple effect** where all other components dependent on it got auto-tagged as well.

And, if we look at our local scope status, we'll see both component appear there with a new bumped version number:

```shell
$ bbit list
┌────────────────────────────────┬─────────┬─────────┐
│ component ID                   │ local   │ used    │
│                                │ version │ version │
├────────────────────────────────┼─────────┼─────────┤
│ react-ui/button                │ 0.0.2   │ 0.0.2   │
├────────────────────────────────┼─────────┼─────────┤
│ react-ui/notification-box      │ 0.0.2   │ 0.0.2   │
└────────────────────────────────┴─────────┴─────────┘
```
