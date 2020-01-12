---
id: cli-all  
title: CLI Commands   
---

Commands that are marked as workspace only must be executed inside a workspace. Commands that are marked as not workspace only, can be executed from anywhere and will run on a remote server.  
## add  

**Alias**: `a`  
**Workspace only**: yes  
**Description**: add any subset of files to be tracked as a component(s)  
  all flags support glob patterns and {PARENT} {FILE_NAME} annotations   
  https://docs.bit.dev/docs/add-and-isolate-components  

`bit add [path...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--id <name>`|`-i`|manually set component id|
|`--main <file>`|`-m`|define entry point for the components|
|`--tests <file>/"<file>,<file>"`|`-t`|specify test files to track. use quotation marks to list files or use a glob pattern|
|`--namespace <namespace>`|`-n`|orginize component in a namespace|
|`--exclude <file>/"<file>,<file>"`|`-e`|exclude file from being tracked. use quotation marks to list files or use a glob pattern|
|`--override <boolean>`|`-o`|override existing component if exists (default = false)|

---  

## build  

**Workspace only**: yes  
**Description**: build any set of components with a configured compiler (as defined in bit.json)  
  https://docs.bit.dev/docs/building-components  

`bit build [id]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--verbose [boolean]`|`-v`|showing npm verbose output for inspection|
|`--no-cache`|`-c`|ignore component cache when creating dist file|

---  

## checkout  

**Alias**: `U`  
**Workspace only**: yes  
**Description**: switch between component versions or remove local changes  
  bit checkout <version> [ids...] => checkout the specified ids (or all components when --all is used) to the specified version  
  bit checkout latest [ids...] => checkout the specified ids (or all components when --all is used) to their latest versions  
  bit checkout [ids...] --reset => remove local modifications from the specified ids (or all components when --all is used)  
  you can use a pattern for multiple ids, such as bit checkout 0.0.1 "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit checkout [values...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--interactive-merge`|`-i`|when a component is modified and the merge process found conflicts, display options to resolve them|
|`--ours`|`-o`|in case of a conflict, override the used version with the current modification|
|`--theirs`|`-t`|in case of a conflict, override the current modification with the specified version|
|`--manual`|`-m`|in case of a conflict, leave the files with a conflict state to resolve them manually later|
|`--reset`|`-r`|remove local changes|
|`--all`|`-a`|all components|
|`--verbose`|`-v`|showing verbose output for inspection|
|`--skip-npm-install`|`   `|do not install packages of the imported components|
|`--ignore-package-json`|`   `|do not generate package.json for the imported component(s). (it automatically enables skip-npm-install and save-dependencies-as-components flags)|
|`--conf [path]`|`   `|write the configuration file (bit.json) and the envs configuration files (use --conf without path to write to the default dir)|
|`--ignore-dist`|`   `|do not write dist files (when exist)|

---  

## clear-cache  

**Alias**: `cc`  
**Workspace only**: no  
**Description**: clears bit's cache from current working machine  
  https://docs.bit.dev/docs/workspace#cache  

`bit clear-cache`  

---  

## config  

**Workspace only**: yes  
**Description**: global config management.  
  https://docs.bit.dev/docs/conf-config  

`bit config`  

### set 
**Usage**: set \<key\> \<val\>  

**Description**: set a global configuration  


### del 
**Usage**: del \<key\>  

**Description**: delete given key from global configuration  


### get 
**Usage**: get \<key\>  

**Description**: get a global configuration  


### list 
**Usage**: list  

**Description**: list all configuration(s)  


---  

## deprecate  

**Alias**: `d`  
**Workspace only**: no  
**Description**: deprecate a component (local/remote)  

`bit deprecate <ids...>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--remote [boolean]`|`-r`|deprecate a component from a remote scope|

---  

## diff  

**Workspace only**: yes  
**Description**: show diff between components files  
  bit diff => compare all modified components to their model version  
  bit diff [ids...] => compare the specified components against their modified states  
  bit diff [id] [version] => compare the specified version to used or modified files  
  bit diff [id] [version] [to_version] => compare the specified version files to to_version files  
  you can use a pattern for multiple ids, such as bit diff "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit diff [values...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--verbose`|`-v`|show a more verbose output when possible|

