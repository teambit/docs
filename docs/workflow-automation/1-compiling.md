---
id: compiling
title: Compiling
---

Modern web frameworks require a compilation or transpilation project to transform the source code into executable code that can run in multiple browsers or Nodejs. This is done using various tools like Babel, TypeScript, etc.  

## Target compilation

We use tools like WebPack and Rollup to bundle a web application to a single target that contains all dependencies and assets. It is the application's responsibility to create runnable bundles for the browser. Components should only be compiled to a reusable target a bundler can consume. This process has several benefits:

- No bundled duplicate dependencies.
- No loss of data (CSS classes turned to hash).
- Enhances bundler features like tree-shaking and code splitting.

If we accept this reasoning, the ideal target format for components is - **ESM2015**. Bit's core environments use this as the only distribution target.

## Compiled code

Bit stores the compiled code in the root `node_modules` directory, in each component's module directory. This gives you several features:

- Clean workspace.
- Import statements that just work.
- Native break-point debugging for IDEs.
