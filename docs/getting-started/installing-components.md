---
id: installing-components
title: Installing Components
---

Once you have exported your component you can now install it to any other application of the same environment. For example a React component can be installed into a React application. 

```shell
bit install @YourScopeName/componentScopeName.componentID
```

To install components with npm or yarn we first need to configure @YourScopeName as a [scoped registry](https://docs.npmjs.com/misc/scope#associating-a-scope-with-a-registry).

```shell
npm config set '@YourScopeName:registry' https://node.bit.dev
```

To install dependencies for all the imported components use:

```shell
bit install
```

You can now use the component in your app by first importing it.

```js
import { myComponent } from '@YourScopeName/componentScopeName.componentID';
```

```js
<MyComponent />
```
