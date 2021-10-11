---
id: compositions-stories
title: Compositions and Stories
---

Compositions and [Stories](https://storybook.js.org/docs/react/get-started/whats-a-story) can appear quite similar. Almost like two sibling solutions that solve the same problem.

Compositions could be used as a way to examine components in a context-free environment (much like Storybook is often used), however that is not their main goal.
Compositions are primarily used as simulated integration tests. They are a way to validate that a component will be able to integrate successfully in its future consuming projects (before sharing it).

Bit promotes effective collaboration by enabling teams to work autonomously and deliver their features (i.e, components) independently.
However, for this to work, each team must also be responsible for the way their products, their components, affect all consumers in their organization.
This is where ‘compositions’ play an important role.

## Setting up Storybook in a Bit workspace

### Initialize Storybook

Since Bit workspaces do not use a `package.json`, Storybook is unable to determine, by itself, the type of components in the project.

Use Storybook's `--type` option to manually set the type of components, when initializing Storybook. For example:

```bash title="Example: Initializing SB for React"
$ npx sb init --type react
```

Install packages for storybook sass webpack preset:

```
yarn add -D @storybook/preset-scss css-loader sass sass-loader style-loader
```

configure `.storybook/main.js` to use the sass preset:

```js
module.exports = {
  stories: ['../demo/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: '[name]__[local]--[hash:base64:5]' },
        },
      },
    },
  ],
};
```

:::note
An alternative to manually configuring Storybook would be to initialize a `package.json` and install the dependencies (like, react) that will help Storybook understand the project requirements.
:::

### Manage Storybook dependencies

Storybook dependencies listed in the generated `package.json` file can either be moved to the `workspace.jsonc` (nested in the Dependency Resolver's policy property), or remain in their `package.json` file. Either way, `bit install` will know to read them and install them accordingly.

### Set Story files as dev files

Stories are only used for development and not for runtime. Configure the `devFilePatterns` property of the Dependency Resolver, to consider any dependency of this type as a dev dependency.

```json title="workspace.jsonc"
{
  // ...
  "teambit.dependencies/dependency-resolver": {
    // ...
    "devFilePatterns": ["**/*.spec.ts", "**/*.stories.tsx"]
  }
}
```

### Load stories from component directories

Set the `.storybook/main.js` file, in the workspace directory, to use a glob pattern that fits the way components are structured in a Bit workspace, i.e, one directory for each component.

```js title=".storybook/main.js"
module.exports = {
  stories: ['../demo/**/*.stories.@(js|jsx|ts|tsx)'],
  // ...
};
```

### Create a Story

Create Stories in story files inside their corresponding component directory.

For example:

```bash
└── heading
    ├── heading.composition.tsx
    ├── heading.docs.mdx
    ├── heading.module.scss
    ├── heading.spec.tsx
    ├── heading.stories.tsx
    ├── heading.tsx
    └── index.ts
```

## Use Compositions in a Story

## Use a Story in Compositions

## Limitations
