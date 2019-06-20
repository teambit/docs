---
id: angular-components
title: Share Angular Components
sidebar_label: Share Angular Components
---

## Overview
Bit enables you to share and sync source code components between different repositories and projects. In this tutorial we will share an angular component between two projects. 

### What you will need? 
In order to run this tutorial you will need 2 projects where you will share the component between. The first project will be an angular store and the other one will be a newly created angular project. 
To run this tutuorial, you will need to clone and setup the angular store project: https://github.com/teambit/angular-store-tutorial
```bash 
git clone https://github.com/teambit/angular-store-tutorial
cd angular-store-tutorial
npm install
```

### What you will learn? 

In this tutorial you will learn how to: 
- Setup Bit
- Export an angular component from an existing project
- Share the angular component to the bit.dev cloud
- Preview the exported component on the bit cloud
- Import the component into another project
- Update the Angular component on the original project
- Consume the changed component in the other project

## Setup Bit

First, we will need to setup Bit. 

### Create a Bit Cloud account and collection
head over to the Bit cloud(https://bit.dev/) and create your account. Enter your username and password, or use your github credentials. 

Click on the collections icon on the left pane and create a new collection. You can create a public collection that will be visible for everyone, or you may create a private collection. 
In order to follow the tutorial you will need to capture the username and the collection name, as we will reference them in future commands. 

### Install Bit Cli

Install Bit cli using the 
[Install Bit](/docs/installing-bit.html) on your computer.

If you have already installed Bit, please verify the installation by running the following command:

```bash
$ bit --version
```

### Login into Bit Account

Now you will need to log into your bit account. run from the command line 

```bash
bit login
```
This will open your browser and will login into your account. You are now ready to start using bit. 

As part of the login process, Bit will setup your local configuration. You can see your configuration by typing: 

```bash
bit config
```

In addition, bit will add the npm registry used by bit to your npmrc configuration (by default this is located in `~/.npmrc`). 

### Initialize Bit Workspace
Now go into the angular store project you copied before and switch to the repository. 

while you are inside the repository run the bit initialization command: 
```bash 
bit init
```
You should recieve a message stating: 
```
successfully initialized a bit workspace.
```

In addition the following 2 changes will happen: 
- A new file will be created named `.bitmap` in your root directory. This file is tracking bit components and it will only include a comment and a line with your bit version. 
- A new section `bit` will be added to your `package.json` file setting the following defaults for your project: 
```json
"bit": {
    "env": {},
    "componentsDefaultDirectory": "components/{name}",
    "packageManager": "npm"
  }
```
> These 2 changes should be commited into your version control tool. 
 
## Export an Angular component from the store project

### Track a new component
We are going to track the product-list component from the angular project. 
The component will be tracked with the id `app/product-list`. 

We need to tell bit about the component and its relevant files. We will add all the files in the product-list directory to our component, as well as specify the id and the entry point file:
```bash
bit add src/app/product-list/*.* --id app/product-list --main src/app/product-list/product-list.component.ts
```

Bit will result the following message: 
```bash
tracking component app/product-list:
added src/app/product-list/product-list.component.css
added src/app/product-list/product-list.component.html
added src/app/product-list/product-list.component.ts
```

When creating new components, we need to make sure that we have properly added all the files that are required for the component. Bit is analyzing all the dependencies and will emit the status of the component: 
```bash
bit status
```
Our component is using the `src/app/products.ts` file and bit will emit the status message: 

```bash
> app/product-list ...  issues found       
   untracked file dependencies (use "bit add <file>" to track untracked files as components): 
    src/app/product-list/product-list.component.ts -> src/app/products.ts
```

We will need to add the missing file to our component: 
```bash 
bit add src/app/products.ts --id app/product-list
```
Bit will show us all the files that are tracked in the component and by checking the status again we will get  the following message: 
```bash
> app/product-list ... ok
```
### Build the component

Bit is now tracking the source files of the component. In order to be consumed, the component need to be built. Bit has published a large variety of compilers that can compile the code. For the angular component, we will 


In order to make sure our component is properly isolated, we will need to add the Bit Angular compiler. We will set this compiler 

In the above 

➜  angular-store git:(master) ✗ bit s
new components
(use "bit tag --all [version]" to lock a version with all your changes)


see troubleshooting at https://docs.bit.dev/docs/troubleshooting-isolating.html
➜  angular-store git:(master) ✗ bit add src/app/product-list/*.* --id app/product-list --main src/app/product-list/product-list.component.ts
➜  angular-store git:(master) ✗ bit add src/app/products.ts --id app/product-list
tracking component app/product-list:
added src/app/product-list/product-list.component.css
added src/app/product-list/product-list.component.html
added src/app/product-list/product-list.component.ts
added src/app/products.ts
➜  angular-store git:(master) ✗ bit s                                            
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > app/product-list ... ok
➜  angular-store git:(master) ✗ 




### Compiling components

> **Why & What are Build environments**
>
> A React component needs to be compiled so it can run on a browser.
> **Build** environment is a 'build task` that Bit uses to run and compile the component. To learn more, see [build components](/docs/building-components.html).
>
> A *built* component can then be [consumed as a node module](/docs/installing-components-using-package-managers.html) directly from [bit.dev](https://bit.dev) using NPM or Yarn.

Bit has multiple build environments and bundlers available for your use, hosted as Bit components in a collection called ["envs"](https://bit.dev/bit/envs).

Add an environment by using the [Import](/docs/cli-import.html#import-a-single-component-from-a-remote-scope) command suffixed with the relevant flag. This will ensure all components in your local workspace will have the same  environment.

```bash
$ bit import bit.envs/compilers/react -c

the following component environments were installed
- bit.envs/compilers/react@0.0.14
```

To build the `ui/button` component, run the bit build command:

```bash
$ bit build ui/button

/Users/../tutorial-react/export-button/dist/src/ui/button.js
```

### Tag Component Version

Bit has the ability to [lock your components](/docs/versioning-tracked-components.html) state, by using the [bit tag](/docs/cli-tag.html) command (similar to [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging)). Tagging a component will lock the dependencies of the component, create a version and prepare it for export.

If you like it, better put a tag on it!

```bash
$ bit tag ui/button

1 components tagged | 1 added, 0 changed, 0 auto-tagged
added components:  ui/button@0.0.1
```

After tagging your component, you can check your status:

```bash
$ bit status

staged components
     > ui/button. versions: 0.0.1... ok

```

You can see that the component is now in the staged area. The components in this area are version locked and ready for export.
Before you continue, check that you have a [collection](/docs/scopes-on-bitsrc.html#scopes) ready for the new component you are about to export.

### Create Collection

To export a component, you need to specify a [collection](/docs/scopes-on-bitsrc.html#scopes) to export your component to.

A [collection](/docs/scopes-on-bitsrc.html#scopes) is a remote directory that stores components that you create in order to share and track your components. Other developers can then access your public collection and use your components. You can view a collection example in the [tutorial project collection](https://bit.dev/odedreuveny/example).

### Share components

You can share components from your project to a collection by using the `bit export` command.
In this example, our [bit.dev](https://bit.dev) username is [wonderwoman](https://bit.dev/wonderwoman) and the collection is [diana](https://bit.dev/wonderwoman/diana):

```bash
$ bit export wonderwoman.diana

exported 1 components to scope wonderwoman.diana
```

Once the component is exported, you can see it in your collection at [bit.dev](https://bit.dev).

If you [check status](/docs/cli-status.html), you can see the component is not displayed.
Bit has created a copy of the component, along with all its dependencies, the component is now hosted in your remote collection.

```bash
$ bit status
nothing to tag or export
```

Go to your [bit.dev.io](https://bit.dev) profile to view your collection and the exported component. Your collection should look like [this](https://bit.dev/odedreuveny/example/ui/button). Your component is now available for other developers to import and use freely.

## Install Components

> Learn more about [Installing Components using Package Managers](/docs/installing-components-using-package-managers.html)

We’ve created a bare [create-react-app](https://github.com/facebookincubator/create-react-app) project for you inside the repo called `import-button`. This is where you're going to consume your newly exported React component.

In your terminal, navigate to the `import-Button` project directory and `npm install`:

```bash
$ cd ../import-button
$ npm install # or yarn install
```

Now you can use npm or yarn in order to install your components.

```bash
$ npm install @bit/wonderwoman.diana.ui.button
```

### Use in your project

In your code editor open the `src/App.js` file and update  the `Import` statement:

```js
import Button from '@bit/wonderwoman.diana.ui.button';
```

Call the node module:

```js
<Button />
```

Your `src/App.js` should look like this:

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@bit/wonderwoman.diana.ui.button';

class App extends Component {
 render() {
   return (
     <div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <h1 className="App-title">Welcome to React</h1>
       </header>
       <p className="App-intro">
         To get started, edit <code>src/App.js</code> and save to reload.
       </p>
       <Button />
     </div>
   );
 }
}

export default App;
```

Run your project:

```bash
$ npm start
```

You can see the button component rendered in your project.

## Modify Components

You can modify the imported React component (`ui/button`) in the consuming project located locally (in this tutorial the `import-button` project), and export it back to the remote collection.

### Initialize Bit in the consuming project

Bit allows developers to source components into other projects and to either use these components or modify them according to their needs. Sourcing components is done with the [bit import](/docs/cli-import.html) command.

In this tutorial the consuming project is the`import-button` project. Initialize Bit in it.

```bash
$ bit init

successfully initialized an empty bit workspace.
```

### Import component

Use the `bit import` command to source your component to the project.

```bash
$ bit import wonderwoman.diana/ui/button --path src/components/ui/button

successfully ran npm install at /Users/../tutorial-react/import-button/src/components

successfully imported one component
- wonderwoman.diana/ui/button@0.0.1
```

Run `npm start` to see that the project renders just the same.

```bash
$ npm start
```

Open your code editor to view the updated source tree. In your tree you can see a new directory `src\components`, this directory holds the sourced component within its isolated component environment.

> **Configurations for Imported Components**
>
> To configure the way your project  handles imported component's `dist` files, dependencies and packages, please see [here](/docs/conf-bit-json.html).

#### How Does it Work

After installing a component using npm, use the `bit import`command in your code. Bit identifies the imported component as a `bit component` and replace the component's node module with a symlink to the location of the sourced component.

```bash
$ tree node_modules/@bit

node_modules/@bit
└── wonderwoman.diana.ui.button -> /Users/../tutorial-react/import-button/src/components
1 directory, 0 files
```

Your `import` statement now refers to the sourced component. Every time you use `bit import` in a project, Bit will create a symlink to the component in your node modules directory. You can use absolute `import` statements to use sourced components.

### Modify imported component

Update the `button.js` component from the **consuming** project (e.g `import-button`) and [export](/docs/cli-export.html) the changed component back to the remote collection you've created.

Open your IDE and navigate to the file `src/components/button.js`, update the default properties section of the button to:

```js
Button.defaultProps = {
  text: 'Go Diana',
  buttonColor: "rgba(161, 188, 202, 0.34)",
  buttonHoverColor: "rgb(119, 148, 162)"
}
```

In your terminal run:

```bash
npm start
```

> **Note**
>
>Changes are not updated on your browser, yet...

#### Build your "dist" files to reflect the changes in your source code

When modifying an imported component with a build environment, changes you make are not immediately updated, since Bit links your code to the component's `dist` directory and **not** to the source code. To update the component's `dist` rebuild the component using the [bit build](/docs/cli-build.html) command:

```bash
$ bit build

successfully installed the bit.envs/compilers/react@0.0.14 compiler
wonderwoman.diana/ui/button@0.0.1
/Users/../tutorial-react/import-button/src/components/dist/button.js.map
/Users/../tutorial-react/import-button/src/components/dist/button.js
```

Now run:

```bash
$ npm start
```

Take a look at your browser and see the changes, as expected!

### Tag a new version

Now that you have a modification in the source of the component, run the `status` command again, to see that Bit changes the component's state.

```bash
$ bit status
modified components
     > ui/button ... ok
```

A simple `bit tag` command will lock a new version for the component with this change.

```bash
$ bit tag --all

1 components tagged | 0 added, 1 changed, 0 auto-tagged
changed components:  ui/button@0.0.2
```

### Export component

To export the component new version, use the `bit export` command again, but now add the flag `--eject`. This flag allows Bit to replace the component node module with the exported version, so that your project will have less code and clutter.

```bash
$ bit export wonderwoman.diana ui/button --eject

exported 1 components to scope wonderwoman.diana
```

Open your IDE and see that the component is no longer a part of it, and was added to your project's `package.json` file.

Check your collection in [bit.dev](https://bit.dev), you can see that there is a new version for the React component.

## Import updated component

Now you can use the updated React component, and import it into the `export-button` project. By doing so, you will receive the updates exported to the remote collection into your local project as well.

In your terminal, go to the `export-button` project:

```bash
$ cd ../export-button
```

Now update your component by re-importing:

```bash
$ bit import wonderwoman.diana/ui/button

successfully imported one component
- wonderwoman.diana/ui/button@0.0.2
```

Run the project again, and see that it is renders the updated button:

```bash
$ npm start
```
