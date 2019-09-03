---
id: angular-guidelines
title: Angular Guidelines
permalink: docs/angular-guidelines.html
layout: docs
category: tutorials
---

> **Angular support is in public beta.**  
> Everything should work fine, but please do share any issues and feedback: support@bit.dev

Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds Angular specific best practices on top of [Bit's general Best Practices](/docs/best-practices.html).

Angular sharing was tested on Angular 8 version and requires Node 10.9+ which is Angular 8 pre requisite. Bit should be compliant with prior versions that are ng-packagr compliant.

## Angular Compiler

Each Bit component is linked with a compiler. The Bit compiler is compiling or transpiling the source code to build files that can run in another project.
The officially supported Angular Compiler can be found [here](https://bit.dev/bit/envs/compilers/angular). This compiler is based on the [ng-packagr project](https://github.com/ng-packagr/ng-packagr), the same project used by Angular CLI to build Angular libs. The compiler is compiling the Angular typescript to AOT (Ahead of Time) code. The build results are in the Angular Package Format (APF), for smooth importing into any Angular project.

The practices described bellow are aimed to work best with this Bit team compiler.  

## Angular Tester

Each Bit component may be linked with a tester that will run the unit tests of the compiler. Angular testers are still WIP.  

## Export Bit Components as NgModules

Each shared Bit component should be an Angular ngModule. The NgModule should include any angular entities that are closely related, such as components, pipes, directives, etc. Make sure all entities that should be exposed are declared in the ngModule exports section.

Inside this ngModule, you may declare one or more entities. You may export all of them or just a few of them and leave the rest internal.
Let's look at this component:

```typescript
// hero.list.component.ts
@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  providers: [ HeroService ]
})
export class HeroListComponent implements OnInit {
  /* . . . */
}
```

And the related HTML:

```html
<-- hero.list.html -->
<h2>Hero List</h2>
<p><i>Pick a hero from the list</i></p>
<ul>
    <li *ngFor="let hero of heroes" (click)="selectHero(hero)">
        {{hero.name}}
    </li>
</ul>

<app-hero-detail *ngIf="selectedHero" [hero]="selectedHero"></app-hero-detail>
```

The template above is using the *ngFor directive. You probably know that `*ngFor` is an Angular directive defined in Angular `CommonModule`. In your project's app's Module you probably declared `CommonModule` as an `import` of the App Module. However, you cannot assume that the consuming project already has this Module in its imports section. Declaring the component in a dedicated HeroModule makes it more shareable. You don't have to rely on the consuming project to import certain modules. Angular's modules system is ensuring that only a single instance is created.  
The ngModule provides the compilation context for any Angular entity. Having a component outside the NgModule is missing the context as the compiler can't compile. The compilation will be impacted by the imported project/module which may lead to ambiguous results. Wrapping all your exported entities in an ngModule simplify its isolation and also makes sure that the compilation is correct.

## Specify the module.ts file as the Component Entry Point

When creating a bit component that has the module as the entry point, it should be added with the `--main` option.  
Adding your component should be done as follow:  

```bash
bit add src/app/my-comp  --main src/app/my-comp/my-comp.module.ts
```

If your components have a consistent structure, you can add multiple ngModules as bit components by using the [Bit DSL](docs/add-and-isolate-components.html#tracking-dsl), by specifying this command:  

```bash
bit add src/app/components/*/ --main 'src/app/components/{PARENT}/{PARENT}.module.ts'
```

## Share Independent Units as a Single Bit Component

Some components are only usable within specific contexts. A common example is `List` and `ListItem`. While `List` is useful as a shared component, the `ListItem` is a component that is internal to the List component. In this case, both List and ListItem declared in a single ngModule that will contain both, but will only have the List exported.
If an angular entity (component/directive/pipe/service) is being used by multiple Angular components. In this case, it is preferred to export it as a separate Angular ngModule and as a separate Bit Component. This Bit component can be marked as internal, so it will not be discovered on the components explorer.
Composing related components reduces maintenance overhead of managing multiple components, and makes the application more readable.
The component’s consumer gets a better and more coherent abstraction of the desired functionality.

## Ensure Bit Components are Exposed via a Single Entry Point

Each shared component should have a single entry point which is the root file of the component. Add a top-level `index.ts` or `public_api.ts` file that will expose all of the component’s APIs, e.g. by re-exporting them from the internal file.

This practice reduces coupling between components as one component does not need to be aware of the internal file structure of another component.
If the component is exported as a bundle (e.g. UMD format), the internal files will not be available.

## Add Angular Libraries as Peer Dependencies

In the origin project, the Angular run time dependencies (`@angular/core`, `@angular/common` etc.) should be defined both as project dependencies and project peer dependencies.

Angular cannot run when multiple instances of the angular runtime libraries exist, the Angular dependencies should be defined as peer dependencies. When Bit extracts component dependencies, peer dependencies get higher priority, and the @angular libraries will be defined as peer dependencies, even if they are also defined as dependencies.

## Use Typescript Path Mappings for aliases

To avoid backward references as suggested in the [best practices](/docs/best-practices.html#prefer-absolute-paths-and-paths-aliases), use absolute paths for imports and define [typescript path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) in the angular project to resolve relative paths.  
