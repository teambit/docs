import React, { ReactElement } from 'react';

type learnMore = {
  children: [ReactElement, ReactElement];
};

export const LearnMore = ({ children }: learnMore) => {
  const link = {
    color: 'red'
  };
  return <p style={link}>{children}</p>;
};
