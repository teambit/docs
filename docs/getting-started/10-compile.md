---
id: compile
title: Compilation
---

Most modern frameworks require a compilation or transpilation project to transform the source code into executable code that can run in multiple browsers or Nodejs. **Environments** manage component compilation/transpilation in Bit; they use other underline tools like [Babel](https://babeljs.io), [TypeScript Compiler](https://www.typescriptlang.org), depending on the specific framework and JavaScript flavor.

## Triggering Compilation

There are several workflows which triggers the component compilation process.

### `bbit start`

Bit's local dev server (that runs the Workspace UI) compiles component on each modification. This happens on every "save" operation for a file tracked in a component.

```shell
$ bbit start
ENVIRONMENT NAME        URL                      STATUS
react              http://localhost:3101         Running
node               http://localhost:3102         Running

You can now view bad-jokes components in the browser
Main UI server is running on http://localhost:3000

Waiting for component changes... (10:17:20)
```

### `bbit watch`

In cases where you decide not to use the Workspace UI, you can use Bit's `watch` mode that runs the same `compile` operation on each file change; similar to the `bbit start` command.

```sh
$ bbit watch
```

### `bbit compile`

Manually trigger component compilation using the `bbit compile` command.

```shell
$ bbit compile              # compile all modified components
$ bbit compile react/button # compile a specific component
```

## Component Module

For each compiled component Bit creates a module-directory in the workspace's root `node_modules` dir. This is where it stores the component's compilation output (`dist`).

```sh title="Contents of module-directory for a component"
node_modules/@my-org
├── ui.button
│   ├── dist
│   │   ├── index.js
│   │   ├── index.js.map
│   │   ├── button.js
│   │   ├── button.js.map
│   │   └── buttonmodule.scss
│   ├── package.json
```

The above operation makes it possible to use components as standard node modules, right from the get-go.

```js title="Import a component as a module"
import { Button } from '@my-org/ui.button'
```

In this tutorial, we are using the React environment which uses TypeScript as its default compiler. To extend or customize its configurations, [see here](/docs/react/extending-react).
