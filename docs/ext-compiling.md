---
id: ext-compiling
title: Compiling
---

Bit uses compilers, which are environments - a special kind of [extension](/docs/ext-concepts.html#extensions-vs-environments), in order to [build components](/docs/building-components.html). Since there are so many build tools and configurations, some of you might discover that the existing compilers don't fit their requirements. Compilers are bit components in their own right, and anyone can develop a new compiler. In this section, we'll learn how.

## Compiler interface

The compiler interface you should adhere to is pretty simple:

```js
function compile(files, distPath) { 
    // Your code here...

    return compiledFilesArray;
}

module.exports = {
    compile
};
```

As you can see, it all happens in the `compile` function. It expects two arguments:

* `files` - an array of the component's files. Each file is a [vinyl file](https://github.com/gulpjs/vinyl). You can take a look at a file object's API [here](https://github.com/gulpjs/vinyl#instance-methods).
* `distPath` - the dist directory path, as the user had defined.

The `compile` function should return an array of the compiled [vinyl files](https://github.com/gulpjs/vinyl). Just remember not all the component's files are compiled, and you should return **all** the component's files.

## How compiling a component usually works

As we've gained experience in developing compilers for bit components, we've noticed there's a pattern, a number of stages for the compiling algorithm:

* First, you should go over all the files and determine which ones should be compiled. Keep in mind that a component contains your code, but can also contain markdown files, image files, style sheets and more...
* Compile the appropriate files using your chosen method
* Return an array of **all** the files (compiled and non-compiled). Their paths should be `distPath + relativePath`.

## Dependencies

When a compiler is imported to the workspace, its [dependencies](/docs/how-dependency-management.html) are installed as well.
You should make sure bit recognizes the compiler's dependencies, so it will later install them properly. A `require`/`import` statement is enough for bit, but there are two edge-cases where you should add `require` statements:

* Invoking a dependency with `require.resolve` won't help bit recognize it. That's one case in which you should add another require statement. This usually happens with [babel plugins and presets](https://babeljs.io/docs/plugins/). [Here's a good example](https://bit.dev/bit/envs/compilers/babel/~code#compilers/babel/index.js).
* Sometimes the tools you use require [peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/). There may not be `require` statements for those dependencies, so just make sure to add them if needed, if you want those to be installed.

## Testing and Debugging Compiler

### Local Testing

You can test your compiler from your local code, by setting the [bit workspace configuration](/docs/conf-bit-json.html) environments as follow: 

```json
"env": {
      "compiler": {
        "bit.envs/compilers/test@0.0.1": {
          "options": {
            "file": "../../path-to-my-compiler-file"
          }
        }
      }
    }
```

### Debugging

In order to debug your compiler, first [import it](/docs/cli-import.html) as you would any other component (e.g not as an environment).
Next, head over to the compiler's code, and add the following lines:

```js
const vinylFile = require('vinyl-file');
const file = vinylFile.readSync('first/file/path');
const file2 = vinylFile.readSync('second/file/path');

compile([file,file2],'/tmp');
```

These lines load all the component files (here we have just two files as an example) as [vinyl files](https://github.com/sindresorhus/vinyl-file), and invoke the `compile` function with the files and a dist path. Now you can run this file and debug as you would any other code file.

### Publish

[Track](/docs/cli-add.html), [tag](/docs/cli-tag.html) and [export](/docs/cli-export.html) the component. Then, [import the new environment](/docs/cli-import.html#import-a-new-environment) to your workspace.

## Examples

You can look a the [bit's environments Collection](https://bit.dev/bit/envs/) to see compilers examples. 
