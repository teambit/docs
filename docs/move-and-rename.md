---
id: move-and-rename
title: Modifying File Structure and Renaming Components
permalink: docs/move-and-rename.html
layout: docs
category: Getting Started
prev: update-component-dependencies.html
next: updating-sourced-components.html
---

Renaming, moving, removing and adding additional files are common procedures when modifying your code. In this section you'll learn how to move and rename component files, how to add new ones, and how to deal with component ID renaming.

A component's file structure is not immutable - components are meant to grow and change over time, so adding new files, and also moving, removing and renaming existing ones, is entirely possible and easy-to-do.


## Renaming a component's ID

It's impossible to actually rename a component's ID, for the same reason it's impossible to rename a node module package - it will break any code that consumes the component.

Instead of renaming a component, you can [deprecate](/docs/cli-deprecate.html) the component and introduce a new identical component, only with a different name.

First, deprecate the component:

```bash
$ bit deprecate exampleuser.utils/string/pad-left
```

Then, copy all the files to a new location and add a new component.

```bash
$ bit add src/utils/pad-left-rename/pad-left.js --id string/pad-left-rename
```