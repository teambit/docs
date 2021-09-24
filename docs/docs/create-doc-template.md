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
  /* sets prefix for the link file name */
  prefix: string;
  renderTemplatePath?: (context: ExecutionContext) => Promise<string>;
  getModuleMap(components: Component[]): Promise<ComponentMap<AbstractVinyl[]>>;
}
```

preview create a renderable bundle for each

preview set the conditions to create a renderable bundle (this will be creatde using the DevServer and Bunderl as they are set by the Env)
