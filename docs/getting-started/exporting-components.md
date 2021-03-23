---
id: exporting-components
title: Exporting Components
---

Exporting a component to [a remote scope](/getting-started/bit-account#create-a-remote-scope) makes it available to be used by other Bit workspaces or your applications.

## Tagging Components

Before exporting our components we need to tag them using the `bit tag` command. This will create a new version of your component.

```shell
bit tag --all
```

## Export Components

Once you have tagged your component you can then run the `bit export` command.

```sh
bit export
```

After exporting go to your [bit.dev](https://bit.dev) account to see your exported component.

Once the exporting process completes, the `.bitmap` file gets updated to reflect that new state. Make sure to track it with git.

```sh
git commit -am 'updated .bitmap file after a successful export'
```
