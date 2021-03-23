---
id: overview
title: Overview
---

The React Native environment is an implementation of the Environments aspect. It is a one-stop-shop for React components in a Bit workspace. It uses various services, provided by other aspects, to handle the life events of React components, managed in a Bit workspace.

The React Native environment spares you the overhead of setting up your own React environment and creates a standardized and shareable development environment for you and your team.



## Default configurations

### Tester
* Uses Jest as a test runner
* Test files: `*.spec.*` and `*.test.*`

### Compiler
TypeScript for `*.ts`, `*.js`, `*.jsx`, `*.tsx`

### Bundler (for 'Preview' and 'DevServer')
Uses Webpack. 

Includes the following file types:

`*.web.mjs`, `*.mjs`, `*.js`, `*.ts`, `*.tsx`, `*.jsx`, `*.mdx`, `*.md`, `*.(module.)css`, `*.(module.)scss`, `*.(module.)sass`, `*.(module.)less`

### Default dependencies (for components handled by the environment)

```js
{
    dependencies: {
      react: '-',
      'react-native': '-',
    },
    devDependencies: {
      '@types/react-native': '^0.63.2',
      '@types/jest': '~26.0.9',
      '@types/mocha': '-',
    },
    peerDependencies: {
      react: '^16.13.1',
      'react-native': '^0.63.3',
    },
  };
}
```
> The `-` sign indicates a dependency is removed by the environment. 'react' is configured as a peer dependency instead of a (runtime) dependency. 

### Development files
The React environment treats the following files as development files: `*.doc.*`, `*.spec.*`, `*.test.*`, `*.composition.*`, `*.compositions.*`.

Dependencies of development files will be recognized and registered as development dependencies (`devDependencies`).