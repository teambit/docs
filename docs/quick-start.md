---
id: quick-start
title: Quick Start
---

## Installing Bit

```bash
npm i -g @teambit/bvm
bvm install
```

## Compose Components

### Creating a Workspace

Creating a [Workspace](/workspace/overview) can be done with a single command.

```bash
bit new react my-workspace
```



### Create Components

```bash
bit create react my-component
```

For more information [Creating Components](/)


- What it is.
- How to use.
- How to learn more.


Bit simplifies the process of testing components through the [Tester](/) aspect. To test your components just use:

```bash
bit test
```

Please note, Bit automatically watches and re-executes your component tests when using `bit start`,

To learn more about component testing, refer to [Tester](/).

## Release Components

### Version Components

Snap or tag.

```bash
bit tag --all 1.0.0 --message 'my first version'
```

### Export Components

```bash
bit export
```

### Host Scope on your own server

```bash

```

### Bit.dev

## Use and Collaborate on Components

### Install Components

```bash
bit install @teambit/base-ui.my-component
```

Also, components can be installed with any package manager from any app.

```bash
npm install @teambit/base-ui.my-component
```

Just make sure to [configure the Bit registry](/) if you are using bit.dev.
Also, components can be published to any registry or integrated with Artifactory or Nexus.

### Importing Components

```bash
bit import teambit.base-ui/my-component
```


### Change requests

```bash
bit switch my-feature --create
bit snap --all
bit export
```
