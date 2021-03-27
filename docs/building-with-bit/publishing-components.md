--- 
id: publishing-components
title: Publishing Components
--- 

The packing and publishing of component packages is handled by the [PKG Bit extension](https://bit.dev/teambit/pkg/pkg).
PKG adds its own build task to the [component build pipeline](/building-with-bit/build-pipeline/overview), to create component packages and include them as part of the component artifacts (which can later be installed from Bit.dev's registry).

The PKG extension can be configured to add and override `package.json` properties and to publish component packages to NPM or a private registry.
Publishing can be done manually (using the `bit publish` command), or as part of the component build pipeline.

:::info
The PKG extension can only be configured using the [Variants](/building-with-bit/workspace) extension.
:::

## Configurations

### Package properties

Use the `packageJson` property to add or override the default `package.json` for your component packages.

:::caution
Packages with a modified `name` property will not be published to Bit.dev's registry.
:::

```js
{
  "ui/*": {
    "teambit.pkg/pkg": {
      "packageJson": {
          "name": "@{scope}/{name}",
          "private": false,
          "main": "dist/{main}.js",
          "custom-prop": "value"
      }
    }
  }
}
```

### Publish

:::info 
If `publishConfig` or `name` are not set, packages will be published to Bit.dev's registry.
:::

#### npm arguments

You can specify additional arguments to the `npm publish` command by adding an array of args to `packageManagerPublishArgs`.

For example:

```js
"ui/*": {
  "teambit.pkg/pkg": {
    "packageManagerPublishArgs": ["--access public"]
  }
}
```

#### npmjs Registry

- Use the `name` property to set the publishing process to your [npm scope](https://docs.npmjs.com/cli/v6/using-npm/scope).
- Use the `private` _(boolean)_ property to set packages to be published with either private or public access.

```js
{
  "ui/*": {
    "teambit.pkg/pkg": {
      "packageJson": {
          "name": "@{scope}/{name}",
          "private": false,
      }
    }
  }
}
```

#### Private registry

Use the `scope` and `registry` properties to configure the publishing process to your own private registry (and scope).

```js
"ui/*": {
  "teambit.pkg/pkg": {
    "packageJson": {
       "publishConfig": {
         "scope": "@custom",
         "registry": "http://localhost:4873"
      }
    }
  }
}
```

> Packages with a modified `publishConfig` property will not be published to Bit.dev's registry.

#### Placeholders

Placeholders are an easy way to inject component-specific information into the 'pkg' configurations.

- `{name}` - The name of the component.
- `{scope}` - The name of the component scope.
- `{main}` - the name of the main file (leaving out the extension) - for example `index.js` will be `index`.

For example:

```js
 "packageJson": {
    "main": "dist/{main}.js"
  }
```

## CLI Reference

### Pack

Creates a TAR file (to be published to a node package registry):

```shell
$ bit pack <component-id>
```

Overrides the existing TAR file (in the same location):

```shell
$ bit pack <component-id> --override

$ bit pack <component-id> -o
```

Returns the output in a JSON format:

```shell
$ bit pack <component-id> --json

$ bit pack <component-id> -j
```

### Publish

Publishes an exported component:

```shell
$ bit publish <componentId>
```

Publishes a staged component that has not yet been exported:

```shell
$ bit publish <component-id> --allow-staged
```

Checks if the publishing process will be done successfully (without publishing):

```shell
$ bit publish <component-id> --dry-run

$ bit publish <component-id> -d
```

Returns the output as JSON:

```shell
$ bit publish <component-id> --json

$ bit publish <component-id> --j
```