---
id: component-devserver
title: Component DevServer
---

INFO ON WHATS A COMPONENT DEV SERVER

:::note hi

SOME NOTE

:::

---

## Prerequisites

To create a Bit component, verify you met the following:

1. [Install Bit CLI.](https://TODO)
1. [Create a Bit workspace](https://TODO) on a fresh Git repository.

:::tip bye

TIP

:::

---


---

## Summary

* Create or track components with the `create` and `add` commands.
* Components are isolated modules in your codebase, where each component is encapsulated in a directory.
* Get information on component with the local dev server or the CLI.

---

## Next Steps

* For component configuration, see [configuring components](https://TODO).
* For scoping and naming components, see [scoping components](https://TODO).
* For component dependency management, see [component dependencies](https://TODO).
* For managing components in a workspace, see [component monorepo](https://TODO).
* For leaning about versioning, hosting and reusing of components, see [hosting components](https://TODO).

---

## FAQ

### Are Bit Components the same as npm packages?

The main difference between Bit Components and npm Packages is that Bit focuses on a component based workflow, where the implementation is a first class citizen, where npm packages concern about the compiled outputs. This key difference has the following implications:

* Bit Components produce an _npm package_ as part of their build and keep it as a **version artifact**. Consumers can use package managers (npm, yarn and pnpm) to install components.
* Vendor component with the `bit import` and use it as a core component in your codebase (think about - `git clone` + `npm link` automated, inside the consuming codebase).
* A Component version is 100% immutable, as all dependencies are calculated and locked during build time, removing "dependency hell" when depending on components.
