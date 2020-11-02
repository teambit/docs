---
id: overview
title: Overview
---

As a project grows, so does the complexity of its components and structure. If you find yourself wanting to define a different set of configurations according to your project's directory structure, use the `@teambit.core/variants` extension. A `variant`can be defined on a directory, for which you can set a specific configuration.

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

In the above example, we have defined the scope for all components under the `components/ui` folder as "acme.ui".

Think about each `variant` as it's own pesodu-workspace where all components in the directory are defined by it share the same customised configuration. This way, you can have some components defined as React components, while others as Stencil. Another example is to use it to determine which [scope](/docs/scope/overview) to use for which variants.

> Note: For many extensions (`dependency_resolver` for example), Variants definitions are merged with the workspace-level definitions instead of replacing them. 
> See each extension for its Variants behaviour.

## Default variant

Some extensions can **only** be set in the Variants section - the `environment` extension for example. It is therefore strongly recommended to keep a `*` (wildcard) variant to have default configurations for these variant-only component configurations, otherwise you will need to set them individually for every directory in the workspace. 

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

You can define as many variants as you need in your workspace, at whatever level of the workspace filesystem.

```json
{
  "@teambit.core/variants": {
    "components/elements": { },
    "components/elements/forms": { },
    "components/helpers": { },
    "components/pages": { },
    "components/pages/marketing": { } // this will  the "components/pages" variant for components in the "components/pages/marketing" directory
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

You can have a variant opt-out from propagating using the `"propagate": false` option. In this case components in the `components/elements/forms` directory will not have the variant configurations defined at the `components/elements` level applied to them, as it has been marked not to propagate down.

```json
{
  "@teambit.core/variants": {
    "components/elements": {
      "propagate": false
     },
    "components/elements/forms": { },
  }
}
```