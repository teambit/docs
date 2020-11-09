---
id: export-to-scope
title: Export to a Remote Scope
---

Now that you have a versioned component you're ready to export it to your remote scope. The remote scope is the component collection where your components are arranged - for instance for your Utils components you will most likely have a remote scope called 'Utils', to which you will export any utilities components.

> Only tagged components can be exported to a remote scope.

Component publishing works hand-in-hand with how you use Scopes to organize components in a workspace. This means that you can simply create a set of remote Bit Scopes and publish components from your workspace directly to them.

## Setting up your remote Bit Scope
There are two ways you can set up a remote Bit Scope.

1. If you are using bit.dev to host your components, [create a scope](https://bit.dev/~create-collection) for each of the scopes defined in your workspace.
1. If you are self-hosting a bit server, please follow the instructions here (link here when available).

## Export all staged components to a remote scope
Run the bit export command to have Bit publish all versioned components.

``` sh
$ bit export
2 components were exported to Collection owner/my-collection
```

Copy
Bit uses the scope configuration for each component in your workspace as the target remote scope for the export operation. This means that you need to have a remote scope defined for each locally defined scope.

Change component scope
In case you want to publish a component to a different scope you will need to modify its configuration. This configuration operation changes the component module name, so you will have to run the bit link --rewire command. This command creates the new component module name in your project's node_modules.

<!-- ## Export to Your Own Server -->