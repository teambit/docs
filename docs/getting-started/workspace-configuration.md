---
id: workspace-configuration
title: Workspace Configuration
---

## Setting the Default Scope Name

Once you have your account setup on [Bit.dev](https://bit.dev/) and have created a remote scope you will need to set this in your `workspace.jsonc` so that you can add your components to your remote workspace.

```json
"defaultScope": "AccountName.ScopeName",
```

## Setting the React Environment

**Uncomment** the following lines in your `workspace.jsonc` configuration file, to apply the basic ['React' development environment](/aspects/react/overview) on all components in this workspace.

```json title="workspace.jsonc"
"teambit.workspace/variants": {
  "*": {
    "teambit.react/react": { }
  }
}
```

### Reset your dev server

Any change in the `workspace.jsonc` file requires a restart of the local dev-server. We can stop our server using (Ctl/cmd + c) and run it again using the start command.

```shell
bit start
```