---  

## doctor  

**Workspace only**: yes  
**Description**: diagnose a bit workspace  

`bit doctor [diagnosis-name]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--json`|`-j`|return diagnoses in json format|
|`--list`|`   `|list all available diagnoses|
|`--save [filePath]`|`-s`|save diagnoses to a file|

---  

## eject  

**Workspace only**: yes  
**Description**: ejecting components configuration  

`bit eject-conf [id]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--path <path>`|`-p`|ejecting configuration into a specific directory|

---  

## export  

**Alias**: `e`  
**Workspace only**: yes  
**Description**: export components to a remote scope.  
  bit export <remote> [id...] => export (optionally given ids) to the specified remote  
  bit export current [id...] => export (optionally given ids) to their current scope  
  bit export => export all staged components to their current scope  
  https://docs.bit.dev/docs/export  
  you can use a pattern for multiple ids, such as bit export remote-scope "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit export [remote] [id...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--eject`|`-e`|replaces the exported components from the local scope with the corresponding packages|
|`--all`|`-a`|export all components include non-staged|
|`--include-dependencies`|`-d`|EXPERIMENTAL. include the component's dependencies as part of the export to the remote scope|
|`--set-current-scope`|`-s`|EXPERIMENTAL. ensure the component's remote scope is set according to the target location|
|`--rewire`|`-r`|EXPERIMENTAL. when exporting to a different scope, replace import/require statements in the source code to the new scope|
|`--force`|`-f`|force changing a component remote without asking for a confirmation|

---  

## graph  

**Workspace only**: yes  
**Description**: EXPERIMENTAL. generate an image file with the dependencies graph  

`bit graph [id]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--image <image>`|`-i`|image path. use one of the following extensions: [gif, png, svg, pdf]|
|`--remote [remoteName]`|`-r`|remote name (name is optional, leave empty when id is specified)|
|`--all-versions`|`   `|enter all components versions into the graph, not only latest|
|`--layout <name>`|`   `|GraphVis layout. default to "dot". options are [circo, dot, fdp, neato, osage, patchwork, sfdp, twopi]|

---  

## import  

**Alias**: `i`  
**Workspace only**: yes  
**Description**: import components into your current workspace.  
  https://docs.bit.dev/docs/sourcing-components  
  you can use a pattern for multiple ids, such as bit import "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit import [ids...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--tester`|`-t`|import a tester environment component|
|`--compiler`|`-c`|import a compiler environment component|
|`--extension`|`-x`|import an extension component|
|`--environment`|`-e`|install development environment dependencies (compiler and tester)|
|`--path <path>`|`-p`|import components into a specific directory|
|`--objects`|`-o`|import components objects only, don't write the components to the file system. This is a default behavior for import with no id|
|`--display-dependencies`|`-d`|display the imported dependencies|
|`--override`|`-O`|override local changes|
|`--verbose`|`-v`|showing verbose output for inspection|
|`--json`|`-j`|return the output as JSON|
|`--ignore-dist`|`   `|skip writing the component's build files during import|
|`--conf [path]`|`   `|write the configuration file (bit.json) and the envs configuration files (use --conf without path to write to the default dir)|
|`--skip-npm-install`|`   `|do not install packages of the imported components. (it automatically enables save-dependencies-as-components flag)|
|`--ignore-package-json`|`   `|do not generate package.json for the imported component(s). (it automatically enables skip-npm-install and save-dependencies-as-components flags)|
|`--merge [strategy]`|`-m`|merge local changes with the imported version. strategy should be "theirs", "ours" or "manual"|
|`--dependencies`|`   `|EXPERIMENTAL. import all dependencies and write them to the workspace|
|`--dependents`|`   `|EXPERIMENTAL. import component dependents to allow auto-tag updating them upon tag|

---  

## init  

**Workspace only**: no  
**Description**: initialize an empty bit scope  
  https://docs.bit.dev/docs/workspace  

