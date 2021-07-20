---
id: comparing-components
title: Comparing Components (diff)
----

show diff between components files  
  bit diff => compare all modified components to their model version  
  bit diff [ids...] => compare the specified components against their modified states  
  bit diff [id] [version] => compare the specified version to used or modified files  
  bit diff [id] [version] [to_version] => compare the specified version files to to_version files  
  you can use a pattern for multiple ids, such as bit diff "utils/*". (wrap the pattern with quotes to avoid collision with shell commands)  

`bit diff [values...]`  

| **Option** | **Option alias** | **Description**|  
|---|:-----:|---|
|`--verbose`|`-v`|show a more verbose output when possible|
