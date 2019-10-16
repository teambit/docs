---
id: best-practices
title: Best Practices
---

Below you can find some guidelines that can help make Bit an efficient tool in your organization:  

## Component Completeness

Components should have a [sole responsibility](https://en.wikipedia.org/wiki/Single_responsibility_principle). In other words, a component represents a clear and meaningful functionality.  
When tracking files as components, include all files related to that functionality and that are only relevant to this functionality.  
Each component should include the code, styling, unit tests, documentation, and usage examples, such as storybook stories.

## Use Namespaces

You can use namespaces inside a collection to group related components. Namespaces act as folders inside a Bit workspace, or inside a collection on bit.dev.  

To track a component under a namespace, add the namespace with a slash on the component's id:  

```bash
$bit add src/utils/my-util.js --id utils/my-utils
tracking component utils/my-utils:
added src/utils/my-util.js
```

You can also use the bit [DSL](/docs/add-and-isolate-components#tracking-dsl) to add multiple components in a single [`add`](/docs/apis/cli-all#add) command and use a namespace.  

Specifying a namespace lets you perform actions on multiple components at once: 

```bash
bit tag "utils/*"
```

Namespaces are also useful in specifying overriding rules for specific components. For example, you can override a compiler for all components under the `utils/*` namespace:

```json  
"overrides": {
    "utils/*": {
        "env": {
            "compiler": "@bit.envs/compilers/typescript@3.0.34"
        }
    }
}
```

## Publish Shared Files As Bit Components

If multiple components use the same file or directory, e.g., `helpers` or `utils`, extract the common code into its own Bit component. Consider splitting those components by their functionality.  

Publishing a shared file together with another component creates an undesired and unneeded coupling between components that is not inherent to their functionality. By splitting shared modules into smaller ones, consumers can import the specific functionality they desire, with a slimmer dependency graph.  
It is recommended that all such files resides under the same [namespace](#use-namespaces).

## Handling Assets

Components may require using assets from your projects, such as images, graphics such as SVG files, or fonts.  

One possible option is to publish those assets [on a CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) and access them via their full path URL.  
Alternatively, you can include them in your project as part of the components. You may include assets inside a component that exposes them as reusable assets. For example, you can have a logo component that also includes the logo image or SVG.  

It is also possible to include the assets in their own components and reuse them, among other components.  
Assets only components should not be associated with a compiler, as the compiler cannot find a proper entry point to start the compilation. To simplify removing a compiler, group all assets under a dedicated [namespace](#use-namespaces), such as `assets`.  

Then, in the package.json, you can specify that all components under the `assets` namespace do not include a compiler, by using the [overrides](/docs/overrides) option:  

```json  
"overrides": {
    "assets/*": {
        "env": {
            "compiler": "-"
        }
    }
}
```

Now, the assets are not compiled, but the files are available as components to be used in other components.  

## Handling Styles  

Typically, an application contains style files that shared between different components in the application. Styling files may be pure CSS or using a pre-processor such as `scss` or `less`.  

An application may also contain a set of variables (e.g., scss variables) used as [design tokens](https://css-tricks.com/what-are-design-tokens/) to denote reusable elements such as colors or breakpoints.  

Those variables are reused across multiple components, and thus should be created as their own components. You can define them as a single component or as a set of separate components. If the styles are split across multiple components, it is highly recommended to group them under a dedicated [namespace](#use-namespaces) such as `styles`, to facilitate working with them.  

The style files are targeted to be eventually processed by the containing project. This is especially critical if a matching process runs that aligns styles with the relevant HTML (as an example, React CSS Modules is creating a style hash that matches the class in the generated Html). Therefore, components that only contain styles do not need a compiler associated with them.  

The simplest way to remove the compiler from the style only components is to specify an [override](/docs/overrides) rule in the package.json. Grouping all the styles components under a single namespace simplifies the rule as follow:  

```json  
"overrides": {
    "styles/*": {
        "env": {
            "compiler": "-"
        }
    }
}
```

Styles only components are now available for consumption, and in the target application, the CSS files are processed and bundled by the application's bundler.  

## Components' Paths

Use absolute paths for imports and define path aliases in your project to resolve relative paths. As a rule of thumb, you should use current and forward references (i.e., `./slider.component`) and avoid backward references (i.e., `../button`).

Having a path like `../../../components/component.ts` makes it hard to move the component files around. Relative paths also couple the component to the specific file structure of the project in which the component was shared and hence created a more complex component file structure in the consuming project.

## Components Tagging

Tags work as commits in Git. When exported, all the intermediate tags are also available for consumption by other developers.  
Just like a committed code, it is essential to:

- Tag complete work.
- Test before you tag.
- Use SemVer to communicate changes by using `patch`, `minor`, and `major` versions.
- Make the tag messages meaningful.

## Use Component Environments

The code usually requires compilation tasks to make it distributable and executable. The same goes for the components in a project. When we take components out of the context of a project, Bit needs to know how to make them usable. Component Environments handle these tasks.

## Prefer Transpiling Over Bundling

Bundled code forces too many restrictions on its consumers. It forces them to include the entire bundle as a single block, dependencies included. Transpiled code gives the consumer more flexibility. It allows dependency tree management features like tree-shaking and code-splitting.

## Import Often

When working within a team, try and import remote changes for components often. Prefer integrating your work with your team's often to avoid handling larger changes. Importing remote changes often helps mitigate many integration issues.

## Share Often

When you have a small and meaningful version of a component, share it. Small, incremental changes are easier to handle and use by other developers. Sharing often means integrating small changes. This is easier to merge and reduces the chances and severity of merge conflicts.

## Prefer Using Package Managers

Unless you need to change components, prefer installing components using package managers. This simplifies a project's structure by fetching the code in its distributed form. Treating components as any other external package simplifies a project's build process as well.

## Prefer Ejecting Sourced Components

Sourcing a component should be temporary. Use this feature for modification purposes. After the modification, tag a new version, share and eject it from the project. Ejecting a component removes the source code from a project, replacing it with a node module.

## Defer From Ejecting Local Components

Ejecting components from their source project is tempting. Ejecting a component from its project complicates the project's maintenance. It turns the component into a dependency and not an integral part of the project. Use `bit import` to sync these components with remote changes.

## Build Components for Discoverability

Build components in a way that they can be easily discovered by other developers. That includes proper naming, adding documentation, tagging the components with meaningful labels, and adding examples so that they can be played with. When publishing a component, it is best to think about how other developers are likely to search for the components.

Non-descriptive naming (such as utils) or bad tags makes the components hard to find. Developers are more likely to select and reuse components that they can interact with and quickly evaluate their functionality. Good documentation promotes quick, widespread adoption.

## Use SCM to Keep Local Modifications

You can source and modify components. Sometimes these changes are project-specific and not meant to be shared. Keep those modifications local and committed to your SCM. Bit can merge incoming changes and keep your modifications.
