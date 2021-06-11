import React from 'react';
import { Link, LinkProps } from '@learn-bit-react/base-ui.ui.link';
import { Heading, HeadingProps } from '@learn-bit-react/base-ui.ui.heading';
import { Text, TextProps } from '@learn-bit-react/base-ui.ui.text';
import styles from './product-description.module.scss';

export type ProductDescriptionProps = {
  /**
   * a text to be rendered in the first paragraph.
   */
  paragraph1: string;
  /**
   * a text to be rendered in the second paragraph.
   */
  paragraph2: string;
  /**
   * a sub heading for the product
   */
  h3: string;
  /**
   * text to be rendered in the link
   */
  linkText: string;
} & TextProps &
  HeadingProps &
  LinkProps;

export function ProductDescription({
  paragraph2,
  paragraph1,
  h3,
  headingText,
  linkText
}: ProductDescriptionProps) {
  return (
    <div className={styles.content}>
      <h3 className={styles.subHeadline}>{h3}</h3>
      <Heading headingText={headingText} className={styles.headline} />
      <div className={styles.textWrapper}>
        <Text text={paragraph1} className={styles.text} />
        <Text text={paragraph2} className={styles.text} />
      </div>
      <Link href="/" className={styles.link}>
        {linkText}
      </Link>
    </div>
  );
}
