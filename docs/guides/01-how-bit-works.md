---
id: how-bit-works
title: How Bit Works?
---

Bit is the component collaboration platform. Bit leverages component reusability by providing an ecosystem for sharing components between applications and across repositories.  
Components are the building blocks of modern web architectures. Encapsulated and reusable components with focused and well-defined APIs let developers build more robust software applications more quickly. The major frontend frameworks - React, Vue, and Angular - all share the concept of using component-based architecture to compose state-of-the-art applications. Even browsers themselves are backing components as an inherent feature by supporting the Web Components standard.  

Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in making the component reusable across projects.  

## Understanding Bit Components

A Bit component is a reusable piece of code, such as  

- A react, Vue or Angular component
- Shared stylesheet (e.g., CSS, SCSS) or stylesheets  
- Utility function used by the application.

The exact boundaries of the component are a design decision. It is possible to package a whole library as a single Bit component or split each functional piece as a separate component.  

In a bird-eye view, code options can boil down to these:

```javascript
// Each component packaged as a Bit component
import { Text } from '@bit/collection.text'
import { Card } from '@bit/collection.card'
import { Button } from '@bit/collection.button'

// Some components may be compositions and include integrations for APIs
import { Homepage } from '@bit/collection.homepage'
import { InvoiceList } from '@bit/collection.invoice-list'
```

