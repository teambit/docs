---
title: Bit for Angular
author: Tally Barak
authorTwitter: baraktally
authorImageURL: https://avatars1.githubusercontent.com/u/7386255?s=460&v=4
---
<img src="https://storage.googleapis.com/static.bit.dev/blog/bit-angular.jpg" alt="Bit vue" height="300"/>

Bit now supports Angular. A new [compiler](https://bit.dev/bit/envs/compilers/angular) was added to Bit to compile Angular components and make them shareable with Bit.  

At the same time, bit.dev has a new option in its playground to generate an Angular 8 as an example to demo components.  

Angular compiler was built based on the Angular team recommendation - using the [ng-packagr](https://github.com/ng-packagr/ng-packagr). Ng-packagr is also used by the Angular CLI to generate libraries inside an Angular workspace. The main benefit of using Ng-package is the ability to generate a dedicate format of Angular, the [Angular package Format](https://docs.google.com/document/d/1nn79rrqJ79Y8FSwHCwoVCgIxpOeQfG9XZA6oBDKW5bk/edit#). The AFP generates bundles in multiple structures, so they can be consumed by different projects.  

Ng-packgr also promote the user of NG Modules as the correct way to share elements between applications. A shared module can include one or more components, and to ensure a proper compilation context it is highly recommended to wrap shared components with modules and expose them via APIs. 

The collective suggestions on how to work with Angular are described in the [Angular Guidelines doc](/docs/angular-guidelines). Additional guidelines can be found in the General [Best Practices guide](/docs/best-practices). Make sure to check those as well.  

Last, but surely not least, we have created a step by step [tutorial](/docs/tutorials/bit-angular-tutorial) that can run you through sharing your first component.  
