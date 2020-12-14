---
id: overview
title: Overview
---

The Node environment is an implementation of the Environments aspect. It is a one-stop-shop for Node components in a Bit workspace. It uses various services, provided by other aspects, to handle the life events of Node components, managed in a Bit workspace.

The Node environment spares you the overhead of setting up your own Node environment and creates a standardized and shareable development environment for you and your team.

## Default configurations

### Tester

- Uses Jest as a test runner
- Test files: `*.spec.*` and `*.test.*`

### Compiler

TypeScript

### Bundler (for 'Preview' and 'DevServer')

Uses Webpack.

Includes the following file types:

`*.web.mjs`, `*.mjs`, `*.js`, `*.ts`, `*.tsx`, `*.jsx`, `*.mdx`, `*.md`, `*.(module.)css`, `*.(module.)scss`, `*.(module.)sass`, `*.(module.)less`

### Default dependencies (for components handled by the environment)

```js
{
  devDependencies: {
    '@types/jest': '~26.0.9',
    }    
}
```

### Development files

The Node environment treats the following files as development files: `*.doc.*`, `*.spec.*`, `*.test.*`

Dependencies of development files will be recognized and registered as development dependencies (`devDependencies`).