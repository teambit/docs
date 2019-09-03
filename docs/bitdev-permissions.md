---
id: bitdev-permissions
title: Dependency Limitations
permalink: docs/bitdev-permissions.html
layout: docs
prev: bitsrc-security.html
next: bitdev-sla.html
---

In this doc we list some of the caveats of cross collection dependencies of components.

## Securing Private Components

Bit aims to provide a secured and reliable hub for sharing both public and private code. There are few cases where dependencies between components that are hosted in different collections and owners may harm Bit's reliability to provide with working components and not exposing private code.  
To ensure this does not happen, [bit.dev](bit.dev) has some limitations on cross collection dependencies. All limitations below are relevant to exported components.

### Public components not allowed to depend on private components

A public component is usable by the entire Bit community. If it depends on a private component that only a few developers can import, it does not work for the majority of the community. This makes the component to not be public, as it does not function.  
Additionally, by design a collection caches the dependencies of its components. This means that the collection holds a copy of all the dependencies of the components, including, possibly - private components. This can cause a leak of private components.

### Private cross collection dependencies must be of the same account

Collections managed in the same account (personal or organization) can have cross dependencies. This is because the code is in fact owned by the account. Given that both collections are of the same account, and both are private, components from one collection can depend on the other.  
If both components are private, but are managed by different accounts they can't have cross dependencies.
