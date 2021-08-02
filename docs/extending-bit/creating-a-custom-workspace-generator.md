---
id: creating-a-custom-workspace-generator
title: Creating a Custom Workspace Generator
---

Generate your own workspace template with

```bash
bit create workspace-generator my-workspace
```

## Investigating the files

This will give you a collection of files inside the my-workspace namespace.

<img src="/img/extending-bit/workspace-generator-dir-structure.png" alt="Directory Structure when generating a workspace" width="60%" />

In the templates folder we have a folder of files that will get generated such as the `git-ignore` and `readme` file which can be modified to how you like. The `workspace-config` file is how you can configure your workspace, more on this later. The `index` file is the one that registers all these files with the correct name, path and which contents to return.

```jsx title="index.ts"
generateFiles: async (context: WorkspaceContext) => {
    return [
      {
        relativePath: 'workspace.jsonc',
        content: await workspaceConfig(context)
      },
      {
        relativePath: '.gitignore',
        content: gitIgnore()
      },
      {
        relativePath: 'README.md',
        content: readme()
      }
    ];
  },
```

In this file you will also see an array of components that you can add to be generated in your workspace. Perhaps each workspace should have it's own logo component specific to that workspace for example or an entity component for the product for when building an ecommerce workspace. By importing this component here we can then modify it to our liking as really we are getting a carbon copy of the component to then do with it what we want. It will no longer be tied to the collection we are cloning it from.

```jsx title="index.ts"
importComponents: () => {
  return [
    {
      id: 'learn-bit-react.ecommerce/entity/product',
      path: 'ecommerce/entity/product'
    }
  ];
};
```

The rest of the files that are generated are the files that make the aspect work and no changes need to be made to these files.

## Aspect Environment

We will need to register our aspect under the correct environment in order for it to work. We can do so by adding it to the variants section in our `workspace.jsonc` file.

```json title="workspace.json"
"teambit.workspace/variants": {
    "{my-workspace}": {
      "teambit.harmony/aspect": {}
    }
  }
```

## Customizing our Template Name

We can also change the name of our template and description:

```jsx title="index.ts"
export const workspaceTemplate: WorkspaceTemplate = {
  name: 'learn-bit-workspace',
  description: 'workspace template for learn bit',
```

## Customizing the ReadMe

We are now ready to modify our template and we can test it out by adding something very simple to see if it works. Let's modify the readme to include a new line at the top.

```jsx title="readme-file.ts"
export function readme() {
  return `hello world from my workspace generator`;
}
```

## Using our Generator locally

As we have modified our generator we will need to compile it

```bash
bit compile
```

Now if we use our generator to generate a new workspace we will get one with our custom text in the ReadMe. Now here comes the tricky part. We want to test this locally and not export our workspace template yet as we are still developing it and just want to test it locally. We can do this by going to a **new terminal window separate from this workspace** and typing a command that includes the following:

```bash
bit new <templateName> <workspaceName> --load-from <localProjectPath> --aspect <workspaceGeneratorID>
```

- The `<templateName>` is taken from the name in the template index file. It can be changed to anything you like. If you do change it just remember to run `bit compile` before using it.
- The `<workspaceName>` is the name you want to call your workspace
- The `<localProjectPath>` is where the path is to the project that holds the template generator. Type `pwd` in the terminal to get the correct path.
- `<workspaceGeneratorID>` is the id of the workspace generator

Full example should look something like this.

```bash
bit new learn-bit-workspace sports-store --load-from /Users/me/path/to/this/dir --aspect learn-bit-react.base-ui/workspace-generator
```

### Inspecting our New Workspace

This will now create a new workspace for us in the directory sports-store.

```bash
cd sports-store
```

If we then open it in our editor and inspect it we will see the custom message we added in the readMe file. Great.

## Further Customizing the Generator

Ok now it's time to really put this to use. The `workspace.json` file is the file that we will configure the most as this will set up our workspace for all projects across our organization. We want different teams to own different features and have their own workspaces but we want to have standards across all of them and this is how we can do it. Let's take a look at some of the things we can configure, however you really can configure anything you want.

### Add a Logo

Let's start by making sure the logo for our workspace has our company logo instead of Bit's logo.

