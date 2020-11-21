---
id: manage-dependencies
title: Manage Dependencies
---

Bit keeps track of component dependencies __inside your local workspace and across scopes__. It does so by analyzing the component's code and parsing its `import` and `require` statements. 

Every component has its dependency graph generated and registered by Bit. The generated graph also includes dependencies set by the environment [in use] and the workspace configurations file. 

Understanding your component dependencies is key to creating and maintaining independent components in a distributed network of components and scopes. That is so for two main reasons:

1. Knowing a component dependencies means knowing what it needs to become independent and autonomous. Without it, it is impossible to isolate it from its context.
2. It allows Bit to propagate changes through all dependent components.

## Manage dependencies between one component to another
For a quick demonstration, let's track another component, the 'Notification Box'. This component will, later on, use our previously created 'Button' component.

```shell
$ bbit add components/react/ui/notification-box -n react-ui
```

We'll `import` the 'Button' component into `notification-box.tsx` using its node module name (you should never import a component using a relative path to its source-code):

```tsx
// components/react/ui/notification-box/notification-box.tsx

import React from 'react';
import cs from 'classnames'
import styles from './notification-box.module.scss'

// import the Button component
import { Button } from '@my-scope/react-ui.button'

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
### Explore component dependencies in the Workspace UI dependency diagram
Run your workspace UI (`bbit start`) and head over to the 'Dependencies' tab of our new 'Notification Box' component. Over there you'll see a diagram of its dependency graph. Right now, our component is quite simple and so is its diagram of dependent components. 

![Dependency Graph Diagram](/img/deps-notification-box.png)

To examine dependencies which are external packages, as well as Bit components, we'll head over to our terminal and use the `bbit show` command:

```shell
$ bbit show react-ui/notification-box
```
### Explore component dependencies using Bit's CLI
```shell
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
As mentioned above, some of these dependencies are set by the environment and the workspace configuration file. In our case, the environment in use (for all components), is React.

### Tag a component that is dependent on another tagged component
Let's "commit" changes by tagging our 'Notification Box' component:

```shell
$ bbit tag --persist react-ui/notification-box
```

We now have two versioned components in out local scope, the 'Button' (version 0.0.1) and the 'Notification Box' (version 0.0.1).

### Modify a component that is a dependency of another component
As mentioned in the [Version](/docs/getting-started/version#2-sets-a-new-version-for-the-tagged-component) section, Bit uses its generated dependency graphs to test, build and version components affected by a change made to their dependencies. To see that in action, let's change the 'Button' component.

Add the following styling to the 'Button' component `.base` class (in its SCSS file):

```scss
text-transform: uppercase;
```

Our Workspace UI already notifies us of that change:
![Modified component in the Workspace UI](/img/ws-ui-button-modified.png)

Let's examine this further using Bit's 'status' command:

```shell
$ bbit status
```

```shell
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

Let's tag our 'Button' component to save the previous change made to it:

```shell
$ bbit tag --persist react-ui/button
```

As expected, the tag process creates a "ripple effect" where all other components dependent on it got auto-tagged as well:

```shell
2 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag (--persisted)" to unstage versions)

changed components
(components that got a version bump)
     > react-ui/button@0.0.2
       auto-tagged dependents:
            react-ui/notification-box@0.0.2
```

And, if we look at our local scope status, we'll see both component appear there with a new bumped version number:

```shell
$ bbit list
```

```shell
  ┌──────────────────────────────────────────────────────────────────────┬─────────┬─────────┐
  │ component ID                                                         │ local   │ used    │
  │                                                                      │ version │ version │
  ├──────────────────────────────────────────────────────────────────────┼─────────┼─────────┤
  │ react-ui/button                                                      │ 0.0.2   │ 0.0.2   │
  ├──────────────────────────────────────────────────────────────────────┼─────────┼─────────┤
  │ react-ui/notification-box                                            │ 0.0.2   │ 0.0.2   │
  └──────────────────────────────────────────────────────────────────────┴─────────┴─────────┘
```
 
### Manage external dependencies (packages)
[See here](/docs/dependencies/overview)