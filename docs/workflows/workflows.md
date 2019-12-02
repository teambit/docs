---
id: workflows
title: Bit Workflows
---
Bit simplifies the process of collaborating on UI components. Team members can share, maintain and synchronize components from different projects.  
This allows teams to:

- Increase code reusability
- Increase design and development efficiency
- Retain UI and UX consistency

## Introducing Bit in the organization

It is typical for organizations that develop UI products to evolve in a certain way:  

![teams](https://storage.googleapis.com/static.bit.dev/docs/images/workflows_teams.png)

1 - Initially the whole team is working on a single product.  
2 - Later on different products evolve and usually, a team is assigned to each project.  
3 - At a later stage the company is aiming to standardize its work and form a dedicated centralized (infrastructure) team providing the necessary building blocks to be used by the projects.  

Bit brings value when growing from a single team to multiple teams, and later when introducing a shared UI system across the organization. Bit also facilitates the transition between these stages.  

## Selecting a Bit Workflow

When designing a workflow there are some key aspects to take into consideration:  

- How many projects need component sharing?  
- How similar are the projects that need to share components? e.g., are they all based on the same CLI with the same configuration?
- Is there a centralized repository for shared components?  
- Is there a dedicated team that builds the shared components?  
- Is Continuous Integration (CI) in place for the projects and the shared components?  
- What Git workflow is in place on the projects' repositories and the shared components' repository?  

## Suggested Workflows

There are two main workflows you can use to share UI components with Bit:

- A workflow to use when there is a [**centralized component library**](/docs/workflows/centralized) that multiple projects would like to use.
- A workflow for [**ad-hoc components sharing**](/docs/workflows/projects) between projects, which helps gradually build a component library

The workflows suggested here are assuming the usage of the bit.dev cloud service for exposing the components to consumers. 
