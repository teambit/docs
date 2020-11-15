---
id: manage-dependencies
title: Manage Dependencies
---

Bit keeps track of component dependencies __inside your local workspace and across scopes__. It does so by analyzing your component's code and parsing its `import` and `require` statements. It integrates the generated dependency graph with the the environment and the [workspace dependency configurations](/docs/dependencies/overview). This process gets repeated on every change made to a component. 

Understanding your component dependencies is key to creating and maintaining independent components in a distributed networks of components and scopes. That is so for two main reasons:

1. Knowing a component dependencies means knowing what it needs to become independent and autonomous. Without it, it is impossible to isolate it from its context.
2. It allows Bit to propagate changes through all dependent components.

For a quick demonstration, let's create another component that will use our previously created 'Button' component.

```shell
$ mkdir components/react/ui/notification-box && cd components/react/ui/notification-box
$ touch index.ts
$ touch notification-box.tsx
$ touch notification-box.module.scss
$ touch notification-box.composition.tsx
```

Place the following lines in the corresponding files:

<!--DOCUSAURUS_CODE_TABS-->
<!--index.ts-->

```javascript
export * from '/notification-box';
```

<!--notification-box.tsx-->

```javascript
import React from 'react';
import cs from 'classnames'
import styles from './notification-box.module.scss'

// to keep this component independent, the Button component is not imported using a relative path to its source-code (even though it is part of the same workspace)
import { Button}  from '@my-scope/react-ui.button'

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

<!--notification-box.module.scss-->

```scss
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

.container {
  border: solid 7px #41403e;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  line-height: 1.5;
  padding: 25px;
  font-family: 'Indie Flower', cursive;
  font-size: 22px;
  max-width: 350px;
  min-width: 250px;
}

.float {
    box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2);
    transition: box-shadow 0.5s;
    &:hover {
      box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.3);
    }
}

.actions {
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
}
```

<!--notification-box.composition.tsx-->
```tsx
import React from 'react'
import { NotificationBox } from './notification-box'

export const AlertBox = () => {
    return (
        <NotificationBox>
            Alert!
        </NotificationBox>
    )
}
```

<!--scss.d.ts (if needed)-->
```javascript
declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

```
<!--END_DOCUSAURUS_CODE_TABS-->

Run your workspace UI (`bbit start`) and head over to the 'Dependencies' tab of our new 'Notification Box' component. Over there you'll see a diagram of its dependency graph. Right now, our component is quite simple and so is its dependencies. To see more elaborate examples of this diagram, explore Bit's ['documenter' scope](https://bit.dev/teambit/documenter).

![Dependency Graph Diagram](/img/deps-notification-box.png)

To examine dependencies which are external packages, as well as Bit components, we'll use the `bbit show` command:

```shell
$ bbit show react-ui/notification-box
```

And scroll to the 'dependencies' section:

```shell
  ├──────────────────┼───────────────────────────────────────────────────────┤
  │ dependencies     │ react@17.0.1 (package)                                │
  │                  │ core-js@^3.6.5 (package)                              │
  │                  │ @types/react@16.9.43 (package)                        │
  │                  │ @types/jest@~26.0.9 (package)                         │
  │                  │ @types/react-router-dom@^5.1.5 (package)              │
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
As mentioned above, these dependencies are also integrated from the environment in use (in this case - React) and the workspace configurations.


As mentioned in the [Version](/docs/getting-started/version#2-sets-a-new-version-for-the-tagged-component) section, Bit uses its generated dependency graphs to test, build and version components affected by a change made to their dependencies. To see that in action, let's change the 'Button' component the 'Notification Box' is dependent on:

```shell
$ bbit tag --persist react-ui/notification-box
```

Head over to the 'Button' component and remove this line from the its SCSS file: 

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
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > react-ui/notification-box ... ok
                         

modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > react-ui/button ... ok
                         

staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > react-ui/button. versions: 0.0.1 ... ok
                         

components pending to be tagged automatically (when their dependencies are tagged)
     > react-ui/notification-box ... ok
```

In the above output, Bit notifies us of three important things:

1. 'Notification Box' is a new component
2. 'Button' is a modified component (to be 'modified' a component has to first be versioned/tagged)
3. 'Notification Box' will be tagged automatically when its dependencies are tagged

Let's tag our 'Button' component to save the previous change made to it:

```shell
$ bbit tag --persist react-ui/button
```

As expected, the tag process create a "ripple effect" where all other components dependent on it got auo-tagged as well:

```shell
2 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag (--persisted)" to unstage versions)

changed components
(components that got a version bump)
     > react-ui/button@0.0.2
       auto-tagged dependents:
            react-ui/notification-box@0.0.1
```

And, if we look at our local scope status, we'll see both component appear there (as versioned components):

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
  │ react-ui/notification-box                                            │ 0.0.1   │ 0.0.1   │
  └──────────────────────────────────────────────────────────────────────┴─────────┴─────────┘
```


