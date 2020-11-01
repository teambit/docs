---
id: quick-start
title: Tutorial
---

In this tutorial, you will learn how to build a truly modular application where each of its building block is completely independent, reusable, and shareable. 

What we’ll cover:
* How to initialize a new Bit workspace and run the Workspace UI -  your graphic tool for developing and reviewing components in isolation
* How to use an extensible pre-configured development environment 
* How to manage multiple components using just a few rules that cascade from the most general to a single component
* How to document a component
* How to manually and programmatically test components using Bit compositions and popular testing libraries (provided by the pre-configured environment)
* How to publish a component to a scope on Bit.dev
* How to import a component from Bit.dev and integrate it into your own project

## Install Bit

```sh
$ npm install @teambit/bit --global
```

## Initialize a new Bit workspace
A workspace is a development environment for independent components. It manages each component's information as well as provides the functionality to author, export, import and install components.

Create a new Bit [workspace](/docs/workspace/overview) by using the `bit init` command:

```sh
$ mkdir bad-jokes 
$ cd bad-jokes
$ bit init --harmony
```

This will create a new `bad jokes` directory and initialize a Bit [workspace](/docs/workspace/overview) in that directory. These commands create two new assets for your project:

- `workspace.jsonc` - the workspace's main configuration file. Always only one per workspace.

### Workspace configurations

To set our [workspace](/docs/workspace/overview) configurations, we'll open the `workspace.jsonc` file. Any root-level entry in this json (apart from [variants](/docs/workspace/variants)) is an [aspect](TODO), or extension, of Bit, each of which you can configure to fit your setup by applying a setup object to it.

- 

### Workspace configurations

To set our [workspace](/docs/workspace/overview) configurations, we'll open the `workspace.jsonc` file. Any root-level entry in this json is an [aspect](TODO), or extension, of Bit, each of which you can configure to fit your setup by applying a setup object to it.

A single Bit workspace can use multiple development environments. In the example below, two environments are used: React for components in the `components/react` directory, and Node for components in the `components/modules` directory. As mentioned earlier, these configurations are determined by the specificity of their selectors, where the more specific overrides the more general. 

Configure the following (you can simply copy>paste this example):

```json
{
  /** 
  * the 'teambit.bit/workspace' aspect controls the workspace defaults and its metadata.
  */
  "teambit.bit/workspace": {
    /**
    * workspace name
    */
    "name": "bad-jokes",
    /**
    * project logo (optional)
    */
    "icon": "https://image.flaticon.com/icons/svg/185/185034.svg",
    /**
    * The default scope for the components in the workspace - <company-name>.<scope>
    */
    "defaultScope": "teambit.bad-jokes",
  },
  /**
  * main configuration for Bit's component dependency resolution.
  **/
  "teambit.bit/dependency-resolver": {
    /**
    * package manager for Bit to use
    */
    "packageManager": "teambit.bit/pnpm",
    /**
     * dependency policy allows configuration of dependencies quickly and efficiently.
     * it helps to automate and manage dependency configuration for components.
    **/
    "policy": {
      /**
       * Dependency type is defined by the file that import it.
       * For example, library will be devDependency when the file that imports it is a test file.
      **/
      "dependencies": {
      },
    }
  },
  /**
   * workspace variants allow to set different subsets of configuration for components in your workspace.
   * this is extremely useful for upgrading, aligning and building components with a
   * new set of dependencies.
  **/
  "teambit.bit/variants": {
    /**
    * configure all components under directory `components/react`
    **/
    "components/react": {
      /**
      * configure the react environment on all components under the react directory.
      */
      "teambit.bit/react": {}
    },
    /**
    * configure all components under directory `components/modules`
    **/
    "components/modules": {
      /**
      * configure the node environment for all components in the `components/modules` directory.
      **/
      "teambit.bit/node": {},
      /**
       * these components have a different default scope
       **/
      "defaultScope": "teambit.toolbox"
    }
  }
}
```

## Start the dev server

