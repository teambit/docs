---
id: export-to-scope
title: Export to a Remote Scope
---

Now that you have a versioned component you're ready to export it. Exporting components require you to set up a remote Scope. The remote scope is the component collection where your components are arranged - for instance for your Design System components you will most likely have a remote scope called 'Design System', to which you will export any UI primitives.

> Only versioned (tagged) components can be exported to a remote scope.

## Setting up your remote Bit Scope

Component publishing works hand-in-hand with how you use Scopes to organize components in a workspace. Bit uses the `defaultScope` defined in the `workspace.jsonc` file for defining the target remote Scope for each component.  
Before you can export components, you need to make sure you created remote Scopes that correlate with the scoping configured for your components.

### Scope on bit.dev

If you are using [bit.dev](https://bit.dev) to host your components, [create a scope](https://bit.dev/~create-collection) for each of the scopes defined in your workspace.

### On premise Scopes

<!-- here we should link to another doc that talks about self-hosting. -->

If you are self-hosting a Bit server, you need to ensure you create a Bit server. Please follow [this guide](TODO) for additional details.

## Export all staged components to a remote scope

Run the `bit export` command to have Bit publish all versioned components.

```sh
$ bit export
2 components were exported to scope owner.my-collection
```

## Post export operations

The export process updates your workspace' `.bitmap` file with. Make sure to commit these changes to Git.

```sh
git commit -am 'updated .bitmap file after a successful export'
```
