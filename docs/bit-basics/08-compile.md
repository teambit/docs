---
id: compile
title: Compile
---

You now have an environment configured for your workspace and a tracked component.  

Like with any piece of code, your Bit component needs to be compiled before it can be consumed. This is one of the jobs that the environment that you [chose earlier](/docs/bit-basics/choose-dev-env) will do for you. All environments have a compiler (sometimes more than one) configured for them, and when you run the compile the command the environment compiler/s is being activated.

The following command compiles all components currently being tracked in your Bit workspace:

```sh
$ bit compile

  STATUS        COMPONENT ID
✔ SUCCESS       primitives/button

✔ 1\1 components compiled successefully.
```
