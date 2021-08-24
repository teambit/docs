---
title: Workspace Configuration
id: workspace-json
---

The workspace configuration file (`workspace.jsonc`) is where rules and settings are applied to the workspace itself, and to every component managed by it.

The workspace configuration JSON reflects the way Bit is designed and built - that is, composed from Aspect. Each of these components exposes a workspace configuration API. That means, your "workspace configurations" are set across multiple Bit components.

As you will see, the names of these JSON fields, each representing an component, follow Bit's component name pattern `<scope-owner>.<scope-name>/<component-name>`, for example: `teambit.workspace/variants`.

## Main workspace config APIs

### teambit.workspace/workspace

`teambit.workspace/workspace` receives configurations for the workspace itself, as well as default values for components managed by the workspace.

- **name** - the workspace name. <br/>Example: `"name": "my-workspace"`
- **icon** - the workspace icon (displayed in the workspace UI). <br/>Example: `"icon": "https://path/to/icon.svg"`
- **description** - a description of the workspace. <br/>Example: `"description": "a design system for my organization."`
- **defaultScope** - the default scope to all components (when used with bit.dev, specify both owner and scope name) <br/>Example: `"defaultScope": "my-org"."my-scope-name"`
- **extensions** - component extensions to apply, by default, on all components.
- **defaultDirectory** - the default directory for components. <br/>Example: `"defaultDirectory": "components\ui"`

Example:

```json
"teambit.workspace/workspace": {
  "name": "my-org-design-system",
  "icon": "https://my-org.com/images/icon.svg",
  "defaultScope": "my-org.design-system"
}
```
