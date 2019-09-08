---
id: bit-angular-tutorial
title: Bit for Angular
---

> **Angular support is in public beta.**  
> Everything should work fine, but please do share any issues and feedback: support@bit.dev

## Overview

Bit lets you share and sync components between different projects and applications.  
In this tutorial, we'll share an Angular component between two projects.

### Prior Knowledge

This tutorial assumes that you are familiar with:

- Terminal and command line.
- Using node and npm (or yarn).
- Angular development and the Angular CLI, including editing Angular files in your favorite code editor.
- Git

### What do you need?

This tutorial is based on Angular 8. You need to verify that you have:  

- Node 10.9+ (pre-requisite for Angular 8).
- The Angular tutorial project (see below).

To run this tutorial, clone and setup the Angular tutorial project: https://github.com/teambit/bit-angular-tutorial

```bash
$ git clone https://github.com/teambit/bit-angular-tutorial
$ cd bit-angular-tutorial
$ npm install
```

### What will you learn?

In this tutorial you will learn how to:  

- Setup Bit
- Share an angular component from an existing project
- Preview the exported component on the Bit cloud
- Install the component in another project
- Modify the Angular component on the new project
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
2. Name the new collection `angular-tutorial` (or choose a different name, as long as you remember it).
3. Decide if the collection is private or public.

- Public - Components in public collections are visible to everyone.
- Private - Components in private collection available to invitees only.

### Install Bit CLI

Install Bit CLI on your computer using npm:

```bash
$ npm install bit-bin -g
```  

Visit [Install Bit](/docs/installing-bit.html) for other installation methods.

If you have Bit installed, verify the installation by running the command:

```bash
$ bit --version
```

### Login to your Bit Account

Authenticate Bit to your bit.dev account. From the command line run:

```bash
$ bit login
```

This will open your browser and will log into your account. If you are already logged in, a success message will be displayed. You are now ready to start using Bit.

As part of the login process, Bit sets up your local configuration. You can see your configuration by typing:

```bash
$ bit config
```

In addition, Bit adds the npm registry used by Bit to your `npmrc` configuration. (by default located in `$HOME/.npmrc` according to your OS).

### Initialize Bit Workspace

Switch to the Angular tutorial project directory, and run the Bit initialization command:

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

## Share an Angular Component

Now, we will track the product-list component from the Angular tutorial project. The component will be tracked with the id `product-list`.

### Track a new component  

To track the product list component, we will need to tell Bit about the component and the files that are related to it. As all the files are located under the product-list directory, the simplest way is to add all the files in the directory to your component. Bit will create a component named by the directory name.

For Angular components, we also need to specify the component entry point, which in most cases will be the file containing the ngModule. In this case it is the `product-list.module.ts` file. Run the following command:

```bash
$ bit add src/app/product-list  --main src/app/product-list/product-list.module.ts
tracking component product-list:
added src/app/product-list/product-list.component.css
added src/app/product-list/product-list.component.html
added src/app/product-list/product-list.component.ts
added src/app/product-list/product-list.module.ts
added src/app/product-list/products.ts
```

When creating new components, you need to make sure that you have properly added all the files required for the component. Bit can analyze the component for you and verify that all files are included. You can do that by checking the status of the component:

```bash
$ bit status
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > product-list ... ok
```

> We also added the products.ts file that contains product data. In this demo application, it is acceptable as the file is used only by the product-list component. In other cases, however, if this file is used by multiple components, you may want to consider creating `products.ts` file as a separate component that will become a dependency of the product-list and other components.

### Install Angular Compiler

So far, we have provided Bit with the source file of the component. But in order to consume the files in other projects, the component needs to be built.

>Bit is storing the source code of the component, but the code should still remain in your version control system (VCS) such as your Git repository.

Bit has a large collection of compilers that are open sourced and maintained by Bit team. In addition, the community is suggesting compilers that you can use by searching Bit collections.

For building the Angular component, you'll need the [Angular compiler](https://bit.dev/bit/envs/compilers/angular). This compiler is based on [ng-packager](https://github.com/ng-packagr/ng-packagr), the same tool used by Angular CLI to bundle packages to npm.

Install the compiler and run this command inside the Angular tutorial repository:

```bash
$ bit import bit.envs/compilers/angular --compiler 
the following component environments were installed
- bit.envs/compilers/angular@0.1.2
```

