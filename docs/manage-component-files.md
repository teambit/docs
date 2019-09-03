---
id: manage-component-files
title: Managing Component Files
permalink: docs/manage-component-files.html
layout: docs
category: Getting Started
prev: tracking-dependencies.html
next: tag-component-version.html
---

We use `bit add` to remove, add, move and rename files in and between components.

[bit add](/docs/cli-add.html) is a unique command since we use it several times during a component's lifecycle. We use this command to do many operations on the files of the component.

## Adding a file to a component

To append a file to the component, we use `bit add` and specify the component ID we want to append the file too. For example, let's  append a file named `foo.js` to the existing component `foo/bar`:

```bash
$ bit add src/foo.js --id foo/bar
```

## Removing files from components

When deleting a file (that's part of a component) from the filesystem, Bit detect and handles it. So no further action needed. However, if we want to remove a file from a component without deleting it, we need to tell Bit to exclude it.  
Exclude files from existing components with the `--exclude` feature of the `bit add` command.  
Let's take a look at the following directory tree:

```bash
.
├── package.json
└── src
    └── hello-world
        ├── hello-world.js
        └── index.js
```

Add the `hello-world` directory as a component:

```bash
$ bit add src/hello-world
tracking component src/hello-world:
    added src/hello-world/hello-world.js
    added src/hello-world/index.js
```

Now exclude `index.js` from the component:

```bash
$ bit add src/hello-world --id src/hello-world --exclude src/hello-world/index.js
tracking component src/hello-world:
    added src/hello-world/hello-world.js
```

## Moving and Renaming files

When moving and renaming files, Bit won’t always track the changes. To ensure Bit tracks these changes use [bit move](/docs/cli-move.html), This command is similar to [git mv](https://git-scm.com/docs/git-mv).

### Moving a file

```bash
bit move src/foo/bar/index.js src/components/new/location/new-file-name.js
```

### Rename a file

To rename a file, use `bit move` from the old to the new file name.

```bash
bit move src/foo/bar/index.js src/foo/bar/new-name.js
```