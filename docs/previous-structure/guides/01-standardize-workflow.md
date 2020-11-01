---
id: standardize-workflow
title: Standardize Workflow
---

Environments define all operations and configurations of components. It is very beneficial for you to use environments as a method to standardize component development in the company. For example, how components are structured, their runtime framework versions, tests and lint rules. They are used to automate your development workflow.

There are several key features in Environments that allow for workflow automation.

## Standard operations

Bit is a plugin system where you can set an extension on to a component, that extension registers itself to various hooks in Bit's commands.

A specialized type of these extensions are [Environments](/docs/environment/overview). Environment has a specific interface to integrate with various commands like `build`, `create`, `ci`, `test` and so on. When you define an environment on a component, the environment then connects the component to Bit's commands.

This flexible plugin system allows you to have many components in the same workspace, where each component has a different environment defined. Given that all environments register components to the same commands, you still keep the same experience of using `bit test` and all components are tested with the same configuration and logic as set for them by the environment.

## Embedded configuration

What are the best practices for running Jest with Snapshot testing? Should I compiler to ES6? Which lint rules should I use for my components?

You probably asked yourself these questions more than once, and had to implement their answers for each new project. To make the process of setting configuration for the various operation easier, each environment contain a default configuration set for each operation. These configuration may be extended by the consumer or changed completely, depending on the implementation.

This helps to standardize and create company-wide best practices for component development and still give allow flexibility for consumers.

## Component isolation

A critical task of an environment is to run operations on components to make sure that nothing in the context of the project affects its functionality. This helps you understand if your component is isolated, as any globals or other variables not defined as part of the API or configuration of the component, they will not be available when you either `build` or `test` your code - so these tasks will fail. Using the isolated runs Bit helps you understand how well decoupled is your codebase.
