---
id: overview
title: Preview Overview
---

import { Image } from '@site/src/components/image';
import overviewScreenshotImg from './overview_screenshot.png'

The Preview Aspect enables component visualizations to be displayed by the browser. Component visualizations include the component compositions and documentation, but may also include other custom component previews.

Preview assists other Aspects by providing them with a simple API to bundle and display their component visualizations.

Component previewing is done in an isolated [Preview environment](#preview-runtime--environment) and is rendered inside an iframe, in the Workspace/Scope UI (allowing you to preview components of all types in the same UI).

For example, the following screenshot shows a components 'Overview' (its docs and docs template) rendered in a preview environment and displayed in an iframe.

<Image src={overviewScreenshotImg} />

## Preview runtime / environment

The preview runtime is, essentially, an application that uses an Env's specific configurations to bundle and render its components' visualizations.

The preview runtime may consist of more than a single application.

## Previewing components in development

When running `bit start` the Preview aspect runs the DevServers needed to bundle and serve component visualizations. Components are bundled using the DevServer configurations that were set by their Envs.
The number of DevServers that run is determined by the number of different DevServer configurations. For performance optimization, Envs that use identical DevServer configs will share a single DevServer.

Preview uses the DevServer service to provide an optimized dev experience, with large bundle size that are generated quickly and easily debbugable, and with Hot Module Replacement.

The devServer generates files in the `public/bit` directory...

The example below shows 2 servers running, the UI server and the Preview DevServer.

```bash
ENVIRONMENT NAME                    URL                                  STATUS
teambit.harmony/aspect on behalf    http://localhost:3300                RUNNING
of teambit.harmony/aspect,
company.scope/envs/my-react


You can now view 'my-workspace' components in the browser.
Bit server is running on http://localhost:3000
```

## Building the component previews

The Preview Aspect registers its own Build Task to generate preview artifacts during build time. This build task uses the Bundler (and not the DevServer) to generate static webpages and minimized assets, for optimized page loads.

```bash
$ bit build ui/text

✔ env "company.scope/envs/my-react", task "teambit.preview/preview:GeneratePreview" has completed successfully in 39s
✔ env "teambit.harmony/aspect", task "teambit.preview/preview:GeneratePreview" has completed successfully in 25s
```

Artifacts that are generated as part of the `snap` or `tag` pipelines, will be persisted in the component objects, and will later be loaded by the Workspace/Scope UI.

For example:

```bash
# run tag
$ bit tag ui/text

# list the component artifacts
$ bit artifacts ui/text
# ...
  teambit.preview/preview
    GeneratePreview
      public/asset-manifest.json
      public/index.html
      public/service-worker.js
      public/workbox-4979716c.js
      public/static/css/173.00004871.css
      public/static/css/main.e10f3a52.css
      public/static/js/173.67a47fd6.js
      public/static/js/173.67a47fd6.js.LICENSE.txt
      public/static/js/main.8f2d7ca0.js
      public/static/js/runtime-main.f8aedb2c.js
```

When running the preview build task

## Previewing

## Bundling (Main Runtime)

The Preview Aspect services different

The bundling process is executed in the Main Runtime.

The Preview Aspect is used by various Aspects

Aspects, like Docs and Compositions, uses t

## Rendering (Preview Runtime)

The rendering process is executed in the Preview runtime.

## Rational

In a standard web application, UI components _serving the same application_ are bundled together to produce the necessary assets to make them renderable by the browser.

Components in a Bit workspace are not all in the service of the same application. Each component is authored, tagged and exported as an independent component.
That means a few things:

1. Components in a Bit workspace are not consumed ,directly or indirectly, by a single entry file (e.g, the app's `index.js`). That makes it impossible for the bundler to follow the files needed to be bundled.

2. Different components in a single workspace may be implemented using different technologies and bundled using different configurations or even different bundlers.

Preview solves the above challenges by creating a temporary entry file for each group of components using the same environment.
It then serves this file to the Bundler, to be bundled according to the environment and the purpose of bundling. That is, to display components in development or to display the components' release versions (for a "production-level" exhibition of the component's documentation and compositions).

## Usage

### Extending the Preview aspect

The preview aspect can be extended to generate other renderable artifacts , either when running Bit's development server or as part of the build pipeline (for a component's tagged version).
These artifacts can present additional information that assists in inspecting a component (for example, showing the results of accessibility tests).
