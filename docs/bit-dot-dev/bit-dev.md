---
id: bit-dev
title: Component Cloud Platform
---

[Bit.dev](https://bit.dev) is Bit’s enterprise-grade component cloud. It is a service for hosting and collaborating on Bit components with out-of-the-box features and enterprise-grade standards for teams of all shapes and sizes.

With Bit.dev organizations can grow a standard component ecosystem for all teams to drive the development of modern applications in a fast, consistent, and scalable manner.

## Free for Open Source

Bit.dev is, and forever will be free for open source usage. Any developer or a team looking to share public components can do it safely on Bit.dev and enjoy all bundled features.

## Working with Bit.dev

To work with Bit.dev and enjoy its features you will need to:

1. [Create a Bit account](https://bit.dev/signup).
1. [Authenticate to Bit.dev](https://harmony-docs.bit.dev/getting-started/remote-scope) from your local workspace, to export components to Bit.dev.

## Key Features of Bit.dev

Bit.dev comes equipped with a rich set of features and all enterprise-grade standards to empower teams of all sizes to build with components together. It’s trusted by world-leading teams for a [verity of use-cases](https://blog.bitsrc.io/4-bit-use-cases-build-like-the-best-teams-1c36560c7c6e) to benefit from an organizational component system.

For help or more information [get in touch](https://bit.dev/support) with our experts.

### Remote Scope Hosting

![remote bit scope hosted on bit.dev](/img/scope-hosting.jpg)

Bit.dev is a SaaS service for hosting remote Scopes of components, which you can create and host on demand. Scopes on Bit.dev can be:

- **Public** scopes containing OSS components, visible to all users.
- **Private** scopes, visible only to the members of the organization which owns the scope.

There is no limitation of the amount of Scopes that can be created by a developer or an organization on Bit.dev.

All the documentation for components including examples, compositions, versions, dependencies, test results etc will be displayed on Bit.dev mirroring the Scope UI for Bit’s local development, and will be updated with new versions of your components exported to Bit.dev.

### Organization and Permission Management

Bit.dev centralizes the management of your team’s scopes and makes it simple to control permissions for members of your organization. Organization members can create Scopes within the organization and be invited to collaborate on Scopes created by others in the organization.  
Organization admins can manage permissions for members and curate the organization’s dashboard. The admins have owner permissions to manage (create, update or remove) all Scopes created within the organization.

Centralizing the management of your organization’s Scopes and permissions while enabling teams within the organization to work independently enables you to keep control without slowing down your development - democratizing innovation for product teams while creating visibility and regulation of your organization’s components.

### Enterprise-grade security (with SOC2 and SSO SMAL)

Bit.dev is **SOC2 certified** and is trusted by world-leading enterprises from various industries (software, health, manufacturing, finance and more) thanks to world-class [security features and standards](https://bit.dev/resources/security).

Security features include **SSO SAML**, source-code encryption at rest, backups, uptime SLA, and advanced cloud standards. To learn more about security at Bit.dev [talk to our experts](https://bit.dev/contact-sales).

### Component Explorer

![Galley showcasing different components and their rendered examples](https://storage.googleapis.com/bit-docs/component-discovery-bit-react-gif.gif)

As you scale development to many component and developers it become critical to create discoverability for all your components.

Bit.dev provides the **world’s most advanced component explorer**, which combines smart search and filtering features with an amazing visual experience to indulge your team.

Bit.dev's component explorer allows searching across all the remote scopes that the user has access to, such as the public scopes and the user/organization's own components.  
The component explorer uses metadata of the component - tags, language, framework, and size - for advanced semantic searching capabilities, making it quick and simple to find any component that already exists in your team’s codebase.

Reuse and collaboration on components is key to accelerating development and creating a consistent experience for your users across pages and applications.

### Package Registry

All components that are exported to Bit.dev are stored in the Bit package registry. The components are available as npm packages that can be [installed](/getting-started/installing-components) using standard package managers (NPM or Yarn).

You can install components as packages directly from Bit.dev’s lighting-fast registry and/or integrate it with tools like Artifactory and Nexus.

The components in the Bit.dev registry are available with the `@<owner>` prefix, where `owner` is the name of the user or organisation which owns the scope you are exporting to. The full name of the component is in the format of `npm i @<owner>/<scope-name>.<component-name>`.

Never write a component twice again!

#### Artifactory and Nexus Integrations

Already have a private registry?  
Teams already utilizing private registries can have their components available for installing from the same centralized location, allowing for a simple and seamless workflow.

Learn more: [Bit with Artifactory on JFrog Blog](https://jfrog.com/blog/artifactory-your-npm-registry-for-bit/#:~:text=Artifactory%20ensures%20component%20availability&text=Bit%20enables%20developers%20to%20isolate,from%20other%20projects%20using%20NPM.)

### Ripple CI (coming)

![RippleCI propogating a modification of a component to its dependents](/img/ripple.png)

**Ripple CI** (closed beta) unleashes the true power of components like never before possible.

It is the first and most powerful continuous integration system ever built for component-driven development. With Ripple, teams in the organization can constantly and independently release fast automated update to components and continuously integrate these changes to all impacted teams and applications. It’s a better way to build together.

Thanks to its component-driven design, Ripple unlocks 4 game-changing features:

- Ripple builds changes to components and their affected dependants, nothing else. This makes Ripple the **fastest CI** ever built for large applications with many components.
- Ripple builds every component in isolation and presents its build and test results, so you can instantly learn which components will break, where, and why, on every change.
- Ripple builds changes to components across applications and repositories. When a new component version is released with Ripple, it will be integrated to all pages and applications that consume it in the organization, making it easy for all teams to get and adopt the update, without breaking anything or waiting a long time for updates.

Lastly, Ripple **visualizes the build process on the component-graph** of your applications, and presents **visual previews** for changes to all impacted components.

When a new component version is released, everybody can see and learn exactly how the change will **look and feel for every impacted component**, everywhere. This means that product teams can build and release together like never before.
