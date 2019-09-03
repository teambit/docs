---
id: ext-developing-extensions
title: Developing Extensions
permalink: docs/ext-developing-extensions.html
layout: docs
category: Extending Bit
prev: ext-using-extensions.html
next: ext-compiling.html
---

[Extensions](/docs/ext-concepts.html) were designed in order to extend Bit's functionality. This means developing your own custom extension is very straightforward.

## Creating a new extension

An extension is basically a Bit component, so creating one is the same as [creating any component](/docs/isolating-and-tracking-components.html).

## Extension interface

For a component to be a valid extension, it has to implement the extension interface:

### getDynamicConfig

This function allows us to add additional dynamic configuration for the extension.
It's invoked before [init](#init) and receives a config object (the [extension's configuration](/docs/ext-concepts.html#configuration) as specified in [Bit's configuration](/docs/conf-bit-json.html#extensions--object)). It returns a new config object which is then passed on to [init](#init).

```js
const getDynamicConfig = ({ rawConfig }) => {
     return Object.assign({}, rawConfig, { dynamicConfigKey: 'dynamicConfigVal' })
};
```

### init

The `init` function is in charge of initializing the extension. It receives a config object (the [extension's configuration](/docs/ext-concepts.html#configuration) as specified in [Bit's configuration](/docs/conf-bit-json.html#extensions--object)), a [dynamicConfig object](#getDynamicConfig), and an api object, which exposes [Bit's extensions API](#bits-extensions-api).

```js
const init = ({ rawConfig, dynamicConfig, api} ) => {
  // Init code here...
};
```

## Bit's extensions API

Bit exposes a set of API functions, available for anyone developing Bit extensions. It's available through the `api` object passed as an argument to [init](#init) function.

In the next section, we'll go over the different use-cases and their API-equivalents:

### Creating an isolated environment

An isolated environment's purpose is to isolate a component from a Scope. Practically, this is done using the API function `createIsolatedEnv(ScopePath, isolatedEnvDirPath)`.

The function expects the following arguments:

* `ScopePath` - the location of the relevant Scope.
* `isolatedEnvDirPath` - optional - Will be used as the isolated environment directory. If not provided, some random directory will be created inside `ScopePath/environment`.

The function creates the isolated environment directory, and returns an `isolatedEnv` instance which support these functions:

**isolatedEnv.isolateComponent(componentId, isolateOpts)**

Isolates the component from the Scope in the isolated environment directory.
`isolateOpts` is an object with the following available values:

```js
IsolateOptions = {
  writeToPath: ?string, // Path to write the component to (default to the isolatedEnv path)
  writeBitDependencies: ?boolean, // Write bit dependencies as package dependencies in package.json
  npmLinks: ?boolean, // Fix the links to dependencies to be links to the package
  saveDependenciesAsComponents: ?boolean, // import the dependencies as bit components instead of as npm packages
  installPackages: ?boolean, // Install the package dependencies
  noPackageJson: ?boolean, // Don't write the package.json
  override: ?boolean, // Override existing files in the directory
  excludeRegistryPrefix: ?boolean, // exclude the registry prefix from the component's name in the package.json
  dist: ?boolean, // Write dist files
  conf: ?boolean, // Write bit.json file
  verbose: boolean // Print more logs
};
```

**getPath()**

Get the path of the isolated environment.
This is useful in case you didn’t pass an `isolatedEnvDirPath` to `createIsolatedEnv` and you need to get the random path that has been created).

**Destroy()**

Delete the isolated environment directory.

#### Usage example

For example, let's take a look at an npm pack action that uses the `createIsolatedEnv` function.

```js{5,7,14}
function packAction([componentId, ScopePath], { json, outDir, override }){
  let isolatePath;
  logger.debug(`packing component ${componentId}`);  
  loader.start(`packing component ${componentId}`);
  return createIsolatedEnv(ScopePath)
  .then(isolatedEnv => {
    isolatePath = isolatedEnv.getPath();
    const isolateOpts = {
      writeBitDependencies: true,
      createNpmLinkFiles: true,
      installPackages: false,
      noPackageJson: false
    };
    return isolatedEnv.isolateComponent(componentId, isolateOpts)
    .then(() => {
      outDir = outDir || isolatePath;
      return npmPack(isolatePath, outDir, override)
        .then((tarPath) => {
          console.log('finish packging', tarPath);
          return tarPath;
        });
    });
  });
}
```

### Registering a command

If you want to develop an extension that creates a custom Bit Command, you should use the `registerCommand` API function:

`registerCommand` expects a `Command` object as an argument, and then adds it to Bit's available commands - you'll also be able to see the command under `bit --help`, and see the command's detaild help under `bit <command name> --help`.

Under the veil, Bit uses [commander](https://github.com/tj/commander.js/) in order to manage its commands. This means that command options and args are written exactly as detailed in the [commander documentation](https://github.com/tj/commander.js/).

The `Command` object contains:

* `name` (string) - name of the command and args
* `description` (string) - the description which will be displayed in `bit --help`
* `opts` (array of options) - each option is an array containing 3 values: `[shortOption, fullOption, description]`.
* `action` (function) - a function to run when the command is triggered
* `report` (function) - a function that runs after the action is completed, and receives the action result as an argument.

Here is an example of a `Command` object:

```js
const packCommand = {
  name: 'plugin-pack <componentId> [ScopePath]',
  description: 'Create tar for npm publish',
  opts: [
    ['j', 'json', 'show the output in JSON format'],
    ['d', 'out-dir <out-dir>', 'directory to put the result tar file'],
    ['o', 'override [boolean]', 'override existing pack file']
  ],
  action: () => {return true},
  report: (result) => { console.log(result) }
}
```

For a detailed example of an extension that creates a custom command, see the pack command extension.

### Registering an action to a hook

If you want to develop an extension that [registers an action to a hook](/docs/ext-concepts.html#hooks), you should use the `registerActionToHook` API function:

`registerActionToHook` expects the following arguments:

* `hookName` (string) - the hook to register the action to.
* `hookAction` (object) - the action to run. Contains:
  * `name` (string) - the action name (used mostly for logging / error handling)
  * `run` (function) - the actual function to run

```js
api.registerActionToHook('pre-tag', {name: 'myPreTagAction', run: preTagAction});
```

The actual hook action (that's the function that's sent to `registerActionToHook` in the `run` argument) might return a promise or a regular value, and it expects two arguments:

```js
args = {
      componentObjects,
      ScopePath,
      componentsIds,
      ScopeName
}

headers = {
  version,
  context: {
    username,
    email
  }
}
```

> **Note**
>
> When multiple actions are registered to the same hook (whether they were registered by the same extension or by another), they will run in parallel when that hook is triggered.

These are [Bit's core hooks](/docs/ext-concepts.html#bits-core-hooks) - any extension can register to these:

* `pre-tag` - Triggered before [tagging](/docs/cli-tag.html).
* `post-tag` - Triggered after [tagging](/docs/cli-tag.html).
* `pre-tag-all` - Triggered before [tagging all new and modified components](/docs/cli-tag.html#tagging-all-new-and-modified-components).
* `post-tag-all` - Triggered after [tagging all new and modified components](/docs/cli-tag.html#tagging-all-new-and-modified-components).
* `pre-import` - Triggered before [import](/docs/cli-import.html).
* `post-import` - Triggered after [import](/docs/cli-import.html).
* `pre-export` - Triggered before [export](/docs/cli-export.html).
* `post-export` - Triggered after [export](/docs/cli-export.html).
* `pre-send-objects` -  // pre-fetch
* `post-send-objects` -  // post-fetch
* `pre-receive-objects` -  // pre-put
* `post-receive-objects` -  // post-put
* `pre-deprecate-remote`
* `post-deprecate-remote`
* `pre-remove-remote`
* `post-remove-remote`

Example:

```js{3}
const Pack = {
  init: (rawConfig, dynamicConfig, api) => {
    api.registerActionToHook('pre-tag', {name: 'myPreTagAction', run: preTagAction});
  }
}

const preTagAction = (args, headers) => {
  console.log('on pre tag hook');
  console.log('args recieved:', args);
}

export default Pack;
```

### Registering a new hook

You can register a new type of hook - just use the `registerNewHook` API function.

`registerNewHook` expects the following arguments:

* `hookName` (string) - the hook name that is used in order to identify the specific hook. When another extension registers to the hook, it will use this name.

> **Note**
>
> The hook name is unique across the app (and across all the extensions), so you can’t register a hook name which already exists.

#### Using multiple hooks in order to run actions sequently

Registering a new hook is especially useful if you want another extension's action to run sequently after yours. Since actions registered to the same hook will run in parallel, the correct solution is registering a new hook, and then registering another extension to run when the new hook is triggered.

#### Triggering the newly created hook

Naturally, the new hook should also be triggered at some point. This is done by invoking the `triggerHook` API function.

`triggerHook` expects two arguments:

* `hookName` (string) - the same hook name as used when registering the hook.
* `args` (object) - any arguments that should be passed on to the actions registered to the hook.

> **Note**
>
> You can only trigger hooks the were registered by the same extension. Trying to trigger hooks registered somewhere else will result in an error.

Let's see what registering a new hook and triggering it looks like:

```js{10,11,19}
const triggerHook;

const Pack = {
  getDynamicConfig: (rawConfig, dynamicConfig) => {
    return Object.assign({}, rawConfig, { dynamicConfigKey: 'dynamicConfigVal' })
  },

  init: (rawConfig, dynamicConfig, api) => {
    api.registerActionToHook('post-tag', {name: 'packAction', run: packAction});
    api.registerNewHook('post-pack');
    triggerHook = api.triggerHook;
  }
};

const packAction = (args, headers) => {
  // pack action code here, and then...
  // ...
  // ...
  triggerHook('post-pack', {arg: 'myArgs'});
}
```

This will result in packAction running when the `post-tag` hook is triggered by Bit.
The code for the pack action will run, and finally, it will trigger the `post-pack` hook previously registered by the same extension. This will cause all actions registered to `post-pack` in other extensions to run.

> **Preventing coupling between extensions**
>
> We wanted to allow extensions to register actions to hooks that have been triggered by other extensions, without creating a tight coupling between the extensions. That's why triggering a hook in the extension's code actually means you're telling Bit to trigger that hook - that way Bit can run all the registered actions, even when they originate from other plugins.

### Using the logger and loader

The API exposes two more helper functions:

`getLoader` - returns an instance of the [ora](https://github.com/sindresorhus/ora) terminal loader animation.

`getLogger` - returns an instance of a [winston logger](https://github.com/winstonjs/winston). You can use the loader with `.debug`, `.warn`, `.error`, `.info`, `.log`, etc.
The log will be written into [extensions.log file](/docs/logs.html#log-types).
Each extension will get a different logger instance, which contains the extension name as a label. This means you can alter your logger instance without worrying about affecting other extensions.
Each line in the log file will have the extension name as a prefix:

```bash
[extension-name]: log message.
```

Let's take a look at a usage example:

```js{11,12,17,18}
const logger;
const loader;

const Pack = {
  getDynamicConfig: (rawConfig, dynamicConfig) => {
    return Object.assign({}, rawConfig, { dynamicConfigKey: 'dynamicConfigVal' })
  },

  init: (rawConfig, dynamicConfig, api) => {
    api.registerActionToHook('post-tag', {name: 'packAction', run: packAction});
    loader = api.getLoader();
    logger = api.getLogger();
  }
};

const packAction = (args, headers) => {
  loader.start('packing component...');
  logger.info('packing component...');
}
```

## Debugging an extension

In order to debug your extension code, set the extension's options.file value to the path of the file you're working on.
