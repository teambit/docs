---
id: bit-build
title: Build Definition
---

Bit's build is an extensible build workflow for components. It validates a component is not dependent on its context (the workspace), tests it, and generates artifacts that are necessary for it to be consumed and maintained as an independent module (e.g, a Node package).
The build workflow executes independently when running `bit build`, and before a component is tagged with a new release version (`bit tag`).
