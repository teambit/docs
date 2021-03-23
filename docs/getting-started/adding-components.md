---
id: adding-components
title: Adding Components
---

In order for your components to be visible in your local workspace we need to add them them.

## Adding Components to the Workspace

To add your components to the workspace we use the `bit add` command followed by the namespace. The namespace is the the component folder structure you would like to see in your workspace.

```shell
bit add button --namespace ui/button
```

When we add a component we will see in the terminal a message saying our component was added and will show the list of files that were added.

```shell
tracking component ui/button:
added index.ts
added button.composition.tsx
added button.tsx
```

Once we have added our component we can then look inside our .bitmap file, which we will find at our project root level, and we can see that our component was added here. 

## Show our Component

We can use the `bit show` command followed by our ComponentID.

```shell
bit show button
```

The show command will show us what bit has created when we added our component.

## Starting the dev server

The start command starts our dev server, compiles our component and watches for changes using Hot Module Replacement. It runs different workspace tasks through workers, such as testing, linters and any workspace tasks that are defined by the component.

```shell
bit start
```

This will open-up your browser on `localhost:3000` (or any other available port) and display your workspace and tracked (added) components. 

The first time you run the start command it can take a bit of time as it needs to build the whole UI. 

After running the start command you can go to your node modules folder in your project and we will see your component inside your scope directory which in this case is my-scope.
