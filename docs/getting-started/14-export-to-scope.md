---
id: export-to-scope
title: Export Components
---

Exporting components to remote scopes makes them available for other developers to consume. Only components that are tagged can be exported. The tagged version is exported and resides on the remote scope.

## Export Staged Components

Run the `bit export` command to have Bit publish all versioned components. In our case it is only the previously tagged 'Button' component.

```sh
$ bbit export
```

## Browse Remote Components

Now that we have successfully exported two components head back to [bit.dev](https://bit.dev) and see that the **demo** scope your created has both components exported.

## Post Export Operations

When Bit has finished exporting components it updates the `.bitmap` file on the operation. Make sure to track these changes.

```sh
git commit -am 'updated .bitmap file after a successful export'
```