`bit init [path]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--bare [name]`|`-b`|initialize an empty bit bare scope|
|`--shared <groupname>`|`-s`|add group write permissions to a scope properly|
|`--standalone [boolean]`|`-T`|do not nest component store within .git directory and do not write config data inside package.json|
|`--reset`|`-r`|write missing or damaged Bit files|
|`--reset-hard`|`   `|delete all Bit files and directories, including Bit configuration, tracking and model data. Useful for re-start using Bit from scratch|
|`--compiler <compiler>`|`-c`|set up compiler|
|`--tester <tester>`|`-t`|set up tester|
|`--default-directory <default-directory>`|`-d`|set up default directory to import components into|
|`--package-manager <package-manager>`|`-p`|set up package manager (npm or yarn)|
|`--force`|`-f`|force workspace initialization without clearing local objects|
|`--interactive`|`-I`|EXPERIMENTAL. start an interactive process|

---  

## install  

**Workspace only**: yes  
**Description**: Installs all dependencies for all the sourced components (or for a specific one), whether they were defined in your package.json or in each of the sourced components, and links them.   
  https://docs.bit.dev/docs/installing-components  

`bit install [ids...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--verbose`|`-v`|show a more verbose output when possible|

---  

## link  

**Alias**: `b`  
**Workspace only**: yes  
**Description**: generate symlinks for sourced components absolute path resolution.  
  https://docs.bit.dev/docs/dependencies#missing-links  

`bit link`  

---  

## list  

**Alias**: `ls`  
**Workspace only**: no  
**Description**: list components on a local or a remote scope.  
  https://docs.bit.dev/docs/view#list  

`bit list [scope]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--ids`|`-ids`|show only component ids unformatted|
|`--scope`|`-s`|show all components of the scope, including indirect dependencies|
|`--bare`|`-b`|DEPRECATED. use --raw instead|
|`--raw`|`-r`|show raw output (only components ids, no styling)|
|`--outdated`|`-o`|show latest versions from remotes|
|`--json`|`-j`|show the output in JSON format|
|`--namespace <string>`|`-n`|show only specified namespace by using wildcards|

---  

## log  

**Workspace only**: no  
**Description**: show components(s) tag history.  
  https://docs.bit.dev/docs/view#log  

`bit log <id>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--remote`|`-r`|show log of a remote component|

---  

## login  

**Workspace only**: no  
**Description**: log the CLI into Bit  

`bit login`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--port <port>`|`-p`|port number to open for localhost server (default 8085)|
|`--suppress-browser-launch`|`   `|do not open a browser for authentication|
|`--npmrc-path <path>`|`   `|path to npmrc file to configure bit.dev registry|
|`--skip-registry-config [boolean]`|`   `|don't configure bit.dev registry|
|`--machine-name <string>`|`   `|specify machine-name to pair with the token (useful for CI to avoid accidentally revoke the token)|

---  

## logout  

**Workspace only**: yes  
**Description**: log the CLI out of Bit  

`bit logout`  

---  

## merge  

**Workspace only**: yes  
**Description**: merge changes of different component versions  
  you can use a pattern for multiple ids, such as bit merge 0.0.1 "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit merge <version> <ids...>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--ours`|`-o`|in case of a conflict, override the used version with the current modification|
|`--theirs`|`-t`|in case of a conflict, override the current modification with the specified version|
|`--manual`|`-m`|in case of a conflict, leave the files with a conflict state to resolve them manually later|

---  

## move  

**Alias**: `mv`  
**Workspace only**: yes  
**Description**: move files or directories of component(s)  
  https://docs.bit.dev/docs/add-and-isolate-components#moving-and-renaming-files  

`bit move <from> <to>`  

---  

## remote  

**Workspace only**: yes  
**Description**: manage set of tracked bit scope(s)  
  https://docs.bit.dev/docs/bit-server#working-with-remote-scopes  

`bit remote`  

### add 
**Usage**: add \<url\>  

**Description**: add a tracked bit remote  


### del 
**Usage**: del \<name\>  

**Description**: remove a tracked bit remote  


| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--global`|`-g`|see globally configured remotes|

---  

## remove  

**Alias**: `rm`  
**Workspace only**: no  
**Description**: remove a component (local/remote)  
  https://docs.bit.dev/docs/removing-components  
  you can use a pattern for multiple ids, such as bit remove "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit remove <ids...>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--remote`|`-r`|remove a component from a remote scope|
