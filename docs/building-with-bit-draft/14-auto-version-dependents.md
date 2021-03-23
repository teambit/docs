---
id: auto-version-dependents
title: Auto-Update Dependent Components
---

Bit uses its generated dependency graphs to recognize which components are affected by a change made to another component.
Whenever a component is modified and tagged, a ripple effect of auto-tags will occur on every component dependent on it, directly and indirectly.

A tag process involves not only a new version but also testing and building the component in its own isolated environment.
This process is crucial in handling multiple, independent modules as it validates a change to a component did not break other components in unexpected ways.

When we import and component and integrate it into another component, our Workspace UI notifies us that the 'component was modified (`M`), and since it depends on this component, it is marked with `D` to inform us of a change to one of its dependencies.

<div style={{textAlign: 'center'}}>
     <img src="/img/modified_components.png" width="50%" style={{boxShadow: '3px 3px 15px 3px rgba(0,0,0,0.20)', padding: 20, marginBottom: 20}}></img>
</div>

Let's examine this further using the `status` command:

```shell
bit status
```

```
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > hooks/use-jokes ... ok
     > ui/elements/app-bar ... ok
     > ui/elements/button ... ok
     > ui/widgets/widgets ... ok
getting-started-result (main) $ bit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > ui/elements/button ... ok


staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > hooks/use-jokes. versions: 1.0.0 ... ok
     > ui/elements/app-bar. versions: 1.0.0 ... ok
     > ui/elements/button. versions: 1.0.0 ... ok
     > ui/widgets/tech-jokes-viewer. versions: 1.0.0 ... ok


components pending to be tagged automatically (when their dependencies are tagged)
     > ui/widgets/tech-jokes-viewer ... ok
```

In the above output, Bit notifies us of two important things:

1. 'button' is a modified component
2. 'tech-jokes-viewer' will be tagged automatically when its dependencies (in that case, 'button') are tagged.

<br />

Let's tag our `button` component to save the previous change made to it:

```shell title="Auto-tag process for dependents"
bit tag ui/elements/button --message "add animated loader"
```

As expected two components were tested, the tagged 'button' component, and the auto-tagged 'tech-jokes-viewer'.
Both passed successfully.

```shell
 PASS  ../capsules/../demo-org.demo-scope_ui_elements_button@1.0.1/dist/button.spec.js
 PASS  ../capsules/.../demo-org.demo-scope_ui_widgets_tech-jokes-viewer@1.0.1/dist/tech-jokes-viewer.spec.js

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.402 s
```

Once the build process is complete, and all tests passed successfully, Bit tags all affected components with a bumped version.

```
2 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag" to unstage versions)

changed components
(components that got a version bump)
     > ui/elements/button@1.0.1
       auto-tagged dependents:
            ui/widgets/tech-jokes-viewer@1.0.1
```

If we look at our local scope status, we'll see both component appear there with a new bumped version number:

```shell
bit list
```

```shell
  ┌──────────────────────────────────────────┬─────────┬─────────┐
  │ component ID                             │ local   │ used    │
  │                                          │ version │ version │
  ├──────────────────────────────────────────┼─────────┼─────────┤
  │ hooks/use-jokes                          │ 1.0.0   │ 1.0.0   │
  ├──────────────────────────────────────────┼─────────┼─────────┤
  │ teambit.teaching/ui/elements/dots-loader │ 0.0.1   │ 0.0.1   │
  ├──────────────────────────────────────────┼─────────┼─────────┤
  │ ui/elements/app-bar                      │ 1.0.0   │ 1.0.0   │
  ├──────────────────────────────────────────┼─────────┼─────────┤
  │ ui/elements/button                       │ 1.0.1   │ 1.0.1   │
  ├──────────────────────────────────────────┼─────────┼─────────┤
  │ ui/widgets/tech-jokes-viewer             │ 1.0.1   │ 1.0.1   │
  └──────────────────────────────────────────┴─────────┴─────────┘
```
