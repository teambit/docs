---
id: tracking
title: Tracking
---

The tracking process translates sets of files into a single component that is semantically understood by Bit. It is the first step in a component's journey to complete independency.

When a component gets tracked, Bit does the following:

- It determines which files should be be included in that component (see the result in the .bitmap file)
- It determines the [component ID](/docs/bit-components/overview#component-id)
- It determines the component entry point and its dependency graph
- It creates a package in the node_modules directory

## Tracking components

### Track a single component

```shell
$ bbit add path/to/component
```

For example:

```shell
$ bbit add components/react/button
```

#### Add a namespace

Namespaces are a way to organize components in the Workspace/Remote Scope. In addition to that, namespaces enable an

### Track multiple components

### Set an entry point for a component

## Un-tracking components

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

### Component entry point

The entry point file is the file that is set as the main entry when compiling the file. You can specify the main file using the `--main` flag on the bit add command. If the main file was not specified, Bit is trying to determine the main file as follow:

- If the component has only one file, it will be the main file
- If the component has a file named index with a valid extension like js, ts, tsx etc.
- If the component has a file named similarly to the component folder name with a valid extension as above.

### Test files

You can specify the test files of the component, by preceding their name with the `--tests` flag. Tests files are marked as such.

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
require("@bit/<owner>.<collection>.<namespace>.<component-name>");
```

### Non-existing Dependency Files

When Bit tracks files in your project, it evaluates their dependency tree. If one of the files in the component's dependency tree is not found within your project, Bit throws this isolation error. To resolve this issue, open the file, and ensure that the `import` or `require` statement points to the correct file.

### Missing Links

When Bit installs components, it creates a set of binding files to ensure that all imported component's dependency trees are working correctly. If any of these files is missing, Bit will prompt this isolation error. To fix this, you need to run the `bit link` command. Bit will ensure all link files are in place.
