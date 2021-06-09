import React from 'react';
import classNames from 'classnames';
import { bookFont } from '@learn-bit-react/base-ui.styles.fonts.book';
import { colors as themeColors } from '@learn-bit-react/bit-docs.ui.styles.colors';

export type ThemeProps = {
  /**
   * colors to override the default theme colors
   */
  colors?: string;
  /**
   * fonts to override the default theme fonts
   */
  fonts?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Theme({
  children,
  colors = themeColors,
  fonts = bookFont
}: ThemeProps) {
  return (
    <div className={classNames(colors || themeColors, fonts || bookFont)}>
      {children}
    </div>
  );
}
