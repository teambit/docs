---
id: removing-components
title: Removing Components
---

Refactoring code often causes components to become obsolete or irrelevant. This is where removing and deprecating components becomes useful and necessary.

## Remove a component from a workspace

Removing a local component has no ripple effects. This is only relevant to the consuming project. To do so specify the component ID to remove.

```bash
bit remove ui/button
```

```bash
successfully removed components:
ui/button
```

Bit triggers a warning when trying to remove modified components. Use the `--force` flag to force it.

:::tip

Use `bit remove --help` or `bit remove -h` to get a list of available options for this command.

:::

### Effects of deleting components from a workspace

Other components in the workspace may depend on removed components. Meaning that removing these dependencies affects dependent components. Several cases may occur when deleting a local component:

- A _new_ component that depends on a _removed component_ is not affected. This is because Bit did not isolate the component.
- A _staged_ component that depends on a _removed component_ causes Bit to stop the remove command. To force it, we use the `--force` flag.
- An _exported component_ that depends on a local _removed component_ is not affected. This is because an exported component is isolated and immutable. So deleting a local dependency does not affect.

## Remove a component from a remote scope

To remove a component from a remote scope, specify the full component ID.

```bash
bit remove username.your-scope/ui/button --remote
```

```bash
successfully removed components:
username.your-scope/ui/button
```

### Effects of deleting components

To better understand how Bit handles deleted components, let's follow this example:

- The `button` component is in the `ui` scope.
- A `card` component depends on the `button` component and is also in `ui` scope.
- A `login` component also depends on the `button` component but is in another scope - `admin`.

This is what happens if we remove the `button` component:

- Bit notifies that the `card` component depends on the `button` component. If we want to remove it, Bit asks to use the `--force` flag. This is because scopes don't cache their components.
- The `card` component has a missing dependency of `button` component. A refactor for `card` is critical for it to work.
- The`login` component that also depends on the `button` component is not affected by the removal of the `button` component. This is because scopes keep a cache of external dependencies.
- It is still possible to source the `login` component to another consumer project, as the cache works for Bit.
- Installing the `login` component using npm fails because npm tries to install the `button` component from its original scope.

## Deprecate a component in a remote scope

To deprecate a component in a remote Scope, specify the full component ID and use the `--remote` option.

```bash
bit deprecate username.your-scope/ui/button --remote
deprecated components: username.your-scope/ui/button
```

## Deprecating a component in a workspace

To deprecate a component in a workspace, specify the component ID.

```bash
bit deprecate ui/button
deprecated components: ui/button
```

:::tip

Use `bit deprecate --help` or `bit deprecate -h` to get a list of available options for this command.

:::