> Version may slightly vary when you run the tutorial

The Angular compiler is now set as the default compiler for the Bit workspace inside this repository.
You can check the package.json and verify that the compiler is installed by locating the following entry in the Bit section:

```json
     "env": {
      "compiler": "bit.envs/compilers/angular@0.1.2"
    },
```

### Build the Angular Component

Now that the compiler is installed, build the component. Building the component serves two purposes:

- Make the component directly consumable by other projects.
- Make sure that the component is all-inclusive and contains all the parts that are required in order to share it with others.

Right now the component lives inside your project and may consume some dependencies from your project.
Bit build is taking place in an **isolated environment** to make sure the process will also succeed on the cloud or in any other project.
To build your component, run this command inside your angular project: 

```bash
$ bit build
```

This results in the component name (product-list) followed by a list of file names. Those are the built files of your the component.

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
$ bit export <username>.angular-tutorial
exported 1 components to scope <username>.angular-tutorial
```

The component is now visible in your collection on bit.dev. You can access it in `https://bit.dev/<username>/angular-tutorial`. You can also visit the component created for this demo on: https://bit.dev/bit/angular-tutorial

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

## Preview the Angular Component

The Angular component is also available on the bit.dev cloud. Go to `https://bit.dev` and log into your account (if you are not logged in yet):

1. Select the collections navigator on the left panel and select collections.
2. Click on your collection you׳ll see your component product-list.
3. Click on the product-list component to see it's playground.

You can also access the page in the following url: `https://bit.dev/<username>/angular-tutorial/product-list

The component playground provides you with a basic Angular app (you may recognize the sample as the app provided by Angular CLI).
We will modify this application to display the product-list component. Make sure you are in the **Overview** section.  

> The Bit playground is now only supporting Angular 8+ projects.  

### Edit a project Example

The project is automatically recognized as an Angular project.  

We will modify the `app.module.ts` file to import our product-list module. Change this line:

```typescript=
import ProductList from '@bit/<username>.angular-tutorial.product-list';
```

to this line:

```typescript=
import {ProductListModule} from '@bit/<username>.angular-tutorial.product-list';
```

Add the module to the Module's `imports` section:

```typescript=
    imports: [
        BrowserModule,
        ProductListModule
    ],
```

The `app.module.ts` should look like this:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListModule } from '@bit/bit.angular-tutorial.product-list';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ProductListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

Modify the `app.component.html` and replace its contents with:

```html
<app-product-list></app-product-list>
```

**Save the example**

In few seconds you will see the component rendered in the playground. You can view an example [here](https://bit.dev/bit/angular-tutorial/product-list).

On the component's page, you can also see the different commands available, to install this component using yarn or npm. You can copy the npm command, we are going to use it very soon. 

## Install Component in Another Project

### Create a New Angular Application

You are now going to create another angular application and use the product-list component. The fastest way to do that is use the Angular CLI to generate a new Application. Switch to a new directory. 

If you already have the Angular-cli installed globally you can just run

```bash
$ ng new my-new-app
```

If you do not have the angular-cli installed globally and you do not want to install it, you can use [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) to install it temporarily:

```bash
$ npx --package @angular/cli ng new my-new-app
```

For the purpose of this demo, you can skip router and select css for styling.
In your terminal, switch to the `my-new-app` directory.

### Install the Component in Your Project  

Use your favorite package installer (npm or yarn) to install the component. 
The component is stored in the Bit registry, so the full path to the component will be: `@bit/<username>.<collection name>.<component name>`

Run the install command using npm:

```bash
$ npm install @bit/<username>.angular-tutorial.product-list --save
```

The component is now added to your `package.json`: 

```bash
"@bit/<username>.angular-tutorial.product-list": "0.0.1"
```

### Use In your Application

Now you can use the component in your code, as any import.
Add it as a module to the top level app module and use it on the app page.
We will make the same changes in the code as we did on the playground in the application:

```typescript
// app.module.ts
import { ProductListModule } from '@bit/<username>.angular-tutorial.product-list';
```

Add the `ProductListModule` in your app module imports section: 

```typescript=
    imports: [
        BrowserModule,
        ProductListModule
    ],
