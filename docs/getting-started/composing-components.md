---
id: composing-components
title: Using Components
---

import BitTemplates from '@site/docs/components/commands/bit-templates.md'
import NameSpaces from '@site/docs/components/components/namespaces.md'
import TestDependencies from '@site/docs/components/components/react/test-dependencies.md'
import BitCreateCardComponent from '@site/docs/components/components/react/bit-create-component-card.md'
import CardExample from '@site/docs/components/examples/react/card.md'
import Styles from '@site/docs/components/components/styles.md'
import BitShow from '@site/docs/components/components/bit-show.md'
import BitCreateWarning from '@site/docs/components/components/bit-create-warning.md'
import BitCreateMultipleComponents from '@site/docs/components/components/react/bit-create-multiple-components.md'
import Path from '@site/docs/components/components/path.md'

You can compose components together from other components in your workspace or from components in the cloud.

## Composing Components

When importing a component into another component Bit doesn't allow for relative require/import statements, as this couples your component to a specific directory structure, instead you use the component's package name. In the workspace UI you will see the package name for your component which you can copy to import it.

<CardExample />

### Your Component in the Workspace

In your workspace UI you will now see your card component rendered with the button component inside it.

### Component Module Links

Bit creates a module for each component in the workspace. These modules are linked in the node_modules directory and contains it's build output and auto-generated package.json. To see this in your workspace, browse the `node_modules/@my-scope/ui.button` directory.

To import a component as a dependency you must use the module link. This way your component is not coupled to a specific directory structure in the workspace, which makes them transferable between workspaces.

#### Generating module links

To regenerate module-links for components run the `bit link` command.

:::tip

Use `bit link --help` or `bit link -h` to get a list of available options for this command.

:::

---
