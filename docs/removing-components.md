---
id: removing-components
title: Remove & Deprecate Components
permalink: docs/removing-components.html
layout: docs
category: Components Workflow
---

Refactoring code often causes components to become obsolete or irrelevant. This is where removing and deprecating components becomes useful and necessary.

Each collection has an internal cache for its dependencies. But this does not mean that removing components is not dangerous. Due to the fact, that package managers don't always use cache. It may break builds that rely on deleted content. Deprecating a component means that Bit marks it as obsolete. Deprecated components are still available to consumers.

## Remove a component from a remote Collection

To remove a component from a remote Collection, specify the full component ID.

```bash
$ bit remove username.your-collection/foo/bar
successfully removed components:
username.your-collection/foo/bar
```

### Effects of deleting components

To better understand how Bit handles deleted components, let's follow this example:

* The `left-pad` in the `utils` collection.
* A component `trim-right` depends on `left-pad` and is also in `utils` collection.
* A component `login` also depends on `left-pad` but is in another collection - `onboarding`.

This is what happens if we remove `left-pad`:

* Bit notifies that `trim-right` depends on `left-pad`. If we want to remove it, Bit asks to use the --force flag. This is because collections don't cache their components.
* The `trim-right` component has a missing dependency `left-pad`. A refactor for `trim-right` is critical for it to work.
* `login` that also depends on `left-pad` is not affected by the removal of `left-pad`. This is because collections keep a cache of external dependencies.
* It is still possible to source `login` to another consumer project, as the cache works for Bit.
* Installing `login` using npm fails because npm tries to install `left-pad` from its original collection.

## Remove a component from a workspace

Removing a local component has no ripple effects. This is only relevant to the consuming project. To do so  specify the component ID to remove.

```bash
$ bit remove foo/bar
successfully removed components:
foo/bar
```

Bit triggers a warning when trying to remove modified components. Use the `--force` flag to force it.

### Effects of deleting components from a workspace

Other components in the workspace may depend on removed components. Meaning that removing these dependencies affects dependent components. There are several cases which may occur when deleting a local component:

* A *new* component that depends on a *removed component* is not affected. This is because Bit did not isolate the component.
* A *staged* component that depends on a *removed component* causes Bit to stop the remove command. To force it, we use the `--force` flag.
* An *exported component* that depends on a local *removed component* is not affected. This is because an exported component is isolated and immutable. So deleting a local dependency does not affect.

## Deprecate a component in a remote collection

To deprecate a component in a remote Collection, specify the full component ID and use the `--remote` option.

```bash
$ bit deprecate username.your-collection/foo/bar --remote
deprecated components: username.your-collection/foo/bar
```

## Deprecating a component in a workspace

To deprecate a component in a workspace, specify the component ID.

```bash
$ bit deprecate foo/bar
deprecated components: foo/bar
```