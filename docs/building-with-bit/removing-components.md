--- 
id: removing-components
title: Removing
--- 

Refactoring code often causes components to become obsolete or irrelevant. This is where removing and deprecating components becomes useful and necessary.

## Remove a component from a workspace

Removing a local component has no ripple effects. This is only relevant to the consuming project. To do so specify the component ID to remove.

```shell
bit remove foo/bar
successfully removed components:
foo/bar
```

Bit triggers a warning when trying to remove modified components. Use the `--force` flag to force it.

### Effects of deleting components from a workspace

Other components in the workspace may depend on removed components. Meaning that removing these dependencies affects dependent components. Several cases may occur when deleting a local component:

- A _new_ component that depends on a _removed component_ is not affected. This is because Bit did not isolate the component.
- A _staged_ component that depends on a _removed component_ causes Bit to stop the remove command. To force it, we use the `--force` flag.
- An _exported component_ that depends on a local _removed component_ is not affected. This is because an exported component is isolated and immutable. So deleting a local dependency does not affect.

## Remove a component from a remote scope

To remove a component from a remote scope, specify the full component ID.

```shell
bit remove username.your-scope/foo/bar --remote
successfully removed components:
username.your-scope/foo/bar
```

### Effects of deleting components

To better understand how Bit handles deleted components, let's follow this example:

- The `left-pad` in the `utils` scope.
- A component `trim-right` depends on `left-pad` and is also in `utils` scope.
- A component `login` also depends on `left-pad` but is in another scope - `onboarding`.

This is what happens if we remove `left-pad`:

- Bit notifies that `trim-right` depends on `left-pad`. If we want to remove it, Bit asks to use the --force flag. This is because scopes don't cache their components.
- The `trim-right` component has a missing dependency `left-pad`. A refactor for `trim-right` is critical for it to work.
- `login` that also depends on `left-pad` is not affected by the removal of `left-pad`. This is because scopes keep a cache of external dependencies.
- It is still possible to source `login` to another consumer project, as the cache works for Bit.
- Installing `login` using npm fails because npm tries to install `left-pad` from its original scope.

## Deprecate a component in a remote scope

To deprecate a component in a remote Scope, specify the full component ID and use the `--remote` option.

```shell
bit deprecate username.your-scope/foo/bar --remote
deprecated components: username.your-scope/foo/bar
```

## Deprecating a component in a workspace

To deprecate a component in a workspace, specify the component ID.

```shell
bit deprecate foo/bar
deprecated components: foo/bar
```