The [workspace UI](/docs/workspace/workspace-ui) displays all components in the [workspace](/docs/workspace/overview). It is a local development tool that enables you to examine your components in different contexts and variations, and browse through their documentation. Start the dev server and workspace UI:

```sh
$ bit start
```

> Note: the local workspace UI is a one-to-one representation of how your components will look when exported to the Bit server.

## Add a new UI component

A [component](/docs/component/overview) in Bit is more than its set of code and styling implementation files. It has everything it needs to be used as an independent piece of software - module declaration, test files, [documentation files](/docs/documentation/automated-docs), etc. 

> Each component in a Bit workspace must have all its files under the same folder inside the components directory.

```sh
$ mkdir components/react/ui/button
```

Now create the following files:

```sh
$ touch components/react/ui/button/index.ts
$ touch components/react/ui/button/button.tsx
$ touch components/react/ui/button/button.module.scss
```

And implement the component as follows:

<!--DOCUSAURUS_CODE_TABS-->
<!--index.ts-->

```javascript
export * from './button';
```

<!--button.tsx-->

```javascript
import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Choose between primary and secondary styling. */
  variant?: "primary" | "secondary";
}

export const Button = ({ children, variant = "primary", ...rest }: IButton) => {
  return (
    <button className={styles[variant]} {...rest}>
      {children}
    </button>
  );
};
```

<!--button.module.scss-->

