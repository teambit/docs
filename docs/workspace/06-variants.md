---
id: variants
title: Variants
---

## Differentiate configuration per directory

As projects grow so does the complexity of its components and structure. If you find yourself wanting to define a different set of configuration according to to the directory structure of your project, use the  `@teambit.core/variants` extension. Each `variant` is a directory (or comma separated list of directories) to which you can set a specific configuration.

```json
{
    "@teambit.core/variants": {
        "components/generics-ui": {
            "extensions": {
                "@teambit.environments/stencil": {}
            }
        }
    }
}
```

### Configuration propagation

By default, when you use `@teambit.core/variants` it propagate to the default values set by `@teambit.core/workspace`.

By default, Bit finds the most specific `variant` that should be applied for a component. It is then propagate up the variants tree and is merged with the configurations found. You can use `"propagate": false` option to change this default behavior.

### Exclude component from applied configuration

Inside each `variant` you may specify a pattern or an array of patterns that will define the components that are excluded from the variant. E.g. this variant is applied on all components, except for those that are under the bar namespace.

```json
{
    "@teambit.core/variants": {
        "components/generics-ui": {
            "extensions": {
                "@teambit.environments/stencil": {}
            },
            "exclude": "bar/*"
        }
    }
}
```
