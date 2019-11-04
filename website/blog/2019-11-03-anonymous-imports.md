---
title: Anonymous imports are now supported
author: Gilad Shoham
authorImageURL: https://ca.slack-edge.com/T026YUPQS-U5LGESY64-6443aeedd191-512
---

The number of community components on bit.dev is growing, and we want everyone to be able to access them. Now, you can now import components without a user in bit.dev and without authenticating. You can also skip authentication if you want to list components, show component details and graph the component's dependencies.  

<!--truncate-->

This of course only applies on components in public collections, so they are visible for anyone. Components in private collections still require authentication and view privileges for the collection.  

Previously, the above read operations were prompting for username and password if we could not authenticate you via token or SSH. This is no longer required. 

Naturally, write operations still require authentication, and if none was provided, you will be prompted for a username and password.  
