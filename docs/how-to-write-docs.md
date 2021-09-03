---
id: how-to-write-docs
title: How to Write Docs
---

### Referring to Aspects

- An aspect is written with an uppercase, and followed by 'aspect'. For example: 'Compiler aspect', 'Envs aspect'.

- An aspect implementation is written with an uppercase, and followed by 'implementation'. For example, "Compiler implementation", 'Envs implementation'.

### Explaining Bit Aspects

#### An aspect is explained, if possible, through the following lenses:

1. **Build vs development**: dev experience (performance, debugging, etc) vs consistency, reusability and runtime performance.  
   For example:

   - "Compilation of components in the [Workspace](/workspace/overview) optimized for dev experience, performance and debugging by default.
     This means [Source Maps](/) are generated and components are just transpiled (without types) into in the `node_modules` directory to ensure consistency between using a component for development or consumption purposes."

   - "Compilation for distribution is optimized for runtime performance, consistency and reusability.
     This means [Source Maps](/) are not being generated, target is preferred to be compatible with vast majority of browsers, bundlers and JS execution engines and Types are generated for the component, which can be costly in performance.""

2. What are benefits does the Aspect offers?

### Explaining development vs build

- "during development" should be explicitly described as "in the workspace"

- "during build" or "for distribution" should be explicitly described as "in the capsule" or "part of the build pipeline"
