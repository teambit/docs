---
id: build-like-google
title: Build Like Google
---

Many teams and developers strive to "build like google" which means "have all code sorted in a single codebase". This is a tremendous task to accomplish, as there are no source code management software that can handle large scale code bases with the required tooling to sustain a productive workflow.

If we break down the actual requirements from such a large monorepo we understand the following:

- Google gain feature ownership by managing permissions in sub-trees of their repository.
- Different teams create dependencies in the codebase to use each other's implementations.

This means that a possible pragmatic approach for implementing a Google-like code architecture is enabling teams to create different modules and apps, and have managed dependency graph for the entire organization, thus allowing teams to stay up-to-date with latest changes.

When structuring the problem like that we see that Bit is the most pragmatic way for teams to work within a single monorepo. The main different it that unlike Google, Bit is a Virtual Monorepo as it is distributed on many scopes and only by understanding the complex dependencies between components, we can "connect" all distributed components to a single monorepo.