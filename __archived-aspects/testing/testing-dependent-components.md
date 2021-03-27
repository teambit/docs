---
id: testing-dependent-components
title: Testing Dependent Components
---

//TODO building with bit on tests

Bit makes the most out of your automated tests to help you maintain code in a network of independent components. It does so by:

- **Testing components in isolated environments:**
  Tests running as part of the build pipeline will test each component in a 'Bit Capsule' which is
  an isolated instance of a component, generated in a separate directory in your filesystem.
  That ensures the validity of your tests as each test runs unaffected by code that is not part of the component itself.

- **Automatically testing the dependents of a modified component:**
  When tagging a component with a new release version, the 'build' and 'tag' processes automatically run on all dependent components, as well.
  Since testing is part of the build process, tests of all dependent components run as well, to make sure nothing got broken due to that change.  
  Use the `bit status` command to check the expected ripple effect of modifying a component.

  For example:

```
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > ui/elements/button ... ok

components pending to be tagged automatically (when their dependencies are tagged)
     > ui/widgets/login-form ... ok
```