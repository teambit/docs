---
id: add-and-isolate-components
title: Tracking
---

## Tracking Components

Tracking is the step that converts a set of source files in a repository into a component that is semantically understood by Bit. The [bit add](/docs/apis/cli-all#add) command defines sets of files as components and start the component isolation process. The command analyzes the source files to build the component's [dependencies](/docs/dependencies). Tracking a component adds it to the [components map](/docs/workspace#components-map) in the workspace. The component is considered an "authored" component inside this workspace.

### Process

When tracking a component Bit does the following:

- Calculate all the files to be included in the component.
- Exclude the following files: `package.json`, `bit.json`, `node_modules`, `yarn.lock`, `package-lock.json`, `.gitignore`, `.bit.map.json` and `.bitmap` and files ignored in the `.gitignore` file, if available.
- Calculate the ID of the component.
- Calculate the entry point of the component and build the dependency graph for both external dependencies (npm packages) as described [here](/docs/dependencies) and internal Bit components.
- Verify that all required files are tracked inside a component (this component or another one).
- Verify that each file is only tracked by a single component (a file cannot be tracked by multiple components).

> Starting upcoming version, the rules bellow will also apply, so we suggest tracking components according to them to avoid future problems:

- All the files belong to the same component should reside under a single directory.
- Referencing files tracked by other components is with the component name only and not by relative paths or aliases.

The [`bit status`](/docs/apis/cli-all#status) command also shows any errors during the tracking of a component.

### Best Practices

Here are some recommendations on how to track components:

- Track each component as a single folder. Folder components lets bit track the whole folder, and you can make changes to the files in the component while Bit is still tracking them.
- Start tracking components bottom-up, so all components that are shared by other components are [tracked first](/docs/best-practices#publish-shared-files-as-bit-components).
- Plan and arrange components in [namespaces](/docs/best-practices#use-namespaces) according to their functionality, similar to the way you would arrange them in folders in a project.
- Ensure all component files are located in a single folder.
- Review the package.json in your original projects to ensure proper definition of dependencies.
- If you are using path aliases in your `import` statements, make sure you define Bit's [custom paths resolution](/docs/dependencies#custom-paths) configuration.

### Component id

Each component has a unique identifier. The unique identifier is compound as follow: `<remote scope>/<namespace(s)>/<local name>`.  
Set namespaces with the `--namespace` flag or by specifying the full path in the component name such as `--id space/space/name`.
Bit sets by default the component name to the folder name. To change it, specify a different name with the `--id name` when adding the component.

## Tracking files

To track a single component, use the `bit add` command and specify the path to the folder or files of the component. (See comment above regarding tracking files in different folders).

```shell
$ bit add src/components/button
```

![add single](https://storage.googleapis.com/static.bit.dev/docs/gifs/add.gif)

To track multiple components, use the `bit add` command and specify the root folder and `/*`. Bit adds each folder as a separate component.

```shell
bit add src/components/*
```

![add multiple](https://storage.googleapis.com/static.bit.dev/docs/gifs/add-multiple.gif)

### Component entry point

The entry point file is the file that is set as the main entry when compiling the file. You can specify the main file using the `--main` flag on the bit add command. If the main file was not specified, Bit is trying to determine the main file as follow:

- If the component has only one file, it will be the main file
- If the component has a file named index with a valid extension like js, ts, tsx etc.
- If the component has a file named similarly to the component folder name with a valid extension as above.

### Test files

You can specify the test files of the component, by preceding their name with the `--tests` flag. Tests files are marked as such.

### Manage component's files

When a folder is tracked by Bit, Bit detects any changes to the files such as adding or removing files and updates the component's tracked files accordingly.  
To explicitly add files to the component, use the component's id:

```shell
bit add src/foo.js --id foo/bar
```

> The exclude flag is going to be deprecated.
> Use the `--exclude` flag to mark files located in the folder but are not part of the component.

When moving and renaming files outside the component folder, Bit cannot always identify the changes. To ensure Bit tracks moved files use [bit move](/docs/apis/cli-all#move). The command is similar to [git mv](https://git-scm.com/docs/git-mv):

```shell
# Move file to a new location
bit move src/foo/bar/index.js src/components/new/location/index.js

# Rename a file
bit move src/foo/bar/index.js src/foo/bar/new-name.js

# Move a folder that's part of a tracked component to a new location
bit move src/foo src/components/new/location/foo
```

## Untracking components

Adding component action can be reverted using the [bit untrack](/docs/apis/cli-all#untrack) command. You can only untrack new components. A component that is already tagged or exported, and imported components can be only [removed](/docs/removing-components).

To untrack a single component:

```shell
bit untrack hello/world
```

You can also untrack multiple components by specifying their ids:

```shell
bit untrack foo/bar foo/baz
```

To track all the newly added component use the `--all` flag:

```shell
bit untrack --all
```

## Common Isolation Errors

Here are some common errors and their resolution when trying to isolate a component. Run `bit status` to check the status of components dependency resolution.

### Untracked Dependencies

When a component is importing local files (i.e. files with relative paths), Bit is attempting to find the components where those files exist. If the file is not yet tracked by any other components, Bit notifies about an untracked dependency.  
Handling these files can be in one of two manners:

- Add the file(s) as dependency to the same component.
- Add the file(s) as new components.

The decision between those two options is mostly contextual. Files that are shared between multiple components should reside as a separate component. Files that are local to the component, such as local styles, should be part of the same component.

To add a file to the component run:

```shell
bit add <filename> --id <component id>
```

To add files as new component, use the [`bit add`](/docs/apis/cli#add) command. Bit automatically detects that the component was created and shows the updated status.

### Missing package dependencies

This error may occur in the following cases:

- Some of the project's package dependencies are not installed
- The project is using a Custom Module Definition, or `NODE_PATH` environment variable in your project and Bit is unaware of that.

As described [above](#package-dependencies), Bit has different strategies to determine a package dependency version. If all of them fail, Bit prompts to install the missing package dependencies.  
Use your package manager of choice to resolve the issue.

```shell
npm install
```

Alternatively, Bit issues a `missing package dependency` error for tracked components, in a project, that have file dependencies to absolute paths, using Custom Module Definition feature. See here how to configure Bit with your project's [custom paths resolution](/docs/dependencies#custom-paths).

### Components with Relative Import Statements

Bit expects the dependency tree of components to be defined using absolute `require` or `import` statements. This is because Bit create and manage a set of link files (bindings) between imported components. So when you are using an imported component from another tracked component, or modifying an imported component, and adding an `import` statement to another imported component, Bit will trigger this isolation issue.

In order to resolve this, you need to understand that Bit creates a link file for each of the project's imported component within the `node_modules` directory. This allows you to require a component just as you would require a Bit package dependency with the same name, as [shown here](/docs/installing-components.html#package-naming-convention).

To resolve this issue you will need to refactor the `import` or `require` statement in your code to the component dependencies, using Bit's package naming convention, and save the changes.

```javascript
require('@bit/<owner>.<scope>.<namespace>.<component-name>');
```

### Non-existing Dependency Files

When Bit tracks files in your project, it evaluates their dependency tree. If one of the files in the component's dependency tree is not found within your project, Bit throws this isolation error. To resolve this issue, open the file, and ensure that the `import` or `require` statement points to the correct file.

### Missing Links

When Bit installs components, it creates a set of binding files to ensure that all imported component's dependency trees are working correctly. If any of these files is missing, Bit will prompt this isolation error. To fix this, you need to run the `bit link` command. Bit will ensure all link files are in place.
