---
id: compiling-during-development
title: Compiling during Development
---

## Running the compiler manually

To manually run the compiler on a specific component use its component ID

```bash
bit compile <component-id>
```

For example:

```bash
bit compile ui/button
```

To manually run the compiler on the entire workspace:

```bash
bit compile
```

### Options

#### `--changed` `-c`

Compiles only new or modified components.

```bash
bit compile --changed
```

#### `--verbose` `-v`

Outputs data regarding the compilation. For example, the `dist` paths.

```bash
bit compile --verbose
```

#### `--json` `-j`

Outputs (to the terminal) the compiled results in a JSON format.

```bash
bit compile --json
```

:::tip

Use `bit compile --help` or `bit compile -h` to get a list of available options for this command.

:::

## Bit processes that use the compiler

### Local dev server

Bit's local dev server (which also runs the Workspace UI) re-compiles components on each modification. This happens whenever a file is 'saved'.

```bash
bit start
ENVIRONMENT NAME        URL                      STATUS
react              http://localhost:3101         Running
node               http://localhost:3102         Running

You can now view bad-jokes components in the browser
Main UI server is running on http://localhost:3000

Waiting for component changes... (10:17:20)
```

### Compile in `watch` mode

Alongside the local dev server, Bit features a watch mode that runs different operations for modified components. Component compilation is one of these tasks.

```bash
bit watch
```