```jsx {8,9} title="workspace-config.ts"
...
export async function workspaceConfig({
  name,
  defaultScope
}: WorkspaceContext) {
  const configParsed = await getWorkspaceConfigTemplateParsed();
  configParsed['teambit.workspace/workspace'].name = name;
  configParsed['teambit.workspace/workspace'].icon =
    'https://my-organization/my-logo.svg';
  ...

  return stringifyWorkspaceConfig(configParsed);
}
```

### Add a Default Scope

The default scope can be added when we generate our workspace but if users forget to add the `--default-scope <myScope>` flag then we can set a default scope for them.

```jsx {9,10} title="workspace-config.ts"
...
export async function workspaceConfig({
  name,
  defaultScope
}: WorkspaceContext) {
  const configParsed = await getWorkspaceConfigTemplateParsed();
  configParsed['teambit.workspace/workspace'].name = name;
  ...
  configParsed['teambit.workspace/workspace'].defaultScope =
    defaultScope || 'my organization';
  ...

  return stringifyWorkspaceConfig(configParsed);
}
```

### Add a Component Generator

It is more than likely that you have already created your own component generator to generate components to you organization's liking that include the correct styling method, docs etc. We can register this component generator aspect so that it will be available for our workspace to use.

```jsx {9-12} title="workspace-config.ts"
...
export async function workspaceConfig({
  name,
  defaultScope
}: WorkspaceContext) {
  const configParsed = await getWorkspaceConfigTemplateParsed();
  configParsed['teambit.workspace/workspace'].name = name;
  ...
  configParsed['teambit.generator/generator'] = {
    aspects: ['learn-bit-react.base-ui/component-generator']
  };
  configParsed['learn-bit-react.base-ui/component-generator'] = {};
  ...

  return stringifyWorkspaceConfig(configParsed);
}
```

### Add Variants

Generally your organization might have a specific way of name spacing components under specific environments such as all aspects should be under the aspect environments, ui components might be under the react env for example and entity components might be under the node env. Instead of having to configure this for each project we can configure this here and then it will be generated for each one.

```jsx {9-18} title="workspace-config.ts"
...
export async function workspaceConfig({
  name,
  defaultScope
}: WorkspaceContext) {
  const configParsed = await getWorkspaceConfigTemplateParsed();
  configParsed['teambit.workspace/workspace'].name = name;
  ...
  configParsed['teambit.workspace/variants'] = {
    '*': {
      'teambit.react/react': {}
    },
    '{env/*}, {apps/*}': {
      'teambit.harmony/aspect': {}
    },
    '{entity/*}': {
      'teambit.harmony/node': {}
    }
  };
  ...
 return stringifyWorkspaceConfig(configParsed);
}
```

### Add Dependencies

You may need to add some components as dependencies to your workspace or you may need to add peerDependencies.

```jsx {9-16} title="workspace-config.ts"
...
export async function workspaceConfig({
  name,
  defaultScope
}: WorkspaceContext) {
  const configParsed = await getWorkspaceConfigTemplateParsed();
  configParsed['teambit.workspace/workspace'].name = name;
  ...
  configParsed['teambit.dependencies/dependency-resolver'].policy = {
    "dependencies": {
      "@company/scope.namespace.component": "0.0.1",
    },
    "peerDependencies": {
      "react": "^16.8.0 || ^17.0.2",
      "react-dom": "^16.8.0 || ^17.0.2"
    }
  ...
 return stringifyWorkspaceConfig(configParsed);
}
```

### Further Configuration

You can add any config to the `workspace.json` file using `configParse[...].keyName ={}`

### Using the Generator

And that's it. We can now run `bit compile`.

```bash
bit compile
```

The template Generator is now ready to use again just like we did before.

```bash
bit new learn-bit-workspace sports-store2 --load-from /Users/me/path/to/this/dir --aspect learn-bit-react.base-ui/workspace-generator
```

## Exporting our Generator

Once we have finished all customizations and our generator is ready to be exported for other teams to use we can then tag a new version of this component and export it to our organization's repo.

```bash
bit tag --all --message "my workspace generator"
```

Once tagging has finished you can export it to your remote scope.

```bash
bit export
```

## Using our Generator Remotely

Once it has been exported you can now generate a new workspace with the following:

- `bit new` `<templateName>`
- `<workspaceName>`
- `--aspect` flag
- your full `<workspaceGeneratorID>`

Example:

```bash
bit new learn-bit-workspace shoe-store --aspect learn-bit-react.base-ui/workspace-generator
```

Check out the [full code example](https://bit.dev/learn-bit-react/base-ui/workspace-generator) in our demo project.
