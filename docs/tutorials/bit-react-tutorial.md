---
id: bit-react-tutorial
title: Bit for React
---
<img src="../../img/react.svg" height="128">

## Overview

Bit lets you share and sync components between different projects and applications.  
In this tutorial, we'll share a React component between two projects.

### Prior Knowledge

This tutorial assumes that you are familiar with:

- Terminal and command line.
- Using node and npm or yarn.
- React development and React CRA, including editing React files in your favorite code editor.
- Git

### What Do You Need?

You need to verify that you have:  

- Node 8.12+  

To run this tutorial, clone and setup the React tutorial project: https://github.com/teambit/bit-react-tutorial

```shell
git clone https://github.com/teambit/bit-react-tutorial
cd bit-react-tutorial
yarn
```

### What Will You Learn?

In this tutorial you will learn how to:  

- Setup Bit
- Share a React component from an existing project
- Preview the exported component on the Bit cloud
- Install the component in another project
- Modify the React component on the new project
- Get component updates

## Setup Bit  

First things first, we need to setup Bit.

### Create a Free bit.dev Account  

Head over to [bit.dev](https://bit.dev/) and create your free account. Enter a username and password or use your GitHub account to authenticate.
**Welcome to Bit!**
Make sure that you remember your username; you'll need it during this tutorial. Every time you see `<username>`, replace it with your own username.

### Create a Component Collection  

When you are logged into bit.dev you can create a **collection**. A collection is a remotely-hosted set of components that are ready to be shared and used across your applications.  

1. Click the **New** button in the header and choose **Collection**.
2. Name the new collection `react-tutorial` (or choose a different name, as long as you remember it).
3. Decide if the collection is private or public.

- Public - Components in public collections are visible to everyone.
- Private - Components in private collections are available to invitees only.

### Install Bit CLI

Install Bit CLI on your computer using npm:

```shell
npm install bit-bin -g
```  

Visit [Install Bit](/docs/installing-bit.html) for other installation methods.

If you have Bit installed, verify the installation by running the command:

```shell
bit --version
```

### Login to Your Bit Account

Authenticate Bit to your bit.dev account. From the command-line run:

```shell
bit login
```

This will open your browser where you can log into your account. If you are already logged in, a success message will be displayed. You are now ready to start using Bit.

As part of the login process, Bit sets up your local configuration. You can see your configuration by typing:

```shell
bit config
```

In addition, Bit adds the npm registry used by Bit to your `npmrc` configuration. (by default located in `$HOME/.npmrc` according to your OS).

### Initialize Bit Workspace

Switch to the React tutorial project directory and run the Bit initialization command using yarn:

```shell
$ bit init --package-manager yarn
successfully initialized a bit workspace.
```

> We are going to use create-react-app, so it is recommended to use yarn. If you do not have Yarn installed, you can safely use npm.  

Now two other changes happen:

- A new file named `.bitmap` has been created in your root directory. This file tracks Bit components and only includes a comment and a line with your bit version.

- A new section, `bit`, has been added to your `package.json` file with the following defaults for your project:

```json
{
  "bit": {
    "env": {},
    "componentsDefaultDirectory": "components/{name}",
    "packageManager": "yarn"
  }
}

```

> In an actual project, these changes should be committed to your version control tool system.

## Share a React Component

Now, we will track the product-list component from the React tutorial project. The component will be tracked with the id `product-list`.

### Track a New Component  

To track the product list component, we will need to tell Bit about the component and the files that are related to it. As all the files are located under the product-list directory, the simplest way is to add all the files in the directory to your component. Bit will create a component named after the directory name.

```shell
$ bit add src/components/product-list
tracking component product-list:
added src/components/product-list/index.js
added src/components/product-list/product-list.css
added src/components/product-list/products.js
```

When creating new components, you need to make sure that you have properly added all of the files required for the component. Bit can analyze the component for you and verify that all files are included. You can do that by checking the status of the component:

```shell
$ bit status
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > product-list ... ok
```

> We also added the `products.js` file that contains product data. In this demo application, it is acceptable as the file is used only by the product-list component. In other cases, however, if this file were used by multiple components you may want to consider creating the `products.js` file as a separate component that will become a dependency of the product-list and other components.

### Install React Compiler

So far, we have provided Bit with the source file of the component. But in order to consume the files in other projects, the component needs to be built.

>Bit is storing the source code of the component, but the code should still remain in your version control system (VCS) such as your Git repository.

Bit has a large collection of compilers that are open source and maintained by the Bit team. In addition, the community has created compilers that you can use by searching [Bit collections](https://bit.dev/).

For building the React component, you'll need the [React compiler](https://bit.dev/bit/envs/compilers/react).  
Install the compiler and run this command inside the React tutorial repository:

```shell
$ bit import bit.envs/compilers/react --compiler
the following component environments were installed
- bit.envs/react@0.1.3
```

> The version may slightly vary when you run the tutorial

The React compiler is now set as the default compiler for the Bit workspace inside this repository.
You can check the `package.json` and verify that the compiler is installed by locating the following entry in the Bit section:

```json
{
  "env": {
    "compiler": "bit.envs/compilers/react@1.0.2"
  },
}
```

### Build the React Component

Now that the compiler is installed, build the component. Building the component serves two purposes:

- Make the component directly consumable by other projects.
- Make sure that the component is all-inclusive and contains all the parts that are required in order to share it with others.

Right now the component lives inside your project and may consume some dependencies from your project.
Bit build is taking place in an **isolated environment** to make sure the process will also succeed on the cloud or in any other project.
To build your component, run this command inside your react project: 

```shell
bit build
```

This results in the component name (product-list) followed by a list of file names. Those are the built files of the component.

### Export Component

With the component properly built, it is now time to share it with the world.  
Components are versioned according to SemVer standards.
To tag your component with a version, run the following command:

```shell
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

```shell
$ bit status
staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > product-list. versions: 0.0.1 ... ok
```

The important thing to notice here is that the component is considered `staged`. That means that it is now ready to be exported.

To export the component to your bit.dev collection, we will use the export command and the full name of the collection, structured as  `<username>.<collection>`:

```shell
$ bit export <username>.react-tutorial
exported 1 components to scope <username>.react-tutorial
```

The component is now visible in your collection on bit.dev. You can access it in `https://bit.dev/<username>/react-tutorial`. You can also visit the component created for this demo on: https://bit.dev/learn-bit/react-tutorial

At this point, checking bit's status will no longer display the component as the component is now hosted on the remote collection:

```shell
$ bit status
nothing to tag or export
```

If you want to see all the components you have you can run:

```shell
bit list
```

You will get a list of all components and their versions.

Right now, the component code is in your local project (and should be committed to your source control), but it is also available for other projects.

## Preview the React Component

The React component is also available on the bit.dev cloud. Go to [`https://bit.dev`](https://bit.dev) and log into your account (if you are not logged in yet):

1. Select the collections navigator on the left panel and select collections.
2. Click on your collection--you׳ll see your product-list component.
3. Click on the product-list component to see its playground.

You can also access the page at the following url: `https://bit.dev/<username>/react-tutorial/product-list`

The component playground provides you with a basic React app that already has your components.  

You can improve it a bit by adding a new file named `styles.css` with the following style:

```css
#anchor {
  flex-direction: column;
}
```

Import `styles.css` into the `index.js` file in the playground: 

```javascript
import './styles.css';
```

**Save the example**

In few seconds you will see the component rendered in the playground. You can view an example [here](https://bit.dev/lean-bit/react-tutorial/product-list).

On the component's page, you can also see the different commands available for installing this component using yarn or npm. You can copy the yarn command; we are going to use it very soon. 

## Install Component in Another Project

### Create a New React Application

You are now going to create another react application and use the product-list component. The fastest way to do that is to use the React CLI to generate a new Application. Switch to a new directory. 

```shell
npx create-react-app my-new-app
```

In your terminal, switch to the `my-new-app` directory.

### Install the Component in Your Project  

Use your favorite package installer (yarn is preferred) to install the component.  
The component is stored in the Bit registry, so the full path to the component will be: `@bit/<username>.<collection name>.<component name>`

Run the install command using yarn:

```shell
yarn add @bit/<username>.react-tutorial.product-list --save
```

> If you want to use npm, run `npm install` once after the project is created so a package-lock.json will be created and npm will organize dependencies correctly.  

The component is now added to your `package.json`:  

```shell
"@bit/<username>.react-tutorial.product-list": "0.0.1"
```

### Use In Your Application

Now you can use the component in your code, just like any other import.
Add it as a module to the top level app module and use it on the app page.
We will make the same changes in the code as we did on the playground in the application:

```javascript
// App.js
import ProductList from '@bit/<username>.react-tutorial.product-list';
function App() {
  return (
    <div className="App">
      <ProductList/>
    </div>
  );
}
```

Update the css file:

```css
.App {
  flex-direction: column;
  margin: 20px;
}
```

Last but not least, run your application using React CLI:

```shell
yarn start
```

**Voila!** You can now see the components list inside the newly created application.

## Modify the Component

Next, we are going to make a change to the component and export it back to the collection.
We will add a **View** button to the product list. For simplicity, it will only show an alert saying the product has been viewed.

### Import the Component

Up until now, the product-list component was only installed (in its built form) in our project. Now, we want to import the code into our project to make the changes.

In order to import the component, initiate the `my-new-app` workspace as a Bit workspace:

```shell
bit init
```

After the confirmation message that the workspace was initialized, run the following command:

```shell
$ bit import <username>.react-tutorial/product-list
successfully imported one component
- added <username>.react-tutorial/product-list new versions: 0.0.1, currently used version 0.0.1
```

> Notifications on missing core dependencies are ok. You should already have those packages in your project.

The command is also available on the component page.  

You get a message that the `@react/core` and `@react/common` are peer dependencies. This is ok, as your `my-new-app` project already contains them.

Here is what happened:

- A new top-level components folder is created that includes the code of the component, with its compiled code and node_modules (in this case the node_modules are empty, as all of your node_modules are peer dependencies and are taken from the root project).  
- The `.bitmap` file was modified to include the reference to the component
- The package.json file is modified to point to the files rather than the remote package. Your `package.json` now displays:

```json
{
  "@bit/<username>.react-tutorial.product-list": "file:./components/product-list"
}
```

Start your application to make sure it still works. As you'll see, no changes are required: Bit takes care of everything.

### Update the Code

Let's modify the product-list component.
Change the `components/product-list/index.js` to include the following method:

```javascript
view() {
    window.alert('The product has been viewed!');
 }
```

Change the `getProduct` function in `components/product-list/index.js` to include the new button:

```javascript
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

Run the React application:

```shell
yarn start
```

The app is not yet changed. That's because the Bit components are compiled by the bit compiler. 
In a separate terminal, run the `bit build` command to compile the changes. You should see that the compiler is installed:

```shell
successfully installed the bit.envs/compilers/react@0.1.3 compiler
```

That will be followed by a successful compilation of all of the files.

Run the `my-new-app` again and you'll now see the changed component with the view button.

> In a real project, it is recommended to commit those changes to your GitHub repository. 

### Export the Changes

Next, export the changes done to the component back to [bit.dev](https://bit.dev/). 

```shell
bit status
```

The product-list component was modified:

```shell
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > product-list ... ok
```

Tag and export the component as a new version. By default this is a SemVer `patch` version:  

```shell
$ bit tag product-list
1 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag" to unstage versions)

changed components
(components that got a version bump)
     > <username>.react-tutorial/product-list@0.0.2
```

Export it back to the collection:

```shell
$ bit export <username>.react-tutorial
exported 1 components to scope <username>.react-tutorial
```

Head to the component page on [bit.dev](https://bit.dev/). Here you can see that the component has a new version. The changes are also visible on the component playground. You can see an example [here](https://bit.dev/learn-bit/react-tutorial/product-list?version=0.0.2)

## Get Component Updates

In this last stage, you'll import the changes to the original project. Switch back to `React-tutorial`.

### Import Changes

Run `bit import` to see if any components were changed (similar to doing git pull to check git changes).

We will see that the product-list component was changed and a new version exists:

```shell
$ bit import
successfully imported one component
- updated <username>.react-tutorial/product-list new versions: 0.0.2
```

The component is downloaded but is not yet changed.
Check the workspace status, you will get the following:

```shell
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit diff [component_id] [new_version]" to compare changes)
(use "bit log [component_id]" to list all available versions)

    > <username>.react-tutorial/product-list current: 0.0.1 latest: 0.0.2
```

### Checkout

Merge the changes done to the component to your project. The structure of the command is `bit checkout <version> <component>`. So you run:

```shell
$ bit checkout 0.0.2 product-list
successfully switched <username>.react-tutorial/product-list to version 0.0.2
updated src/app/product-list/product-list.component.css
updated src/app/product-list/product-list.component.html
updated src/app/product-list/product-list.component.ts
updated src/app/product-list/product-list.module.ts
updated src/app/product-list/products.ts
```

Bit performs a git merge. The code from the updated component is now merged into your code.

Run the application again to see it is working properly with the updated component:

```shell
yarn start
```

That's it. A change was moved between the two projects. Your application is running with an updated component.  

Happy coding!
