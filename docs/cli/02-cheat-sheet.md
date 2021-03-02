---
id: cheat-sheet
title: CLI Reference
---

#### Initialize a new workspace

```
$ bbit init
```

#### Start Bit development server

```shell
$ bbit start
```

#### Get workspace status

```shell
$ bbit status
```

#### Track a component

```shell
$ bbit add <path/to/component>
```

#### Version a component

```shell
$ bbit tag <component-id> <new-version-number>
```

#### Export components

From the terminal run the `bbit create` command:

```shell
$ bbit export
```

#### Install dependency

```shell
$ bbit install <dependency name>
```

#### Install all dependencies after clone

```shell
$ bbit install
```

#### Build components

```shell
$ bbit build
```

#### Test components

```shell
$ bbit test
```

#### Move component to a different directory

```shell
$ bbit mv <component> <target-dir>
```

#### Relink components to the workspace

```shell
$ bbit link
```

#### Remove component from a workspace

```shell
$ bbit remove
```

#### Get component configuration

```shell
$ bbit eject-conf <component>
```
