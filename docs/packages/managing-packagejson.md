---
id: managing-packagejson
title: Managing the package.json
---

Bit simplifies and automates the management of [`package.json`](/packages/package-json) files for Components.
[`package.json`](/packages/package-json) files are automated, generated and configured by the Bit `teambit.pkg/pkg` aspect. It allows to configure components with their specific [package.json](/packages/package-json) properties as ease using the [Component Configuration](/components/component-config).

[`package.json`](/packages/package-json) properties can be either set from an [Env](/envs/env), or by applying component configuration, either with [Variants](/workspace/variants) or with a [`component.json`](/components/component-json). For more advanced use cases, the Pkg API can be accessed programitally to obtain access to a Component package.json file or modify it. 

To set specific properties to a Component, use the following example configuration and apply either with [Variants](/workspace/variants) or a [`component.json`](/components/component-json).

```json
{
  "teambit.pkg/pkg": {
    "packageJson": {
      "main": "dist/{main}.js"
    }
  }
}
```

Variables like `{main}` can be used to inject specific component information into the 'pkg' configurations. In the example above we are setting the `package.json` main property to `dist/` followed by the Component [Main File](/components/main-file) path.

- `{name}` - The name of the component.
- `{scope}` - The name of the component scope.
- `{main}` - the name of the main file (leaving out the extension) - for example `index.js` will be `index`.

The example below, uses [Variants](/workspace/variants) to configure all components under the `ui` namespace with few `package.json` properties.

```json
{
  "teambit.workspace/variants": {
    "ui/*": {
      "teambit.pkg/pkg": {
        "packageJson": {
            "private": false,
            "main": "dist/{main}.js",
            "custom-prop": "value"
        }
      }
    }
  },
}
```

### Apply configuration from an Env

```ts


```

### Apply configuration from an Aspect

```ts

```
