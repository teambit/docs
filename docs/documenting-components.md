---
id: documenting-components
title: Documenting Components
permalink: docs/documenting-components.html
layout: docs
category: Getting Started
prev: tag-component-version.html
next: organizing-components.html
---

It’s essential to document components so that they can be discoverable. Documented components are also more comfortable to use and understand.

Bit supports several methods of documenting components.

## Document a component using a Markdown file

We can include a [Markdown](https://en.wikipedia.org/wiki/Markdown) file as part of the component. When exported, Bit renders the markdown file contents as documentation for the component.
Using the bit add command we can append a file to a tracked component.

```bash
$ bit add docs/login.md --id ui/login
```

The Markdown file can have any name, not only `README.md`.

## Document a component with JSDocs

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

## Document a component with Markdown in a code comment

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