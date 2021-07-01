---
id: cli-reference
title: CLI Reference
---

Commands that are marked as workspace only must be executed inside a workspace. Commands that are marked as not workspace only, can be executed from anywhere and will run on a remote server.
## init  

**Workspace only**: no  
**Description**: initialize an empty bit scope  
  https://docs.bit.dev/docs/workspace  

`bit init [path]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--bare [name]`|`-b`|initialize an empty bit bare scope|
|`--shared <groupname>`|`-s`|add group write permissions to a scope properly|
|`--standalone`|`-T`|do not nest component store within .git directory and do not write config data inside package.json|
|`--reset`|`-r`|write missing or damaged Bit files|
|`--reset-new`|`   `|reset .bitmap file as if the components were newly added and remove all model data (objects)|
|`--reset-hard`|`   `|delete all Bit files and directories, including Bit configuration, tracking and model data. Useful for re-start using Bit from scratch|
|`--default-directory <default-directory>`|`-d`|set up default directory to import components into|
|`--package-manager <package-manager>`|`-p`|set up package manager (npm or yarn)|
|`--force`|`-f`|force workspace initialization without clearing local objects|
|`--harmony`|`   `|DEPRECATED. no need for this flag. Harmony is the default now|
|`--interactive`|`-I`|EXPERIMENTAL. start an interactive process|

---  

## import  

**Workspace only**: yes  
**Description**: import components into your current workspace.  
  https://docs.bit.dev/docs/sourcing-components  
  you can use a pattern for multiple ids, such as bit import "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit import [ids...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--tester`|`-t`|import a tester environment component|
|`--compiler`|`-c`|import a compiler environment component|
|`--environment`|`-e`|install development environment dependencies (compiler and tester)|
|`--path <path>`|`-p`|import components into a specific directory|
|`--objects`|`-o`|import components objects only, don't write the components to the file system. This is a default behavior for import with no id|
|`--display-dependencies`|`-d`|display the imported dependencies|
|`--override`|`-O`|override local changes|
|`--verbose`|`-v`|showing verbose output for inspection|
|`--json`|`-j`|return the output as JSON|
|`--ignore-dist`|`   `|skip writing the component's build files during import|
|`--conf`|`   `|write the configuration file (component.json) of the component (harmony components only)|
|`--skip-npm-install`|`   `|do not install packages of the imported components. (it automatically enables save-dependencies-as-components flag)|
|`--ignore-package-json`|`   `|do not generate package.json for the imported component(s). (it automatically enables skip-npm-install and save-dependencies-as-components flags)|
|`--merge [strategy]`|`-m`|merge local changes with the imported version. strategy should be "theirs", "ours" or "manual"|
|`--dependencies`|`   `|EXPERIMENTAL. import all dependencies and write them to the workspace|
|`--dependents`|`   `|EXPERIMENTAL. import component dependents to allow auto-tag updating them upon tag|
|`--skip-lane`|`   `|EXPERIMENTAL. when checked out to a lane, do not import the component into the lane, save it on master|

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

## list  

**Alias**: `ls`  
**Workspace only**: no  
**Description**: list components on a local or a remote scope.  
  https://docs.bit.dev/docs/view#list  

`bit list [remote-scope]`  

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

## config  

**Workspace only**: yes  
**Description**: global config management.  
  https://docs.bit.dev/docs/conf-config  

`bit config`  

### set 
**Usage**: `set <key> <val>`  

**Description**: set a global configuration  


### del 
**Usage**: `del <key>`  

**Description**: delete given key from global configuration  


### get 
**Usage**: `get <key>`  

**Description**: get a global configuration  


### list 
**Usage**: `list`  

**Description**: list all configuration(s)  


---  

## clear-cache  

**Alias**: `cc`  
**Workspace only**: no  
**Description**: clears bit's cache from current working machine  
  https://docs.bit.dev/docs/workspace#cache  

`bit clear-cache`  

---  

## remote  

**Workspace only**: yes  
**Description**: manage set of tracked bit scope(s)  
  https://docs.bit.dev/docs/bit-server#working-with-remote-scopes  

`bit remote`  

### add 
**Usage**: `add <url>`  

**Description**: add a tracked bit remote  


| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--global`|`-g`|configure a remote bit scope|

### del 
**Usage**: `del <name>`  

**Description**: remove a tracked bit remote  


| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--global`|`-g`|remove a global configured remote scope|

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--global`|`-g`|see globally configured remotes|

---  

## dependents  

**Workspace only**: yes  
**Description**: EXPERIMENTAL. show dependents of the given component  

`bit dependents <id>`  

---  

## dependencies  

**Workspace only**: yes  
**Description**: EXPERIMENTAL. show dependencies (direct and indirect) of the given component  

`bit dependencies <id>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--debug`|`-d`|show the immediate dependencies and how their version was determined|

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

## scope-config  

**Workspace only**: yes  
**Description**: scope config management  

`bit scope-config`  

### set 
**Usage**: `set <key> <val>`  

**Description**: set a scope configuration  


### del 
**Usage**: `del <key>`  

**Description**: delete given key from global configuration  


### get 
**Usage**: `get <key>`  

**Description**: get a scope configuration  


### list 
**Usage**: `list`  

**Description**: list all scope configuration(s)  


---  

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
|`--namespace <namespace>`|`-n`|organize component in a namespace|
|`--exclude <file>/"<file>,<file>"`|`-e`|exclude file from being tracked. use quotation marks to list files or use a glob pattern|
|`--override <boolean>`|`-o`|override existing component if exists (default = false)|

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
|`--soft`|`   `|harmony - revert only soft-tags (components tagged with --soft flag)|
|`--force`|`-f`|revert the tag even if used as a dependency. WARNING: components that depend on this tag will corrupt|

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
|`--scope [version]`|`-s`|tag all components of the current scope|
|`--patch`|`-p`|increment the patch version number|
|`--minor`|`   `|increment the minor version number|
|`--major`|`   `|increment the major version number|
|`--pre-release [identifier]`|`   `|EXPERIMENTAL. increment a pre-release version (e.g. 1.0.0-dev.1)|
|`--force`|`-f`|force-tag even if tests are failing and even when component has not changed|
|`--verbose`|`-v`|show specs output on failure|
|`--ignore-missing-dependencies`|`   `|DEPRECATED. use --ignore-unresolved-dependencies instead|
|`--ignore-unresolved-dependencies`|`-i`|ignore missing dependencies (default = false)|
|`--ignore-newest-version`|`-I`|ignore existing of newer versions (default = false)|
|`--skip-tests`|`   `|skip running component tests during tag process|
|`--skip-auto-tag`|`   `|EXPERIMENTAL. skip auto tagging dependents|
|`--build`|`   `|Harmony only. run the pipeline build and complete the tag|
|`--soft`|`   `|Harmony only. do not persist. only keep note of the changes to be made|
|`--persist`|`   `|Harmony only. persist the changes generated by --soft tag|
|`--disable-deploy-pipeline`|`   `|DEPRECATED. use --disable-tag-pipeline instead|
|`--disable-tag-pipeline`|`   `|Harmony only. skip the tag pipeline to avoid publishing the components|
|`--force-deploy`|`   `|Harmony only. run the tag pipeline although the build failed|
|`--increment-by <number>`|`   `|(default to 1) increment semver flag (patch/minor/major) by. e.g. incrementing patch by 2: 0.0.1 -> 0.0.3.|

---  

## move  

**Alias**: `mv`  
**Workspace only**: yes  
**Description**: move files or directories of component(s)  
  https://docs.bit.dev/docs/add-and-isolate-components#moving-and-renaming-files  

`bit move <from> <to>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--component`|`-c`|move component files that are spread over multiple directories to one directory. synopsis: `move <component-id> <directory>`|

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
|`--track`|`-t`|keep tracking component (default = false)|
|`--delete-files`|`-d`|delete local component files (authored components only. for imported components the files are always deleted)|
|`--force`|`-f`|removes the component from the scope, even if used as a dependency. WARNING: components that depend on this component will corrupt|
|`--silent`|`-s`|skip confirmation|
|`--lane`|`   `|EXPERIMENTAL. remove a lane|

---  

## deprecate  

**Alias**: `d`  
**Workspace only**: no  
**Description**: deprecate a component (local/remote)  

`bit deprecate <ids...>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--remote`|`-r`|deprecate a component from a remote scope|

---  

## undeprecate  

**Workspace only**: no  
**Description**: undeprecate a deprecated component (local/remote)  

`bit undeprecate <ids...>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--remote`|`-r`|undeprecate a component from a remote scope|

---  

## checkout  

**Alias**: `U`  
**Workspace only**: yes  
**Description**: switch between component versions or remove local changes  
  `bit checkout <version> [ids...]` => checkout the specified ids (or all components when --all is used) to the specified version  
  `bit checkout latest [ids...]` => checkout the specified ids (or all components when --all is used) to their latest versions  
  `bit checkout [ids...] --reset` => remove local modifications from the specified ids (or all components when --all is used)  
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

## merge  

**Workspace only**: yes  
**Description**: merge changes of different component versions  
  `bit merge <version> [ids...]` => merge changes of the given version into the checked out version  
  `bit merge [ids...]` => EXPERIMENTAL. merge changes of the remote head into local, optionally use '--abort' or '--resolve'  
  `bit merge <lane> --lane` => EXPERIMENTAL. merge given lane into current lane  
  `bit merge <remote> <lane> --lane` => EXPERIMENTAL. merge given remote-lane into current lane  
  you can use a pattern for multiple ids, such as bit merge 0.0.1 "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit merge [values...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--ours`|`   `|in case of a conflict, override the used version with the current modification|
