---
id: rendering-docs
title: Rendering Docs
---

import { Image } from '@site/src/components/image';
import docsBundlingImg from './docs_bundling.png';
import docsPreviewImg from './docs_preview.png';

The Docs aspect uses Preview to register its doc file and templates for bundling and for rendering in the workspace UI/Scope UI.

## Bundling (Main runtime)

1. The docs template is registered by the Envs via the `getDocsTemplate()` service handler.
2. The Docs Aspect then registers the template returned from the Env, as well as the env's component docs files to the Preview aspect.

```ts title="docs.main.runtime.ts"
// ...

class DocsPreviewDefinition implements PreviewDefinition {
  readonly prefix = 'overview';

  // ...
  async renderTemplatePath(context: ExecutionContext): Promise<string> {
    // ...
  }

  async getModuleMap(
    components: Component[]
  ): Promise<ComponentMap<AbstractVinyl[]>> {
    // ...
  }
}

// ...
export class DocsMain {
  // ...
  static async provider() {
    // ...
    preview.registerDefinition(new DocsPreviewDefinition(docs));
    // ...
  }
}

// ...
```

:::note
The glob pattern for doc files (for all Envs) is set as default by the Docs aspect and can be configured using the [config interface](#loading-the-component-docs).
:::

<Image src={docsBundlingImg} />

## Rendering (Preview runtime)

To make the bundled doc files and templates available for fetching and rendering by the browser:

1. The docs Aspect registers to the Preview aspect for rendering.

```ts title="docs.preview.runtime.tsx"
// ...

export class DocsPreview {
  // ...

  static async provider([preview]: [PreviewPreview]) {
    // Creates an instance of a Preview plugin
    const docsPreview = new DocsPreview(preview);
    // Registers the docs' preview plugin
    preview.registerPreview({
      // Provides the name for the link file (see the Preview section to learn more about link files)
      name: 'overview',
      // Returns the 'render' function to execute for the template rendering
      render: docsPreview.render.bind(docsPreview),
      // Returns the docs files to render
      selectPreviewModel: docsPreview.selectPreviewModel.bind(docsPreview),
      include: ['compositions'],
    });

    return docsPreview;
  }
}
// ...
```

2. The Preview Aspect registers routes to the docs files and templates in the Express Aspect.

<Image src={docsPreviewImg} />
