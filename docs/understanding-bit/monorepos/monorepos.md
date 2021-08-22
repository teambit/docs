---
id: monorepos
title: Overview
---

## What is a Monorepo?
A Monorepo is a single Git repository that holds the source code for multiple projects (application and libraries) along with everything required for them.

Here is an example Monorepo, built with Bit: 


## Why teams use Monorepos?
Teams use Monorepos to improve velocity, dev experience and collaboration across teams. Scaling the amount of repositories brings advantages as well as new challenges. Same is true for a Monorepo.

### Code sharing and reuse
Code sharing becomes easier as all source code existing and accessible under the same repo. APIs can be just "used" assuming they can exist on the same Runtime. In other cases, like where IPC is required, different approaches are taken.

### Dev experience
Dev experience 

### Large scale refactoring
It is easier to do large scale refactoring in a single repo, rather than cloning countless different repos which depend on each other through a certain method (which might be runtime, build time or any other kind of dependency), then figuring out the right repos to clone and understand how to contribute to them all is close to impossible. In a Monorepo, all source code is hosted accessible in the same repo, meaning it is easier to make an atomic set of changes in a "Feature branch", even if these are changes to someone elses source code and propose them. Once feature is completed and accepted by all teams, an atomic merge can be applied, later triggering the deployment.

### Atomic changes
Making changes

### Cross team collaboration
Monorepo empowers and improves collaboration between teams. As source code of all teams is accessible in the same repo, APIs can be easily used, source code can be modified by anyone and therefore it encourages teams to collaborate with each other.
This usually 

Still, discoverability and visibility for APIs and source code is still a rough challenge as the codebase grows.

### API and source code accessability

## Challenges building in Monorepos
Monorepos solve a portion of problems, while introducing new ones.


### Granularity of modules
The overhead of adding a module to be reusable in a Monorepo might be overwhelming and might require numerous configuration files.

### API Adoption
Developers are afraid to adopt APIs as they get coupled to other teams,

### Tooling
Software development tooling, from version control systems, package managers, build systems, CI and more were built for the scale of a single project. The larger the Monorepo becomes the slower it gets to do day to day operations on it. Simple tasks as cloning a repo, installing dependencies, build execution, CI and even IDEs become slower and hard to operate the larger the repository gets. 

### Visibility and Discoverability
Even though all source code sits under the same repository, it gets harder to find relevant APIs and modules as the codebase gets larger. Even on small repositories, developers tend to re-implement functionalities just because it is hard for them to find them. Finding the right API is like finding a needle in an haystack.

### Gradual API changes
In a single versioned Monorepo, a breaking change to a certain components might cause an effect of a rolling breakage across countless occurrences. This can often cause the process of fixing a bug or adding a feature long, frustrating and might require immediate changes on source code owned by different teams and with different set of priorities. Effect is slower delivery, decreased velocity and sometimes makes development of simple features complicated to complete.

### On-boarding developers
On-boarding new developers to a Monorepo gets more cumbersome as the codebase gets larger. Getting new developers to learn the codebase, understand their boundaries and learning what is already available gets very harder the more gets written. Infrastructure tends to become cumbersome and intimidating for new developers.  

### Feedback loop
Build computation gets slower, IDE takes longer to respond and understanding how each change affects others is hard to track and maintain and more. This increases feedback loop over time. Long feedback loops highly decrease velocity and delivery speed. As an example: A developer waiting for his build to complete for 15 mins to en 

### Non-developers

### Inconsistent tooling


### Team boundaries and ownership
Team boundaries and ownership is usually defined by the directory structure, permissions

### CI/CD


## Bit and Monorepos
Bit can be very helpful in either a Monorepo or a Polyrepo architectures. It makes it smart, efficient to build in a Monorepo while providing the same benefits a Monorepo does, also in a Polyrepo architecture. Because the same amount of value 

### Bit and Multi-repo (Polyrepo)


### Repo migration

### Lerna/NX/Rush


