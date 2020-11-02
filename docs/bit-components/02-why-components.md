---
id: why-components
title: Why Components?
---

## The Analogy - Modular Lego vs. Nuts and Bolts

Imagine a world where creating a web app was as simple as building with lego - this block here, a door here, a window there. All slotting seamlessly together to produce a robust, well designed and stable app. Well that's what components, and specifically Bit, do for web development. The blocks are your components, isolated, battle-tested and designed to fit into whatever application the consumer wants it for. 

And Bit is the interlocking system which helps you design, test, document and share those blocks so that you and anyone else you choose can seamlessly slot them together to produce a multitude of apps.

A world without components is more akin to building with wooden beams, nails and a hammer. There are some basic building blocks (i.e. libraries) and a skilled builder could produce an excellent structure with lots of features and functionality. But nails and bolts arent modular - you can't extract a wooden beam or wall from a building without taking the whole thing apart. And while that builder might know how to maintain it, a colleague coming along later to fix a problem most likely wont know where to start. 

And so while the stucture is sound and it works well on day 1, it took 2 or 3 times longer to build as it's pieces cannot be replicated or copied to other similar structures or even to similar parts of the same structure, and isolating and finding functionality and how parts of the structure interact is complicated bordering on impossible. The builder must design and build every floor, every room, and often times every cupboard and light-switch from scratch and the maintainer must understand the entire structure before they can improve or fix any single part.

## Components and Bit

Components are the building blocks of modern web architectures. Encapsulated and reusable components, with focused and well-defined APIs, let developers break down their code into re-usable, shareable chunks and thus to build more robust, maintainable and well-tested software applications much more quickly.

The major frontend frameworks - React, Vue, and Angular - all share the concept of using component-based architecture to compose state-of-the-art applications. Even browsers themselves are backing components as an inherent feature by supporting the Web Components standard.

Bit adds a semantic layer on top of repositories that essentially maps files into components. It may sound simple, but this extra layer provides Bit with robust capabilities for making the component reusable across projects.

Suddenly components are entities in and of themselves. And because they can be endlessly composed from each other, they can also be endlessly decomposed. For instance minute aspects of your site, down to the level of individual images, can now be components imported by any part of your site rather than being embedded in multiple servers and code bases.

## Why reusing components is critical

Creating a good quality UI demands thoroughness and accuracy in covering every possible use case. As simple as a component looks, it requires strong attention to detail and takes iterative cycles for Devs, Designers, and Product to get it right. Without reusing components, all these efforts are duplicated time and again. Furthermore, when teams are not reusing components the UI and behavior across products may be inconsistent and confuse users, and it is simply a pain to do any brand UI update across all experiences.

Reusing components solves these critical issues:

- Time to market - reusing existing, proven components ensures developers can focus on high-level business logic. Research suggests that reusing components can save between 40–81% of engineering time.
- Debugging - code is broken down into bitesize chunks, which are easier to both debug and fix.
- UI and UX consistency - user experience will always be consistent across flows.

## Components are not just simple UI primitives

With Bit, components can be more than a UI atom and it's not just the look-and-feel of your site which can be isolated and reused. Components, both UI and business logic (e.g. a custom react hook) can be composed together to form a larger widget, which itself can be pieced together with other components to form a whole page. Using Bit you can share a component as small as a checkout button, up to a credit card form widget, which is then part of a checkout page, and even a full website.
Sharing product pages and flows encourages people to work more openly and efficiently. It also helps teams and business stakeholders gain insights into the current product portfolio. Our vision is to have open, easy access to every product page and each of its constituent components.

- **UI primitives** like buttons, and text
- **UI Widgets** like forms, search inputs and date pickers
- **Connected components** service-connected UI like a credit-card input form that is linked to a payment service
- **Page** a full page in a product.
- **Web flow** - a reusable flow like signup-form, phone-number-confirmation
- **Data** - component which provides data to UI from various APIs