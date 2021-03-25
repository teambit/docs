import React from 'react';
import { NotFoundPage } from '@teambit/ui.pages.not-found';
import { ServerErrorPage } from '@teambit/ui.pages.server-error';

export class ComponentError {
  constructor(
    /**
     * http status code of error
     */
    public readonly code: number,

    /**
     * error message of the error
     */
    public readonly message?: string
  ) {}

  renderError() {
    if (this.code === 404) return <NotFoundPage />;
    return <ServerErrorPage />;
  }
}
