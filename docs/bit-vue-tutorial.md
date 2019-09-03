---
id: bit-vue-tutorial
title: Bit for Vue
permalink: docs/bit-vue-tutorial.html
redirect_from:
  - "tutorial/Vue-app-tutorial.html"
layout: docs
category: tutorials
---

## Overview

Bit lets you share and sync components between different projects and applications.  
In this tutorial, we'll share a Vue component between two projects.

### Prior Knowledge

This tutorial assumes that you are familiar with:

- Terminal and command line.
- Using node and npm (or yarn).
- Vue development and vue-cli, including editing Vue files in your favorite code editor.
- Git

### What do you need?

You need to verify that you have:  

- Node 10.9+.

To run this tutorial, clone and setup the Vue tutorial project: https://github.com/teambit/bit-vue-tutorial

```bash
git clone https://github.com/teambit/bit-Vue-tutorial
cd bit-Vue-tutorial
npm install
```

### What will you learn?

In this tutorial you will learn how to:  

- Setup Bit
- Share a Vue component from an existing project
- Preview the exported component on the Bit cloud
- Install the component in another project
- Modify the Vue component on the new project
- Update the changed component back to the original project

## Setup Bit  

First things first, we need to setup Bit.

### Create a free bit.dev account  

Head over to [bit.dev](https://bit.dev/) and create your free account. Enter a username and password or use your GitHub account to authenticate.
**Welcome to Bit!**
Make sure that you remember your username, you'll need it during this tutorial. Every time you will see `<username>` - you should replace it with your own username.

### Create a component collection  

When you are logged into bit.dev you can create a **collection**. A collection is a remotely-hosted set of components that are ready to be shared and used across your applications.  

1. Click the **New** button in the header and choose **Collection**.
2. Name the new collection `vue-tutorial` (or choose a different name, as long as you remember it).
3. Decide if the collection is private or public.

- Public - Components in public collections are visible to everyone.
- Private - Components in private collection available to invitees only.

### Install Bit CLI

Install Bit CLI on your computer using npm:

```bash
npm install bit-bin -g
```  

Visit [Install Bit](/docs/installing-bit.html) for other installation methods.

If you have Bit installed, verify the installation by running the command:

```bash
bit --version
```

### Login to your Bit Account

Authenticate Bit to your bit.dev account. From the command line run:

```bash
bit login
```

This will open your browser and will log into your account. If you are already logged in, a success message will be displayed. You are now ready to start using Bit.

As part of the login process, Bit sets up your local configuration. You can see your configuration by typing:

```bash
bit config
```

In addition, Bit adds the npm registry used by Bit to your `npmrc` configuration. (by default located in `$HOME/.npmrc` according to your OS).

### Initialize Bit Workspace

Switch to the Vue tutorial project directory, and run the Bit initialization command:

```bash
$ bit init
successfully initialized a bit workspace.
```

Now two other changes happen:

- A new file named `.bitmap` is created in your root directory. This file is tracking Bit components and only includes a comment and a line with your bit version.

- A new section, `bit`, is added to your `package.json` file setting the following defaults for your project:

```json
"bit": {
  "env": {},
  "componentsDefaultDirectory": "components/{name}",
  "packageManager": "npm"
}
```

> In an actual project, these changes should be committed to your version control tool system.

## Share an Vue Component

Now, we will track the product-list component from the Vue tutorial project. The component will be tracked with the id `product-list`.

### Track a new component  

To track the product list component, we will need to tell Bit about the component and the files that are related to it. In Vue, a component is a typically a single file, so we can directly add this file. We are also telling Bit to track the file under the id product-list

```bash
$ bit add src/components/productList.vue --id product-list
tracking component product-list:
tracking component product-list:
added src/components/productList.vue
```

When creating new components, you need to make sure that Bit properly tracked all the files required for the component. Bit can analyze the component for you and verify that all files are included. You can do that by checking the status of the component:

Our component is using the `src/assets/products.js` - Bit will identify it and alert us:  

```bash
> product-list ...  issues found  
       untracked file dependencies (use "bit add <file>" to track untracked files as components): 
          src/components/ProductList.vue -> src/assets/products.js
```

You will need to add the missing file to the component. In our case, this file is only used by this component, so we will add it to the component. If this file was shared between components, we should track it as a new component.

```bash
$bit add src/assets/products.js --id product-list
tracking component product-list:
added src/assets/products.js
added src/components/productList.vue
```

We are checking the status again:

```bash
$ bit status
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > product-list ... ok
```

### Install Vue Compiler

So far, we have provided Bit with the source file of the component. But in order to consume the files in other projects, the component needs to be built.

>Bit is storing the source code of the component, but the code should still remain in your version control system (VCS) such as your Git repository.

Bit has a large collection of compilers that are open sourced and maintained by Bit team. In addition, the community is suggesting compilers that you can use by searching Bit collections.

To build the vue component, you need the [Vue compiler](https://bit.dev/bit/envs/bundlers/vue). 
Install the compiler and run this command inside the Vue tutorial repository:

```bash
$bit import bit.envs/bundlers/vue --compiler
the following component environments were installed
- bit.envs/bundlers/vue@2.5.1
```

> Version may vary when you run the tutorial

The Vue compiler is now set as the default compiler for the Bit workspace inside this repository.
You can check the `package.json` and verify that the compiler is installed by locating the following entry in the Bit section:

```json
     "env": {
      "compiler": "bit.envs/bundlers/vue@2.5.1"
    },
```

### Build the Vue Component

Now that the compiler is installed, build the component. Building the component serves two purposes:

- Make the component directly consumable by other projects.
- Make sure that the component is all-inclusive and contains all the parts that are required in order to share it with others.

Right now the component lives inside your project and may consume some dependencies from your project.
Bit build is taking place in an **isolated environment** to make sure the process will also succeed on the cloud or in any other project.
To build your component, run this command inside your Vue project:  

```bash
bit build
```

This results in the component name (product-list) followed by the built file of component in the dist directory.

### Export Component

With the component properly built, it is now time to share it with the world.  
Components are versioned according to semver standards.
To Tag your component with a version, run the following command:

```bash
$ bit tag --all 0.0.1
1 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag" to unstage versions)

new components
(first version for components)
     > product-list@0.0.1
```

This command tags all the components that are currently staged in Bit. In our case, it's only the product-list component.

You can check the component status (`bit status`) and you'll find the following:

```bash
$ bit status
staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > product-list. versions: 0.0.1 ... ok
```

The important thing to notice here is that the component is considered `staged`. That means that it is now ready to be exported.

To export the component to your bit.dev collection, we will use the export command and the full name of the collection, structured as  `<username>.<collection>`:

```bash
$ bit export <username>.vue-tutorial
exported 1 components to scope <username>.Vue-tutorial
```

The component is now visible in your collection on bit.dev. You can access it in `https://bit.dev/<username>/Vue-tutorial`. You can also visit the component created for this demo on: https://bit.dev/bit/Vue-tutorial

Checking now the component's status, will no longer display the component as it is now hosted on the remote collection:

```bash
$ bit status
nothing to tag or export
```

If you want to see all the components you have you can run:

```
$ bit list
```

You will get a list of all components and their versions.

Right now, the component code is in your local project (and should be committed to your source control), but it is also available for other projects.

## Preview the Vue Component

The Vue component is also available on the bit.dev cloud. Go to `https://bit.dev` and log into your account (if you are not logged in yet):

1. Select the collections navigator on the left panel and select collections.
2. Click on your collection you׳ll see your component product-list.
3. Click on the product-list component to see it's playground.

You can also access the page in the following url: `https://bit.dev/<username>/vue-tutorial/product-list`

The component playground provides you with a basic Vue app that already has your components. To view your component in the correct app, switch the project type to be View.  

In few seconds you will see the component rendered in the playground. You can view an example [here](https://bit.dev/bit/Vue-tutorial/product-list).

On the component's page, you can also see the different commands available, to install this component using yarn or npm. You can copy the npm command, we are going to use it very soon.  

## Install Component in Another Project

### Create a New Vue Application

You are now going to create another Vue application and use the product-list component. The fastest way to do that is use the Vue CLI (version 3) to generate a new Application. Switch to a new directory.  

```bash
npx @vue/cli create my-new-vue
```

If you already have the vue-cli installed globally you can run: 

```bash
vue create my-new-vue
```

Make sure you are using babel and es6, since the 

In your terminal, switch to the `my-new-app` directory.

### Install the Component in Your Project  

Use your favorite package installer (npm or yarn) to install the component.  
The component is stored in the Bit registry, so the full path to the component will be: `@bit/<username>.<collection name>.<component name>`

Run the install command using npm:

```bash
npm install @bit/<username>.Vue-tutorial.product-list --save
```

The component is now added to your `package.json`: 

```bash
"@bit/<username>.Vue-tutorial.product-list": "0.0.1"
```

### Use In your Application

Now you can use the component in your code, as any import.
Your app component should look like this:

```vue
<template>
  <div id="app">
    <ProductList />
  </div>
</template>

<script>
import ProductList from '@bit/<username>.vue-tutorial.product-list';

export default {
  name: 'app',
  components: {
    ProductList
  }
}
</script>
```

Last, but not least, run your application using Vue CLI:

```bash
npm run serve
```

**Voila!** you can now see the components list inside the newly created application.

## Modify the Component

Next, we are going to make a change to the component and export it back to the collection.
We will add a **View** button to the product list. For simplicity, it will only show an alert saying the product is viewed.

### Import the Component

Up until now, the product-list component was only installed (in its built form) in our project. Now, we want to import the code into our project to make the changes.

In order to import the component, initiate the `my-new-app` workspace as a Bit workspace:

```bash
bit init
```

After the confirmation message that the workspace was initialized, run the following command:

```bash
$ bit import <username>.vue-tutorial/product-list
bit import bit.Vue-tutorial/product-list
successfully imported one component
- added <username>.vue-tutorial/product-list new versions: 0.0.1, currently used version 0.0.1
```

> Notifications on missing core dependencies are ok. You should already have those packages in your project.

The command is also available on the component page.  
Here is what happened:

- A new top level components folder is created that includes the code of the component and its compiled code and node_modules (in this case the node_modules are empty, as all of your node_modules are peer dependencies and are taken from the root project.  
- The `.bitmap` file was modified to include the reference to the component
- The package.json file is modified to point to the files rather than the remote package. Your `package.json` now displays:

```json
"@bit/<username>.Vue-tutorial.product-list": "file:./components/product-list"
```

Start your application to make sure it still works (that is true, no changes are required. Bit takes care of everything).  

### Update the code

Let's modify the product-list component.
Change the `components/product-list/index.js` to include the following method:

```jsx
view() {
    window.alert('The product has been viewed!');
 }
```

Change the `getProduct` function in `components/product-list/index.js` to include the new button:

```jsx
getProduct(product, index) {
        return (
            <div key={index}>
                <h3>
                    <a title={product.name + ' details'} href="/">{product.name}</a>
                </h3>
                <p>Description: {product.description} </p>
                <button className="btn" onClick={this.share}>Share</button>
                <button className="btn" onClick={this.view}>View</button>

            </div>
        )
    }
```

Change the css file `components/product-list/product-list.css` to include a margin on the `.btn`:

```css
  margin: 4px;
```

Run the Vue application:

```bash
npm start
```

The app is not yet changed. The Bit components are compiled by the bit compiler. 
In a separate terminal, run the `bit build` command to compile the changes. You should see that the compiler is installed:

```bash
successfully installed the bit.envs/compilers/Vue@0.1.3 compiler
```

Followed by a successful compilation of all the files.

Run the `my-new-app` again and you can now see the changed component with the `view button`.

> In a real project, it is recommended to commit those changes to your GitHub repository. 

### Export the changes

Next, export the changes done to the component back to bit.dev. 

```bash
bit status
```

The product-list component was modified:

```bash
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > product-list ... ok
```

Tag and export the component as a new version. By default this is a semver `patch` version: 

```bash
$ bit tag product-list
1 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag" to unstage versions)

changed components
(components that got a version bump)
     > <username>.Vue-tutorial/product-list@0.0.2
```

Export it back to the collection:

```bash
$ bit export <username>.Vue-tutorial
exported 1 components to scope <username>.Vue-tutorial
```

Head to the component page on bit.dev, here you can see that the component has a new version. The changes are also visible on the component playground.

## Update the Component in the original project

In this last stage, you are going to import the changes to the original project, switch back to `Vue-tutorial`.

### Import changes

Run `bit import` to see if any components were changed (similar to doing git pull to check git changes).

we will see that the product-list component was changed and a new version exists:

```bash
$ bit import
successfully imported one component
- updated <username>.Vue-tutorial/product-list new versions: 0.0.2
```

The component is downloaded but is not yet changed.
Check the workspace status, you will get the following:

```bash
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit diff [component_id] [new_version]" to compare changes)
(use "bit log [component_id]" to list all available versions)

    > <username>.Vue-tutorial/product-list current: 0.0.1 latest: 0.0.2
```

### Checkout

Merge the changes done to the component to your project. The structure of the command is `bit checkout <version> <component>`. So you run:

```bash
$ bit checkout 0.0.2 product-list
successfully switched <username>.Vue-tutorial/product-list to version 0.0.2
updated src/app/product-list/product-list.component.css
updated src/app/product-list/product-list.component.html
updated src/app/product-list/product-list.component.ts
updated src/app/product-list/product-list.module.ts
updated src/app/product-list/products.ts
```

Bit is performing a git merge, so the code from the updated component is now be merged into your code.

Run the application again, to see it is working properly with the updated component:

```bash
npm start
```

That is it. A change was moved between the two projects. Your application is running with an updated component.  

For questions or help, don't hesitate to [get in touch](https://gitter.im/bit-src/Bit).  

Happy coding!
