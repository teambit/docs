---
id: modifying-sourced-components
title: Modifying Sourced Components
permalink: docs/modifying-sourced-components.html
layout: docs
category: Getting Started
next: update-dependencies.html
prev: sourcing-components.html
---

It's possible to change a component from any consuming project.

When we import a component using Bit, it downloads the source code of the component. Moreover, Bit keeps tracking the files as a component. This allows doing modifications to the component. It's also possible to run build and test tasks for imported components. This is because Bit keeps them isolated from the consumer project. All changes are also tracked, versioned and exported.

For example, if we import and component and then change, we can run `bit status` and see that the component is `modified`.

```bash
$ bit status
modified components
  > string/pad-left... ok
```

## Version a sourced component

Sharing a modified version of a sourced component is like sharing any modified component. First we need to tag a new version and see that it is isolated. Afterwards we run `bit export` to share the new version.

```bash
$ bit tag string/left-pad
$ bit export bit.utils
```

## Keep local changes

In some cases we want to change a component and keep the modifications local. This can be because there are specific customizations required for that specific instance of a component. With Bit we can do that by importing components, make the changes, and track all files using Git.  
Bit still allows fetching remote changes for these components. We can even merge the changes to the modified component.

## Replace component with a package

It's possible to replace a sourced component with its corresponding node package. We call this process *eject*. When we eject a component using Bit, Bit triggers a delete action for the local component, and `npm install` command to install the package.

To eject a component a component on export:

```bash
$ bit export bit.examples string/left-pad --eject
```

To eject a component after export:

```bash
$ bit eject string/left-pad
```

Learn more about exporting and ejecting components [here](/docs/organizing-components.html#remove-a-component-from-your-repository-after-an-export).
