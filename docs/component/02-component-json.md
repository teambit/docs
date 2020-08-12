---
id: component-json
title: Configuration
---

## Component configuration

Alongside the code and dependency graph, Bit keeps configuration for each component. It is derived from the workspace configuration so you can control a set of similar components from a single configuration source. To see the actual configuration applied on a component use the `bit show` command.

```sh
$ bit show button

# TODO - output
```

### Eject component configuration file

If you require detail control on a specific component and don't want to keep this configuration as part of the workspace you can choose to eject the component configuration to your workspace and modify it according to your needs.
To get the calculated component configuration and have specific control over it use the `bit eject-conf` command. When this command is issued Bit will eject a `component.json` file containing the specific configuration of the selected component.

```sh
$ bit eject-conf <component>
$ tree account/login-form
account/login-form
├── index.tsx
├── component.json # configuration file
├── ...
```

You can keep modifications in this file and control the specific component. Bit will use that file as the source of the component configuration.

#### Component configuration structure

Similar to the `workspace.json` file, the `component.json` file is configured with a set of extensions. However, there are special keys for components which are not available for a workspace.

```json
// TODO - snippet with comments
```

