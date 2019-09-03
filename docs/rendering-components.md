---
id: rendering-components
title: Rendering Components
permalink: docs/rendering-components.html
layout: docs
category: Docs & Playground
prev: documenting-components.html
next: organizing-components.html
---

Rendering allows other users to interact with your component(s), directly at [bit.dev](https://bit.dev).  
See an example of a rendered component [here](https://bit.dev/bit/movie-app/components/hero).

## How Does it Work?

- Add annotations to your component, documenting how it should be rendered.
- Bundle your component as a [UMD](https://github.com/umdjs/umd) using bundler. You can use one of Bit’s existing bundlers, see [Building Components](/docs/building-components.html).
- [Tag](/docs/cli-tag.html) & [Export](/docs/cli-export.html) your component.
- Preview your component in your bit.dev [Collection](/docs/organizing-components.html).

### Annotations

Some [JSDocs](http://usejsdoc.org/about-getting-started.html#adding-documentation-comments-to-your-code) annotations needs to be added to your component, for example:

```js
/**
* @render react
* @name Hero
* @example
* <Hero
*   title="Season 66 will be available soon!"
*   description="Lorem ipsum dolor sit amet hey! id quam sapiente unde voluptatum alias vero debitis, magnam quis quod."
*/
class Hero() {
    ...
}
```

Use the following annotations:

#### @render react

Specify the renderer for the component. Renderers are Bit components, note that currently only "`react`" is supported.
additional platforms support is coming soon...

#### @name <NAME>

Specify the component’s name, to make sure it will work correctly when the code is minified.

> **Note**
>
> When using `export default` in a component, set a `@name` property to be used in the `@xample`.

#### @example

Specify how to render the component.

### Bundlers

To render your component, bundle it as a [UMD](https://github.com/umdjs/umd).  
`UMD` is a Javascript standard that works in the browser, in Nodejs, and in your workspace.

#### Bundling components

To bundle your component, use a bundler webpack which is a type of a [compiler](/docs/ext-compiling.html). You can use one of Bit bundlers avilable at the [Bit envs Collection](https://bit.dev/bit/envs/).  
Note that the React bundler comes in 2 configurations:  

- [with](https://bit.dev/bit/envs/bundlers/webpack) css modules.
- [without](https://bit.dev/bit/envs/bundlers/webpack-css-modules) css modules.

You can extend or modify bundlers according to your needs. Learn more [here](/docs/building-components.html).

Bit bundles the component as an isolated environment **without** the component’s dependencies, making it slim and efficient.
If other Bit components are used as dependencies, we recommend that these components will be consumed from the [package manager](/docs/installing-components-using-package-managers.html) and not as relative dependencies.
Today, when you consume a component relatively with Bit, it will be bundled as part of the same file which is less efficiant process.
Support for relative dependencies will be added in the near future. 

For example, let’s take a look at our [movie-app repository](https://github.com/teambit/movie-app), and its corresponding [components](https://bit.dev/bit/movie-app/). The **Hero** component depends on the **HeroButton** component.
When you consume the **HeroButton** component relatively, it will be bundled along with the **Hero** component:

```js
import HeroButton from '../hero-button';
```

However, when you consume the **HeroButton** component from the package manager, the **Hero** component will be bundled without it, which is easier to use and maintain:

```js
import HeroButton from '@bit/bit.movie-app.components.hero-button';
```

### Adding a bundler to an existing component

**For an imported component** - [import](/docs/updating-sourced-components.html) the component:

```bash
bit import bit.movie-app/components/hero-button
```

Open your IDE and set the compiler id in your component’s `package.json` file:

```js
"env": {
    "compiler": "bit.envs/bundlers/webpack@0.0.6",
    "tester": "bit.envs/testers/karma-mocha-react@0.0.18"
}
```

**For an authored component** - an authored component is a component which is a part of a full project.
[Import the compiler](/docs/building-components.html#defining-a-default-compiler-for-your-project) to your project.

```bash
bit import bit.envs/bundlers/webpack -c
```

## Many exports in a rendering example

If your component exports more than one render function, for example:

```js
export default () => <div>Main component</div>; 

export const Secondary = () => <div>secondary mon</div>;
```

You can use each function name in the `@example` to render it. If you use `export default` as well, you will need to define the `@name` JSDoc annotation, to set a name to it, to be rendered in the playground.  
So if we take the previous example, this is how we would add the right anontations to have a working playgroud with both render functions.

```js
/**
 * @render react
 * @name Main
 * @example
 * <div>
 * 	<Main/>
 * 	<Secondary/>
 * </div>
 */
export default () => <div>Main component</div>;

export const Secondary = () => <div>secondary mon</div>;
```

## Injecting Dependencies

Bit.dev aspires to provide the component all the dependncies needed for preview.
Errors will be displayed at the preview frame. Mosr errors occur because there was a problem in the bundle itself.

## Troubleshooting

When the preview is not working try the following:

- Open dev console and look for errors.
- Verify the bundle work by importing it locally, from another file.
- Manually check that the bundling worked - check out the `dist` directory, see that the file is formatted correctly.
