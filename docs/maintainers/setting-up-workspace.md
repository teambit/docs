---
id: setting-up-workspace
title: Setting up a new project
---

This tutorial walks you through the process of creating a new Bit-based project.

## Use `bit new` to initialize your project

1. get syntax from Ran
1. workspace templates from various envs (react, angular)
1. perhaps this guide should be different per framework?

## Customize your configuration

The template files have lots of documentation and commented example snippets. We suggest you look over them to familiarize yourself with the basic options and features.

You can change your options at any time, but there are a few settings in `workspcae.json` that you should think about in advance:

### Base workspace configuration

```json
{
  "$schema": "",
  "@teambit.core/dependency-resolver": {
    "packageManager": "npm",
    "strictPeerDependencies": true,
    "extraArgs": []
  },
  /* This extension sets configuration for components in a workspace. */
  "@teambit.core/workspace": {
    /* The `scope` for all components in the workspace. A scope is the remote Bit server name. When using `bit.dev` as a cloud hosting solution, use `@account.scope`. */
    "scope": "acme.base-ui",
    /* Vendor directory for third party components.
        - Bit imports component to this directory when importing a new component without the `--path` option.
        - Bit creates the fully qualified component ID for each imported component as a directory structure.
        - Components imported in this directory are not affected by workspace configuration, as they are considered "external" (third-party) dependencies. */
    "vendorDirectory": "vendor",
    /* Directory for all newly created components when using `bit create` without setting the `--path` option. */
    "directory": "components",
    /* Sets extensions for components in the workspace. */
    "extensions": {
      "@teambit.core/environment": {
        "environment": "@teambit.environments/react",
        "config": {
          "typescript": "<version>"
        }
      }
    }
  },
  /* Define variant configurations for components in specific directory trees in a workspace. */
  "@teambit.core/variants": {
    "pages, widgets": {
      "propagate": true
    }
  }
}
```
