---
id: vendor-components
title: Vendor Components
---

TODO - info about vendor and why it is good.

### Configure vendor components

Define the location for all vendor components in a project by adding the `vendor` key to the `@teambit.core/workspace` extension.

```json
{
    "@teambit.core/workspace": {
        "vendor": {
            "directory": "vendor"
        }
    }
}
```

### Commit changes to vendor component

You can simply run `git commit` to keep local modification of a vendor component.

### Eject vendor component

If you no longer require to have a specific component as vendor, you can replace it with a node package dependency by running `bit eject`:

```sh
$ bit eject <component>
```

### Update vendor components

To update vendor components you need to run the `bit import` command and then `checkout` the desired update.

```sh
$ bit import
$ bit checkout latest <component>
```

#### Merge local changes with upstream version of vendor component

If you keep a local vendor component in your workspace and that component have been updated by their maintainers, you can `merge` your local modifications with the incoming update.

```sh
$ bit import
$ bit merge latest <component>
```
