---
id: conf-bit-json
title: Workspace Configuration
---

The bit configuration may reside in the `bit.json` file or in the `bit` section in `package.json` inside a bit workspace. By default, when initializing a workspace, bit will set the configuration inside `package.json`.  

## packageManager

- Type: `npm | yarn`
- Default: `npm`

The package manager to be used when installing components. Can be set to `npm` or `yarn`. 

## componentsDefaultDirectory

- Type: `string`
- Default: `components/{name}`

Define the directory inside which all imported components will reside. The path is relative to the workspace configuration location.

Override this path for a specific component using `bit import --path`.  

## dependenciesDirectory

- Type: `string`
- Default: `components/.dependencies`

Specifies the directory that contains all the components that are dependencies of components that were imported.  The path is relative to the workspace configuration location.

## saveDependenciesAsComponents

- Type: `boolean`
- Default: `false`

If a bit component is a dependency of another component, by default bit will attempt to install it with package manager (`npm install` or `yarn add`). By setting ths value to true, bit will import any bit scope components that are dependencies of a bit imported component. 

## dist

By default the bit compiler dist files are located with the component files. You can specify a different location for the build artifacts. The target tree under the directory will be similar to the source components directory.

### dist.entry

- Type: `string`
- Default: not defined

Entry point of the dist tree.  If only dist.target is set, the entry will be defaulted to the `componentsDefaultDirectory`.  
### dist.target

The target location of the build files

## defaultScope

Type: `string`
Default: none

For components that are exported for the first time, sets the scope as the component's default scope, and mark the component as exported (not staged).  

## resolveModules

Configure custom module resolution for Bit components. This is similar to Webpack’s resolve, and contains 2 objects:

- `moduleDirectories: []` - Add additional paths to resolve components from.
- `aliases` - Sets an alias for a directory.

```js
"resolveModules": {
  "modulesDirectories": ["src"],
  "aliases": {
    "@": "someDir"
  }
}
```

## useWorkspaces

- Type: `boolean`
- Default: `false`

Only applicable if package manager is set to `yarn`.
Sets whether to use [yarn workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/). 

## manageWorkspaces

- Type: `boolean`
- Default: `false`

Only applicable if package manager is set to `yarn`. 
only applicable when using yarn workspaces: `useWorkspaces:true`
Bit automatically configures each imported component directory in the root `package.json`, in the `workspaces` section.

## packageManagerArgs

- Type: `string[]`
- Default: `[]`

Specify npm or yarn install arguments.

## packageManagerProcessOptions

- Type: `object`
- Default: not defined

Configures additional options for the child-process running the package manager.
The available options are the following execa options: `shell`, `env`, `extendEnv`, `uid`, `gid`, `preferLocal`, `localDir`, `timeout`.

## env

The environment utilities, i.e. compiler and tester, that are used by default for all components

### env.compiler

- Type: `string`
- Default: `none`

The default compiler for building all components. This will be set automatically if a compiler is imported into bit workspace using the `--compiler` option. 

```json
"env": {
    "compiler": "bit.envs/compilers/react@0.0.3",
}
```

Specify `none` to bypass tester configuration. 
For testing purposes you can point to a local compiler file as follow: 

```json
"compiler": {
    "meta": {
        "options": {
        "file": "me/myproject/compiler.js"
        }
    }
}
```

### env.tester

- Type: `string`
- Default: `none`

The default tester for building all components.

```json
"env": {
    "tester": "none"
}
```

Specify `none` to bypass tester configuration. 
For testing purposes you can point to a local compiler file as follow: 

```json
"tester": {
    "meta": {
        "options": {
        "file": "me/myproject/tester.js"
        }
    }
}
```

## overrides

The overrides section contains configuration that is specific for a component or a group of components. The overriding configuration applies to components that are exported from the workspace, as well as to components that are imported into the workspace. Read about overriding components configuration [here](/docs/overrides).
