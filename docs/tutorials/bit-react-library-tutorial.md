---
id: bit-react-library-tutorial
title: Bit for React Component Library
---

This tutorial doesn’t assume any existing Bit knowledge.

## What You'll Learn

In this tutorial you'll learn how to export multiple Bit components from a shared library of React components.

Each of these components can then be installed as a package without forcing your library’s consumers to install the entire library.

All of the components from your library will become available in [Bit’s component hub](https://bit.dev). Sharing components to the hub also lets your library’s consumers experiment with the components in a live playground before installing them.

This will effectively turn your library into a **multi-component monorepo**. You **will not have to refactor the code or file structure of your project** in order to share it as Bit components.

### The Example Project: Foundation React Library

For this tutorial we use the open source library [React Foundation](https://github.com/digiaonline/react-foundation), by [Digia Online](https://digia.online). **If you have your own library of components - you can use this tutorial as a reference and use your project instead.**

You can see the final result [here](https://bit.dev/digiaonline/react-foundation):

<p align="center">
  <a href="https://bit.dev/digiaonline/react-foundation"><img src="https://i.imagesup.co/images2/0__05c740dc39b7e2.jpg"></a>
</p>

* All of the components from the library are now individual packages.
* No changes were made to the library’s structure or code.
* Components can now be shared and played with in Bit’s hub.

> **Note: Bit components are not limited to React**
>
> A Bit component is a set of files. Any node module can be a Bit component. A Bit component is a set of files. This means that utility functions, plugins, data models, serverless functions, vue and angular components are all perfect candidates for Bit components.

## Tutorial Setup

The first step is to [install bit](/docs/installation.html). For this example we'll be using [brew](https://brew.sh)- ([see additional installation methods](/docs/installation.html)). After installing Bit, create your Bit account using the `bit login` command.

```bash
$ brew install bit
$ bit login
```

> **Logging In**
>
> The `bit login` command will enable Bit to authenticate to your account at Bit’s hub.  
>
> Apart from authenticating the Bit client with your account, it also configures a local `.npmrc` file with the `@bit` scoped package registry so the component you share can be installed as packages using the npm/yarn clients.

Now that you have Bit installed and authenticated, clone the [React Foundation](https://github.com/digiaonline/react-foundation) library from GitHub and install its dependencies.

```bash
$ git clone git@github.com:digiaonline/react-foundation.git
$ cd react-foundation
$ npm install
```

## Sharing Components from a Project

Bit tracks sets of files as components. When tracking components, it's important to understand the project's file structure. Before we dive deeper, here's a short description of the project we'll share components from.

* `src/components` is a directory that contains all components in the library. Each component is implemented in its own file. Some components require each other.
* `src/enums.js` and `src/utils.js` are two internal files that contain utility functions and data for the components.
* `test/components` is a directory containing a spec file for each component. All files have the same naming convention of `<component-name>-spec.js`.
* `test/utils-spec.js` is a small module containing some utility functions for running tests.

```bash
├── package.json
├── src
│   ├── components
│   │   ├── accordion.js
│   │   ├── ...
│   ├── enums.js
│   ├── index.js
│   └── utils.js
├── test
│   ├── components
│   │   ├── accordion-spec.js
│   │   ├── ...
│   ├── index.js
│   └── utils-spec.js
```

Now that you are familiar with the project, use Bit to turn it into a component monorepo.

### Initializing a Workspace

To start using Bit in this project, you first need to initialize a Bit workspace. In the root directory of the project run the [init](/docs/apis/cli-all#init) command:

```bash
$ bit init
successfully initialized a bit workspace.
```

The `init` command creates an empty Bit workspace for the project. The workspace contains a configuration key (`bit` key in the `package.json` file) and a map to link files from the workspaces to Bit components(`.bitmap`).

In addition, there's a hidden directory that stores all of Bit's objects and data models. Learn more about the contents of a Bit workspace [here](/docs/initializing-bit.html#the-contents-of-a-workspace-with-bit).

### Committing Your Work

You should be committing your progress with Bit to an SCM (git). The only files that Bit requires you to commit are `.bitmap` and the modified `package.json` file. These files keep Bit in sync with Git so it can track and manage changes to components. The additional `bit` hidden directory is not meant to be committed.

```bash
$ git add .bitmap
$ git commit -am "initialized an emtpy bit workspace"
[master a4eddaa] bit initialized for project
 2 files changed, 11 insertions(+)
 create mode 100644 .bitmap
```

### Tracking Files as Components

Now that you have a Bit workspace, you can start creating Bit components. For this we use the [add](/docs/apis/cli-all#add) command. With this command we map groups of files as components. Bit logs the relations of tracked files and components in the `.bitmap` file.  

In this library, every component is a file. Run the `bit add` command to mark each file as a separated component and mark its test files.

```bash
$ bit add src/components/* -t 'test/components/{FILE_NAME}-spec.js'
tracking 24 new components
```

We'll break down this `add` command syntax:

1. `src/components/*` - Here `*` tells Bit to track each individual file as a component (if needed, a component can contain many files).
2. `-t 'test/components/{FILE_NAME}-spec.js'` - The `{FILE_NAME}` parameter tells Bit to match files containing the component's filename with the `-specs.js` suffix and mark the matched result as a test file.

> **Diving deeper into `bit add`**
>
> The [bit add](/docs/apis/cli-all#add) command supports many use cases. Read more about the different use cases and see more examples of the `add` command [here](/docs/add-and-isolate-components.html).

After tracking all components in the project, the next step is to see if Bit is able to model components from them. To confirm the status of all components in a workspace, run the [status](/docs/apis/cli-all#status) command:

```bash
$ bit status
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > slider ... ok
     > accordion ...  issues found
       untracked file dependencies (use "bit add <file>" to track untracked files as components):
          src/components/accordion.js -> src/utils.js
     > badge ...  issues found
       untracked file dependencies (use "bit add <file>" to track untracked files as components):
          src/components/badge.js -> src/enums.js, src/utils.js
...
```

The output of the command tells us that Bit is unable to model most of the tracked files as components. According to Bit, there are some required files that it has not tracked. For example, we can look at the content of `src/components/accordion.js` and see that it requires `src/utils.js`.

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { GeneralPro ... objectKeys } from '../utils';
...
```

Bit traverses all tracked files to form a dependency graph for each component. All of a component’s files should be tracked by Bit. When a file Bit tracks requires an untracked file, Bit asks that you track the untracked file as well. [Learn more](/docs/add-and-isolate-components) about the ins and outs of handling component dependencies.  

Run these commands to track the additional files:

```bash
$ bit add src/enums.js  --namespace internal
tracking component internal/enums:
added src/enums.js
$ bit add src/utils.js -t 'test/utils-spec.js' --namespace internal
tracking component internal/utils:
added src/utils.js
added test/utils-spec.js
```

> **Internal Components**
>
> Bit can nest components in namespaces. Choose a namespace for a component, or omit it completely.
>
> The syntax above adds the components to the `internal` namespace. This is a unique namespace, designed for components that are required as part of the dependency graph of components, but should not be visible in the collection's components grid.

Now Bit can traverse every dependency graph in its entirety and model all components. Run `bit status` to confirm:

```bash
$ bit status
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > accordion ... ok
     > badge ... ok
     > breadcrumbs ... ok
...
```

### Transpiling Components

The project we are now sharing components from is using [Babel](https://babeljs.io) to transpile its ES6 syntax down to ES5. This is to make the project distributable and executable.
To do the same for the individual components, you can add extensions to components to handle such tasks. More specifically, Bit uses a [build extension](/docs/building-components.html) to transpile code.  
There is already an [extension](https://bit.dev/bit/envs/compilers/react) designed for transpiling React components. Run this command to configure it:

```bash
$ bit import bit.envs/compilers/react --compiler
the following component environments were installed
- bit.envs/compilers/react@0.0.14
```

This command not only installs the `compilers/react` extension, but it also sets it as a default build step for all components originated from your workspace. You can see it configured in your `bit` config:

```javascript
{
    "env": {
        "compiler": "bit.envs/compilers/react@0.0.14"
    },
    "componentsDefaultDirectory": "components/{name}",
    "packageManager": "npm"
}
```

### Versioning Components

Now we can tag the tracked components with a version. This locks each component's dependency graph and state in an immutable package. Run this command to version all components:

```bash
$ bit tag --all 0.9.6 --message "initial component version"
26 components tagged | 26 added, 0 changed, 0 auto-tagged
added components:  accordion@0.9.6, badge@0.9.6, ...
```

You might have noticed that during the tagging process Bit ran the build task we have defined. Bit runs all components' extensions during the tagging process. It does that in order to validate that it is able to recreate all components in an [isolated environment](/docs/how-bit-works#component-isolation) and run all tasks (build and test, for example). Bit fails the versioning process if it is unable to isolate a component.

### Creating a Collection and Sharing Components

Once you have versioned components, it's time to share them with other developers. To do so, head over to [bit.dev](https://bit.dev) and [create a collection](https://bit.dev/~create-collection).  
Now that you have a collection, run this command:

```bash
$ bit export <account-name>.<collection-name>
exported 26 components to scope <account-name>.<collection-name>
```

> **Commit Your Progress**
>
> Now is a good time to commit and push all of the progress you've made. Making sure that the data in Bit is synced with the codebase is very important for proper collaboration between the project's maintainers.

Head back to the collection: you'll now see all components properly exported. Note that they all have a status indicator. Bit runs a CI cycle for each of the components according to the extensions configured for it.

## Component Discovery and Consumption

Bit's UI is focused around the discoverability of components. The collection you have created features a preview for each component in the form of a card and an integrated search engine. In addition, each component gets automatically labeled, according to its functionality.

### Browsing the Component Collection

The collection page itself is rather simple. You can filter components according to their labels, invite collaborators, edit its description, etc. It also presents previews of the component examples.

Use Bit’s playground to create and save examples for components.

### Using the Playground

To see the component playground, click on any of the component cards. For this example, we'll use the `badge` component. Find it and click on the card. In the component page, scroll to see the full view of the component playground.  

The playground runs a [create-react-app](https://github.com/facebook/create-react-app) dev server, so all you need to do to create an example is write React code and CRA will render it. If you need to add any dependencies to the example code (component or package), simply `import` them: the playground will install them.

Copy the example code from here to the playground of the `badge` component (fix the `import` statements according to your collection name):

```javascript
import {Badge} from '@bit/<account-name>.<collection-name>.badge';
import { Colors } from '@bit/<account-name>.<collection-name>.internal.enums';
import {Icon} from '@bit/<account-name>.<collection-name>.icon';
import React from 'react';

export default (
  <div>
    <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/foundation/6.5.1/css/foundation-float.min.css' />
    <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css' />
    <div className='badge-colors-example'>
      <Badge>1</Badge>
      <Badge color={Colors.SECONDARY}>2</Badge>
      <Badge color={Colors.SUCCESS}>3</Badge>
      <Badge color={Colors.ALERT}>A</Badge>
      <Badge color={Colors.WARNING}>B</Badge>
    </div>
    <div className='badge-icons-example'>
      <Badge color={Colors.INFO}><Icon name='fi-share'/></Badge>
      <Badge color={Colors.SUCCESS}><Icon name='fi-check'/></Badge>
      <Badge color={Colors.WARNING}><Icon name='fi-wrench'/></Badge>
    </div>
  </div>
);
```

Now you can save the example. When an example is saved, Bit takes a screenshot of it. Bit uses it in the preview card. Head back to the collection page (refresh the page), and see that the card for the `badge` component now contains a preview image.

> **Code Preview**
>
> If Bit is unable to render and take a screenshot of the component, it will use the example code itself in the preview.

### Installing Components with Package Managers

All components exported to Bit are available to install using any node package manager, such as npm/yarn. If you already ran `bit login` on your computer, Bit has already configured your package manager to be able to fetch components as packages.  

Create a new project directory and install the `badge` component with npm:  

```bash
$ cd ..
$ mkdir test-install
$ cd test-install
$ npm install @bit/<account-name>.<collection-name>.badge
+ @bit/<account-name>.<collection-name>.badge@0.9.6
added 50 packages in 12.435s
```

## Modifying and Updating Components

A key part of the workflow of using Bit as a component monorepo is the ability to modify components and publish newer versions.

### Suggesting Modification for Component

Let's assume that we are working as a developer that has no familiarity with Bit and see how we can propose a modification for a component without any interaction with Bit. First, create a new feature branch to manage the change.

```bash
$ cd ../react-foundation
$ git checkout -b update-component
Switched to a new branch 'update-component'
```

Open and edit `src/components/top-bar.js`. Now make a modification to one of the comments in the file and commit the change.

```bash
$ open src/components/top-bar.js
# modify a comment, and save changes
$ git commit -am 'update comment in top-bar'
```

Now you have a branch with a modification to a component. In a distributed Git workflow this change could be communicated over a Pull Request, as implemented by GitHub, GitLab, or BitBucket.

### Merging and Publishing New Versions

With a change on another branch, head back to the `master` branch and merge changes.

```bash
$ git checkout master
Switched to branch 'master'
$ git merge update-component
```

Now that the component is changed, let's see how this modification reflects in the tracked Bit components. Before you check the state of the components, you need to make sure Bit is in sync with the remote collection. This is similar to performing a `git pull` before merging.

```bash
$ bit import
successfully imported 26 components
- up to date <account-name>.<collection-name>/accordion
- up to date <account-name>.<collection-name>/badge
...
```

All components are in-sync, so you can continue with the process of versioning their changes. Start by figuring out how the modification to `src/components/top-bar.js` is reflected in the components.

```bash
$ bit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > top-bar ... ok

components pending to be tagged automatically (when their dependencies are tagged)
     > <account-name>.<collection-name>/responsive ... ok
```

Bit notices a diff in the contents of the tracked files of the `top-bar` component. Note that Bit is still able to traverse the component's dependency graph.  

We also see that Bit notifies us that `responsive` will also be tagged with a new version. This is because `responsive` depends on `top-bar`. When you tag `top-bar`, Bit automatically tags the dependent `responsive`. The diff between the versions of `responsive` is an updated dependency graph that contains the new version of `top-bar`.  

Trigger the entire versioning process by tagging a new version:

```bash
$ bit tag --all --patch --message 'update top-bar comments'
2 components tagged | 0 added, 1 changed, 1 auto-tagged
changed components:  <account-name>.<collection-name>/top-bar@0.9.7
auto-tagged components (as a result of tagging their dependencies):  <account-name>.<collection-name>/responsive@0.9.7
```

Now publish both updated components:

```bash
$ bit export <account-name>.<collection-name>
exported 2 components to scope <account-name>.<collection-name>
```

Commit the changes to `.bitmap` back to the code repository.

```bash
$ git commit -am 'update top-bar'
```

### Updating Consuming Projects

If a project depends on components that have been updated, run `npm updated` to have your package manager install the updated dependencies.

```bash
$ npm update
```

## Bit CI Automation

You can automate one of two tasks in order for this workflow to be fully implemented in your CI cycle:  

- Exporting the components from the CI.
- Installing components during CI.

### Exporting Components from CI

To automate the process of publishing new versions during CI, authenticate the CI server and add a step to your CI server that publishes components. To do that, first authenticate the CI server.

1. Bit uses SSH as its communication protocol, so you need to ensure that your server's firewall allows it for outbound traffic on port 22.
2. [Create an SSH key pair and upload to the account's SSH keys](/docs/setup-authentication.html#authenticate-bit-using-ssh-key-pair).
3. Run these commands to configure the Bit client for export:

```bash
bit config set analytics_reporting <true/false>
bit config set error_reporting <true/false>
bit config set user.name <your name here>
bit config set user.email <your email here>
bit config set ssh_key_file <location of the private SSH key>
```

Once the server is configured with the correct account, add these steps to your CI to export all modified components from the code repository (after the code has been cloned to the server):

```bash
bit init
bit import
bit tag --all <--patch,--minor,--major>
bit export <collection name>
```

Don't forget to commit the modifications to `.bitmap` and push them back to the code repository.

### Install Components During CI

To install Bit components in your application during CI, you need to configure the `@bit` node registry in your CI server.

1. Make sure you have a valid token generated for the CI server. To generate a token, run the following command:
`npm login --registry=https://node.bit.dev --scope=@bit`
2. The token will be available for you in your `~/.npmrc` file.
3. Set a secret to your CI environment variable called `BIT_NODE_TOKEN`. This step differs from one CI to another. Consult your CI provider’s documentation to understand how to do it. An abstract way of configuring the client is running this command:

```bash
$ echo "@bit:registry=https://node.bit.dev" >> ~/.npmrc
$ echo "//node.bit.dev/:_authToken={$BIT_NODE_TOKEN}" >> ~/.npmrc
```
