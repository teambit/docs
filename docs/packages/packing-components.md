---
id: packing-components
title: Packing Components
---

Component packages are generated during execution of the Component [Build Pipeline](/builder/build-pipeline) and persisted as Artifacts on the Component version.

Tagging or snapping a component will result in a newly generated package for the Component.

```bash

```

The generated artifact can be viewed with the `bit artifacts` command.

```bash

```

:::note
Bit Cloud uses the associated Package artifact to serve Component Packages from the Component Registry. If you are not using Bit Cloud please make sure to [publish your component to a CommonJS registry](/packages/publishing-to-commonjs-registries)
:::

Generating a component package for any purpose is as simple as using the `bit pack` command in the Workspace.

```shell
bit pack <component-id>
```

Overrides the existing TAR file (in the same location):

```shell
bit pack <component-id> --override

bit pack <component-id> -o
```

Returns the output in a JSON format:

```shell
bit pack <component-id> --json

bit pack <component-id> -j
```
