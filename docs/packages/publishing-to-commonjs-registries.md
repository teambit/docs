---
id: publishing-to-commonjs-registries
title: Publishing to CommonJS Registries
---

By default, component packages are published to [Bit Cloud](https://bit.dev). However, that can be changed to npm or a private registry.

A component package can be published either by using the `publish` command or as an automated step in the versioning process (when a component is 'tagged').

Publishing requires setting your `workspace.jsonc` configuration file with the name of the npm scope and other properties. Components will not be published if the registry information is missing (either the npm scope name or the details of another registry).

## Publishing configurations

> The publishing configurations (`teambit.pkg`) must be set under the 'variant' field. It cannot be set at the workspace-level.

Example:

```jsonc
"teambit.workspace/variants": {
    "*": {
      "teambit.pkg/pkg": {
        "packageManagerPublishArgs": [
          "--access public"
        ],
        "packageJson": {
          "name": "@my-org/{name}",
          "private": false
        }
      }
    }
}
```

### packageManagerPublishArgs

Receives an array of [publishing arguments](https://docs.npmjs.com/cli/v6/commands/npm-publish).

### packageJson

Overrides and extends the `package.json` of the component to be published.

```json
"packageJson": {
    "name": "@{scope}/{name}",
    "private": false,
    "main": "dist/{main}.js",
    "custom-prop": "value"
}
```

To set another registry:

```json
"packageJson": {
    "publishConfig": {
        "scope": "@custom",
        "registry": "http://localhost:4873"
    }
}
```

Available placeholders:

- `{name}` - The name of the component.
- `{scope}` - The name of the component scope.
- `{main}` - the name of the main file (leaving out the extension) - for example `index.js` will be `index`.

## CLI

Publish an exported component

```shell
bit publish <componentId>
```

Publish a staged component that has not yet been published:

```shell
bit publish <componentId> --allow-staged
```

To check if the publishing process will be done successfully (without publishing):

```shell
bit publish <componentId> --dry-run
```

To return the output as JSON:

```shell
bit publish <componentId> --json
```
