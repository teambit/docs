---
id: visualizing-components
title: Visualizing Components
---


Component visualization is the bundling and rendering of component compositions, or any other visual outputs relating to a component (for example, component docs). 

This bundling happens in development time  as well as in build time (producing part of the component's release version artifacts). 


## Using the service (service handlers)

### DevServer: Component visualization in development
The DevServer bundles all components using the Env and runs a server to display them in the workspace UI, with "hot reloading". This includes rendering the 'compositions' as well as the documentation shown in the 'Overview' tab.

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
// ...
import { Bundler, BundlerContext, DevServer, DevServerContext } from '@teambit/bundler';
import { WebpackConfigTransformer, WebpackMain } from '@teambit/webpack';

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

### Component visualization in "production" (release artifacts)

```ts
getBundler?: (context: BundlerContext, transformers: any[]) => Promise<Bundler>
```

For example:

```ts
// ...

import { Bundler, BundlerContext, DevServer, DevServerContext } from '@teambit/bundler';
import { WebpackConfigTransformer, WebpackMain } from '@teambit/webpack';

import basePreviewConfigFactory from './webpack/webpack.config.base';
import basePreviewProdConfigFactory from './webpack/webpack.config.base.prod';
import componentPreviewProdConfigFactory from './webpack/webpack.config.component.prod';

export class ReactEnv implements Environment {
  constructor(
    // ...

    // The Webpack aspect
    private webpack: WebpackMain
  ) {}

  // ...

    async getBundler(context: BundlerContext, transformers: WebpackConfigTransformer[] = []): Promise<Bundler> {
    const baseConfig = basePreviewConfigFactory(true);
    const baseProdConfig = basePreviewProdConfigFactory();
    const componentProdConfig = componentPreviewProdConfigFactory();

    const defaultTransformer: WebpackConfigTransformer = (configMutator) => {
      const merged = configMutator.merge([baseConfig, baseProdConfig, componentProdConfig]);
      return merged;
    };

    return this.webpack.createBundler(context, [defaultTransformer, ...transformers]);
  }

}
```

