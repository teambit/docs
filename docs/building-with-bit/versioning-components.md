--- 
id: versioning-components
title: Versioning
--- 

## Versioning

When we version or 'tag' a component, we commit changes and prepare it to be exported to a remote scope. This process most often includes compiling and testing, as well.

## Version CLI commands

### Tag a component

```shell
bit tag <component-id> <new-version>
```

For example:

```shell
bit tag ui-primitives/button 1.0.0
```

#### Tag a component with a message

```shell
bit tag <component-id> <new-version> --message "this is the tag message"
```

### Tag all components in the workspace

Tag all components and bump the patch number of each component version

```shell
bit tag --all
```

### Soft and hard tags: component collaboration

When collaborating on components it is not advisable to tag a new component release version locally, but instead to have it done by the CI.

The process:

1. Tag a component using the `--soft` option. This will not create a new release version but will update the `.bitmap` file to suggest a new version.

```shell
bit tag --soft <component-id>
```

2. Commit changes made to the `.bitmap` file (the previous version update suggestion) and push to the remote repository.

3. Have the CI run the following command to tag all components suggested to be versioned (suggested by the previous 'soft tag')

```shell
bit tag --persist --all
```

### Untag a component

To untag our a component run the following:

```shell
bit untag <component-id>
```

### List all 'tagged' components

'tagged' or versioned components are components stored in your local scope.

```shell
bit list
```

Example output:

```shell
  ┌──────────────────────────────────────────────────────────────────────┬─────────┬─────────┐
  │ component ID                                                         │ local   │ used    │
  │                                                                      │ version │ version │
  ├──────────────────────────────────────────────────────────────────────┼─────────┼─────────┤
  │ button                                                               │ 1.0.0   │ 1.0.0   │
  └──────────────────────────────────────────────────────────────────────┴─────────┴─────────┘
```



## Actions executed by the 'tag' command

### 1. Runs the environment's 'build pipeline'

The 'build pipeline' is a series of tasks defined by the environment. In our case, we've set all our components to use the React environment which has, as a default, two tasks in its build pipeline:

1. Compile (using the React environment compiler)
2. Test (using the React environment tester)

If any of the build pipeline's tasks fail, the tagging is aborted.

> As with any other service provided by the environment, the 'build pipeline' can too be extended and customized.

### 2. Sets a new version for the tagged component

Bit's versioning follows the common semantic structure of [major].[minor].[patch]. As a default, if a version number was not included in the tag command, Bit will bump the patch number.

### 3. Tags all components that are dependant on this component

Bit makes sure to run the tagging process on every component affected by the modified (versioned) component. As mentioned earlier, that process also includes compiling and testing. This process let's us know immediately when another component breaks due to that change.

To see a diagram of the dependencies in your workspace or scope, take a look at the 'Dependencies' tab (in the Workspace UI/ Remote Scope)

### 4. Locks any further changes to that version and stores it in the local scope

> The above example uses the `--persist` flag to perform a 'hard tag'. In most cases, you would not want to commit changes (and later on, export) components directly from your local environment. It is usually preferable to use 'soft tag' to **propose** a new version and let your CI set a new version with the committed changes (using 'hard tag')
>
> ```shell
> // soft-tag
> bit tag <component-id>
> ```
