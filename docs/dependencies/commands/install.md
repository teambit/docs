---
title: bit install
id: install
---

**Alias**: `in`  
**Workspace only**: yes  
**Description**: install development workspace dependencies  

`bit install [packages...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--variants <variants>`|`-v`|add packages to specific variants|
|`--type [lifecycleType]`|`-t`|runtime (default), dev or peer dependency|
|`--update-existing [updateExisting]`|`-u`|update existing dependencies version and types|
|`--save-prefix [savePrefix]`|   |set the prefix to use when adding dependency to workspace.jsonc|
|`--skip-dedupe [skipDedupe]`|   |do not dedupe dependencies on installation|
|`--skip-import [skipImport]`|   |do not import bit objects post installation|
