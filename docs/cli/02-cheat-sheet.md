---
id: cheat-sheet
title: Cheat Sheet
---

## Initialize a new workspace

```
$ bbit init
```

## Start Bit development server

```
$ bbit start
```

## Get workspace status

```
$ bbit status
```

## Creating a new component

From the terminal run the `bbit create` command:

```sh
$ bbit create <component name>
```

Bit them creates a new component according to the configuration in the `workspace` extension, meaning it'll be in the `directory` location and the component name will be pre-fixed by the `scope` property.

## Install dependency

```
$ bbit install <dependency name>
```

## Install all dependencies after clone

```
$ bbit install
```

## Build components

```
$ bbit build
```

## Test components

```
$ bbit test
```

## Move component to a different directory

```sh
$ bbit mv <component> <target-dir>
```

## Relink components to the workspace

```sh
$ bbit link
```

## Remove component from a workspace

```sh
$ bbit remove
```

## Get component configuration

```sh
$ bbit eject-conf <component>
```