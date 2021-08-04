---
id: compiling-during-development
title: Compiling During Development
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

#### `--help` `-h`

List all available options for the `compile` command

```bash
bit compile --help
```

## Compile in `watch` mode

Bit features a watch mode that runs different operations for modified components. Component compilation is one of these tasks.

```bash
bit watch
```

This process is also part of Bit's dev server.

```bash
bit start
```
