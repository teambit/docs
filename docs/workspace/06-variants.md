---
id: variants
title: Variants
---

As a project grows, so does the complexity of its components and structure. If you find yourself wanting to define a different set of configurations according to your project's directory structure, use the `@teambit.core/variants` extension. Each `variant` is a directory to which you can set a specific configuration.

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

Think about each `variant` as it's own pesodu-workspace where all components in the directory are defined by it share the same configuration. This way, you can have some components defined as React components, while others as Stencil. Moreover, use it to determine which [scope](TODO) to use for which variants.

## Default variant

It is strongly recommended to keep a `*` (wildcard) variant to have default configurations for components. This way, you can be very flexible with how you create directories in the workspace and will not be required to set them in the `workspace.json` file.

```json
{
  "@teambit.core/variants": {
    "*": {
      "scope": "acme.ui",
      "@teambit/envs":
    }
  }
}
```

## Managing multiple variants

You can define as many variants as you need in your workspace. By default, Bit finds the most specific `variant` that should be applied for a component.

```json
{
  "@teambit.core/variants": {
    "components/elements": { },
    "components/elements/forms": { },
    "components/helpers": { },
    "components/pages": { },
    "components/pages/marketing": { }
  }
}
```

### Variant configuration propagation

A variant configuration is propagated, and merged configurations applied for more general variants. This means that you don't always have to re-configure the entire variant. Instead, you can only override specific configurations, as needed.

For example, by default Bit merges the configurations for components in `components/elements/forms` with the config defined by `components/elements`.

```json
{
  "@teambit.core/variants": {
    "components/elements": { },
    "components/elements/forms": { },
  }
}
```

You can have a variant opt-out from propagating using the `"propagate": false` option.

```json
{
  "@teambit.core/variants": {
    "components/elements": { },
    "components/elements/forms": {
      "propagate": false
     },
  }
}
```
