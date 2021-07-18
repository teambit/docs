---
id: component-id
title: Component ID
---

Each Bit component has a unique identifier with the following pattern:<br />
`<scope-owner>.<scope-name>/<namespace(s)>/<name>`. <br />
A component ID is generated when a component gets tracked by Bit for the first time.

> Note that not all Bit servers will have a 'scope-owner'

- **Scope** - The component's scope as applied by the `workspace.json` file. It can be a `scope` property as defined for the component's `variant` or the `defaultScope` configured to the `teambit.workspace/workspace` extension. `scope` is usually a combination of the scope owner and scope name (e.g, `<my-org><my-scope>`)

- **Namespaces** (optional) - Set with the `--namespace` or `-n` flag when adding the component (supports nesting - `--namespace nesting/namespace/yay`).
- **Name** - The name of the component, according to the component's root directory name.

Bit uses these IDs when listing or running operations and commands on components.