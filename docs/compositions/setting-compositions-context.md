---
id: setting-composition-context
title: Setting the Composition Context
---

It often happens that compositions need to run in the same context. One obvious example of that is a common theme provider.

To configure one or more composition contexts, create an Env extension and use the `registerProvider()` API in the Env's `.preview.runtime.ts` file, to set the components to use as permanent context.

```ts
registerProvider(provider: any[]): void
```

For example:

```ts {4,21} title="my-react.preview.runtime.ts"
// ...
import styles from './theme.module.scss'

const Theme = ({
  children,
  ...rest
}) => {
  return (
    <div className={styles.theme} {...rest}>
      {children}
    </div>
  );

export class MyReactPreviewMain {

 // ...

  static async provider([react]: [ReactPreview]) {
    const myReactPreviewMain = new MyReactPreviewMain();
    // register a new provider to wrap all compositions using this environment with a custom theme.
    react.registerProvider([Theme]);

    return myReactPreviewMain;
  }
}

// ...
```
