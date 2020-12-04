---
id: remote-scope
title: Remote Scope
---

By publishing components to remotes other developers can utilize your components in their projects. This is beneficial for several reasons:

1. Reduce amount of duplicated code.
1. Enable discovery of components.
1. UI experience will always be consistent across flows.
1. Shortens time to market for products.

Component publishing works hand-in-hand with how you use [Scopes](/docs/scope/overview) to organize components in a workspace. This means that you can simply create a set of remote Bit Scopes and publish components from your workspace directly to them.

## Setting up your remote Bit Scope

There are two ways you can set up a remote Bit Scope.

1. If you are using [bit.dev](https://bit.dev) to host your components, [create a scope](https://bit.dev/~create-collection) for each of the scopes defined in your workspace.
1. If you want to host a Bit Scope on your own infrastructure, please consult in this [tutorial](/docs/guides/host-your-own-scope).

## Export all staged components to a remote scope

Run the `bit export` command to have Bit publish all versioned components.

```sh
$ bit export
2 components were exported to Collection owner/my-collection
```

Bit uses the `scope` configuration for each component in your workspace as the target remote scope for the export operation. This means that you need to have a remote scope defined for each locally defined scope.

## Change component scope

In case you want to publish a component to a different scope you will need to modify its configuration. This configuration operation changes the component module name, so you will have to run the `bit link --rewire` command. This command creates the new component module name in your project's `node_modules`.


## Cached dependencies