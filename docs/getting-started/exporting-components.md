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

Once the component has finished tagging you should see the following message:

```shell
new components
(first version for components)
     > ui/button@0.0.1
```

## Export Components

Once you have tagged your component you can then run the `bit export` command.

```sh
bit export
```

Once your component has finished exporting you should see the following message:

```shell
exported the following 1 component(s):
your-username.demo-scope/ui/button
```

After exporting go to your [bit.dev](https://bit.dev) account to see your exported component.

Once the exporting process completes, the `.bitmap` file gets updated to reflect that new state. Make sure to track it with git.

```sh
git commit -am "updated .bitmap file after a successful export"
```
