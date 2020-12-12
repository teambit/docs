---
id: service-handlers
title: Service Handlers
---

Service handlers are methods used in a Bit environment to map Bit aspects to environment services. For example, the React environment uses the service handler `getCompiler()` to configure the Compiler Service to run the TypeScript aspect.

Environment services run on various events. Whenever a service runs, it executes its corresponding service handler which consequently runs the configured aspect (in the previous example, that would be TypeScript). 

Different components in a Bit workspace may use different environments. That means environment services need to execute their corresponding service handlers in the specific environment applied on the component currently being processed. 

For example, if *component A* uses the Node environment then the Compiler Service processing it will execute the Service Handler (in that case, `getCompiler`) found in the Node environment.

