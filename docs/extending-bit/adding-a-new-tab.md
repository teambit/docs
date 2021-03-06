---
id: adding-a-new-tab
title: Adding a new Tab to the Workspace
---

Bit is fully extendable which means you can create a workspace tailored to your liking. We can add a new tab to the workspace so that you can add your own custom documentation, links to specific docs, or anything you feel will be useful to you and your team. We do this by creating an aspect. An aspect in Bit is a Bit extension. Therefore in order to extend Bit we can create an aspect and then hook into the many API's Bit has to customize things even further.

Once you have created an aspect you can then publish your aspect as a component and then share it with the rest of your team or in your other workspaces.

You can create an aspect by using our aspect template generator.

```bash
bit create aspect aspects/hello-world
```

Make sure it is configured with the aspects environment which is the environment for building Bit extensions. The aspects slash asterisk is a wildcard which sets everything in the aspects folder to be using the aspect env.

```jsx
"teambit.workspace/variants": {
    "{aspects/*}": {
      "teambit.harmony/aspect":{}
    }
  }
```

You can then use bit show to see if you are using the correct environment.

```bash
bit show aspects/hello-world
```

Let's take a look at what was created. It is a very basic Bit extension. The first important thing in a Bit extension is the API. Any public method or any property you have on the class of your extension or on the object is a public API that will be available to anyone else using your extension.

```bash
import { MainRuntime } from '@teambit/cli';
import { HelloWorldAspect } from './hello-world.aspect';

export class HelloWorldMain {

  static slots = [];
  static dependencies = [];
  static runtime = MainRuntime;
  static async provider() {
    return new HelloWorldMain();
  }
}

HelloWorldAspect.addRuntime(HelloWorldMain);
```

To add a new tab into the component page in our workspace UI we need to import the `componentAspect` and the `ComponentMain` from Bit. Extensions can depend on extensions. What we are trying to extend is the extension in the UI to add another tab to the UI for the new content we have.

In Bit there are a few runtimes. In the file that was created, `hello-world.main.runtime`, is for extending the workspace CLI or the workspace server. It's not the workspace UI. In order to extend the workspace UI we need to create a `hello-world.ui.runtime.tsx`

```bash
touch hello-world.ui.runtime.tsx
```

Basically Bit can live in different runtimes because you have the runtime of the UI and you have the runtime of the Bit server. In order to step into each of them you have to create a separate file. Creating the `hello-world.ui.runtime.tsx` allows you to tap into UI extensions and extend them.

We can basically copy and paste what is in the main runtime file. The only difference is it should be HelloWorld UI and instead of importing MainRuntime we want to build the UIRuntime from the Bit UI aspect. The Bit UI aspect is responsible for the UI at Bit. It's a core aspect.

We can now import the `ComponentAspect` and the `ComponentUI` from the Bit component aspect, as we want to add a new section to the component page to add a new tab. The aspect in Bit that provides the API for adding a new tab exists on the component aspect. This is the aspect of Bit that is responsible for all the components and operations so it's responsible for the component page.
We then add the ComponentAspect as our dependency so we get it injected in the provider and then we can see the API we have available for the component in the UI.

```javascript
import React, { useContext } from 'react';
import { UIRuntime } from '@teambit/ui';
import { ComponentUI, ComponentAspect } from '@teambit/component';
import { HelloWorldAspect } from './hello-world.aspect';

export class HelloWorldUI extends React.Component<any> {
  static slots = [];
  static dependencies = [ComponentAspect];
  static runtime = UIRuntime;
  static async provider([component]: [ComponentUI]) {
    return new HelloWorldUI(Component);
  }
}

HelloWorldAspect.addRuntime(HelloWorldUI);
```

What we want to do is register a new route and a new navigation. In Bit everything has types so you can quickly understand what each component accepts. How we built the tester aspect in Bit was we instantiated a new test section. The test section is basically a class with a few properties that gives you the route that renders the children of the route which is the test page and decides on the path of the route because you want to add the new route to each component and add a navigation link.

We can do the same here. We register a new route on the component and add a simple hello world as the children to be rendered and hello as the path. We have now registered a new extension. This extension adds a new route to the component called hello that renders hello world.

