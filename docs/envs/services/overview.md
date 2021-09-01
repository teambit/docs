---
id: overview
title: Overview
---

import { Image } from '@site/src/components/image'

Env services run the development tools that were configured by an Env. Each Env service is responsible for a certain aspect of component development.
For example, the Tester service binds Jest (a test runner) to the React Env. 
That enables Jest to run when using the `bit test` command, when making changes to a component in 'watch mode', and more.

<Image
  src="https://storage.googleapis.com/docs-images/react_env_ex.png"
  alt="React env using Jest with the tester service"
  width="60%"
></Image>


### Service Handlers

Service Handlers are the link that binds an Env to an Env Service. They are methods in the Env class that are named according the their corresponding Env Service. That is, their corresponding Env Services "expect" to find specific methods.

For example, the React Env uses the Service Handler `getCompiler()` to configure the Compiler Env Service to run the TypeScript aspect.

Environment services run on various events. Whenever a service runs, it executes its corresponding service handler which consequently runs the configured aspect (in the previous example, that would be TypeScript).

Different components in a Bit workspace may use different environments. That means environment services need to execute their corresponding service handlers in the specific environment applied on the component currently being processed.

For example, if _component A_ uses the Node environment then the Compiler service processing that component files, will execute the Service Handler (in that case, `getCompiler`) found in the Node environment.


## Development Services VS Build Tasks

Env Services can offer Build Tasks, to be integrated into the Env's build pipeline, in addition to their (during) development service (used manually by the CLI or by Bit's development server).

However, Env Services which are executed during development are not necessarily identical to their Build Tasks.

For example, the TypeScript configurations used for compilation by the development server are not the same as the ones used for a component's build process.