```

All is left now is to add the product-list component to the app html file. You can replace all existing content with the line above, or add it on the html page.

```html
// src/app/app.component.html
<app-product-list></app-product-list>
```

Last, but not least, run your application using Angular CLI:

```bash
$ npm run start
```

**Voila!** you can now see the components list inside the newly created application. 

## Modify the Component

Next, we are going to make a change to the component and export it back to the collection. 
We will add a **View** button to the product list. For simplicity, it will only show an alert saying the product is viewed.


### Import the Component

Up until now, the product-list component was only installed (in its built form) in our project. Now, we want to import the code into our project to make the changes. 

In order to import the component, initiate the `my-new-app` workspace as a Bit workspace: 

```bash=
$ bit init
```

After the confirmation message that the workspace was initialized, run the following command:

```bash
$ bit import <username>.angular-tutorial/product-list
bit import bit.angular-tutorial/product-list
successfully imported one component
- added bit.angular-tutorial/product-list new versions: 0.0.1, currently used version 0.0.1
```

> Notifications on missing core dependencies are ok. You should already have those packages in your project. 

The command is also available on the component page.  

You will get a message that the `@angular/core` and `@angular/common` are peer dependencies. This is ok, as your `my-new-app` project already contains them.

Here is what happened:

- A new top level components folder is created that includes the code of the component and its compiled code and node_modules (in this case the node_modules are empty, as all of your node_modules are peer dependencies and are taken from the root project.  
- The `.bitmap` file was modified to include the reference to the component
- The package.json file is modified to point to the files rather than the remote package. Your `package.json` now displays: 

```json
"@bit/<username>.angular-tutorial.product-list": "file:./components/product-list"
```

Start your application to make sure it still works (that is true, no changes are required. Bit takes care of everything).  

### Update the code

Let's modify the product-list component.
Change the `components/product-list/product-list.component.ts` to include the following method:

```typescript=
view() {
    window.alert('The product has been viewed!');
 }
```

Change the `components/product-list/product-list.component.html` to include the following part after the `share button`:

```typescript
    <button (click)="view()">
        View
    </button>
```

Change the css to contain a margin on the `button`:

```css=
  margin: 4px;
```

Run the Angular application:

```bash
 $ npm run start
```

The app is not yet changed. The Bit components are compiled by the bit compiler. 
In a separate terminal, run the `bit build` command to compile the changes. You should see that the compiler is installed:

```bash
successfully installed the bit.envs/compilers/angular@0.1.2 compiler
```

Followed by a successful compilation of all the files.

Your angular project will refresh, and you can now see the changed component with the `view button`.

> In a real project, it is recommended to commit those changes to your GitHub repository. 

### Export the changes
Next, export the changes done to the component back to bit.dev. 

```bash
$ bit status
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
     > <username>.angular-tutorial/product-list@0.0.2
```

Export it back to the collection:

```bash
$ bit export <username>.angular-tutorial
exported 1 components to scope <username>.angular-tutorial
```

Head to the component page on bit.dev, here you can see that the component has a new version. The changes are also visible on the component playground. 

## Update the Component in the original project

In this last stage, you are going to import the changes to the original project, switch back to `Angular-tutorial`.

### Import changes

Run `bit import` to see if any components were changed (similar to doing git pull to check git changes).

we will see that the product-list component was changed and a new version exists: 

```bash
$ bit import
successfully imported one component
- updated <username>.angular-tutorial/product-list new versions: 0.0.2
```

The component is downloaded but is not yet changed. 
Check the workspace status, you will get the following: 

```bash
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit diff [component_id] [new_version]" to compare changes)
(use "bit log [component_id]" to list all available versions)

    > <username>.angular-tutorial/product-list current: 0.0.1 latest: 0.0.2
```

### Checkout

Merge the changes done to the component to your project. The structure of the command is `bit checkout <version> <component>`. So you run:

```bash
$ bit checkout 0.0.2 product-list
successfully switched <username>.angular-tutorial/product-list to version 0.0.2
updated src/app/product-list/product-list.component.css
updated src/app/product-list/product-list.component.html
updated src/app/product-list/product-list.component.ts
updated src/app/product-list/product-list.module.ts
updated src/app/product-list/products.ts
```

Bit is performing a git merge, so the code from the updated component is now be merged into your code. 

Run the application again, to see it is working properly with the updated component: 

```bash
$ npm run start
```

That is it. A change was moved between the two projects. Your application is running with an updated component.  

To learn more read the [Bit for Angular guidelines and best practices](https://docs.bit.dev/docs/angular-guidelines.html).  
Happy coding!
