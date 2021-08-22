---
id: versioning-components
title: Versioning Components
---

## Tag all Components in a Workspace

Tag all components and bump the patch number of each component version.

```bash
bit tag --all
```

## Tag all Components of a specific Scope

Tag all components in a specific scope and bump the patch number of each component version.

```bash
bit tag --all --scope my-scope
```

## Tag a single Component

Tag a single component to a specific version by passing the [component id](/).

```bash
bit tag <component-id>
bit tag ui/my-component
```

## Set a Version

By default, Bit creates a [SemVer](https://semver.org/) patch version for any component that is tagged. You can specify a version when tagging all components or single components.

```bash
bit tag --all --patch
bit tag --all --minor
bit tag --all --major
bit tag --all --ver 1.2.3
bit tag <component-id> --patch
bit tag <component-id> --minor
bit tag <component-id> --major
bit tag <component-id> --ver 1.2.3
```

## Untag a Component

Untagging a component will remove the version tag from the component.

```bash
bit untag <component-id>
bit untag all
```

## Add a message

Add a message when creating a new version of a component. The message will be added to the changelog of the component.

```bash
bit tag --all --message "This is my first version"
bit tag <component-id> --message "This is my first version"
```

## Skip Tests

Skip testing of components when creating a new version.

```bash
bit tag <component-id> --skip-tests
bit tag --all --skip-tests
```

## Skip Auto Tagging

Skip auto tagging of component dependents when creating a new version.

```bash
bit tag <component-id> --skip-auto-tag
bit tag --all --skip-auto-tag
```

## Force a Version

Force tag a component even if tests are failing or when component has not changed.

```bash
bit tag <component-id> --force
bit tag --all --force
```

## Ignore Component Issues

Ignore any issues with the component when creating a new version.

```bash
bit tag <component-id> --ignore-issues
bit tag --all --ignore-issues
```

## Show Specs Output on Failure

Show specs output on failure.

```bash
bit tag <component-id> --verbose
bit tag --all --verbose
```
