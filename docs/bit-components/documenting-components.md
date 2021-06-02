---
id: documenting-components
title: Document Components
---

import { Image } from '@site/src/components/image'

Documentation is a critical when building with components. Bit implements several features for component documentation to improve the dev experience and increase component adoption.

There are several ways to document components in Bit. Some of them are manual and some derived from your component-centric workflow.  
Bit features a dynamic documentation template for components that aggregates several sources and generates a single documentation page per component.

:::tip All components gets documentation

Even if you haven't written any docs or used any feature, Bit still generates a basic documentation page for your component with basic installation instructions.

:::

This topic describes how to document a Bit component with React.

## Video Guide

<iframe width="560" height="315" src="https://www.youtube.com/embed/cKMghSe_1RU?rel=0" title="How to add Docs to your Bit components" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

## Prerequisites

To document component, verify you met the following:

1. [Install Bit CLI.](https://TODO)
1. [Create a Bit workspace](https://TODO) on a fresh Git repository.
1. [Create a component.](https://TODO)
1. [Create a composition](https://TODO) (optional).
1. [Add tests](https://TODO) (optional).

---

## See Component Documentation

Documentation for components are rendered both on the local workspace UI and on remote Bit server.  
Run the local dev server to see all component documentation when rendering them.

```sh
bit start
```

## Automated Documentation

There are several feature that when used as part of your workflow, Bit taps into them to generate docs.

### Compositions to showcase components

Rendering component and simulate how it is working is a fundamental part of a component based workflow.  
All compositions added to any component will be rendered as a gallery with their names. This way consumers can quickly see where and how to use a component.

TODO - screenshot

### Using prop-types to generate docs

To ensure the documentation is faithful to the code, Bit generates the properties table from the code itself using [react-docgen](https://github.com/reactjs/react-docgen). At the bottom of the overview page you'll find all the component props listed and characterized in a table. These props are extracted from the JSDoc, prop-types and typescript type definitions, as well as the run-time code itself.

TODO - code snippet

TODO - screenshot

### Document supported edge-cases with tests

Writing tests can have more value than making our components more resilient. When showcased, tests can be a great way to preset consumer how well used and fit your component is, and also which edge cases are expected.  
Components that have tests also gain an additional tab in the UI listing them for consumer to browse through.

TOTO - screenshot

## Using markdown and MDX

The most basic form of documentation is using markdown and writing docs. Add a `*.docs.md/x` to your component to add documentation.

:::tip Component templates support for documentation

All available component templates support MDX documentation out of the box. Use `bit create` to get started quickly.

:::

:::info react-fast-refresh

Bit uses Fast Refresh. It gives the best performance for hot module reload and feedback on edits made to your documentation.

:::

### Write documentation

Markdown gives you the freedom to extend the documentation page as you like. You can use either Markdown or even MDX for enriching your documentation with React components.

TODO - example for MDX with React

### Add live playground for components

You can transform any code snippet on your markdown or MDX file to a live component playground. To do so add `live` to your code snippet:

````mdx
```jsx live=true
  () => {
    return <p>Hello!</p>
  }
```
````

TODO - Screenshot

### Customize template with metadata

You can add a YAML at the top of any MD/MDX file to add more metadata for the documentation template to use.

```md
---
displayName: Title for component overview
description: Abstract description for the component.
labels: ['category1', 'category1', 'category1']
---
```

---

## Summary

* Documentation is a key workflow feature in Bit and is connected to your component workflow.
* Use markdown for complete freedom.
* Add live playgrounds for components, so consumers can try them before installing.

---

## Next Steps

* ???

---

## FAQ

### ???
