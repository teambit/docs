---
id: ext-compiling
title: Build a compiler
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

When a compiler is imported to the workspace, its [dependencies](/docs/add-and-isolate-components#component-dependencies) are installed as well.
You should make sure bit recognizes the compiler's dependencies, so it will later install them properly. A `require`/`import` statement is enough for bit, but there are two edge-cases where you should add `require` statements:

* Invoking a dependency with `require.resolve` won't help bit recognize it. That's one case in which you should add another require statement. This usually happens with [babel plugins and presets](https://babeljs.io/docs/plugins/). [Here's a good example](https://bit.dev/bit/envs/compilers/babel/~code#compilers/babel/index.js).
* Sometimes the tools you use require [peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/). There may not be `require` statements for those dependencies, so just make sure to add them if needed, if you want those to be installed.
