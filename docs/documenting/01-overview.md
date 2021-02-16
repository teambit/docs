---
id: overview
title: Overview
---

For a component to be usable as an independent building block, not only by machines but also by humans, it needs to have its own documentation. The documentation for each component is displayed in the 'Overview' tab of the Workspace UI and the Scope UI.

## Environment-specific templates

Bit automates component documentation by parsing its code and displaying the output in a template provided by the [environment](/docs/environments/overview) used by that component.

Using different templates for different types of components (each using a different environment) means your components get documented in a way that makes sense for them. In addition to that, each documentation template provides a different API that uses the JS flavor or framework in use by the documented component. That means an Angular component will be documented using Angular and not, for instance, React.

## Development vs Production

Documentation in development, for authored or modified components, will be shown in the Workspace UI. These docs will be generated using the ['DevServer'](/docs/environments/environment-services#devserver) environment service to enable features needed for development, like "hot reloading".

The "production" version of the documentation, for component release versions, will be shown in the Scope UI and in the Workspace UI, for previous tag releases. The "production" version is generated using the 'Preview' service and provides an optimized built.

## Customizing the documentation

The documentation can be customized in two ways:

1. Using the documentation template API for ad-hoc modifications. This is done to add custom components or to override a section in a specific component documentation. Learn about the React, React Native and Node environments API here.

2. Creating a new documentation template. This can be done as part of an [environment extension](/docs/environments/build-environment) or as part of a new environment aspect.
