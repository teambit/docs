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

Some structures are common for organizations that develop UI applications: 

1. A single frontend team exists, working on a single product. This structure is common for businesses in their initial stage.  
1. The company is growing and develop a set of separate products.  Multiple teams exist, each one responsible for its own product.  
1. Teams want to remain independent, but standardize on their UIs and UX across the projects, and create a centralized team providing a centralized UI component library shared between all application.
1. Organizations that still revolve on a single application that is growing in complexity may want to break the monolith application and employ a micro frontends architecture.

Bit can help teams that grew to work on separate projects but still need to have a consistent UI/UX and also for teams that face some of the issues of working with a centralized UI component library. It is also possible to use Bit when working on a single project, as it helps to decouple all UI components from the business logic and set up the team to scale itself.

## Designing a Bit Workflow

You can utilize Bit however you want, depending on the state of your team. So when designing a workflow, there are some key aspects to take into consideration:

- How many projects need component sharing?
- How similar are the projects that need to share components? e.g., are they all based on the same CLI with the same configuration?
- Is there a centralized repository for shared components?  
- Is there a dedicated team that builds the shared components?
- Are teams split according to functional or business domains?
- Is Continuous Integration (CI) in place for the projects, micro-frontends and the shared components?
- What is Git workflow in place on the projects' repositories and the shared components' repository?

## Suggested Workflows

There are three main workflows you can use to share UI components with Bit:

- A workflow to use when multiple projects would like to share a [**centralized component library**](/docs/workflows/centralized).
- A workflow for [**ad-hoc components sharing**](/docs/workflows/projects) between projects, which helps gradually build a component library.
- A workflow for teams that employ [**micro frontends components sharing**](/docs/workflows/microfrontends).

You can mix and match specific features from each workflow or design your own.
