---
id: isolation
title: Isolation
---

Components let you split your code into independent, reusable pieces, and think about each piece in isolation. A desired flow for it is to split each component as its own module with its own dependencies, and having all communication with that component work on top of structured APIs and setting dependent<>dependency relationships between components.

However, manually managing a dependency graph via a `package.json` file for each component is tedious. Bit's `dependency resolver` extension takes care about managing dependency graphs by allowing you to set policies to apply on components and parsing component's code to figure out dependency graphs according to your `import` statements.

## Components as isolated modules

With Bit each component in a workspace is an isolated module. Each isolated component has it's own **set of files** (including tests, assets, documentation, etc), **configuration** (as defined in the `workspace.json`) and a **set of dependencies** it imports. Using this structure Bit can create a node module from components, as it has the instructions of how to compile the code, the code to compile and dependencies to install.

When you create a component, Bit uses these building blocks to generate an isolated module in the workspace `node_modules` folder. All operations like `build` and `test` are triggered in the isolated module, helping you make sure the component is not coupled to any part of the project it is implemented in.

## Get dependency isolation status

To see if Bit is able to properly isolate your component issues the `bit status` command. There are several available statuses:

- `ok` - Component dependency graph is fully resolved.
- `Untracked dependencies` - one or more of the dependencies imported by the component is not a Bit component. Use `bit add` for Bit to track the imported files as a component.
- `Missing package dependencies` - Some of the project's package dependencies are not installed. Make sure to install all dependencies using `bit install`.
- `Non-existing dependency files` - One of the files in the component's dependency tree is not found within your project. To resolve this issue, open the file, and ensure that the import or require statement points to the correct file.
- `Missing links` - Bit's `node_module` bindings are not found. Run `bit link` to resolve.

## Best practices for component isolation

When components are properly isolated from one another this means that they use APIs to communicate and not coupled to each others implementation. Other than the structure of a component, you may need to think about how you implement your components.

### Import other components as modules

Bit creates a link in the `node_modules` folder to each component in a workspace. Use this when referencing between components.

```javascript
// Do
import { Button } from '@acme.base-ui/button';

// Don't
import { Button } from '../../../components/button';
```

Using backward relative paths couples the component to the specific file structure of the project. If the structure changes, the component will stop working. Moreover, it's easier for other developer to read these statements.

### Minimize APIs surface

Component's APIs are the data attributes it receives and the callbacks it exposes. For component producers, this means to prepare the APIs so they are logical and consistent. Component consumers get APIs that are simple to use and reduces the learning curve when using the component.

#### Use discrete values in APIs

Use discrete values such as Enums or string literals for requiring specific options.

```javascript
// Do
type LocationProps = {
  position: 'TopLeft' | 'TopRight' | 'BottomLeft' | 'BottomRight'
}

// Don't
type LocationProps = {
  isLeft: string,
  isTop: string,
}
```

Interdependencies between parameters make it harder for the consumer to use it. Creating more simplistic params paves a smoother way for developers to consume the components.

#### Use reasonable defaults

Avoid making parameters required and expect user to fill in values for all of them.

```javascript
type LocationProps = {
  position: 'TopLeft' | 'TopRight' | 'BottomLeft' | 'BottomRight'
}
defaultProps = {
  position: 'TopLeft'
}
```

Setting parameters makes it easy for the consumer to start using the component, rather than find fair values for all parameters. Once incorporating the component, tweaking it to the exact need is more tranquil.

### Avoid coupling to globals

#### Do not rely on global variables

Get globals in the component's APIs instead of accessing a global param.

```javascript
export const Card = ({ title, paragraph, someGlobal }: CardProps) =>
<aside>
  <h2>{ title }</h2>
  <p>
    { paragraph + someGlobal.value }
  </p>
</aside>
```

Relying on parameters gives the consuming application greater flexibility in using the components and does not require it to adhere to the same structure that exists in the producing application.

#### Provide fallbacks to globals

Use reasonable defaults when accessing globals that may not exist.

```javascript
// Do
if (typeof window.someGlobal === 'function') {
  window.someGlobal()
} else {
  // do something else or set the global variable and use it
}

// Don't
window.someGlobal()
```

Fallbacks let the consuming application a way to build the application in a manner that is less coupled to the way the provider application. It also does not assumes that the global was set at the time it is consumed.

### State managers

Components may use state managers such as Redux, MobX, React Context, or VueX. State managers tend to be contextual and global. When reusing components between applications the consuming applications must have the same global context as the original one.

#### Decouple component from the state manager

If the component receives its state and actions directly as arguments, and does not use the context api, it is completely reusable, and can even be used with another state manager. Most state managers support this, and only provide a thin state injector on top of the component. For example:

```javascript
@connect(state => ({ isLoggedIn: state.data.profile.user }), { Logout })
class UserAvatar extends React.component{
    ...
}
```

#### Decouple data and layout

Separate presentational and container components. In most cases the data is specific to the consuming application. Component producers should provide presentational component only with APIs to get the data from a wrapping component that is managing data and state.

```javascript
//container component
import React, { useState } from "react";
import { Users } from '@src/presentation/users'
export const UsersContainer = () => {
  const [users] = useState([
    { id: "8NaU7k", name: "John" },
    { id: "Wxxfs1", name: "Jane" }
  ]);

  return (
    <Users data="users">
  );
};

//presentational component
export const Users = (props) => {
  return (
    <div className="user-list">
      <ul>
        {props.data.map(user => (
          <li key={user.id}>
            <p>{user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### Isolate component style

By design, CSS is global and cascading without any module system or encapsulation.

#### Scope styles to component

Use a CSS mechanism that scope the style to the component. In React the popular css-in-js frameworks such as Emotion, Styled Components and JSS are famous. Vue is supporting scoped styled out of the box. Angular also has scoped styles built in with the viewEncapsulation property. CSS is scoped in web components via the Shadow DOM.

When reusing components across different apps the application level styles are likely to change. Relying on global styles can break styling. Encapsulating all style inside the component ensures it looks the same even when transported between applications.

#### Restrict styles with themes

Use themes to control the properties that you want to expose in your components.

```javascript
class ThemeProvider extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={this.props.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

const theme = {
  colors: {
    primary: "purple",
    secondary: "blue",
    background: "light-grey",
  }
};
```

Component producer need to control the functionality and the behavior of the component. Reducing the levels of freedom for the components consumers can provide a better predictability to the component's behavior, including its visual appearance.

#### CSS Variables as theming variables

Use CSS variables for enabling theming. CSS variables that can be used for theming should be documented as part of the component's APIs.

```css
:root {
  --main-bg-color: fuchsia;
}
.button {
   background: fuchsia;
   background: var(--main-bg-color, fuchsia);
}
```

CSS variables are framework independent and are supported by the browser. Also, CSS variables provide great flexibility as they can be scoped to different components.
