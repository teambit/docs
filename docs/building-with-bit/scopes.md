--- 
id: scopes
title: Scopes
--- 

import { Image } from '@site/src/components/image'

A scope is a storage for components' tagged versions. The 'tagged versions' are the built and "committed" versions of a component. Tagged components are completely decoupled from their authoring [workspace](/building-with-bit/workspaces). That means, all configurations set by the workspace, and all generated artifacts, are stored and encapsulated in them.

## Remote scope

A remote scope is a remote collection of Bit components that were 'tagged' and 'exported' from one or more [Bit workspaces](/building-with-bit/workspaces). Storing components on a remote scope makes them available to be consumed and further maintained, by other Bit workspaces (in various repositories).

Each scope, or "collection", groups together components that are related by function or purpose. As such, a single remote scope should be maintained by a single group of stakeholders, developers and even non-developers (designers, product managers, etc.).

Remote scopes are hosted on [Bit.dev](https://bit.dev) or [self-hosted Bit servers](/building-with-bit/scope/self-host-bit-scope). Each Bit server can host multiple scopes.

A scope is visually represented by the Scope UI (similarly to the way a workspace UI visually represents your workspace).

<Image src="/img/scope_ui.png" />

<br />

To set up a remote scope, [see here](/building-with-bit/scopes).

### Cached dependencies

Scopes keep internal copies of their external dependencies (i.e, components located in other scopes). This is done to ensure your own scope is completely independent, even when its different components use components maintained by others.

External dependencies are cached only if they are Bit components, registered on Bit's registry. Packages from other registries will not be cached.

## Local scope

The local scope is located in the `.bit` or `.git/bit` directory at the root of a Bit workspace. It is where versioned or tagged components, either authored in the workspace or imported into it, are stored.

The local scope serves two main functions:

- It is where components are "staged" before they are exported to a remote scope.
- It enables the workspace to recognize whether a component has been modified by comparing the immutable version stored in the local scope to the component files tracked by the workspace.

> The local scope (`.bit` or `.git/.bit`) should not be tracked by Git.


## Setting up a Remote Scope

A remote scope is where the _shared_ release versions of components are stored. Each of these release versions packs in it the workspace configurations relevant to it, as well as artifacts produced by the ['build pipeline'](/building-with-bit/build-pipeline). That means, each component is not only available to be used in other repositories, but it can also be maintained and modified in other workspaces, as it offers all the information needed for it.

To explore popular use-cases of remote scopes, [see here](/essentials/what-is-bit#popular-use-cases).

Setting up a remote scope is done in two steps:

1. Create a scope on [Bit.dev](https://bit.dev) (or [self-host](/building-with-bit/scope/self-host-bit-scope) on your own server).

2. Configure your workspace to export components to one or more scopes

## Create a scope on Bit.dev

[Bit.dev](https://bit.dev) is a cloud service built by the maintainers of Bit. This cloud service offers a multitude of features necessary for collaborating on independent components. That includes hosting and organizing Bit scopes, great search capabilities, a [cross-repository CI for independent components](/essentials/what-is-bit#ripple-ci-coming-soon---component-driven-builds), and much more.

To create a new remote scope on [Bit.dev](https://bit.dev), [follow these steps](/building-with-bit/scopes).

## Configure remotes scopes in the workspace

As with (almost) any other type of workspace configuration, scopes can be set as the workspace default (for all components) or as a property of specific sets of components.

### Set a remote scope as the workspace default

The default scope is defined in the `workspace.jsonc` inside the `teambit.workspace/workspace` field. The default scope will be overridden by more [specific scope configurations](/building-with-bit/scopes#set-multiple-scopes-to-different-groups-of-components).

A scope hosted on Bit.dev will always have the following pattern: `<scope-owner>.<scope-name>`. A scope owner can be either a user or an organization.

```jsonc
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "my-workspace",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
```

### Set multiple scopes to different groups of components

A single workspace can export components to multiple scopes. To achieve that, use [@teambit.workspace/variants](/building-with-bit/workspace) (in the `workspace.jsonc`)

```json
"teambit.workspace/variants": {
    // Select all components in the following directory
    "components/react/ui": {
        // Set the following scope
        "defaultScope": "my-org"."my-design-system"
    },
    // Select all components with the 'toolbox' namespace
        "{toolbox/*}": {
        // Set the following scope
        "defaultScope": "my-org"."my-toolbox"
    }
}
```

To learn more about using `@teambit.workspace/variants` to select components, [see here](/building-with-bit/workspace).

## Change component scope

In case you want to export a component to a different scope you will need to modify its configuration. This configuration operation changes the component module name, so you will have to run the `bit link` command. This command creates the new component module name in your project's `node_modules`.


## Self Hosting a bit Scope

Collaborating between Bit components require setting up a remote server accessible for all collaborators. You may use bit.dev as a remote server or setup your own.

> You can host and share components on your own server. I.e. export components to it and import components from the server. Building, testing and rendering should be done on your own CI/CD. Search and npm / yarn install are only available for components exported to bit.dev.

A Bit server is a host server that hosts one or more bare scopes. That is, scopes that do not have a workspace (a working directory). Bit communication to server is done using SSH protocol. Collaborators set up the server's scopes as remotes to their local scopes. Then, they export to and import from those scopes.

## Prerequisites

- \*nix server
- SSH installed on server

## Server Setup

- Create a user for bit on your server and assign SSH key to it
- Install bit on your server
- Create Bit Bare scope:

```shell
su bit
mkdir /opt/bit
cd /opt/bit
mkdir first-scope
cd first-scope
bit init --bare
```

- Add your own public SSH key to the authorized_keys list of the user bit. This will allow you to import and export components hosted in first-scope.

### Authentication

When logging into a server, Bit tries logs in using SSH with the following combinations:

1. Username `token` and Bit token from Bit config as password
1. SSH key pair from ssh-agent
2. SSH key pair from the filename in bit config
3. SSH key pair from a default location ( such as ${userHome}/.ssh/id_rsa)
4. Anonymous login. This happens only to read operations: username: `anonymous` and password is blank

If all the above fail, for write operations, Bit prompts for username and password.
It is up for the server deployment to decide on the relevant policy.

## Working with Remote Scopes

### Setup the remote scope

To work with the remote scope do the following:

```shell
mkdir my-project
cd my-project
bit init
bit remote add ssh://bit-username@bit-server:/opt/bit/first-scope
```

### Export to a remote scope

To export components to the remote scope:

```shell
bit export first-scope
```

### Import from remote scope

to import components stored on the remote scope run:

```shell
bit import first-scope/component-name
```

### Resolve between scopes

If you have components that depend on components from other scopes, you need to inter-connect the scopes. If a component in scope A is dependent on a component in scope B, you need to make scope A aware of scope B (the other direction is not required). The two ways for creating the connections are:

Make scope A aware of scope B by adding a scope B as a remote scope in scope A. In scope A run:

```shell
# If they are on the same machine:
bit remote add file:///your-scope-a-directory
```

Another option is to define a resolve function that resolves the scopes. The function is defined in the bit.json in the workspace, and Bit uses it whenever it needs to resolve paths between scopes.

```json
{
  "name": "bit.envs",
  "remotes": {},
  "resolverPath": "/app/resolver.js"
}
```

The function gets the destination scope name (the destination from to get the dependency) and source scope name (the scope that has the dependent) as parameters. It should return a valid url of the destination, e.g: `file:///tmp/my-scope-name`. The example bellow is code taken from bit.dev:

```javascript
// /app/resolver.js
const http = require('http');
module.exports = (dst, src) =>
  new Promise((resolve, reject) =>
    http.get(
      `http://bit-permissions-service/scopes?src=${src}&dst=${dst}`,
      (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => (rawData += chunk));
        res.on('end', () =>
          res.statusCode === 200
            ? resolve(`file:///tmp/bithub/${JSON.parse(rawData).payload}`)
            : reject({
                code: 134,
                message:
                  `unable to export components to ${src} because they have dependencies on components in ${dst}. ` +
                  'bit does not allow setting dependencies between components in private collections managed by different owners.',
                sourceScope: dst,
                destinationScope: src,
              })
        );
      }
    )
  );
```

## Package registry

Components published to bit.dev are available for installation using npm (or yarn) under the `@bit` namespace. You can also set your own registry, using tools such as [JFrog](https://jfrog.com/) or [Verdaccio](https://verdaccio.org/).  
To install packages to registry, you will need to run code similar to the one used in [bit e2e tests](https://github.com/teambit/bit/blob/master/e2e/npm-ci-registry.ts).


## Scope 

The Scope UI, hosted on Bit servers (for example, [Bit.dev](https://bit.dev)) is almost a complete mirror image of the Workspace UI.
That includes the component docs and compositions, as well as the customizations made to the Workspace UI itself.

<Image src="/img/scope_ui_ss.png" padding={20} />

