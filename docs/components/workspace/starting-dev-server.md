---
id: starting-dev-server
title: Starting the Dev Server
---

The start command starts our dev server, and watches for changes using Hot Module Replacement. It runs different workspace tasks through workers, such as testing, linters and any workspace tasks that are defined by the component.

:::note Compile Components

If you created or added a new component, you will need to compile before running the server. If you are following along this guide, you should run `bit compile` to compile your newly created components.
:::

```bash
bit compile
bit start
```

This will open-up your browser on [localhost:3000](http://localhost:3000), or any other available port, and display your workspace with your components.

:::note Building the UI

The first time you run the start command it can take a bit of time as it needs to build the whole UI.
:::

:::tip

Use `bit start --help` or `bit start -h` to get a list of available options for this command.

:::
