---
id: add-and-isolate-components
title: Tracking 
---

## Tracking Components

Tracking is the step that converts a set of source files in a repository into a component that is semantically understood by Bit. The [bit add](/docs/apis/cli-all#add) command is used to track sets of files as components and start the component isolation process. it analyzes the source files to build the component's [dependencies](/docs/dependencies).  Tracking a component adds it to the [components map](/docs/workspace#components-map) in the workspace. The component is considered an "authored" component.  

### Process

When tracking a component Bit does the follow:  
Calculate all the files to be included in the component.  

- Exclude the following files:  `package.json`, `bit.json`, `node_modules`, `yarn.lock`, `package-lock.json`, `.gitignore`, `.bit.map.json` and `.bitmap` and files ignored in the `.gitignore` file, if available.
- Calculate the ID of the component.
- Calculate the entry point of the component and build the dependency graph for both external dependencies (npm packages) as described [here](/docs/dependencies) and internal Bit components.

When tracking a component, Bit verifies that it can resolve all dependencies. Bit reports any errors during the tracking process. The [`bit status`](/docs/apis/cli-all#status) command also shows any errors during the tracking of a component.  

### Rules

When tracking components in Bit, these rules apply:  

- Bit tracks each file inside a single component
- All the files belong to the same component should reside under a single directory. Check [here] for explanation. Expel this restriction using the `--allow-files` flag during `bit add`. (starting version 15)
Each component is assigned with a full component id based on its target remote scope and its name. (starting version 15)
- Referencing files tracked by other components is with the component name. Referencing components by relative paths such as `../..component/file` errs. Expel this restriction by using the `--allow-relative` flag during add(starting version 15)
- Do not track package.json files as they collide with the Bit auto-generated package files.  

### Best Practices

Here are some recommendations on how to track components:  

- Specify a scope default name in the workspace configuration, so all components are available to be consumed with this Id
- Start tracking components bottom-up, so all components that are shared by other components are [tracked first](/docs/best-practices#publish-shared-files-as-bit-components).  
- Plan and arrange components in [namespaces](/docs/best-practices#use-namespaces) according to their functionality, similar to the way you would arrange them in folders in a project.
- Ensure all component files are located in a single folder.  
- Review the package.json in your original projects to ensure proper definition of dependencies.  
- If you are using path aliases in your `import` statements, make sure you define Bit's [custom paths resolution](/docs/dependencies#custom-paths) configuration.

### Component id

Each component has a unique identifier. The unique identifier is compound as follow: `<remote scope>/<namespace(s)>/<local name>`.  
The remote scope is part of the workspace configuration.  
Set namespaces with the `--namespace` flag or by specifying the full path in the component name such as `--id space/space/name`.
Bit sets by default the component name to the folder name. To change it, specify a different name with the `--id name` when adding the component.  

## Tracking files

To track a single component, use the `bit add` command and specify the path to the folder of the component.  
![add single](https://storage.googleapis.com/static.bit.dev/docs/gifs/add.gif)

To track multiple components, use the `bit add` command and specify the root folder. Bit adds each folder as a separate component.  
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

```bash
bit add src/foo.js --id foo/bar
```

To explicitly remove files from the component, [exclude the files](#excluding-files).  

When moving and renaming files, Bit cannot always identify the changes. To ensure Bit tracks moved files use [bit move](/docs/apis/cli-all#move), This command is similar to [git mv](https://git-scm.com/docs/git-mv):  

```bash
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

```bash
bit untrack hello/world
```

You can also untrack multiple components by specifying their ids:  

```bash
bit untrack foo/bar foo/baz
```

To track all the newly added component use the `--all` flag:  

```bash
bit untrack --all
```

## Tracking files across directories

Previous versions of Bit supported tracking components that had their files spread across different folders. E.g. the source code was located under `src/components` and the tests under `src/tests/`. Starting version 15 this is considered an anti pattern. However, for backward compatibility this option is still supported. To create a component with files from various location, use the `--allow-files` when initiating the component.  

When working with allow-files, it is also possible to exclude files not to be tracked by Bit. In directory only mode, this option is no longer available. To exclude files, specify the `--exclude` flag on the add command following by a file name, file names or file patterns.

```bash
bit add src/component/* --namespace user --exclude bad-file.js
```
