---
id: ext-testing
title: Testing
permalink: docs/ext-testing.html
layout: docs
category: Extending Bit
prev: ext-compiling.html
next: component-dependencies.html
---

Bit uses testers, which are environments - a special kind of [extension](/docs/ext-concepts.html#extensions-vs-environments), in order to [test components](/docs/testing-components.html). Since there are so many testing tools and configurations, some of you might discover that the existing testers don't fit their requirements. Testers are bit components in their own right, and anyone can develop a new tester. In this section, we'll learn how.

## Tester interface

The tester interface you should adhere to is pretty simple:

```js
function run(specFile) {
    // Your code here...

    return testResults;
}

module.exports = {
    run,
    globals: {
        // Your globals here...
    },
    modules: {
        // Your modules here...
    }
};
```

As you can see, it all happens in the `run` function.
`run` expects one argument - specFile, which is a `string` that contains the full file path.

### Test results object

The function returns the test results object (or a promise that will return it), which should be in the following `json` format:

```json
{
    tests,
    stats: {
        start,
        end
    },
    failures
}
```

#### tests

An array of test results, one for each test case.

Each item in the array represents one test result object:

```json
{
    title,
    pass,
    err: {
        message,
        stack
    },
    duration
}
```

* `title`:`string` - test case title
* `pass`: `bool` - has test successfully passed
* `err`: `object` - error object, contains a `message` and `stack` strings. If no error, value is `null`.
* `duration`: `number` - amount of ms that took the test case to complete.

An empty array will be sent when no test cases were run.

#### stats

An object that contains the `start` and `end` times of the tester run. 
Both are `Date` objects.

#### failures

An array of general failures. Here will be failures that don't belong to a specific test case. For example, test tool general failure, or before/after hook failure.
Each item in the array will represents one failure object:

```json
{
    title,
    err: {
        message,
        stack
    }
}
```

* `title`:`string` - failure title
* `err`:`object` - error object, contains a `message` and `stack` strings.

An empty array will be sent when there are no failures.

### Globals and Modules

the tester exports two more objects - `globals` and `modules`.

#### globals

Global variables that will be accessible from the spec files code.

#### modules

[Node packages](https://www.npmjs.com/) that can be required from the spec files code.
Usually, references for the testing tools and frameworks are exported as part of the `modules` object.

## How testing a component usually works

As we've gained experience in developing testers for bit components, we've noticed there's a pattern, a number of stages for the testing algorithm:

* The `run` function receives the spec file full path, and then passes it on to the testing tool. 
* The testing tool does its job, and returns the raw test results.
* As we've just explained, bit expects its testers to return the test results in a specific format. This means that after getting the raw test results from the testing tool, the testers should act as an adapter, and format the test results appropriately.

> **Note**
>
> The tester is run for each spec file separately.

## Dependencies

When a tester is imported to a workspace, its [dependencies](/docs/how-dependency-management.html) are installed as well.
You should make sure bit recognizes the tester's dependencies, so it will later install them properly. A `require`/`import` statement is enough for bit, but there are two edge-cases where you should add `require` statements:

* Invoking a dependency with `require.resolve` won't help bit recognize it. That's one case in which you should add another require statement. This usually happens with plugins (for example, [karma plugins](http://karma-runner.github.io/1.0/config/plugins.html). [Here's a good example](https://bit.dev/bit/envs/testers/karma-mocha-react/code#testers/karma-mocha-react/karma.conf.js).
* Sometimes the tools you use require [peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/). There may not be `require` statements for those dependencies, so just make sure to add them if needed, if you want those to be installed.

## So you've written a tester. What's next?

First, as with any component, [track](/docs/cli-add.html), [tag](/docs/cli-tag.html) and [export](/docs/cli-export.html) the component. Then, [import the new environment](/docs/cli-import.html#import-a-new-environment) to your workspace.

## Debugging your compiler

In order to debug your tester, first [import it](/docs/cli-import.html) as you would any other component (e.g not as an environment).
Next, head over to the tester's code, and add the following line:

```js
run('spec/file/path');
```

This line invokes the `run` function with a spec file path of your choice. Now you can run this file and debug as you would any other code file.

## Learn straight from the source

The best examples for testers can be found in [bit's environments Collection](https://bit.dev/bit/envs/). Take a look and learn from us.
