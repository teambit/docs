---
id: how-bit-works
title: How bit Works?
---

Components are the building blocks of modern web architectures. Encapsulated and reusable components with focused and well-defined APIs let developers build more robust software applications more quickly.

The major frontend frameworks - React, Vue, and Angular - all share the concept of using component-based architecture to compose state-of-the-art applications. Even browsers themselves are backing components as an inherent feature by supporting the Web Components standard.

Bit leverages component to make them not only reusable inside an application but provides an ecosystem for sharing components between applications and across repositories. 

Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in making the component reusable across projects. 

## Bit Component

A Bit component is a reusable piece of code, such as 

- A react, Vue or Angular component
- Shared stylesheet (e.g., CSS, SCSS) or stylesheets 
- Utility function used by the application.

For each component Bit stores three elements: 

- The source code (including code itself, testing and documentation)
- Dependency graph
- Tools & Configuration

![Bit component](https://storage.googleapis.com/static.bit.dev/docs/images/component.svg)

### Source Code

A component starts its Bit journey by specifying the source files. 
Typically, the component’s content is not just the source code itself and can include additional files that are related, such as the styling files, assets (images, fonts), test code, documentation.  
Bit maps the set of files to a component, with a particular file as the entry point for the component. Bit marks the entry point file as `main`.  

### Dependency Graph

When adding sources to a Bit component, Bit analyzes all the dependencies it includes (i.e., import and require statements in the code).
Bit then creates a model of all the dependencies of the component. 
The dependencies include the following:  

- NPM packages installed as node_modules
- Bit components installed node_modules
- Bit components imported into the workspace
- Bit components created locally from local files

The dependency graph makes a component self-contained and allows moving the component around projects without losing any references.  

### Tools and Configuration

Bit links each component with a set of tools and configurations. The tools are dedicated components that can take the component source code and its dependency graph and generate some desired result. 
The most common tools linked to components are: 

 - **Compiler**: compiles or transpiles the original files and generate built artifacts. The artifacts are consumable by applications or other components. Compilers are specific for frameworks and usually also for flavors of the framework, as they contain the configuration required to run them.  
- **Tester**: An extension that runs the tests associated with the component and returns status.  

## Component Characteristics

### Component id

Each component has a unique id. We use the Component id when installing the component, importing it, or utilizing it in the project. 
A full ID of a component comprises from the collection name, namespaces, and the short Id: 
`owner.collection/namespace/namespace/short-id`;
Using namespaces allows organizing components in the same way we organize files inside folders. 
However, the above name is not usable when installing the components with package managers (Yarn, NPM). Then, the name translates to: 
`@registry-name.owner.collection.namespace.namespace.short-id`. For components stored on bit.dev, the registry name is always @bit. 
To use the component in the code, you should import as follow: 

```bash
import { something } from '@bit/owner.collection/namespace/namespace/short-id';
```

### Main file

Each component has a main file, which is an entry point to the component. The main file is one of the source files. Bit starts from the main file and checks all the dependencies the component has. All imports should reference NPM packages, e.g., 'lodash' or files included in the component or other components.  

### Versions

Bit components are versioned using [Semantic Versioning](https://semver.org). Creating a new version of a component is done by tagging it with a new version. Bit then snapshots all the component's files and dependencies. New versions of components are shareable to remote scopes using the bit export command. 

## Components Management

Bit is a CLI based tool for working with components. Bit stores components in two formats:  

- Inside a **scope**, Bit stores the semantic representation of Bit components as objects with all their history and relationships.  
- Inside the **workspace**, Bit stores the file representation of a single version of the component.  

![Components Management](https://storage.googleapis.com/static.bit.dev/docs/images/scope-workspace.svg)

### Workspace

Bit creates a workspace inside a working project when running the init command. From that point on, you can create components and checkout components from the local scope into the workspace and use them in the project.  

The workspace has:  

- Workspace configuration - contains information about the project that contains the Bit components such as the package manager used for installing it, the compilers and testers used by the components, and the components code location. The [workspace configuration](/docs/workspace) is stored under the bit section in the `package.json` or as a separate `bit.json` file at the workspace root.
- Components index - defines the files that comprise each component. Bit stores the index in the `.bitmap` file at the workspace root.

Inside a workspace, there are two types of components:  

- [Authored components](/docs/workspace#authored-components)
- [Imported components](/docs/workspace#imported-components)

### Scope

A scope may exist inside a workspace or without a workspace. Components are shared between scopes using import and export commands.  
The components are stored as [content addressable storage](https://en.wikipedia.org/wiki/Content-addressable_storage) as a storage efficient mechanism.  
The scope resides under the `.bit` folder. Inside a workspace that it is also a git project, it defaults to `.git/bit` folder.  

Use the bit `tag` and `checkout` commands to transfer a single version of a component between the local scope and the workspace.  

Note: Bit workspace and scope are highly inspired by the mechanisms used in Git for managing a git workspace and a git repository, so if you are familiar with those, it is easier to understand Bit.

### Remote Scope

The remote scope is a scope that resides on a server, also called a **bare scope**, since it is defined outside a workspace.  
A remote scope is used for sharing components, so it is, in fact, a place where components are exported to and imported from.  

A user can set up a [Bit Server](/docs/bit-server) that holds remote scopes for sharing components between Bit workspaces. Alternatively, users can use [bit.dev](/docs/bit-dev) for storing remote scopes of components.  

## Component transitions

The diagram below highlights the main commands that move components between the local workspace, the map index (`.bitmap` file), the local scope (`.git/.bit`) and the remote scope:  

![commands overview](https://storage.googleapis.com/static.bit.dev/docs/images/commands_overview.svg)
