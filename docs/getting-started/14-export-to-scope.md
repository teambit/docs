---
id: export-to-scope
title: Export Components
---

Exporting a component's release version to [a remote scope](/docs/getting-started/bit-account#create-a-remote-scope) makes it available to be used by other Bit workspaces and non-Bit web projects.

## Export Staged Components

Run the `bit export` command to have Bit export all versioned components. In our case that will be the 'button', 'app-bar', 'use-jokes' and 'tech-jokes-viewer' components.

```sh
$ bbit export
```

Head over to `https://bit.dev/<owner-name>/<scope-name>` to see your exported component, or explore a similar [demo scope](https://bit.dev/demo-org/demo-scope).

## Post Export Operations

Once the exporting process completes, the `.bitmap` file gets updated to reflect that new state. Make sure to track it with git.

```sh
git commit -am 'updated .bitmap file after a successful export'
```
