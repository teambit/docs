---
id: creating-a-custom-generator
title: Creating a Custom Component Generator
---

You can use `bit templates` to see the available templates for generating components, aspects and environments.

```bash
bit templates
```

The output will look something like this:

```bash
The following template(s) are available with the command bit create:

teambit.generator/generator
    component-generator (create your own component generator)

...
```

You can also create your own generator using the `bit create` command followed by the name you want to give your generator. In this example we will use the name `my-components` but feel free to use a name that better describes your use case.

```bash
bit create component-generator <my-components>
```

### Configuring your Generator's Environment

Edit your `workspace.jsonc` file and set your generator component to use the `teambit.harmony/aspect` env under the variants object.

```json {2,3} title="workspace.jsonc"
"teambit.workspace/variants": {
  "{my-components}": {
    "teambit.harmony/aspect": {}
  },
}
```

To check if your generator component is using the correct env you can run `bit envs` or `bit show my-components`

### Registering your Generator

Edit your `workspace.jsonc` file and add the component id, (scope name / component name) to `teambit.generator/generator`. You also need to register the template. This should go at root level. The component id can be found in the `aspect.ts` file. In this example we are using `my-scope-name` you may already have a default scope name configured and therefore this should be used here.

```json {} title="workspace.jsonc"
{
  "teambit.generator/generator": {
    "aspects": ["my-scope-name/my-components"]
  },
  "my-scope-name/my-components": {}
}
```

This registers your generator component aspect so that your templates will appear in the CLI when you run `bit templates`.

```bash
bit templates
```

The output should now look something like this:

```bash
The following template(s) are available with the command bit create:

teambit.generator/generator
    component-generator (create your own component generator)

...

my-scope-name/my-components
    component1 (description for component1)
    component2 (description for component2)
```

### Modifying your Generator

The `*.main.runtime.ts` file contains an array of templates that you can modify and add to to create different templates and numerous files to be generated. Make sure you also modify the name and description of these templates as this will be shown in the CLI when you run `bit templates`.

```js {3,4} title="*.main.runtime.ts"
generator.registerComponentTemplate([
  {
    name: 'component1',
    description: 'description for component1',
    generateFiles: (context: ComponentContext) => {
      return [
        // index file
        {
          relativePath: 'index.ts',
          isMain: true,
          content: `export { ${context.namePascalCase} } from './${context.name}';
export type { ${context.namePascalCase}Props } from './${context.name}';
`,
        },

        // component file
        {
          relativePath: `${context.name}.tsx`,
          content: `import React from 'react';`,
        },

        // docs file
        {
          relativePath: `${context.name}.docs.mdx`,
          content: `docs content goes here`,
        },

        // composition file
        {
          relativePath: `${context.name}.composition.tsx`,
          content: `composition content goes here
`,
        },

        // test file
        {
          relativePath: `${context.name}.spec.tsx`,
          content: `test content goes here`,
        },
        // add more files here such as css/sass
      ];
    },
  },

  // component 2
  {
    name: 'component2',
    description: 'description for component2',
    generateFiles: (context: ComponentContext) => {
      return [
        // index file
        {
          relativePath: 'index.ts',
          isMain: true,
          content: `add content here`,
        },
        // add more files
      ];
    },
  },
  // add more components
]);
```

### Compiling the Generator

Make sure you run `bit compile` after any changes to your generator.

```bash
bit compile
```

### Using your Generator

Use your generator to create the component files. In our example we used the name _component1_ as our template name. We can use then `bit create component1` followed by the name of the component we want to create, for example a button component.

```bash
bit create component1 button
```

This will create your button component and all its files and content from your _component1_ template.

### Advantages of Creating a Generator

Bit gives you some basic templates that you can use without having to create your own. However you may want to define specific labels or want to construct your documentation in a specific way or add a different testing library or perhaps add a css/sass file to each component. By creating your own templates it gives you the freedom to add what you want and how you want it. You can then export this generator as a component so that other members of your team can use it in other workspaces/projects and therefore everyone will be creating components just how you want them to.

### Exporting your Generator

[Tag and export](/getting-started/exporting-components) your generator component so you can use it in any other workspace. If you haven't already done so then setup a [remote scope](/getting-started/remote-scope) on [Bit.dev](https://bit.dev/) with the correct scope where you want your generator component to be exported to.

Make sure the scope name is set correctly in the `*.aspect.ts` file before tagging and exporting.

```js {2} title="*.aspect.ts"
export const MyComponentsAspect = Aspect.create({
  id: 'my-scope-name/my-components',
});
```

```bash
bit tag --all --message="my custom generator"
bit export
```

Once you have tagged and exported the component you can add it to the `workspace.jsonc` file in the workspace/project where you want to use this generator. Bit will automatically install this for your

```json title="workspace.jsonc"
{
  "teambit.generator/generator": {
    "aspects": ["my-org.my-scope-name/my-components"]
  },
  "my-org.my-scope-name/my-components": {}
}
```

You can then run `bit templates` to see your available templates and start creating your components with `bit create`.