```jsx
import React from 'react';
...
static async provider([component]: [ComponentUI]) {
    component.registerRoute({
      children: () => <div>hello world</div>,
      path: '~hello'
    });

    return new HelloWorldUI();
  }
...
```

We can then add the Navigation to the component so we can see our new tab with a href of `~hello` for the children we can render a string of Hello. The word Hello will appear as our new tab which when clicked will go to the `~hello` path which will render the hello world.

```jsx
component.registerNavigation({
  href: '~hello',
  children: 'Hello'
});
```

To see if it works we first have to configure it. Any extension that you build must be configured on the workspace if you want it to be applied on a specific workspace. We add our aspect id, which you can find in the the `hello-world.aspects.ts` file, followed by an empty object as we have no configuration.

Any extension can accept configuration from the `workspace.json`. This is an important feature as then you can have an extension that accepts specific configuration from the workspace for different purposes.

```json
{
  ...
  "learn-harmony/aspects/hello-world": {}
  ...
}

```

Once you have configured the extension on your workspace Bit automatically loads it. We then need to start our workspace by using `bit start --dev` as when you build a Bit extension you need to use the `--dev` flag

```jsx
bit start --dev
```

The `--dev` flag loads the dev server for the Bit workspace UI as well, because we are changing the Bit workspace UI and not just changing the components as we are building Bit now. So how Bit works is that once you create the workspace UI Bit builds on any change due to an extension in the Bit workspace UI, we don't rebuild the bundle of the workspace UI to improve keep performance but once you're building extensions in Bit you have to use the `--dev` flag in order for Bit to load with the dev server and then you get hot reloading for any change you do in the extension.

And now you can see your new hello tab that renders hello world. If you want to change the order of the navigation link you can do so by adding a value after it.

```jsx
component.registerNavigation(
  {
    href: '~hello',
    children: 'Hello'
  },
  100
);
```

Now our navigation appears at the end. You can use a way to control the order of different things. This is a different concept called a slot. You can register to a specific part of the Bit UI and add components to them and then modify and extend the Bit workspace UI behavior. From this component you can get access to the component object. For example you can render specific information from the component itself like the component name.

First import the `ComponentContext` from the component Aspect. Then we can create a component that uses the component context and returns it's display name. In order to use hooks in a class component we need to use `extends` followed by `React.Component`. Then instead of rendering our div with hello world we can render our `MyComponent` function which will return our component's display name. We also need to pass it to the `HelloWorldUI` function so that it gets returned.

```bash
import React, { useContext } from 'react';
import { UIRuntime } from '@teambit/ui';
import { ComponentUI, ComponentAspect, ComponentContext} from '@teambit/component';
import { HelloWorldAspect } from './hello-world.aspect';

function MyComponent() {
  const component = useContext(ComponentContext);

  return <div>Component Name: {component.displayName}</div>;
}

export class HelloWorldUI extends React.Component<any> {
  helloWorld() {}

  static slots = [];
  static dependencies = [ComponentAspect];
  static runtime = UIRuntime;

  static async provider([component]: [ComponentUI]) {
    component.registerRoute({
      children: () => {
        return <MyComponent />
      },
      path: '~hello'
    });

    component.registerNavigation(
      {
        href: '~hello',
        children: 'Hello'
      },
      100
    );

    return new HelloWorldUI(MyComponent);
  }
}

HelloWorldAspect.addRuntime(HelloWorldUI);
```

An aspect is a component so now we can export our component to the [Bit.dev](http://bit.dev) cloud and use it in other projects. First we create a new version of our component.

```jsx
bit tag --all
```

We then export it

```jsx
bit export
```

Add our hello aspect in the `workspace.json` file in another Bit project. Bit will automatically install it for you.

```jsx
{
...
"learn-harmony/aspects/hello-world": {},
...
}
```

Then we can run the start command to see that the extension is working and that we have our new tab.

```bash
bit start
```

If we modify the aspect and export a new version we just have to run bit install to get the latest version.

This means that when working across multiple teams it is easy to configure your workspace so that all the team get the same experience. We have just created a very simple example but you can now see that you can do many things here such as add a check list tab to see if the description has been added and render a warning or some instructions on how to add the component description. You can also include styles to improve the styling of the page and even render an MDX page component with instructions, a list of links, best practices etc.
