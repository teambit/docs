---
id: version
title: Version
---

When we version or 'tag' a component, we "commit" changes and prepare it to be exported to a remote scope. This process usually also includes compiling and testing the tagged component.

## Using the 'tag' command

### Tag a component

We'll version (tag) our previously-created 'Button' component by running the following:

```shell
$ bbit tag --persist button 1.0.0
```
> The above example uses the `--persist` flag to perform a 'hard tag'. In most cases, you would not want to commit changes (and later on, export) components directly from your local environment. It is usually preferable to use 'soft tag' (without the `--persist` flag) to __propose__ a new version and let your CI set a new version with the committed changes (using 'hard tag')

To tag all components in the workspace (and bump the patch number of each component version):

```shell
$ bbit tag --persist --all
```
### Untag a component
To untag our 'Button' component we'll run the following:

```shell
$ bbit untag --persisted button
```
> The above example uses 'hard un-tag' to completely remove this version from the local scope. It is usually preferable to only __propose__ the un-tagging (by removing the `--persisted` flag) and have your CI execute the 'hard un-tagging', to completely remove that component version.

### List all 'tagged' components
'tagged' or versioned components are components stored in your local scope. To list them, run the following:

```shell
$ bbit list
```

```shell
  ┌──────────────────────────────────────────────────────────────────────┬─────────┬─────────┐
  │ component ID                                                         │ local   │ used    │
  │                                                                      │ version │ version │
  ├──────────────────────────────────────────────────────────────────────┼─────────┼─────────┤
  │ button                                                               │ 1.0.0   │ 1.0.0   │
  └──────────────────────────────────────────────────────────────────────┴─────────┴─────────┘
```

### Actions executed by the 'tag' command

#### 1. Runs the environment's 'build pipeline' 
The 'build pipeline' is a series of tasks defined by the environment. In our case, we've set all our components to [use the React environment](bit-basics/choose-dev-env) which has, as a default, two tasks in its build pipeline:
1. Compile (using the React environment compiler)
2. Test (using the React environment tester)

If any of the build pipeline's tasks fail, the tagging is aborted.

> As with any other service provided by the environment, the '[build pipeline](/docs/react/extending-react#overridebuildpipe)' can too be extended and customized.

#### 2. Sets a new version for the tagged component

Bit's versioning follows the common semantic structure of [major].[minor].[patch]. As a default, if a version number was not included in the tag command, Bit will bump the patch number.



#### 3. Tags all components that are dependant on this component

#### 4. Locks any further changes to that version and stores it in the local scope
