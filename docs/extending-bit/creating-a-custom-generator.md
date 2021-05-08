---
id: creating-a-custom-generator
title: Creating a Custom Generator
---

You can use `bit templates` to see the available templates for generating components, aspects and environments. You can also create your own templates.

```bash
bit create aspect my-template
```

This will generate the files we need so that we can extend the template generator. In the `main.runtime.ts` file we need to import the GeneratorMain,
GeneratorAspect and ComponentContext from the generator Aspect.

```jsx
import {
  GeneratorMain,
  GeneratorAspect,
  GeneratorContext
} from '@teambit/generator';
```

We then pass the GeneratorAspect as a dependency and pass the generatorMain into the provider. We then register a new component Template to our generator. We give the template a name. This is the name that will be shown in the CLI and then we generate our files passing in the ComponentContext. This will give us access to the components name, id, nameCamelCase and namePascalCase.

We then return an array of files we want to generate. We can add as many as we want here and can

```jsx
import { MainRuntime } from '@teambit/cli';
import {
  GeneratorMain,
  GeneratorAspect,
  ComponentContext
} from '@teambit/generator';
import { TemplateAspect } from './template.aspect';

export class TemplateMain {
  static slots = [];
  static dependencies = [GeneratorAspect];
  static runtime = MainRuntime;
  static async provider([generator]: [GeneratorMain]) {
    generator.registerComponentTemplate([
      {
        name: 'template',
        generateFiles: (context: ComponentContext) => {
          return [
            {
              relativePath: 'index.ts',
              content: `export * from './${context.nameCamelCase}';`,
              isMain: true
            },
            {
              relativePath: `${context.nameCamelCase}.ts`,
              content: `export const template = "hello ${context.nameCamelCase} template!";`
            },
            {
              relativePath: `${context.nameCamelCase}.docs.mdx`,
              content: `This is the docs for your component`
            }
          ];
        }
      }
    ]);
    return new TemplateMain();
  }
}

TemplateAspect.addRuntime(TemplateMain);
```

In order to use the template it needs to be configured in the `workspace.jsonc` under the `teambit.generator/generator` and the correct environment needs to be set under the variants which is the aspect environment.

```json
{
  "teambit.generator/generator": {
    "aspects": ["my-scope/my-template"]
  },
  "teambit.workspace/variants": {
    "aspects/template": {
      "teambit.harmony/aspect": {}
    }
  }
}
```

We can now run bit templates and you will see your new template in the CLI.

```bash
bit templates
```

You can now run the bit create command to generate your template.

```bash
bit create my-template my-component
```
