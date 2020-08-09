---
id: anatomy
title: Anatomy
---

## Anatomy

All component files should be in the same directory, including component's code, stylings, tests, documentation, and testing snapshots. If your components is using sub-components, i.e., components that you can only use within the context of the parent component (List and ListItem or a component and its styled component), it make sense to include them in the same directory.

```sh
account/login-form           # root directory for storing all component files
├── index.tsx                # main entry point file that exports modules to import
├── login-form.composite.tsx # examples and compositions for the component
├── login-form.docs.tsx      # component documentation
├── login-form.spec.tsx      # tests
└── login-form.tsx           # implementation
```

This creates a directory structure that is easily consumable by placing all the related files together.
