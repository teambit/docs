---
id: creating-components
title: Creating Components
---

import ExampleButton from '@site/docs/components/examples/react/button.md'
import ShowButton from '@site/docs/components/examples/react/show-button.md'
import BitCreateComponent from '@site/docs/components/components/react/bit-create-component-card.md'
import BitCreateMultipleComponent from '@site/docs/components/components/react/bit-create-multiple-components.md'
import BitCreateButton from '@site/docs/components/components/react/bit-create-button.md'
import Styles from '@site/docs/components/components/styles.md'
import BitTemplates from '@site/docs/components/commands/bit-templates.md'
import NameSpaces from '@site/docs/components/components/namespaces.md'
import BitShow from '@site/docs/components/components/bit-show.md'
import BitmapExample from '@site/docs/components/components/bitmap-example.md'
import BitCreateWarning from '@site/docs/components/components/bit-create-warning.md'
import StartDevServer from '@site/docs/components/workspace/starting-dev-server.md'
import Path from '@site/docs/components/components/path.md'

import TestDependencies from '@site/docs/components/components/react/test-dependencies.md'

Once you have [initialized a Bit workspace](/getting-started/initializing-workspace) you can create components using the `bit create` command. Alternatively you can add [pre-existing components](/reference/pre-existing-components) using the `bit add` command.

## Quick Guide:

For those that don't like reading docs feel free to follow the quick guide at the top of each page.

1. Create an example component and add it to the workspace

```bash
bit create react-component ui/button
```

2. Install dependencies for test files

```bash
bit install @testing-library/react
```

3. Start the dev server

```bash
bit start
```

---

## Use Bit Create

<BitCreateButton />

### Namespaces

<NameSpaces />

### Component Location

<Path />

<!-- ### Created Files

The following files will have been created for you:

<ExampleButton />

<Styles /> -->

---

## Bitmap File

<BitmapExample />

---

## Install Dependencies

<TestDependencies />

---

## Show Component

<BitShow />

<ShowButton />

:::tip

Use `bit show --help` or `bit show -h` to get a list of available options for this command.

:::

---

## Starting the Dev Server

<StartDevServer />

---

## Creating more Components

<BitCreateComponent />

<BitCreateMultipleComponent />

<BitCreateWarning />

---

## Bit Templates

<BitTemplates />

---

## FAQ

### 1 issue found with this component?

Run `bit status` in the terminal to get a better understanding of what the issue is and what steps to take.

---

## What's Next?

Once you have created and added your component to the workspace the next step is to [render the Workspace UI](workspace-ui) so you can see the component locally.

Learn more about [tracking components](/building-with-bit/tracking-components) and [removing components](/building-with-bit/removing-components)
