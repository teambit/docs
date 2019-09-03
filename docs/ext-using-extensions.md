---
id: ext-using-extensions
title: Using Extensions
permalink: docs/ext-using-extensions.html
layout: docs
category: Extending Bit
prev: ext-concepts.html
next: ext-developing-extensions.html
---

Using [extensions](/docs/ext-concepts.html) is fairly straightforward. Let's learn how!

## Importing an extension

In order to use an extension, just [import](/docs/cli-import.html#import-an-extension) it from [bit.dev](https://bit.dev/) or another remote Collection:

```bash
bit import bit.extensions/commands/pack --extension
```

## Storage

Imported extensions are stored in `.bit/components/extensions` directory.

## Configuration and options

Extensions' configuration and options are part of the [bit config](/docs/conf-bit-json.html#extensions--object).

```json
"extensions": {
        "ext-docs-parser": {
            "rawConfig": {},
            "options": {
                "core": true
            }
        }
```

### Options

System-wide options that are relevant for every Bit extension.

* `core` - Determines whether the extension is a core extension (bool).
* `disabled` - When `true`, Bit won't load the extension (bool).
* `file` - A path to the extension's main file. The file path is relative to the working directory's location, or an absolute path. When provided, Bit will load the extension from this path, and not from the [usual location](#storage).

### Configuration

Contains all the configuration the extension needs. Unlike the system [options](#options), the configuration is used for the usage of the specific extension.

## Load an extension programmatically

You can also load an extension programmatically:

```js
loadExtension: async (
   extensionName: string,
   extensionFilePath: string,
   extensionConfig: Object,
   extensionOptions: Object
 ): Extension
```

`loadExtension` returns an instance of `Extension`:

```json
{
    name: string,
    loaded: boolean,
    disabled: boolean,
    filePath: string,
    registeredHooksActions: RegisteredHooksActions,
    newHooks: string[],
    commands: Commands,
    rawConfig: Object,
    options: Object,
    dynamicConfig: Object,
    script: Function, // Store the required plugin
    api
}
```

Here's an example:

```js
const bit = require('bit-bin');

const extensionName = 'bit-npm-pack';
const extensionFilePath = '/Users/giladshoham/dev/temp/pluginTest/dist/bit-pack';
const extensionConfig = {
  "rawConfigKey": "rawConfigVal",
}

bit.loadExtension(extensionName, extensionFilePath, extensionConfig)
  .then((extension) => {
    console.log(extension.loaded);
    const packCommand = extension.commands.find(cmd => {
      return cmd.name.indexOf('plugin-pack') > -1;
    })
    packCommand.action(["scoop/plugin-test/component", "/Users/giladshoham/dev/temp/pluginTest/scoop"], 
                        {outDir: "/Users/giladshoham/dev/temp/pluginTest"})
  }).catch(err => {
    console.log(err);
  });
```
