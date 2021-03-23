---
id: export-to-scope
title: Export Components
---

import GitCommitBitmap from '@site/docs/components/commands/git-commit-bitmap.md'

Exporting a component's release version to [a remote scope](/getting-started/bit-account#create-a-remote-scope) makes it available to be used by other Bit workspaces and non-Bit web projects.

## Export Staged Components

Run the `bit export` command to have Bit export all your versioned components. 

```sh
bit export
```

In your workspace go to `https://bit.dev/<owner-name>/<scope-name>` to see your exported components.

<div style={{textAlign: 'center'}}>
     <img src="/img/export_scrn_shot.png" width="90%" style={{boxShadow: '3px 3px 15px 3px rgba(0,0,0,0.20)'}}></img>
</div>

### Committing your Changes

<GitCommitBitmap />