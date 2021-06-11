import React from 'react';
import styles from './composition.module.scss';

export const Primary = () => {
  return (
    <div data-testid="primary">
      <div data-sample="true" className={styles.primary} />
    </div>
  );
};

export const Secondary = () => {
  return (
    <div data-testid="secondary">
      <div data-sample="true" className={styles.secondary} />
    </div>
  );
};

export const Tertiary = () => {
  return (
    <div data-testid="tertiary">
      <div data-sample="true" className={styles.tertiary} />
    </div>
  );
};

export const Complimentary = () => {
  return (
    <div data-testid="complimentary">
      <div data-sample="true" className={styles.complimentary} />
    </div>
  );
};

export const Text = () => {
  return (
    <div data-testid="text">
      <div data-sample="true" className={styles.text} />
    </div>
  );
};
