---
id: overview
title: Overview
---

Component development workspace designed for development of distributed systems with a monolithic and seamless dev experience.
It provides a CRA/Next.JS like dev experience for building fully distributed apps where every component is its own independent
component. It is like outer-space monorepo built for simplicity, flexibility, consistency and performance.

- **Structure components anywhere**. Have components in any directory structure.
- **Configuration**. Automated configuration management.
- **Linking** Linking Workspace components and external dependencies.
- **Dependencies** Configuration management.

## The Workspace Anatomy

### Workspace config (e.g. `workspace.json`)

### Component mapping (e.g. `.bitmap`)

### External modules (e.g. `node_modules`)


1. [**Workspace configurations**](/workspace/configurations) (the `workspace.jsonc` file).  
   This is where rules and policies are set for the workspace itself but also for each component managed by it.  
   These rules include component dependencies, development environments, default scopes, and so on.  
   Rules are defined by referencing to the relevant Bit aspect (the field) and setting it with  configurations (the value).   
   For example: `"teambit.react/react": { "mdx": true }`.
   

2. **Files-to-component mapping** (the `.bitmap` file). This is where Bit maps multiple files to single units, components. This process happens once a component is tracked by Bit (`bit add path/to/component`). This mapping will also include the following information:

   - The component entry point (usually, the `index.js/ts` file).
   - The component version (if a component has been versioned).
   - Whether this component is [pending to be versioned](/components/versioning#soft-and-hard-tags-component-collaboration) by the CI.

     <br />

   ```json title="An example .bitmap file"
   {
     "org.extensions/environments/custom-react@0.0.9": {
       "mainFile": "index.ts",
       "rootDir": "cet/environments/dell-react"
     },
     "org.design/base-ui/search-box-with-button@0.0.5": {
       "mainFile": "index.ts",
       "rootDir": "design/base-ui/searchBoxWithButton",
       "exported" false,
       "nextVersion": {
           "version": "0.0.7",
           "message": "add debouncing",
           "username": "John",
           "email": "john@my-mail.com"
       }
     },
     "version": "14.8.9-dev.298"
   }
   ```

3. [**Local scope**](/scope/overview#local-scope) (the `.bit` or `.git/.bit` directory). This is where versioned or tagged components (either authored or imported) are stored.

4. **Component packages** (located in the `node_modules/@scope-name` directory). This is where the distributable, compiled, code of a component is placed. Components in the workspace refer to each other only via their packages. This is crucial to keeping each component independent and context-agnostic.

5. **Workspace UI**. The workspace UI is a visual real-time representation of the workspace.
   Components managed by the workspace can be views as they are rendered in isolation.
   In addition to that, different aspects of a component, such as its history, documentation and even test logs, can be explored to get a better understanding of it and assist in developing it as and independent building block.

## Get the most out of a Bit Workspace

While components can be added and managed by a Workspace on an ad-hoc basis, we envisage workspaces as the interface between your code repo and the Bit eco-system. By creating a Bit workspace at the root of your repo file system for instance, you can then manage each component as a separate module - with it's own versioning, build and CI, and much more; all the while keeping the existing file structure of your repo or mono repo (Bit is entirely agnostic to how you organise and track your code). That way Bit works seamlessly with your source control, while providing entirely isolated control over the individual components the repo contains.

Bit Workspaces are focused on composing applications with components. We recommend breaking down your frontend application to its most basic building blocks (buttons, text inputs, etc) and then successively composing pages, data-flows, forms, and applications using your components and APIs they expose. Components can be implemented in React, Angular, Vue, Stencil, and Node.

## Bit workspace and Git

Make sure to track the following files with your SCM:

- `.bitmap`
- `worksapce.jsonc`

> You should not track the local scope (`.bit` or `.git/bit`) with Git.