![discrete components](https://static.bit.dev/homepage-bit/example-008.png)

When working with concrete and focused components, each one versioned on its own; you can enjoy a broad set of benefits:  

- The consumer of the components gets a smaller bundle size, as they only get the component they need.  
- Each component is versioned separately, so the version numbers can reflect the changes made in the component using semver conventions (patch, minor, major).
- The consumer is not bound to consume a single version of all the components, so if a particular component is faulty, they can retain an older version of it, while advancing other components.
- Shorter release cycles for each component, as there is no need to "wait" on changes for the whole library.  
- When local changes are required, it is simpler to get the source code of just one component and fix it or change it locally, rather than the full library.
- Bit provides a smart tagging mechanism. Making changes to a component triggers an optional version bumping to all components that depend on it.  

[Releasing design systems series by Nathan Curtis](https://medium.com/eightshapes-llc/releasing-design-systems-57fca91a23f6) further enhances smaller components benefits.  

## Structure

For each component Bit stores three elements:  

- The source code (including code itself, testing and documentation)
- Dependency graph
- Tools & Configuration

![Bit component](https://storage.googleapis.com/static.bit.dev/docs/images/component.svg)

### Source code

A component starts its Bit journey by specifying the source files. Typically, the component’s content is not just the source code itself and can include additional files that are related, such as the styling files, assets (images, fonts), test code, documentation.  
A component must also have a [barrel file](https://basarat.gitbook.io/typescript/main-1/barrel) as it's entry point.  

### Dependency graph

When adding sources to a Bit component, Bit analyzes all the dependencies it includes (i.e., `import` and `require` statements in the code). Bit then creates a model of all the dependencies of the component.  
The dependencies include the following:

- NPM packages installed as node_modules.
- Other components from the same workspace.
- Bit components installed node_modules.
- Bit components imported into the workspace.

The dependency graph makes a component self-contained and allows moving the component around projects without losing any references.

### Tools and Configuration

Bit links each component with a set of tools and configurations. The tools are dedicated components that can take the component source code and its dependency graph and generate some desired result. These tools are implemented within Bit aspects (extensions) called **Environments**.  
Some of its responsibilities are:

- **Compilation** of the source files and generate built artifacts. The artifacts are consumable by applications or other components. Each environment supports specific framework.
- **Testing** components with the configured test-runner (Jest/Mocha) with the component's test files.
- **Rendering** using a local development server, configured for each component.

## Lifecycle

Here is a bird-eye view of a component life cycle:  

### Producing components

- **Track**: A component is initiated inside a workspace by specifying the files that comprise the component.
- **Version**: Tagging a version seals the contents of the files and the metadata under this version. If the component has a compiler, Bit builds the component and seals the built artifacts as well (think of it as similar to a git commit and npm publish at the same time).
- **Export**: The export command sends a copy of the files and metadata to the remote server.

### Consuming components

Once residing on a remote scope, the component is available for consumption by other workspaces. The ways to consume the component are by installing it or by importing it.

- **Install**: Bit install adds the package as a regular library to the `node_modules` folder. When installing a component (`bit install` / `npm install` / `yarn add`), the component is added to the package.json, pointing to the installed version: `"@bit/user.collection.tabs": "0.0.2"`. Changes to the code of an installed component are not saved.
- **Import**: Bit import adds the component to the [workspace components folder](TODO) and tracks its modifications. On an import, you can see that the package.json points to a local file: `"@bit/user.collection.tabs": "file:./components/tabs"`. Code modifications are tracked and can be exported as a new version.
- **Eject**:  If a new version is exported, it is possible to revert to an installed component. In this case, the package.json is updated back to `"@bit/user.collection.tabs": "0.0.3"`

## Isolation

Components let you split your code into independent, reusable pieces, and think about each piece in isolation. Bit manages each component separately to ensure its independence and reusability. Wrapping each component in a detached environment reduces the risk of component misbehaving when moved between different projects and applications.  
For each component, Bit builds a context disconnected from the rest of the project. Inside this context, Bit creates a full environment required for building, testing and rendering the component.  

![capsule](https://storage.googleapis.com/static.bit.dev/docs/gifs/tree-capsule.gif)

The component context is similar in the way it works to using a separate repo for an NPM package:  

- The source of only of the component (these are the files tracked in the component)
- The NPM packages required by the component
- Additional Bit components utilized by this component
- `Package.json` pointing to the component files
- Environment configurations required for processing the component. Such as `tsconfig.json` file for Typescript based component or `.babelrc` for babel based components.  

All the information about the component is encapsuled as part of the component data. A component imported into a new project comes bundled with all the configuration data needed.  

## Characteristics

### Component id

Each component has a unique id. We use the Component id when installing the component, importing it, or utilizing it in the project.  
A full ID of a component comprises from the collection name, namespaces, and the short Id: `owner.collection/namespace/namespace/short-id`.  
Using namespaces allows organizing components in the same way we organize files inside folders.  
You should import such component as follow:  

```shell
import { something } from '@owner/collection.namespace.namespace.short-id';
```

### Barrel file

A component must have a barrel file, which is an entry point to the component.

### Versions

Bit components are versioned using [Semantic Versioning](https://semver.org). Creating a new version of a component is done by tagging it with a new version. Bit then snapshots all the component's files and dependencies. New versions of components are shareable to remote scopes using the bit export command.  

## Component management

Bit is a CLI based tool for working with components. Bit stores components in two formats:  

- Inside a **scope**, Bit stores the semantic representation of Bit components as objects with all their history and relationships.  
- Inside the **workspace**, Bit stores the file representation of a single version of the component.  

![Components Management](https://storage.googleapis.com/static.bit.dev/docs/images/scope-workspace.svg)

### Workspace

Bit creates a workspace inside a working project when running the `bit init` command. From that point on, you can create components and checkout components from the local scope into the workspace and use them in the project.  
The workspace has:  

- Workspace configuration - contains information about the project that contains the Bit components such as the package manager used for installing it, the environments, and the components code location. The [workspace configuration](TODO) is its own file - `workspace.json`, at the workspace root.
- Components index - defines the files that comprise each component. Bit stores the index in the `.bitmap` file at the workspace root.

Inside a workspace two types of components exist:  

- [Authored components](/docs/workspace#authored-components)
- [Imported components](/docs/workspace#imported-components)

### Scope

A scope may exist inside a workspace or without a workspace. Components are shared between scopes using import and export commands. The scope resides under the `.bit` folder. Inside a workspace that it is also a git project, it defaults to `.git/bit` folder.

Use the bit `tag` and `checkout` commands to transfer a single version of a component between the local scope and the workspace.

> Bit workspace and scope are highly inspired by the mechanisms used in Git for managing a git workspace and a git repository, so if you are familiar with those, it is easier to understand Bit.

### Remote Scope

The remote scope is a scope that resides on a server, also called a **bare scope**, since it is defined outside a workspace. A remote scope is used for sharing components, so it is, in fact, a place where components are exported to and imported from.

A user can set up a [Bit Server](TODO) that holds remote scopes for sharing components between Bit workspaces. Alternatively, users can use [bit.dev](TODO) for storing remote scopes of components.

The diagram below highlights the main commands that move components between the local workspace, the map index (`.bitmap` file), the local scope (`.git/.bit`) and the remote scope:

![commands overview](https://storage.googleapis.com/static.bit.dev/docs/images/commands_overview.svg)
