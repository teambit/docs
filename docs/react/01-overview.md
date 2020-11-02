---
id: overview
title: Overview
---

React is an implementation of the Environments aspect. It is a one-stop-shop for React components in a Bit workspace. It uses various services, provided by other aspects, to handle the life events of React components, managed by Bit. Among these events are: linting, compiling, testing, bundling and more.

The React aspect spares you the overhead of setting up your own React environment and creates a standardized and shareable development environment for you and your team.

## React's default setup

- Test runner: Jest
- Compiler: TypeScript
- Bundler: Webpack: configured to support JSX/TSX, SASS/CSS (incl. CSS modules)

## Workspace configurations

The React aspect can be configured via the workspace.json, on two levels:

1. __root__ sets the default configurations for the entire workspace
2. __teambit.bit/variants__ sets the configurations to a limited set of components, selected by their common directory


```json
{
  'teambit.bit/workspace': {
    name: 'a-ws-using-react',
    icon: 'https://domain.com/my-ws-icon.svg',
    defaultScope: 'my-org.my-scope',
  },
  'teambit.bit/react': {
    compiler: 'babel',
    tester: 'mocha',
    reactVersion: '^16.13.1',
  },
  'teambit.bit/variants': {
    'components/react/ui-primitives': {
      'teambit.bit/react': {
        compiler: 'ts',
        tester: 'jest',
      },
    },
  },
  'teambit.bit/dependency-resolver': {
    packageManager: 'teambit.bit/pnpm',
    policy: {
      peerDependencies: {
        react: '^16.13.1',
        '@babel/runtime': '^7.11.2',
        'react-dom': '^16.13.1',
      },
    },
  },
};
```