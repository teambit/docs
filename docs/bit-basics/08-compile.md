---
id: compile
title: Compile
---

You now have an environment configured on a directory in your Workspace, and a tracked component in that directory.  

Like with any piece of code, your Bit component needs to be compiled before it can be consumed. This is one of the jobs that the environment that you [chose earlier](/docs/bit-basics/choose-dev-env) will do for you. All environments have a compiler (sometimes more than one) configured for them, and when you run the compile the command the  compiler/s in the environment you associated for a component is/are activated.

The following command compiles all components currently being tracked in your Bit workspace:

```sh
$ bit compile

  STATUS        COMPONENT ID
✔ SUCCESS       primitives/button

✔ 1\1 components compiled successefully.
```

> When you `bit compile` the compiler runs in dev mode, which for instance creates source maps for debugging.  
> When you run `bit build` the same compiler will run in production mode, as part of the full build pipeline.

The compilation outputs a local package of your component into the workspace's node_modules folder, which can now be imported into other components or code just like any other node_modules package.
