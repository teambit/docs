---
id: aspects-overview
title: Aspects Overview
---

Aspects are the building blocks of Bit. Aspects modularize and isoalte cross-cutting business conerns in Bit. This means that each Aspect in Bit is a "service" implementing a feature.  
This means that at its core Bit is simply a **composition** of services that together form a complete system.

Below are some examples for Aspecs in Bit:

- [Generator](aspects/generator) - Creating new components using pre-defined templates.
- [MDX](aspects/mdx) - Manages component documentation using MDX files.
- [Dependency resolver](aspects/dependency-resolver) - Handles dependency policies and resolutions for components and installing dependencies via an integration with various package managers.
- [React](aspects/react) - Manages all local development requirements for React-based workflows and highly inspired by `react-scripts`.

Each Aspect is implemented as a component in Bit and is composed from multiple components. Aspects communicate and compose with one another via APIs called `integration slots`.

You can implement new Aspects, compose them with Bit's core Aspects and thus extending Bit's core funatlity to support advanced features.
