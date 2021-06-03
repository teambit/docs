---
id: bit-oss-server
title: Self-hosted Bit Scope
---

Collaborating between Bit components require setting up a remote Scope (server) accessible for all collaborators. You may use [bit.dev](https://bit.dev) as a remote server or setup your own.

A remote Bit Scope is a host server that hosts components. Bit communication to server is done using HTTP/S protocol. Collaborators set up the Scope as remotes to their local workstation. Then, they export to and import from those scopes.  

## Prerequisites

- Docker

## Server Setup

Clone and follow the instructions in [this repository](https://github.com/teambit/bit-docker) to setup a single remote Bit Scope.

## Working with Remote Scopes

### Setup a remote scope

Your workstation may be configured to use many remote scopes. Use the `bit remote` command to manage them.

```shell
bit remote add http://<hostname>:3000
```

### Export to a remote scope

To export components to a remote scope make sure to configure your `workspace.jsonc` file with a `defaultScope`:

```json title="set defaultWorkspace for a workspace
{
    "teambit.workspace/workspace": {
        "defaultScope": "<remote scope name>"
    }
}
```

```json title="set defaultWorkspace for a variant
{
    "teambit.workspace/variants": {
        "ui/components": {
            "defaultScope": "<remote scope name>"
        }
    }
}
```

Ensure `defaultScope` is configured as a `remote` for your workstation:

```sh
bit remote
```

Export components

```sh
bit export
```

### Import from remote scope

to import components stored on the remote scope run:

```sh
bit import <scope>/<component>
```

## Resolve between Scopes

If you have components that depend on components from other scopes, you need to inter-connect the scopes.  
For example, a component in scope `A` depends on a component in scope `B`. This means you need to make scope `A` aware of scope `B`.  

```shell title="Add scope B as a remote for scope A"
bit remote add file:///your-scope-a-directory
```
