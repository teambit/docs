---
id: bit-server
title: Setup Bit Server
---

Collaborating between Bit components require setting up a remote server accessible for all collaborators. You may use bit.dev as a remote server or setup your own.  

> The only functionality available on own server is components export and import. Building, testing and rendering is only provided on bit.dev. Also, npm / yarn install is only available for components exported to bit.dev.  

A Bit server is a host server that hosts one or more bare collections. That is, collections that do not have a working directory. Bit communication to server is done using SSH protocol. Collaborators will setup the server's collection as remotes to their local collections. Then, they  export to and import from those collections.  

## Prerequisites

- *nix server
- SSH installed on server

## Server Setup

- Create a user for bit on your server and assign SSH key to it
- [Install bit on your server](/docs/installation.html)
- Create Bit Bare collection:

```bash
su bit
mkdir /opt/bit
cd /opt/bit
mkdir first-collection
cd first-collection
bit init --bare
```

- Add your own public SSH key to the authorized_keys list of the user bit. This will allow you to import and export components hosted in first-scope.  

## Working with Remote Collection

### Setup the remote collection

To work with the remote collection do the following: 

```bash
mkdir my-project
cd my-project
bit init
bit remote add ssh://bit-username@bit-server:/opt/bit/first-collection
```

### Export to remote collection

To export components to the remote collection:

```bash
bit export first-collection
```

### Import from remote collection

to import components stored on the remote collection run:

```bash
bit import first-collection.component-name
```

