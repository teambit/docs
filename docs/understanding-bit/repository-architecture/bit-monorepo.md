---
title: Bit in a Monorepo
id: bit-monorepo
---

import bitMonorepoImg from './bit-monorepo.png';
import scopeGraph from './scope-graph.png';

Bit empowers the management and
Here is an example Monorepo, built with Bit: http://github.com/bit-demos/monorepo

<img src={bitMonorepoImg} />

Directory structure for a Monorepo:

```bash
├── base-ui
    ├── ui
        ├── button
          ├── index.ts
          ├── button.ts
          ├── button.spec.ts
          ├── button.docs.md
          ├── ...
    ├── hooks
        ├── use-product
          ├── index.ts
          ├── use-product.ts
          ├── button.spec.ts
          ├── button.docs.md
          ├── ...
├── ecommerce
    ├── ui
        ├── button
          ├── index.ts
          ├── button.ts
          ├── button.spec.ts
          ├── button.docs.md
          ├── ...
├── ...
```

Ownership and team boundaries is determined through the use of [Scopes](/scope/overview). Components from different Scopes can depend on one another as demonstrated from the Bit Cloud UI.

<img src={scopeGraph} />

<!-- TODO ### Visibility and discoverability

### Consistent tooling

### Efficient incremental builds and CI
 -->

### Smart rebuilds of affected Components

See which components got affected from your changes

```bash
bit status
```

Test the affected components

```bash
bit test --changed
```

### Team boundaries and ownership

### Cross team collaboration

### Gradual refactoring

### Better API adoption

### Standardization and automation of development environments

### Create a module in any size
Bit reduces the overhead of creating and maintaining an independent module in the codebase. Envs encapsulates the development environment for different

### Dev experience

### Dependency policies

### Symmetry

### Architecture and Team dependency diagrams
