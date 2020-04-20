---
id: bit-server
title: Bit Server
---

Collaborating between Bit components require setting up a remote server accessible for all collaborators. You may use bit.dev as a remote server or setup your own.  

> You can host and share components on your own server. I.e. export components to it and import components from the server. Building, testing and rendering should be done on your own CI/CD. Search and npm / yarn install are only available for components exported to bit.dev.  

A Bit server is a host server that hosts one or more bare scopes. That is, scopes that do not have a workspace (a working directory). Bit communication to server is done using SSH protocol. Collaborators set up the server's scopes as remotes to their local scopes. Then, they export to and import from those scopes.  

## Prerequisites

- *nix server
- SSH installed on server

## Server Setup

- Create a user for bit on your server and assign SSH key to it
- [Install bit on your server](/docs/installation.html)
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
1. SSH key pair from the [filename in bit config](/docs/conf-config#ssh_key_file)
1. SSH key pair from a default location ( such as ${userHome}/.ssh/id_rsa)
1. Anonymous login. This happens only to read operations: username: `anonymous` and password is blank  

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
    "resolverPath": "/app/resolver.js",
}
```

The function gets the destination scope name (the destination from to get the dependency) and source scope name (the scope that has the dependent) as parameters. It should return a valid url of the destination, e.g: `file:///tmp/my-scope-name`. The example bellow is code taken from bit.dev:  

```javascript
// /app/resolver.js
const http = require('http');
module.exports = (dst, src) => new Promise((resolve, reject) =>
  http.get(`http://bit-permissions-service/scopes?src=${src}&dst=${dst}`,
  res => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', chunk => rawData += chunk);
    res.on('end', () => ((res.statusCode === 200)
      ? resolve(`file:///tmp/bithub/${JSON.parse(rawData).payload}`)
      : reject({code: 134, message: `unable to export components to ${src} because they have dependencies on components in ${dst}. ` +
        'bit does not allow setting dependencies between components in private collections managed by different owners.', sourceScope: dst, destinationScope: src }))
    );
  }));
```

## Package registry

Components published to bit.dev are available for installation using npm (or yarn) under the `@bit` namespace. You can also set your own registry, using tools such as [JFrog](https://jfrog.com/) or [Verdaccio](https://verdaccio.org/).  
To install packages to registry, you will need to run code similar to the one used in [bit e2e tests](https://github.com/teambit/bit/blob/master/e2e/npm-ci-registry.ts).  
