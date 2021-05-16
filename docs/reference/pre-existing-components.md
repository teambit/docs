---
id: pre-existing-components
title: Pre-existing Components
---

Bit can be used on pre-existing projects and components can be added using the `bit add` command. If you would like to [create new components](/getting-started/creating-components) we suggest you use the `bit create` command.

## Add Pre-existing Components

Each component in a Bit workspace must have all its implementation files under the same directory. A component must have an entry file (`index.[ts|js]` is used as the default.

```bash
my-component
├── index.ts
├── my-component.compositions.tsx
├── my-component.docs.md
└── my-component.ts
```

To add your component to the workspace run the `bit add` command followed by the namespace. The namespace is the the component folder structure you would like to see in your workspace.

```bash
bit add button --namespace ui
```

Bit has mapped this component's files and registered them in the `.bitmap` file. This enables Bit to treat a collection of files as a single unit, a component.

In addition to that, Bit has generated a component ID, with the pattern `<namespaces>/<component-name>`. The component ID will be prefixed with the scope name once it has been exported to a remote scope (`<owner>.<scope>/<namespaces>/<component-name>`).

Learn more about [tracking components](/building-with-bit/tracking-components) and [removing components](building-with-bit/removing-components)

:::note Tip
You can use -n which is short for --namespace
:::

### Rendering Components

To [render your component](/building-with-bit/component-compositions) - create a \*.compositions.tsx

### Documenting Components

To add [documentation](/building-with-bit/documenting-components) to your component - create a \*.docs.md