```scss
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

.base {
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 10px;
  color: #fff;
  font-size: 16px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  outline: none;
  transition: background-color 0.5s, border 0.5s;
    &:active {
      border-color: #313131;
      background-color: #fff;
      color: #000;
    }
    &:disabled{
      border-color: #a5a5a5;
      background-color: #a5a5a5;
      &:hover {
        border-color: #a5a5a5;
        background-color: #a5a5a5;
      }
  }
}
.primary {
    border: solid 7px #ab3636;
    background-color: #ab3636;
      &:hover {
        border-color: #8b1b1b;
        background-color: #8b1b1b;
      }
  }
  .secondary {
    border: solid 7px #363eab;
    background-color: #363eab;
      &:hover {
        border-color: #434cc5;
        background-color: #434cc5;
      }
  }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Install dependencies

The above button component uses the `classnames` library. To install it, use `bit install`:

```bash
$ bit install classnames
```

Bit will make sure to automatically register this package in the workspace configurations file (`workspace.jsonc`), under the `dependency-resolver` entry (a Bit workspace has no `package.json` file). Check the `workspace.jsonc` file to make sure the `dependency-resolver` section now looks like this:

```json
  "@teambit.bit/dependency-resolver": {
    "packageManager": "@teambit.bit/pnpm",
    "strictPeerDependencies": true,
    "policy": {
      "dependencies": {
        "classnames": "^2.2.6"
      },
```

### Track the Component

Now browse to the local development server you spun up above at [http://localhost:3000](). You will see that the workspace UI is... still empty.

This is because in order for Bit to be able to track a component's files, you need to tell Bit where that component's root directory is, i.e. by adding the root directory to Bit's tracking process:

```sh
$ bit add components/react/ui/button
```

Now browse to the local development server again to see that the `button` component is now managed by Bit and displayed in the workspace UI.

### Review the documentation

Bit automates component documentation by parsing your code and creating docs using a pre-defined template. The `button` component's main overview page contains its documentation.

> In the [Documentation](/docs/documentation/automated-docs) section we will see how to configure and override the default parsing templates.

### Add compositions

Use [Compositions](docs/compositions/develop-in-isolation) to render the component in isolation and test it with various scenarios. Create the `compositions` file as part of the component:

```sh
$ touch components/ui/button/button.composition.tsx
```

Add the following lines to `components/ui/button/button.composition.tsx`

```tsx
import React from "react";
import { Button } from "./button";

export const PrimaryButton = () => {
  return (
    <Button variant="primary" onClick={() => alert("Clicked!")}>
      Primary Button
    </Button>
  );
};

export const SecondaryButton = () => {
  return <Button variant="secondary">Secondary Button</Button>;
};

export const DisabledButton = () => {
  return (
    <Button disabled variant="primary">
      Disabled Button
    </Button>
  );
};
```

Head over to the [compositions tab](https://localhost:3000/base/button/~compositions) to see all of the `button` compositions we just created.

1. Each named export is a composition.
1. Composition display name is a prettified version of the export name.

### Add tests

If you take another look at the configuration we added to the workspace.jsonc above, you will see under 'variants' that our Bit workspace uses the `@teambit/react` [Environment](/docs/environment/overview) extension. This environment is pre-configured to use Jest as a test runner by default (which means we don't need to worry about setting it up).  
To simplify our UI testing, we'll also make use of the following libraries:

```bash
$ bit install @testing-library/react @testing-library/jest-dom
```

Notice how we didn't set these packages as Dev Dependencies. Bit determines that for us by analyzing the way they are used in this workspace - in this case they are only used in test files, so Bit knows to add them as dev dependencies.

Let's start by creating our test file (in the button component directory)

```bash
$ touch button.spec.js
```

And place a simple test to validate that it renders:

```jsx
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import { Button } from "./button";

test("button renders", () => {
  const { getByText } = render(<Button>test button</Button>);
  const testButton = getByText(/test button/i);
  expect(testButton).toBeInTheDocument();
});
```

Bit runs a component's tests whenever we [tag](/docs/versioning/tracking-changes) the relevant component. If a test fails, the tagging action will be aborted.
We can also run the tests manually:

```bash
# in the component root directory
$ bit test
```

### Use documentation template

The base default documentation template contains the following sections:

`abstract` - sub-title below the component name

`tags` - tags for your component, to categorize and assist with discoverability

`custom` section - see below


The `abstract` and `tags` sections are by default automatically generated by Bit from the component id and code. 
To override Bit's auto-generated data, Bit looks for a `*.doc.tsx` in the component directory. In that file you can add your own overrides for `abstract` and `tag`.

For example:

```js
export const abstract = "An imperfect button";

export const tags = ["react", "typescript", "button"];
```

#### Extend the documentation with a custom component

The custom JSX slot gives you the freedom to extend the documentation page as you like. To use it, create a regular React component in the `doc.tsx` file, and export it as `default`.  
For example, let's create a 'Guidelines' section for a `Button` component documentation:

```tsx
export default function() {
  const wrapper = {
    border: "1px solid #e0ddd8",
    borderRadius: "5px",
    padding: "25px",
    marginBottom: "25px"
  };
  return (
    <div style={wrapper}>
      <p style={{ fontWeight: 700 }}>Guidelines</p>
      <br />
      <ul style={{ listStyleType: "circle", paddingLeft: "25px" }}>
        <li>
          Place buttons where users expect to find them. Do not force users to
          "hunt for buttons".
        </li>
        <li>
          Do not use generic labels for your buttons. Use verbs that clearly
          explain the button's function.
        </li>
        <li>Size buttons in proportion to their importance</li>
      </ul>
    </div>
  );
}
```

## Add a new React hook

Add a react hook to handle the data fetching for bad-jokes.  
In Bit, even hooks managed as components. So we start by creating the component directory and files:

```sh
$ mkdir -p components/react/hooks/use-get-jokes
$ touch components/react/hooks/use-get-jokes/index.ts
$ touch components/react/hooks/use-get-jokes/use-get-jokes.ts
```

And implement as follows:

<!--DOCUSAURUS_CODE_TABS-->

<!--index.ts-->

```javascript
export * from './use-get-jokes';
```

<!--use-get-jokes.ts-->

```ts
import { useState, useEffect } from "react";

export const useGetJokes = (): [
  () => Promise<void>,
  string[],
  boolean,
  string
] => {
  const [joke, setJoke] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const endpoint =
    "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=racist&type=single";

  const getJoke = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      const dataArr = data.joke.split("\n");
      setJoke(dataArr);
      if (error) setError("");
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getJoke();
  }, []);

  return [getJoke, joke, isLoading, error];
};
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Track hook component

