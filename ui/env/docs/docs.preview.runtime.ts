import { GraphqlUI } from '@teambit/graphql';
import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
import { MemoryRouter } from 'react-router';
import { DocsAspect } from './docs.aspect';
import { Theme } from '@learn-bit-react/bit-docs.ui.theme';

export class SymphonyReactPreview {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview, GraphqlUI]) {
    const symphonyReactPreview = new SymphonyReactPreview();
    // register a new provider to wrap all compositions in the symphony-react environment.
    react.registerProvider([MemoryRouter, Theme]);

    return symphonyReactPreview;
  }
}

DocsAspect.addRuntime(SymphonyReactPreview);
