---
id: workflows
title: Bit Workflows
---

Bit simplifies the process of collaborating on UI components. Team members can share, maintain, and synchronize components from different projects.
This allows teams to:

- Increase code reusability
- Increase design and development efficiency
- Retain UI and UX consistency
- A stepping stone for establishing a [micro frontends architecture](https://martinfowler.com/articles/micro-frontends.html)

## What is a Bit workflow?

Bit is a collaboration tool that spans across people and projects. As any code-collaboration tool, the key to use Bit successfully is to have a clear and concise workflow. The distributed nature of Bit allows for far more flexible in how developers collaborate on components so you can adjust it to fit your team's structure and requirements.

## Benefits of using a Bit workflow

It is typical for organizations that develop UI products to evolve in a certain way:

![teams](https://storage.googleapis.com/static.bit.dev/docs/images/workflows_teams.png)

1. Initially, the whole team is working on a single product.
1. Later on, different products evolve, and usually, a team is assigned to each project.
1. At a later stage, the team is aiming to standardize their work and form a centralized UI component library providing the necessary building blocks to be used by the projects.

Bit can help teams that grew to work on separate projects but still need to have a consistent UI/UX and also for teams that face some of the issues of working with a centralized UI component library. It is also possible to use Bit when working on a single project, as it helps to decouple all UI components from the business logic and set up the team to scale itself.

## Designing a Bit Workflow

You can utilize Bit however you want, depending on the state of your team. So when designing a workflow, there are some key aspects to take into consideration:

- How many projects need component sharing?
- How similar are the projects that need to share components? e.g., are they all based on the same CLI with the same configuration?
- Is there a centralized repository for shared components?  
- Is there a dedicated team that builds the shared components?
- Is Continuous Integration (CI) in place for the projects and the shared components?
- What is Git workflow in place on the projects' repositories and the shared components' repository?

## Suggested Workflows

There are two main workflows you can use to share UI components with Bit:

- A workflow to use when there is a [**centralized component library**](/docs/workflows/centralized) that multiple projects would like to use.
- A workflow for [**ad-hoc components sharing**](/docs/workflows/projects) between projects, which helps gradually build a component library

You can mix and match specific features from each workflow or design your own.
