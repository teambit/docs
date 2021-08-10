---
id: faq
title: FAQ
---

## Is Bit.dev open source?

Bit is an open-source CLI tool for components collaboration. You can find the Bit repo [here](https://github.com/teambit/bit). You can install Bit locally on your workspace to start working with Bit. For sharing components, you can set up [your own server](/docs/bit-server), or you can use [bit.dev](https://bit.dev).
Unlike the Bit CLI, the bit.dev server is a proprietary tool owned by Bit. Bit.dev provides [additional functionality](/docs/bit-dev) on top of a bit server, such as component search, playground and CI for components. Bit.dev offers free plans for public scopes and personal accounts and [paid plans](https://bit.dev/pricing) for private scopes for organizations.

## Are Git and Bit the same?

Git is a distributed version-control system for tracking changes in source code during software development. Git manages changes in files' contents without any reference to their structure or semantics. Bit adds a layer on top of Git that understands the internal structure of the code as components and managing their internal relationships.

Bit augments Git to:

- Bundle files into components so they become granular, shareable components.
- Add an automatic layer for versioning components (creates package.json)
- Run building and testing on components as if they are outside of the repository, while they still 'physically' reside in the repository

Bit does not require Git to exist in the project, but it can use Git's functionality to perform actions such as code merging. Bit should not replace Git in project development. The project's code should remain in Git.

## Is Bit the same as NPM / Yarn?

A component packaged with Bit is a valid NPM package and can be installed using NPM or Yarn.

Package registries and tools like NPM and Yarn help to manage distributable artifacts. NPM and Yarn manage the dependencies for each package, according to the explicit definition in the package.json files.

- Bit automates code packaging based on code analysis
- Bit provides access to package code with a single command without leaving the project context
- Bit manages dependencies between packages and automatic versioning based on dependencies
- Bit lets you access the package (i.e. component) source code in any consuming project and directly change it from there
- Bit adds a layer of development tools to aid creation, isolation, testing and demonstration of your packaged components

## Is Bit the same as Storybook?

Storybook is a wonderful tool for visually developing and documenting components.

Storybook is a fantastic aid for visually developing components in simulated isolation and creating visual documentation for components based on their stories.

Bit is how you (and your team) can create, manage and collaborate on components in your applications. It facilitates the full lifecycle of component development: Bit tracks changes to the components, packages them for distribution, merges code changes, tracks versions, and showcases them on a cloud hub.

Through bit.dev, the components are not only put on display but can be directly managed and consumed.

Storybook and Bit can live separately or side by side. For example, Bit can be used to isolate, build, test, and publish multiple components from a repository. Storybook can provide the visual development environment for the component prototyping to create examples that leverage the component discovery experience in bit.dev.

_Learn more:_ [How is bit.dev different from Storybook?](https://blog.bitsrc.io/how-is-bit-dev-different-from-storybook-892b373733bd)

## Can I share Python, PHP or Java code with Bit?

It is technically possible to share non javascript code using Bit. However, Bit best fits the **Javascript ecosystem** code, i.e. node, UI frameworks with Javascript and Typescript. The list of compilers supported in Bit for generating build assets all generate JS code.

## Can I use a Bit React component in Vue project?

Bit works within the **boundaries of a platform or a framework**. Node code cannot access the global window (unless poly-filled). Moving a browser code to Bit and then importing it into Bit does not bypass this limitation. The code is still non-compliant to other frameworks.  
The same goes for platforms: Angular code will not work in React or vice versa. So although it is possible to share this code between React and Angular projects, code will work only if it fits the target project.
(If you want to produce framework agnostic components there are supported Stencil compilers in the Bit ecosystem)

## Does Bit support React Native?

Bit can be used to shared any javascript code. So, you can use Bit to share code for react native components. You can use any of the [React envs](https://www.github.com/teambit/envs). Note that [bit.dev](https://bit.dev) does not support rendering of React Native components in the component playground.

## Is there an on-premise version of Bit?

The Bit cli tool is open source and is the engine that runs for a bit client (workspace) and a Bit server (remote scope). You can host and share components on your own server. I.e. export components to it and import components from the server. Building, testing and rendering should be done on your own CI/CD.  
Bit.dev uses the Bit cli as its engine but provides [additional functionality](/docs/bit-dev) including component CI, component search, explorer and online playground. Also, components exported to bit.dev are available for installing using npm and yarn.  
Bit.dev is a SaaS based solution only and is not currently available for on-premise.