|`--track [boolean]`|`-t`|keep tracking component (default = false)|
|`--delete-files [boolean]`|`-d`|delete local component files (authored components only. for imported components the files are always deleted)|
|`--force [boolean]`|`-f`|removes the component from the scope, even if used as a dependency. WARNING: components that depend on this component will corrupt|
|`--silent [boolean]`|`-s`|skip confirmation|

---  

## show  

**Workspace only**: no  
**Description**: show component overview.  
 https://docs.bit.dev/docs/view#show  

`bit show <id>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--json`|`-j`|return a json version of the component|
|`--remote`|`-r`|show a remote component|
|`--versions`|`-v`|return a json of all the versions of the component|
|`--outdated`|`-o`|show latest version from the remote scope (if exists)|
|`--compare [boolean]`|`-c`|compare current file system component to latest tagged component [default=latest]|
|`--detailed`|`-d`|show more details|
|`--dependents`|`   `|EXPERIMENTAL. show all dependents recursively|
|`--dependencies`|`   `|EXPERIMENTAL. show all dependencies recursively|

---  

## status  

**Alias**: `s`  
**Workspace only**: yes  
**Description**: show the working area component(s) status.  
  https://docs.bit.dev/docs/view#status  

`bit status`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--json`|`-j`|return a json version of the component|

---  

## tag  

**Alias**: `t`  
**Workspace only**: yes  
**Description**: record component changes and lock versions.  
  https://docs.bit.dev/docs/tag-component-version  
  you can use a pattern for multiple ids, such as bit tag "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit tag [id] [version]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--message <message>`|`-m`|log message describing the user changes|
|`--all [version]`|`-a`|tag all new and modified components|
|`--scope <version>`|`-s`|tag all components of the current scope|
|`--patch`|`-p`|increment the patch version number|
|`--minor`|`-mi`|increment the minor version number|
|`--major`|`-ma`|increment the major version number|
|`--force`|`-f`|force-tag even if tests are failing and even when component has not changed|
|`--verbose`|`-v`|show specs output on failure|
|`--ignore-missing-dependencies`|`   `|DEPRECATED. use --ignore-unresolved-dependencies instead|
|`--ignore-unresolved-dependencies`|`-i`|ignore missing dependencies (default = false)|
|`--ignore-newest-version`|`-I`|ignore existing of newer versions (default = false)|
|`--skip-tests`|`   `|skip running component tests during tag process|
|`--skip-auto-tag`|`   `|EXPERIMENTAL. skip auto tagging dependents|

---  

## test  

**Workspace only**: yes  
**Description**: test any set of components with a configured tester as defined in bit.json (by default applies only on modified components)  
  https://docs.bit.dev/docs/testing-components)  

`bit test [id]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--all`|`-a`|test all components in your workspace, including unmodified components|
|`--verbose`|`-v`|showing npm verbose output for inspection and prints stack trace|
|`--json`|`-j`|return results in json format|
|`--fork-level <forkLevel>`|`   `|NONE / ONE / COMPONENT how many child process create for test running|

---  

## undeprecate  

**Workspace only**: no  
**Description**: undeprecate a deprecated component (local/remote)  

`bit undeprecate <ids...>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--remote [boolean]`|`-r`|undeprecate a component from a remote scope|

---  

## untag  

**Workspace only**: yes  
**Description**: revert version(s) tagged for component(s)  
  https://docs.bit.dev/docs/tag-component-version#untagging-components  
  you can use a pattern for multiple ids, such as bit untag "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit untag [id] [version]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--all`|`-a`|revert tag for all tagged components|
|`--force`|`-f`|revert the tag even if used as a dependency. WARNING: components that depend on this tag will corrupt|

---  

## untrack  

**Alias**: `u`  
**Workspace only**: yes  
**Description**: untrack a new component(s)  
  https://docs.bit.dev/docs/add-and-isolate-components#untracking-components  
  you can use a pattern for multiple ids, such as bit untrack "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit untrack [ids...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--all`|`-a`|revert add for all tracked components|

---  

## watch  

**Alias**: `w`  
**Workspace only**: yes  
**Description**: watch components and perform `build` on changes  

`bit watch`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--verbose`|`-v`|showing npm verbose output for inspection|

---  
