---
id: organizing-components
title: Organizing Components in Collections
permalink: docs/organizing-components.html
redirect_from:
  - "docs/organizing-components-in-scopes.html"
layout: docs
category: Getting Started
next: removing-components.html
prev: documenting-components.html
---

In this section, we’ll learn how to share & organize components in collections.

By exporting components to remote collections, we allow other developers to consume them. We can only export versioned components. This is because they are immutable and isolated. The command we use to export components is [bit export](/docs/cli-export.html).

## Organizing components in a single Collection

To export all staged components to a single collection, specify a remote collection as a destination:

```bash
$ bit export bit.movie-app
2 components were exported to Collection bit/movie-app
```

Bit exports all staged components to the `bit/movie-app` collection.

## Organizing components in many Collections

To choose which component to export to which collection, add the component ID to the export command.

```bash
$ bit export bit.movie-app hello/world
component hello/world was exported to Collection bit/movie-app
```

## Replace exported component with a package

Components exported to Bit are consumable with package managers. Bit allows ejecting components and replaces them with its node module. The name of this process is 'ejecting'. This is sugar syntax for both deleting the local component and running `npm install`.

### Ejecting a component on export

To eject a component on export, use [bit export](/docs/cli-export.html) with the `--eject` option:

```bash
$ bit export bit.movie-app --eject
2 components were exported to Collection bit/movie-app
```

### Ejecting a component after export

To eject a component after export, use [bit eject](/docs/cli-eject.html) command. 

```bash
bit eject hello/world
```