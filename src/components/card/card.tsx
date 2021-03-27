import React, { ReactElement } from 'react';
const styles = require('./card.module.scss');


export type CardProps = {
  /**
   * scope name
   */
  image: string;
  /**
   * scope description
   */
  description: string;
  /**
   * amount of components in scope
   */
  link: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card = ({ image, description, link, ...rest }: CardProps) => {
  return (
      <div className="card" {...rest}>
        <a href={link}>
          {image}
        </a>
        <p>
          {description}
        </p>
      </div>
  );
};
