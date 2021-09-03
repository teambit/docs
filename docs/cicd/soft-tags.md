---
id: soft-tags
title: Soft Tags
---

import { Image } from '@site/src/components/image'

'Soft tags' are a way to suggest new component release versions so that they are tagged ("hard tagged") by a remote CI, instead of tagging them locally.

Soft tags are registered in the workspace `.bitmap` file.

For example:

```bash
bit tag --soft ui/button --ver 1.0.0 --message "change font"
```

The `.bitmap` file will be updated with the following details:

```json title=".bitmap"
"ui/button": {
    "scope": "",
    "version": "0.0.2",
    "mainFile": "index.ts",
    "rootDir": "my-scope/ui/button",
    "nextVersion": {
        "version": "1.0.0",
        "message": "change font",
        "username": "John Doe",
        "email": "john@my-company.com"
    }
},
```

## Soft tags workflow

<Image src="../../static/img/diagrams/soft-tags.png" width="100%"/>

### 1. Suggest a new release version:

```bash
bit tag --soft <component-id>
```

### 2. Commit and push changes

```bash
git add .bitmap
git commit -m "new updates"
git push
```

### 3. Accept new tag suggestions (done by the CI)

```bash
bit tag --persist --all
```

### CLI Reference

- [bit tag](#)
