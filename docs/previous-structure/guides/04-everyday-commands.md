---
id: everyday-commands
title: Everyday Commands
---

## Initialize a new workspace

```
$ bit init
```

## Start Bit development server

```
$ bit start
```

## Get workspace status

```
$ bit status
```

## Creating a new component

From the terminal run the `bit create` command:

```sh
$ bit create <component name>
```

Bit them creates a new component according to the configuration in the `workspace` extension, meaning it'll be in the `directory` location and the component name will be pre-fixed by the `scope` property.

## Install dependency

```
$ bit install <dependency name>
```

## Install all dependencies after clone

```
$ bit install
```

## Build components

```
$ bit build
```

## Test components

```
$ bit test
```

## Move component to a different directory

```sh
$ bit mv <component> <target-dir>
```

## Relink components to the workspace

```sh
$ bit link
```

## Remove component from a workspace

```sh
$ bit remove
```

## Get component configuration

```sh
$ bit eject-conf <component>
```
