
---
id: clearing-bit-cache
title: Clearing the Bit Cache
permalink: docs/clearing-bit-cache.html
layout: docs
category: Troubleshooting
prev: authentication-issues.html
next: logs.html
---

When a developer issues the bit login command, Bit configure the .npmrc file in the user's home directory (~/.npmrc) with a new entry for a scoped package registry to install components from bit.dev, named @bit.

When building projects that require installing components from bit.dev, the CI server has to have the @bit scoped registry configured and authenticated in its .npmrc file.

It's important to understand that there are specific locations that npm/yarn respect when reading the .npmrc file:

per-project config file (/path/to/my/project/.npmrc)
per-user config file (~/.npmrc)
global config file ($PREFIX/etc/npmrc)
npm builtin config file (/path/to/npm/npmrc)
A user should configure their tool according to how their CI is set up.

Zeit - teambit/bit#1756
GitLab - teambit/bit#1539
