---
id: exporting-components
title: Exporting Components
---

Exporting a component's release version to [a remote scope](/getting-started/bit-account#create-a-remote-scope) makes it available to be used by other Bit workspaces and non-Bit web projects.

## Export Staged Components

Run the `bit export` command to have Bit export all versioned components.

```sh
bit export
```

Go to [bit.dev](https://bit.dev) and click on your user avatar to see your exported component.

## Post Export Operations

Once the exporting process completes, the `.bitmap` file gets updated to reflect that new state. Make sure to track it with git.

```sh
git commit -am 'updated .bitmap file after a successful export'
```
