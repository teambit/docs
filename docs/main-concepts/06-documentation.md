---
id: documentation
title: Documentation
---

Maintaining documentation alongside as part of the codebase can be a tedious task. Some parts of the documentation, like propTypes and APIs may change often, while other, like description and best practices remain constant. Bit takes care of the grunt work by keeping a base documentation template based on the comments in your source code, propTypes declarations, and JSDocs.

## Comments and propTypes

Bit picks up all JSDocs and propTypes and displays them in a table.

```javascript
import React from 'react'
import PropTypes from 'prop-types'
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default class Button extends React.Component {
  static propTypes = {
    /** Description of prop "foo". */
    foo: PropTypes.number,
    /** Description of prop "baz". */
    baz: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }
  static defaultProps = {
    foo: 42
  }

  render() {
    /* ... */
  }
}
```

## Usage examples

Bit will look for any `*.compositions` files in the component and display all [compositions](LINK) in a gallery.

```javascript
import React from "react";
import { CopyBox } from "./copy-box";

export const BasicBox = () => {
  return (
    <CopyBox>
        here is some text for you to copy
    </CopyBox>
  );
};

export const LargeBox = () => {
  return (
    <CopyBox size="large">
        here is some text for you to copy
    </CopyBox>
  );
};
```

## Public methods

By default, any methods your components have are considered to be private and are not published. Mark your public methods with JSDoc `@public` tag to get them published in the docs:

```javascript
/**
 * Insert text at cursor position.
 *
 * @param {string} text
 * @public
 */
insertAtCursor(text) {
  // ...
}
```

## Defining custom documentation

If you want to override and add features on top of the automatically generated documentation from the add a documentation file.

```sh
$ thouch ./path/to/component/folder/<component>.docs.tsx
```

This is a basic React component Bit uses to compose with the automated documentation. It supports several features:

### Adding your own documentation to a component

Any content used by the `default` export is rendered as the component's description.

```javascript
import React from 'react';

export default () => {
  return (
    <h1>New title in component overview</h1>
    <p>And some additional free-form text</p>
  );
};
```

Bit comes with many components you can use for your template:

```javascript
import React from 'react';
import { Paragraph } from '@bit/bit.test-scope.ui.paragraph';
import { Section } from '@bit/bit.test-scope.ui.section';
import { LinkedHeading } from '@bit/bit.test-scope.ui.linked-heading';

export default () => {
  return (
    <Section>
      <LinkedHeading link='overview'>Summary</LinkedHeading>
      <Paragraph>
        Links are used as navigational elements and can be used on their own or inline with text. 
        They provide a lightweight option for navigation but like other interactive elements, too 
        many links will clutter a page and make it difficult for users to identify their next steps. 
        This is especially true for inline links, which should be used sparingly.
      </Paragraph>
    </Section>
  );
};
```

### Component abstract description

A component's abstract description is fetched by default from parsing the component's JSDocs. To change it you can either modify your JSDocs annotation in the code or adding this line to the component's `docs` file.

```javascript
export const abstract = 'Your description goes here'
```

### Adding labels to a component

To improve component discoverability and filtering you can set labels for components. Bit will use these labels as part of the component documentation as well as their metadata.

```javascript
export const labels = ['react', 'ui-component', 'label list'];
```
