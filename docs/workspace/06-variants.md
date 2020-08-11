---
id: variants
title: Variants
---

As projects grow so does the complexity of its components and structure. If you find yourself wanting to define a different set of configuration according to to the directory structure of your project, use the `@teambit.core/variants` extension. Each `variant` is a glob-pattern to match directories to which you can set a specific configuration.

```json
{
    "@teambit.core/variants": {
        "components/ui/*": {
            "scope": "acme.ui",
            "@teambit/envs":
        }
    }
}
```

Think about each `variant` as it's own pesodu-workspace where all components that are in the directory defined by it share the same configuration. This way you can have some components defined as React components while others as Stencil. Moreover, use it to define which [scope](TODO) to use for which variants.

## Default variant

It is strongly recommended to keep a `*` (wildcard) variant to have default configurations for components. This way you can be very flexible with how you create directories in the workspace and will not be required to set them in the `workspace.json` file.  

## Managing multiple variants

You can define as many variants as you need in your workspace. By default, Bit finds the most specific `variant` that should be applied for a component.

```json
TODO
```

### Dependency policies

A Bit workspace sets policies for the entire workspace. However, if required, you can set more specific policies to override what is configured for the workspace. This is useful when you need to modify a library version and not have it affect all components, but only a subset of them.

```json
TODO
```

### Variant configuration propagation

A variant configuration is propagated and merged configurations applied for more general variants. This means that you don't always have to re-configure the entire variant. Instead you can only override specific configurations, as needed.

```json
TODO
```

You can have a variant opt-out from propagating using the `"propagate": false` option.

```json
TODO
```

### Exclude component from applied configuration

Inside each `variant` you may specify a pattern or an array of patterns that will define the components that are excluded from the variant. E.g. this variant is applied on all components, except for those that are under the bar namespace.

```json
TODO
```
