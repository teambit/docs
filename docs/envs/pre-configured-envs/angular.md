---
id: angular
title: Angular
---


```bash
mkdir my-workspace && cd my-workspace
bit init
```

To use the Angular environment, you first need to check what is the latest version available:

```bash
npm dist-tag ls @teambit/angular-v12
```

Then add the following lines in your workspace.jsonc file to apply the Angular development environment on all components in this workspace (replace x.x.x by the latest version available):

```bash
"teambit.angular/angular-v12@x.x.x": {},
"teambit.workspace/variants": {
"*": {
  // Replace `v12` by the version of Angular that you want to use
  "teambit.angular/angular-v12@x.x.x": { }
}
},
"teambit.generator/generator": {
"aspects": [
  // Replace `v12` by the version of Angular that you want to use
  "teambit.angular/angular-v12"
]
}
```

```bash
bit install
bit start
```