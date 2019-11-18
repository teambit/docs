---
id: how-bit-works
title: How bit Works?
---

Components are the building blocks of modern web architectures. Encapsulated and reusable components with focused and well-defined APIs let developers build more robust software applications more quickly.

The major frontend frameworks - React, Vue, and Angular - all share the concept of using component-based architecture to compose state-of-the-art applications. Even browsers themselves are backing components as an inherent feature by supporting the Web Components standard.

Bit leverages component to make them not only reusable inside your application, but also make them available in other projects, even if they exist in different repositories.  

## Bit Component

A Bit component is somewhat different from Angular, React, or Vue component. Bit components revolve around reusability, so any piece of code can be a Bit component, e.g.  

- A react, Vue or Angular component
- Stylesheet (e.g., CSS, SCSS) or multiple stylesheets that are shared between component
- A utility function that is used by multiple components

Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in managing components: tracking code changes, verifying dependencies completeness or building, and testing each component.

A component in Bit is made of 3 parts:  

- Source code
- Dependency graph
- Tools & Configuration

![Bit component](https://storage.googleapis.com/static.bit.dev/docs/images/component-full.png)

From these parts, only the first one is mandatory. Dependencies and tools are optional but are instrumental when sharing components between projects.  

### Source Code

A component starts its Bit journey by specifying the source files. Bit maps the set of files to a component, with a particular file as the entry point for the component. Bit marks the entry point file as `main`.  
Typically, the component’s content is not just the source code itself and can include additional files that are related, such as the styling files, assets (images, fonts), test code, documentation.  

### Dependency Graphs

Most of the components we build have other elements as dependencies. Bit differentiate between two types of dependencies:  

- **NPM packages**: Bit stores the name of the NPM packages and their version or versions range (e.g., `~4.0.19`). Bit parses the component code and creates a package.json file with all of the dependencies mentioned in the source code of the component.  
- **Bit packages**: Bit packages are other components that the component depends on. Bit analyzes the source code to find import or require statements and builds a dependency graph of the Bit packages. If an imported file is not defined as a Bit component, it will respond with an error.  
For each component, Bit stores the full dependency graph and their exact versions. It also stores the code source for each component and the built files. The dependency graph lets Bit move components around projects ensuring that the component has all the code it needs.  

### Tools and Isolation

Bit can be extended with extensions. Bit delegates work on the component to tools, built as extensions, that can perform work on the component. The most common tools are:  

- **Compiler**:  A compiler is a Bit extension which recieves a Component and outputs a build artifact. It encapsulates all configuration and dependencies which are required for the build process as Bit is agnostic to the tools required to build the component. 
- **Tester**: A tester is a Bit extension which recieves a Component build artifcat and return a test report indicating the current PASS/FAIL state of each component.

- **Isolation**: Bit offers the extension system an isolation layer called Capsule which isolated the component from the workspace for build and test events. This promotes the reusablity of components and makes sure the component has all the proper configuration and dependencies in place. 

## Versioning Components

Bit components are versioned. Every time a component is tagged, Bit snapshots a new version of the component files and dependencies. Bit versioning adheres to [semver](https://semver.org) versioning guidelines.  
Before exporting components from the local workspace, it should be tagged with a new unique version.

## Components Management

Bit is a cli-tool for working with components. Bit stores components in two formats:  

- Inside a **scope**, Bit stores the semantic representation of Bit components as objects with all their history and relationships.  
- Inside the **workspace**, Bit stores the file representation of a single version of the component.  

![Components Management](https://storage.googleapis.com/static.bit.dev/docs/images/scope-workspace.png)

### Workspace

Bit creates a workspace inside a working project when running the init command. From that point on, you can create components and checkout components from the local scope into the workspace and use them in the project.  

The workspace contains the following:  

- Workspace configuration - contains information about the project that contains the Bit components such as the package manager used for installing it, the compilers and testers used by the components in the project, and the components code location. The [workspace configuration](/docs/workspace) is stored under the bit section in the `package.json` or as a separate `bit.json` file at the workspace root.
- Components index - defines the files that comprise each component. Bit stores the index in the `.bitmap` file at the workspace root.

### Scope

A scope may exist inside a workspace or without a workspace. Components are shared between scopes using import and export commands.  
The components are stored as [content addressable storage](https://en.wikipedia.org/wiki/Content-addressable_storage) as a storage efficient mechanism.  
The scope resides under the `.bit` folder. Inside a workspace that it is also a git project, it defaults to `.git/bit` folder.  

The bit `tag` and `checkout` commands are used to transfer a single version of a component between the local scope and the workspace.  

Note: The workspace and scope concepts are profoundly impacted by the mechanisms used in Git for managing a git workspace and a git repository
