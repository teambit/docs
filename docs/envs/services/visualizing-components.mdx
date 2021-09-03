---
id: visualizing-components
title: Visualizing Components
---

Bundles all components using the Env and runs a server to display them in the workspace UI, with "hot reloading". This includes rendering the 'compositions' as well as the documentation shown in the 'Overview' tab.

> Even though different types of components, e.g. React and Node components, run on different servers (one for each environment) the workspace is explored and navigated through as if it where a single server.


```ts
  getDevServer?: (
    context: DevServerContext,
    transformers: WebpackConfigTransformer[]
  ) => DevServer | Promise<DevServer>;
```

Returns a DevServer to be used by the DevServer service. (A DevServer is essentially the combination of the bundler configurations, together with a specified 'listen' port number)

For example:

```ts
export class ReactEnv implements Environment {
  constructor(
    // ...

    // The Webpack aspect
    private webpack: WebpackMain
  ) {}

  // ...

  getDevServer(): DevServer {
    const withDocs = Object.assign(context, {
      entry: context.entry.concat([require.resolve('./docs')]),
    });
    return this.webpack.createDevServer(withDocs, webpackConfig);
  }
}
```

> The above example runs the dev server with the environment's documentation template.




