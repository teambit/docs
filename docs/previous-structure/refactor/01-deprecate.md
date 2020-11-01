---
id: deprecate
title: Deprecate Components
---

## Deprecate a component in a remote collection

To deprecate a component in a remote Collection, specify the full component ID and use the `--remote` option.

```shell
$ bit deprecate username.your-collection/foo/bar --remote
deprecated components: username.your-collection/foo/bar
```

## Deprecating a component in a workspace

To deprecate a component in a workspace, specify the component ID.

```shell
$ bit deprecate foo/bar
deprecated components: foo/bar
```
