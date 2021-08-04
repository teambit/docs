import React from 'react';
import cs from 'classnames';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import styles from './image.module.scss';

export type ImageProps = {
  src: string;
  alt?: string;
  padding?: number;
  width?: string | number;
  shadow?: boolean;
};

export const Image = ({ src, alt, padding, width, shadow }: ImageProps) => {
  return (
    <Zoom openText={alt || 'zoom image'}>
      <div className={cs([styles.container, shadow ? styles.shadow : null])}>
        <img
          alt={alt || ''}
          src={src}
          className={styles.image}
          style={{ padding: padding || 0, width: width || '98%' }}
        ></img>
      </div>
    </Zoom>
  );
};
