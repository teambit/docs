---
id: overview
title: Overview
---
Compilation is a crucial step in making a component an independent module to be used in other repositories as well as internally, by other components in your workspace.

When Bit starts tracking a component, a new directory is created for it inside the `node_modules` directory. When a component gets compiled, the output of that process is placed inside the root of that directory.

for example:

```sh
├── node_modules
    ├── @my-org
        ├── react-ui.button
          ├── dist
              ├── index.js
              ├── index.js.map
              ├── button.js
              ├── button.js.map
          ├── ...
```

The above operation makes it possible to use components as standard node modules, right from the get-go.

For example:
```js
import { Button } from '@my-org/react-ui.button'
```
## Running the compiler manually

To manually run the compiler on a specific component use the [component ID](/docs/bit-components/overview#component-id):

```shell
$ bbit compile <component-id>
```

For example:

```shell
$ bbit compile ui-primitives/button
```
> When *manually* running the compiler on a specific component, all of its dependencies will get compiled as well.

To manually run the compiler on the entire workspace:

```shell
$ bbit compile
```

## Bit processes that use the compiler



### Local dev server

Bit's local dev server (that also runs the Workspace UI) compiles component on each modification. This happens on every "save" operation for a file you edit.

```shell
$ bbit start
ENVIRONMENT NAME        URL                      STATUS
react              http://localhost:3101         Running
node               http://localhost:3102         Running

You can now view bad-jokes components in the browser
Main UI server is running on http://localhost:3000

Waiting for component changes... (10:17:20)
```

### Manual compilation

You can manually trigger component compilation using the `bbit compile` command.

```shell
// to compile all components in the workspace
$ bbit compile

// to compile  specific component (in this case, the 'button' component)
$ bbit compile react-ui/button
```

### Compile in `watch` mode

Alongside the local dev server, Bit features a watch mode that runs different operations for modified components. Component compilation is one of these tasks.

```sh
$ bbit watch
```


The Compiler is an Environment Service responsible for executing the 


- The compiler is an environment service...

- two out-of-the-box compiler components: ts babel

- compiler targets..