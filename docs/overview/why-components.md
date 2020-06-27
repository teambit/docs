---
id: why-components
title: Why Components?
---

Components are the building blocks of modern web architectures. Encapsulated and reusable components with focused and well-defined APIs let developers build more robust software applications more quickly.

The major frontend frameworks - React, Vue, and Angular - all share the concept of using component-based architecture to compose state-of-the-art applications. Even browsers themselves are backing components as an inherent feature by supporting the Web Components standard.

Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in making the component reusable across projects.

- new primitive of the web
- when you want to reuse a component you shouldn't create a dedicated project for it
- key part of all modern web frameworks
- components are not just for "design systems", they can be used to reuse functionality

## Why reusing components is critical

Creating a good quality UI demands thoroughness and accuracy in covering every possible use case. As simple as a component looks, it requires strong attention to detail and takes iterative cycles for devs, designers, and products to make it right. If we are not reusing components, we are duplicating all these efforts behind it. when teams are not reusing components, the UI and behavior across products may be inconsistent and confuse our customers. And it is simply a pain to do any brand UI update across all experiences.
Reusing components is crucial to solving these issues:

- It shortens time to market for products. A component “just works,” so developers can focus on high-level business logic. Research suggests that reusing components can save up to 40–81% of engineering time.
- It’s faster to resolve defects, as we will fix the shared component instead of dealing with dozens.
- UI experience will always be consistent across flows.

## Components are not just simple UI primitives

Components can be more than a UI atom. Components can be put together to form a larger widget, which can be pieced together to form a whole page. Therefore in Cx, people can share a component as small as a button, to a widget like a credit card form, to a checkout page, and even flow.
Sharing product pages and flows encourages people to work more openly and efficiently. It also helps teams and higher leadership gain insights into the current product portfolio. Our vision is to have open, easy access to every product page.

- **UI primitives** like buttons, and text
- **UI Widgets** like forms, search inputs and date pickers
- **Connected components** service-connected UI like a credit-card input form that is linked to a payment service
- **Page** a full page in a product.
- **Web flow** - a reuseable flow like signup-form, phone-number-confirmation
- **Data** - componetn that provides data to UI from various APIs



use these features to:

### Scaling a repository

- faster command execution (only modified and affected code is rebuild)
- dependency graph and configuration management per components
- absolute imports

### Scaling your company

- code sharing
- enforce organization standards...
