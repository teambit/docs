---
id: bit-server
title: Setup Bit Server
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

```bash
su bit
mkdir /opt/bit
cd /opt/bit
mkdir first-scope
cd first-scope
bit init --bare
```

- Add your own public SSH key to the authorized_keys list of the user bit. This will allow you to import and export components hosted in first-scope.  

## Working with Remote Scopes

### Setup the remote scope

To work with the remote scope do the following:  

```bash
mkdir my-project
cd my-project
bit init
bit remote add ssh://bit-username@bit-server:/opt/bit/first-scope
```

### Export to a remote scope

To export components to the remote scope:

```bash
bit export first-scope
```

### Import from remote scope

to import components stored on the remote scope run:

```bash
bit import first-scope.component-name
```

