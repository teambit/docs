---
id: manage-dependencies
title: Manage Workspace Dependencies
---

Bit automatically manages dependencies for each component by running static code analysis.
These dependencies can be packages or components that are handled by the same workspace. By tracking which component depends on which,
Bit can help you understand how changes propagate in your workspace.

### Visual Dependency Graph

As mentioned earlier, our 'tech-jokes-viewer' component depends on two other components in the workspace.
Head over to the component's 'Dependencies' tab (in the workspace UI), to see a diagram of `tech-jokes-viewer` dependency graph.

<img src="/img/tech-jokes-deps.png" alt="Dependency Graph Diagram" width="70%" height="70%"></img>

### Get Dependencies in Terminal

To examine dependencies (packages and Bit components) we'll head over to our terminal and use the `bbit show` command:

```shell
$ bbit show ui/tech-jokes-viewer
```

```shell {16,17,19}

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
  │              │ @demo-org/tech-jokes.ui.elements.button@0.0.1-(component)    │
  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ dev          │ @demo-org/tech-jokes.ui.elemets.app-bar@0.0.1- (component)   │
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

:::note
Notice how 'app-bar' is listed as a dev dependency. That is because it is only used by `tech-jokes-viewer.compositions.tsx` which is a dev file.
:::

### Auto tag affected components

Bit uses its generated dependency graphs to recognize which components are affected by a change made to another component.
Whenever a component is modified and tagged, a ripple effect of auto-tags will occur on every dependent component and its dependent components, as well (all the way down to the last component in that chain).

As mentioned earlier, a tag process involves not only a new version but also testing and building the component in its own isolated environment.
That process is crucial in handling multiple, independent modules as it validates a change to a component did not break other components in unexpected ways.

Modify the `button` to see `tech-jokes-viewer` gets marked as "modified" by affiliation.

For example, let's decrease the font size of our button, from `16px` to `15px`.

```scss title="components/ui/elements/button/button.module.scss"
font: 15px;
```

Our Workspace UI already notifies us of that change, and since 'tech-jokes-viewer' is dependent on 'button' both wil be shown as modified:

<img src="/img/modified_comps.png" alt="Modified component in the Workspace UI" width="50%" height="50%"></img>

Let's examine this further using the `status` command:

```shell {2,9}
$ bbit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > ui/elements/button ... ok


components pending to be tagged automatically (when their dependencies are tagged)
     > demo-org.tech-jokes/ui/widgets/tech-jokes-viewer ... ok
```

In the above output, Bit notifies us of two important things:

1. 'button' is a modified component
2. 'tech-jokes-viewer' will be tagged automatically when its dependencies (in that case, 'button') are tagged.

### Dependents Auto Versioning

Let's tag our `button` component to save the previous change made to it:

```shell title="Auto-tag process for dependents"
$ bbit tag ui/button --persist --message "decrease font size"
```

We'll get the following output:

```
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
