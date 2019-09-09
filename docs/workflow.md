---
id: workflow
title: Components Workflow
---

## Basic Workflow

Referencing components as functional units and not just a set of files enables developers to move components around. The component's isolation layer segregates it from its original project and makes it usable even if the structure of the receiving project is different from the original one.  

![Bit Workflow](https://storage.googleapis.com/static.bit.dev/docs/images/workflow.png)

### Add

An add command initiates a Bit component's lifecycle. Bit components' index is now tracking the files that comprise the component.  

At this point, Bit can verify the completeness of the graph dependency of the component. Bit can also associate the component with utilities - compiler and tester - and start building and testing the component.  

### Tag

When a component is ready to be shared with others, the developer tags it with a version number following the [semver](https://semver.org/) conventions.  

Bit stores the snapshot of the component's source code and can now notify on any changes that were made to it.  

### Export

The developer can export a tagged version of the component to a centralized server. Organizations can have their central server or use bit.dev server for storing components.  

A component exported to bit.dev also has a playground where the user can see a live version of the component and interact with it.  

The component is now available for consumption by other developers in one of two ways: [install](#install) or [import](#import).

### Install

Npm or Yarn installs the component, like any other package. The installed component resides in the node_modules folder.  

Bit compiler built the component and generated the distribution files (e.g., the dist folder). The installed component is ready for consumption.  

### Import

Developers may want to modify the component source code, for fixing a bug or changing the functionality. Developers may import the component to their project and apply their changes.  

An important feature of Bit is, that even if the component is imported and changed inside the project, it still receives all the modifications made to the original component.  

The updated component can now be tagged and re-exported so, the other component's consumers get the updates.  
