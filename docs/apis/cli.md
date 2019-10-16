---
id: cli
title: CLI Commands
sidebar_label: CLI Commands
---

Bit cli commands

Commands that are marked as workspace only must be executed inside a workspace. Commands that are marked as not workspace only, can be executed from anywhere and will run on a remote server.

---

## add

alias: `a`  
Workspace only: yes

`bit add <files | directory | pattern >`
Tracks any set of files as a single or multiple components. Specify a set of files, or a glob pattern of all the files to be added. Check [tracking components](//todo).

**Track a single file as component**:  

```bash
bit add src/foo/bar.js
```

**Track multiple components**:

```bash
bit add src/foo/bar.js src/utils/connect.js
```

**Track a whole directory as a single component**:

```bash
bit add src/foo/
```

**Track each sub directory as a component**:

```bash
bit add src/**/
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--id <id>` | `-i` | Component's ID of the files added
|`--main <file>` | `-m` | The component entry point
|`--tests <tests>` | `-t-` | Specify a test file, test files directory, or tests path
|`--namespace <namespace>` | `-n` | Add multiple components to the same namespace
|`--exclude <file...>` | `-e` | exclude files, directory or patterns
|`--override <true>`  | `-o` | override existing components. default = false

---

## build

Workspace only: yes

`bit build [id]`

Build the component with the default or specified compiler. Default compiler is defined in the bit configuration(//todo).  
Build command is automatically performed before a component is tagged. Building a component may change the component if its dependencies were changed.

**Build all components**:

```bash
bit build
```

**Build a single component**:

```bash
bit build foo/bar
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--verbose` | `-v` | Show verbose output
|`--no-cache` | `-c` | Ignore component build files cache

---

## config

Workspace only: no.  

---

## checkout

alias: `c`
Workspace only: yes

Merge the version of the sourced component(s) to your workspace

`bit checkout <version|latest> <component id...>`

Replace the working files of the component(s) with the specified version's incoming files. This will perform a `git merge` on the files, unless reset was requested.

Checkout a single component:

```bash
bit checkout 0.0.3 foo/bar
```

Checkout multiple components to latest version:

```bash
bit checkout latest foo/bar sun/moon
```

Checkout all incoming components to the version:

```bash
bit checkout 0.0.3 --all
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--interactive-merge` | `-i` | Display options to resolve conflicts with merged files of the components
|`--ours` | `-o` | Override conflicting files with the current version's files
|`--theirs` | `-t` | Override conflicting files with the version's files
|`--manual` | `-m` | leave the files in conflicted stage for later resolution
|`--reset` | `-r` | Remove local changes and apply version's changes
|`--all` | `-a` | Checkout all imported components
|`--verbose` | `-v` | Show verbose output
|`--skip-npm-install` | | Do not install npm packages for imported components.
|`--ignore dist` |  | Do not write dist files for incoming components

---

## deprecate

alias: `d`  
Workspace only: no. Can deprecate a remote component without a workspace.

`bit deprecate <Ids...>`  
Marks a local or a remote component as deprecated

Mark local component as deprecated:

```bash
bit deprecate foo/bar
```

Mark remote component as deprecated:

```bash
bit deprecate me.collection/foo/bar --remote
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--remote` | `-r` | deprecate a component from a remote collection

---

## diff

Workspace only: yes

`bit diff <Ids...> [version version]`

Show differences between components' files locally. Rum `bit import` to get versions from the remote collection.  
Compare all the component in working directory to their latest version in local workspace:

```bash
bit diff
```

Compare a single component in working directory to local scope:

```bash
bit diff me.collection/foo/bar
```

Compare the component in working directory to the specified version in local workspace:

```bash
bit diff me.collection/foo/bar 1.0.0
```

Compare between two specific versions of a component in local workspace:

```bash
bit diff me.collection/foo/bar 1.0.0 2.0.0
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--verbose` | `-v` | Show detailed output

---

## doctor

Workspace only: yes

`bit doctor`

Run diagnosis on your workspace, to view errors and fixing hints. Send output to maintainers for help with errors resolution.

| **Option** | **Alias** | **Description**
|---|---|---|
|`--save <filename>` | `-s` | save output to filename
|`--json` | `-j` | Return diagnoses in json format
|`--list` | | List all available diagnoses

---

## eject

Workspace only: yes

`bit eject <component Id ...>`
replaces the components from the local scope with the corresponding NPM packages. If code was modified locally, use `--force` to override.

| **Option** | **Alias** | **Description**
|---|---|---|
|`--force` | `-f` | Ignore local version. Eject the components even when they are staged or modified
|`--json` | `-j` | Print the results in JSON format

---

## export

alias: `e`

Workspace only: yes

`bit export <remote> [id...]`
Push staged component(s) to a remote Collection.

**Export all staged components to the same Collection**:

```bash
bit export me.collection
```

**Export a specific component to a Collection**:

```bash
bit export me.collection foo/bar
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--eject` | `-e` | Replaces the exported components from the local scope with the corresponding packages.

---

## import

alias: `i`

Workspace only: yes

`bit import [ids...|pattern][@version]`

Import components into current workspace (//ToDo). Can specify specific component(s) and their versions. The component will be imported to the default location specified in the [configuration](/docs/workspace/#componentsdefaultdirectory).  

**Import latest version of all sourced components**:

```bash
bit import
```

**Import a single component**:

```bash
bit import me.collection/foo/bar
```

**Import an entire collection**:

```bash
bit import me.collection/*
```

**Import an entire namespace in a collection**:

```bash
bit import me.collection/foo/*
```

**Import a single component to a different directory**:

```bash
bit import me.collection/foo/bar
```

**Import components and pass extra arguments to the package installer**:

> Note the double dashes

```bash
bit import -- --production --no-optional
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--tester` | `-t` | Import a tester component
|`--compiler` | `-c` | Import a compiler component
|`--extension`  | `-x` | Import an extension component
|`--environment` | `-e` | Install component's compiler and tester during import.
|`--path path` | `-p` | Import components into a specific directory
|`--objects` | `-o` | Import components objects only, don't write the components to the file system. This is the default behavior for import with no id
|`--display-dependencies` | `-d` | Display the imported dependencies
|`--override` | `-O` | Override local changes in the workspace
|`--verbose` | `-v` | Show verbose output
|`--ignore-dist` | | Skip writing the component's build files during import
|`--conf [path]`| | Write the configuration file (bit.json) and the envs configuration files to the path directory or to the default directory if a path was not provided.
|`--skip-npm-install` | | Do not install packages of the imported components.
|`--ignore-package-json` | | Do not generate package.json for the imported component(s). Will also skip npm install and dependencies-as-components //ToDo
|`--merge [strategy]` |`-m` | Merge imported version into the local workspace and apply the git merging strategy: "theirs", "ours", or "manual". Defaulted to manual

## install

Workspace only: yes

`bit install [id]`

Installs all dependencies for all the imported components (or for a specific one), whether they were defined in your package.json or in each of the sourced components, and links them.

**Install dependencies for all sourced components**:

```bash
bit install
```

**Install dependencies for specific component**:

```bash
bit install foo/bar
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--verbose` | `-v` | Show verbose output

## init

Workspace only: Initiates or Reset a workspace.

`bit init`
Initializes a [bit workspace](docs/concepts#bit-workspace) and create the needed directories. You can specify workspace defaults as parameters. 

**Init a workspace**:

```bash
bit init
```

**Init a bare workspace**:

```bash
bit init --bare
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--bare` | `-b` | Initialize an empty bit bare scope
|`--shared <groupName>` | `-s` | When installing a local server, add the [system group](http://man7.org/linux/man-pages/man5/group.5.html) that will have write permissions to the scope. Any users added to the group will be able to write to the scope.
|`--standalone` | `-T` | Do not create the component scope inside the .git directory and do not write config data inside package.json
|`--reset` | `-r` | Write missing or damaged Bit files. Useful when you have corrupted data
|`--reset-hard` | | Removes Bit completely from a local workspace. Use this in case you want to completely remove Bit from your project. Delete .bitmap, bit.json and .bit.  
|`--force` | `-f` | Force workspace initialization without clearing local objects
|`--compiler <compiler name>` | `-c` | Specifies default compiler to used in the workspace
|`--tester <tester name>` | `-t` | Specifies default tester to use in the workspace
|`--default-directory <directory name>` | `-d` | Specifies up the default directory to which components will be imported
|`--package-manager` | `-p` | Specifies the default package manager to use when installing components

## link

alias: `b` //ToDo  
Workspace only: yes

`bit link`  
[Generates links](//Todo) to the components in the project’s node_modules and to sourced components that are dependencies for other components. This enables importing components and dependencies that are referenced with absolute paths (e.g. ../foo.js).  

**Link all sourced components**:

```bash
bit link
```

## list

alias: `ls`  
Workspace only: no. Can show components on remote collection.  
`bit ls [collection]`  
Shows a list of all available components in a local workspace or a remote Collection.

**List all components in current workspace**:

```bash
bit list
```

**List all components in remote collection**:

```bash
bit list me.collection
```

**List all components in remote collection with the specified ids**:

```bash
bit list me.collection --ids 'bar,foo'
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--ids <ids...>` | `-ids` | Show only components with specified ids
|`--namespace <namespace>` | `-n` | Show only the components in a specific name space
|`--scope` | `-s` | Show all components of the scope, including indirect dependencies
|`--raw` | `-r` | Show raw detailed output
|`--outdated` | `-o` | Show the components versions in local workspace, in local scope and in remote
|`--json` | `-j` | Show the output in JSON format
|`--json` | `-j` | Show the output in JSON format

## log

workspace only: yes

`bit log <id...>`

Shows the component’s tag history.

**Show history for a component**:  

```bash
bit log foo.bar
```

## login

Workspace only: no

`bit login`

Logs into [bit.dev server account](docs/installation#login-to-your-bit-account) and sets the path in npm configuration (`.npmrc`) to point to `bit.dev` registry.

| **Option** | **Alias** | **Description**
|---|---|---|
|`--port` | `-p` | Specify the port number for //ToDo
|`--suppress-browser-launch` |  | Do not open a browser for authentication
|`--npmrc-path` | | Path to `npmrc` file where the `bit.dev` registry will be configured (for `@bit` components)
|`--skip-registry-config` | | Don't add the `bit.dev` registry to the NPM configuration
|`--machine-name <name>` | `-b` | The machine name that will be paired with the token //ToDo

## logout

Workspace only: no  
`bit logout`  
Log out from bit.

## merge

Workspace only: yes

`bit merge <version> <ids...>`
Merge changes of a different component version into local workspace. Component must be imported into workspace. Defaulted to manual display of conflicts.

**Merge single component from specific version**

```bash
bit merge 0.0.1 foo.bar
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--theirs` | `-t` | In case of a conflict, override the current modification with the specified version
|`--ours` | `-o` | In case of a conflict, override the current modification with the local changes
|`--manual` | `-m` | In case of a conflict, display both changes for manual resolution

> Only one of --ours --theirs or --manual can be used.

## move

Alias: `mv`
Workspace only: yes

`bit move <from> <to>`
Moves a file/directory that’s part of a tracked component to a new location. This command will update the components index accordingly.

**Move a single file**

```bash
bit move src/foo/bar/index.js src/components/new/bar/new-index.js
```

**Move a directory**

```bash
bit move src/foo src/new/location/foo
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--theirs` | `-t` | In case of a conflict, override the current modification with the specified version
|`--ours` | `-o` | In case of a conflict, override the current modification with the local changes
|`--manual` | `-m` | In case of a conflict, display both changes for manual resolution

> Only one of `--theirs` `--ours` or `--manual` can be used.

## remote

Workspace only: yes

`bit remote [add <url> | remove <name>]`
Manages [remotes](docs/server) for a specific workspace, or globally.  
>bit.dev is not displayed as a remote

**List all remotes**

```bash
bit remote
```

**Add a remote**

```bash
bit remote add ssh://my-username@my-server:/opt/bit/my-collection
```

**Remove a remote**

```bash
bit remote rm my-collection
```

| **Option** | **Alias** | **Description**
|---|---|---|
|`--global` | `-g` | see globally configured remotes

## remove

alias: `rm`  
Workspace only: no. Can run on remote.

`bit remove <ids...>`

Remove components from local or remote collection

Options:
  -f, --force [boolean]         force remove (default = false)
  -r, --remote                  remove a component from a remote scope
  -t, --track [boolean]         keep tracking component (default = false)
  -d, --delete-files [boolean]  delete local component files (authored components only. for imported components the files are always deleted)
  -s, --silent [boolean]        skip confirmation

| **Option** | **Alias** | **Description**
|---|---|---|
|`--force` | `-f` | force remove (default = false)