|`--theirs`|`   `|in case of a conflict, override the current modification with the specified version|
|`--manual`|`   `|in case of a conflict, leave the files with a conflict state to resolve them manually later|
|`--abort`|`   `|EXPERIMENTAL. in case of an unresolved merge, revert to the state before the merge began|
|`--resolve`|`   `|EXPERIMENTAL. mark an unresolved merge as resolved and create a new snap with the changes|
|`--lane`|`-l`|EXPERIMENTAL. merge lanes|
|`--existing`|`   `|EXPERIMENTAL. relevant for lanes. checkout only components in a lane that exist in the workspace|
|`--no-snap`|`   `|EXPERIMENTAL. do not auto snap in case the merge completed without conflicts|
|`--build`|`   `|in case of snap during the merge, run the build-pipeline (similar to bit snap --build)|
|`--message <message>`|`-m`|EXPERIMENTAL. override the default message for the auto snap|

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
|`--table`|`-t`|show tables instead of plain text for dependencies diff|

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
|`--skip-registry-config`|`   `|don't configure bit.dev registry|
|`--machine-name <string>`|`   `|specify machine-name to pair with the token (useful for CI to avoid accidentally revoke the token)|

---  

## logout  

**Workspace only**: yes  
**Description**: log the CLI out of Bit  

`bit logout`  

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

## completion  

**Workspace only**: yes  
**Description**: enable bash/zsh-completion shortcuts for commands and options  

`bit completion`  

---  

## cli  

**Workspace only**: yes  
**Description**: EXPERIMENTAL. enters bit cli program and generate commands list  

`bit cli`  

### generate 
**Usage**: `generate`  

**Description**: EXPERIMENTAL. generate an .md file with all commands details  


| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--metadata`|`   `|metadata/front-matter to place at the top of the .md file, enter as an object e.g. --metadata.id=cli --metadata.title=commands|

---  

## help  

**Alias**: `$0`  
**Workspace only**: yes  
**Description**: shows help  

`bit help`  

---  

## show  

**Workspace only**: yes  
**Description**: show a component  

`bit show <id>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--json`|`-j`|return the component data in json format|
|`--legacy`|`-l`|use the legacy bit show.|
|`--remote`|`-r`|show a remote component|
|`--compare`|`-c`|compare current file system component to latest tagged component [default=latest]. only works in legacy.|

---  

## envs  

**Alias**: `env`  
**Workspace only**: yes  
**Description**: show all components envs  

`bit envs [name]`  

---  

## start  

**Alias**: `c`  
**Workspace only**: yes  
**Description**: Start a dev environment for a workspace or a specific component  

`bit start [type] [pattern]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--dev`|`-d`|start UI server in dev mode.|
|`--port [number]`|`-p`|port of the UI server.|
|`--rebuild`|`-r`|rebuild the UI|
|`--verbose`|`-v`|showing verbose output for inspection and prints stack trace|
|`--suppress-browser-launch`|`   `|do not automatically open browser when ready|

---  

## ui-build  

**Alias**: `c`  
**Workspace only**: yes  
**Description**: build production assets for deployment.  

`bit ui-build [type]`  

---  

## install  

**Alias**: `in`  
**Workspace only**: yes  
**Description**: install development workspace dependencies  

`bit install [packages...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--variants <variants>`|`-v`|add packages to specific variants|
|`--type [lifecycleType]`|`-t`|runtime (default), dev or peer dependency|
|`--update-existing [updateExisting]`|`-u`|update existing dependencies version and types|
|`--save-prefix [savePrefix]`|`   `|set the prefix to use when adding dependency to workspace.jsonc|
|`--skip-dedupe [skipDedupe]`|`   `|do not dedupe dependencies on installation|
|`--skip-import [skipImport]`|`   `|do not import bit objects post installation|

---  

## eject-conf  

**Workspace only**: yes  
**Description**: ejecting components configuration  

`bit eject-conf [id]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--propagate`|`-p`|mark propagate true in the config file|
|`--override`|`-o`|override file if exist|

---  

## capsule-list  

**Workspace only**: yes  
**Description**: list all capsules  

`bit capsule-list`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--json`|`-j`|json format|

---  

## capsule-create  

**Workspace only**: yes  
**Description**: create capsules  

`bit capsule-create [componentIds...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--base-dir <name>`|`-b`|set base dir of all capsules|
|`--always-new`|`-a`|create new environment for capsule|
|`--seeders-only`|`-s`|create capsules for the seeders only (not for the entire graph)|
|`--id <name>`|`-i`|reuse capsule of certain name|
|`--json`|`-j`|json format|
|`--install-packages`|`-d`|install packages by the package-manager|
|`--package-manager <name>`|`-p`|npm, yarn or pnpm, default to npm|

---  

## watch  

**Workspace only**: yes  
**Description**: watch a set of components  

`bit watch`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--verbose`|`-v`|showing npm verbose output for inspection and prints stack trace|

---  

## link  

**Workspace only**: yes  
**Description**: generate symlinks to resolve module paths for imported components.  
  https://docs.bit.dev/docs/dependencies#missing-links  

`bit link [ids...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--json`|`-j`|return the output as JSON|
|`--verbose`|`   `|verbose output|
|`--rewire`|`-r`|Replace relative paths with module paths in code (e.g. "../foo" => "@bit/foo")|
|`--target <dir>`|`   `|EXPERIMENTAL. link to an external directory (similar to npm-link) so other projects could use these components|

---  

## create  

**Workspace only**: yes  
**Description**: create a new component from a template  

`bit create <templateName> <componentNames...>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--namespace <string>`|`-n`|sets the component's namespace and nested dirs inside the scope|
|`--scope <string>`|`-s`|sets the component's scope-name. if not entered, the default-scope will be used|
|`--aspect <string>`|`-a`|aspect-id of the template. helpful when multiple aspects use the same template name|
|`--path <string>`|`-p`|relative path in the workspace. by default the path is `<scope>/<namespace>/<name>`|

---  

## templates  

**Workspace only**: yes  
**Description**: list components templates when inside bit-workspace (for bit-create), otherwise, list workspace templates (for bit-new)  

`bit templates`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--show-all`|`-s`|show hidden templates|

---  

## new  

**Workspace only**: yes  
**Description**: EXPERIMENTAL. create a new workspace from a template  

`bit new <templateName> <workspaceName>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--aspect <string>`|`-a`|aspect-id of the template. helpful when multiple aspects use the same template name|
|`--owner <string>`|`-o`|Append the owner to any of the defaultScope in the workspace.jsonc template|
|`--standalone <string>`|`-s`|skip generation of Git repository|

---  

## build  

**Workspace only**: yes  
**Description**: run set of tasks for build  

`bit build [pattern]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--install`|`   `|install core aspects in capsules|
|`--reuse-capsules`|`   `|avoid deleting the capsules root-dir before starting the build|
|`--tasks <string>`|`   `|build the specified task(s) only. for multiple tasks, separate by a comma and wrap with quotes.
specify the task-name (e.g. "TypescriptCompiler") or the task-aspect-id (e.g. teambit.compilation/compiler)|
|`--cache-packages-on-capsule-root`|`   `|set the package-manager cache on the capsule root|
|`--list-tasks <string>`|`   `|list tasks of an env or a component-id for each one of the pipelines: build, tag and snap|

---  

## run  

**Alias**: `c`  
**Workspace only**: yes  
**Description**: run an application  

`bit run <app>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--dev`|`-d`|start the application in dev mode.|
|`--verbose`|`-v`|showing verbose output for inspection and prints stack trace|

---  

## app-list  

**Workspace only**: yes  
**Description**: list all registered applications  

`bit app-list`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--json`|`-j`|return the component data in json format|

---  

## test  

**Alias**: `at`  
**Workspace only**: yes  
**Description**: test set of components in your workspace  

`bit test [pattern]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--watch`|`-w`|start the tester in watch mode.|
|`--debug`|`-d`|start the tester in debug mode.|
|`--env <id>`|`-e`|test only the given env|
|`--scope <scope>`|`-s`|name of the scope to test|

---  

## pack  

**Workspace only**: yes  
**Description**: create tar for npm publish  

`bit pack <componentId> [scopePath]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--out-dir <out-dir>`|`-d`|directory to put the result tar file|
|`--override`|`-o`|override existing pack file|
|`--keep`|`-k`|should keep isolated environment [default = false]|
|`--prefix`|`-p`|keep custom (binding) prefix|
|`--json`|`-j`|return the output as JSON|

---  

## compile  

**Workspace only**: yes  
**Description**: compile components in the development workspace  

`bit compile [component...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--changed`|`-c`|compile only new and modified components|
|`--verbose`|`-v`|show more data, such as, dist paths|
|`--json`|`-j`|return the compile results in json format|

---  

## eject  

**Alias**: `E`  
**Workspace only**: yes  
**Description**: replaces the components from the local scope with the corresponding packages  

`bit eject <id...>`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--force`|`-f`|ignore local version. remove the components even when they are staged or modified|
|`--json`|`-j`|print the results in JSON format|
|`--keep-files`|`   `|keep the component files in the workspace intact|

---  

## resume-export  

**Workspace only**: yes  
**Description**: resume failed export to persist the pending objects on the given remotes.  
the export-id is the id the client got in the error message during the failure.  
alternatively, exporting to any one of the failed scopes, throws server-is-busy error with the export-id  

`bit resume-export <export-id> <remotes...>`  

---  

## export  

**Alias**: `e`  
**Workspace only**: yes  
**Description**: export components to a remote scope.  
  bit export => export all staged components to their current scope  
  Legacy:  
  `bit export <remote> [id...]` => export (optionally given ids) to the specified remote  
  `bit export current [id...]` => export (optionally given ids) to their current scope  
  Harmony:  
  `bit export [id...]` => export (optionally given ids) to their current scope  
  `bit export <remote> <lane...>` => export the specified lanes to the specified remote  
  
  https://docs.bit.dev/docs/export  
  you can use a pattern for multiple ids, such as bit export remote-scope "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit export [remote] [id...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--eject`|`-e`|replaces the exported components from the local scope with the corresponding packages|
|`--all`|`-a`|export all components include non-staged|
|`--include-dependencies`|`-d`|LEGACY ONLY. include the component's dependencies as part of the export to the remote scope|
|`--set-current-scope`|`-s`|LEGACY ONLY. ensure the component's remote scope is set according to the target location|
|`--rewire`|`-r`|LEGACY ONLY. when exporting to a different or new scope, replace import/require statements in the source code to match the new scope|
|`--force`|`-f`|force changing a component remote without asking for a confirmation|
|`--lanes`|`-l`|HARMONY ONLY. export lanes|
|`--all-versions`|`   `|export not only staged versions but all of them|
|`--origin-directly`|`   `|HARMONY ONLY. avoid export to the central hub, instead, export directly to the original scopes. not recommended!|
|`--resume <string>`|`   `|in case the previous export failed and suggested to resume with an export-id, enter the id|

---  

## lint  

**Workspace only**: yes  
**Description**: lint components in the development workspace  

`bit lint [component...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--changed`|`-c`|lint only new and modified components|

---  

