---
id: documenting-components
title: Documenting
---

Documentation is an essential part of code. When creating reusable components, it is especially important, as other developers need the documentation to properly use the components in their projects.  

Bit supports several methods of documenting components.

## Markdown file

Use a markdown file with the documentation for each component. Bit renders the markdown file contents alongside the component as its documentation.  
The markdown file should be tracked as part of the component. Use the bit add command we can append a file to a tracked component:

```bash
bit add docs/login.md --id login
```

The Markdown file can have any name, not only `README.md`.

## JSDocs

[JSDocs](http://usejsdoc.org) is a standard format for documenting APIs in JavaScript. Bit parses JSDocs and uses it as the component's documentation.

Here is an example for the usage of JSDocs in a component with the [rendered result](https://bit.dev/bit/utils/array/diff).

```js
/** @flow */

/**
 * Computes the difference between two array references.
 * @name diff
 * @param {[]} firstArray
 * @param {[]} secondArray
 * @returns {[]} returns an array representing the difference between the two arrays
 * @example
 *  diff([1,2,3], [1,2,3,4,5]) // => [4,5]
 */
export default function diff(firstArray: any[], secondArray: any[]): any[] {
  return firstArray.concat(secondArray).filter((val) => {
    return !(firstArray.includes(val) && secondArray.includes(val));
  });
};
```

## Comments in the code  

Another method of documenting components is to use a JSDocs comment block to write the docs. It's possible to use markdown format in the documentation block.

```js
/** @flow */

/**
 * # diff
 *
 * Computes the difference between two array references.
 *
 * ## Params
 *
 * - firstArray
 * - secondArray
 *
 * ## returns
 *
 * An array representing the difference between the two arrays
 *
 * ## example
 *
 * ```js
 *  diff([1,2,3], [1,2,3,4,5]) // => [4,5]
 * ```
 */
export default function diff(firstArray: any[], secondArray: any[]): any[] {
  return firstArray.concat(secondArray).filter((val) => {
    return !(firstArray.includes(val) && secondArray.includes(val));
  });
};
```