```sh
$ bit add hooks/use-get-jokes --namespace hooks
```

> **Review the documentation**
>
> As with any other component, Bit automatically documents your hook. Head over to the component page on the workspace UI to review it.

### Add live examples

Examples are descriptions and playable code that instruct on how to use a component. Examples are set using the `examples` variable in the `<component>.docs.tsx` file.  
The `examples` variable receives an array of objects, each representing a single example and each contains the following data (keys):

- `scope` - An `object` with all relevant imports.
- `title` - A `string` for the example title.
- `description` - A `string` for the example description.
- `code` - A `string` (template literal) for the example code.

Let's create an example for the `Card` component:


```sh
$ touch ./path/to/component/folder/card.docs.tsx
```

Inside that file, we'll import `Card` and set the `examples` variable with a single object.

```tsx
import {useGetJokes} from './use-get-jokes'

export const examples = [
  {
    scope: {
      useGetJokes
    },
    title: "Using useGetJokes",
    description:
      "This hook uses a jokes api. It returns the data-fetching function (getJoke), the data (joke), the state of the 'getJoke' function and an error message (or an empty string).",
    code: `() => {
        const [getJoke, joke, isLoading, error] = useGetJokes();
        return (
            <div>
                <div>
                    {error || joke.map(line => <p>{line}</p>)}
                </div>
                <div>
                    <button disabled={isLoading} onClick={getJoke}>
                        {isLoading ? 'loading...' : "fetch a joke"}
                    </button>
                </div>
            </div>
        )
    }`
  }
];
```

## Compose an app

We will compose a component which will essentially be a fully fledged app composed of some of the smaller components we've dealt with up to now.
This will be our app component structure:

```sh
├── components
  ├── apps
    ├── jokes-viewer
       ├── jokes-viewer.tsx
       ├── jokes-viewer.module.scss
       ├── jokes-viewer.spec.jsx
       └──  index.ts
```

### Import tracked components

As the components we want to use are still only local (we haven't exported them to Bit), we need to somehow import them to our app component.

To this end, Bit links tracked components to the`node_modules` directory, even before they have been exported. So as soon as you track a component, it becomes available as a package from node modules - e.g. to access the button and hooks components we created above you would do the following:

```tsx
import {Button} from '@teambit/bad-jokes.ui.button';
import {useGetJokes} from '@teambit/bad-jokes.hooks.use-get-jokes'
```

> With Bit we always use these links to reference Bit components, rather than relative paths, as this ensures package isolation and no reliance on specific file structure.

We'll use them like so (copy to the `jokes-viewer.tsx` file):

```tsx
/** Retrieves and displays bad jokes */
export const BadJokesViewer = () => {

    const [getJoke, joke, isLoading, error] = useGetJokes();

    return (
        <div className={styles.badJokesViewer}>
            <div className={styles.contentWrapper}>
                {error || joke.map(line => <p>{line}</p>)}
            </div>
            <div>
                <Button disabled={isLoading} onClick={getJoke}>
                    {isLoading ? 'loading...' : "another one, please"}
                </Button>
            </div>
        </div>
    )
}
```

All that's left is to style the component. In the `jokes-viewer.module.scss`:

```scss
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

.badJokesViewer {
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    border: solid 7px #41403E;
    padding: 25px;
    box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2);
    font-family: 'Indie Flower', cursive;
    font-size: 20px;
    max-width: 400px;
    transition: box-shadow 0.5s;
        &:hover {
            box-shadow:2px 8px 4px -6px hsla(0,0%,0%,.3);
          }        
  }

.contentWrapper{
    margin-bottom: 50px;
}
```

### Add a composition

Our app component, "jokes-viewer", is structured like so:

## Version components

## Push to github

### Set up a bit.dev account

### Create remote scope

### Configure scope in workspace

### Connect bit.dev account to the github repo

## Reuse components in another project

## vendor component
