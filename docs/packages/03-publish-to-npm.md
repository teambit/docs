---
id: publish-to-npm
title: Publish to NPM
---

Components are published to the [bit.dev platform](https://bit.dev/) to allow scalable collaboration and enjoy designated features. In addition, some people would like to publish their components to other registrieus such as NPN.
A component can be published to NPM either by using the `publish` command or as an automated step in the versioning process (when a component is 'tagged').

Publishing requires setting your `workspace.jsonc` configuration file with the name of the NPM scope and other properties. Components will not be published if the registry information is missing (either npm scope name or the details of another registry).  

## Publishing configurations
> The publishing configurations (`teambit.pkg`) must be set under the 'variant' field and cannot be set at the workspace-level.

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

* `{name}` - The name of the component.
* `{scope}` - The name of the component scope.
* `{main}` - the name of the main file (leaving out the extension) - for example `index.js` will be `index`.

## CLI
### Publish

Publish an exported component
```shell
$ bbit publish <componentId>
```
Publish a staged component that has not yet been published:
```shell
$ bbit publish <componentId> --allow-staged
```

To check if the publishing process will be done successfully (without publishing):
```shell
$ bbit publish <componentId> --dry-run
```

To return the output as JSON:

```shell
$ bbit publish <componentId> --json
```
