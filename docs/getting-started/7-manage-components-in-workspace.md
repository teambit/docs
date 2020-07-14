---
id: managing-components-in-a-workspace
title: Everyday Commands
---

TODO - intro

## Get workspace status

TODO - THIS SHOULD BE A PART OF THE WEB UI. ALSO CONSIDER ADDING A NOTE ABOUT `bit status`.

## Creating a new component

From the terminal run the `bit create` command:

```sh
$ bit create <component name>
```

Bit them creates a new component according to the configuration in the `workspace` extension, meaning it'll be in the `directory` location and the component name will be pre-fixed by the `scope` property.

## Run commands on components

- part of env
- note about standardization
- `bit start` handles it on dev-time

### Build

```sh
$ bit run build
```

### Test

```sh
$ bit run test
```

## Use component

```typescript
import { component } from "@my-scope/componnet";
```

## Move component to a different directory

```sh
$ bit mv
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
