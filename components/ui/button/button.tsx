import React from 'react';

export type ButtonProps = {
  /**
   * a text to be rendered in the component.
   */
  text: string
};

export function Button({ text }: ButtonProps) {
  return (
    <div>
      {text}
    </div>
  );
}
