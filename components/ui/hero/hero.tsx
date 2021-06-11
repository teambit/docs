import React from 'react';
import { Link, LinkProps } from '@learn-bit-react/base-ui.ui.link';
import { Img, ImgProps } from '@learn-bit-react/base-ui.ui.img';
import { Heading, HeadingProps } from '@learn-bit-react/base-ui.ui.heading';
import { Text, TextProps } from '@learn-bit-react/base-ui.ui.text';
import classNames from 'classnames';
import styles from './hero.module.scss';
export type HeroProps = {
  /**
   * link text for main link
   */
  mainLinkText: string;
  /**
   * link href for main link
   */
  mainLinkHref: string;
  /**
   * link text for secondary link
   */
  secondaryLinkText: string;
  /**
   * link href for secondary link
   */
  secondaryLinkHref: string;
} & ImgProps &
  TextProps &
  HeadingProps &
  LinkProps;

export function Hero({
  src,
  alt,
  text,
  href,
  mainLinkText,
  secondaryLinkText,
  secondaryLinkHref,
  mainLinkHref,
  headingText
}: HeroProps) {
  return (
    <div className={styles.hero}>
      <div>
        <Heading headingText={headingText} className={styles.heading} />
        <Text text={text} className={styles.description} />
        <div className={styles.buttons}>
          <Link
            href={(href = mainLinkHref)}
            className={classNames(styles.button, styles.cta)}>
            {mainLinkText}
          </Link>
          <Link
            href={(href = secondaryLinkHref)}
            className={classNames(styles.button, styles.ghost)}>
            {secondaryLinkText}
          </Link>
        </div>
      </div>
      <Img className={styles.img} src={src} alt={alt} />
    </div>
  );
}
