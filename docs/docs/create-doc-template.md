---
id: create-doc-template
title: Create Doc Template
---

## docs template

```ts
getDocsTemplate {

}

```

```ts
export interface PreviewDefinition {
  /* Sets the name for the link file */
  prefix: string;
  /* Returns a file to be used as the rendering template for the files */
  renderTemplatePath?: (context: ExecutionContext) => Promise<string>;
  /* Returns an array of files to render (from a received array of components) */
  getModuleMap(components: Component[]): Promise<ComponentMap<AbstractVinyl[]>>;
}
```

preview create a renderable bundle for each

preview set the conditions to create a renderable bundle (this will be creatde using the DevServer and Bunderl as they are set by the Env)
