---
id: packing-components
title: Packing Components
---

## CLI Reference

Creates a TAR file (to be published to a node package registry):

```shell
$ bit pack <component-id>
```

Overrides the existing TAR file (in the same location):

```shell
$ bit pack <component-id> --override

$ bit pack <component-id> -o
```

Returns the output in a JSON format:

```shell
$ bit pack <component-id> --json

$ bit pack <component-id> -j
```
