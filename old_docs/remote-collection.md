---
id: remote-scope
title: Creating a Remote scope
---

A Remote scope is a components' scope hosted on bit.dev.

## scope Information

and dynamic list of shared components on a remote server. Use scope for collaborating on components between repositories.

Each remote scope contains the bit scope of its components as well as additional information on the scope:

- **scope name** - The name by which the bit scope in the scope is available to developers for sharing or consuming components.
- Visibility - Determines who can view the scope: A public scope is a free scope that is visible for all registered users. A private scope is limited to the organizations registered users.
- License - The default code license that is applicable for all the components shared in the scope (such as MIT, GPL or other licenses)
- Users & Roles - the users that have access to the scope and their roles on the scope (admin, developer, or viewer).

### Permissions for scopes

bit.dev provides a secured and reliable hub for sharing both public and private code. There are few cases where dependencies between components that are hosted in different scopes and owners may harm reliability to provide with working components and not exposing private code.  
To ensure this does not happen, bit.dev enforces the following rules on components exported to multiple scopes:

- Components in public scopes cannot depend on private components: A public component is available for the entire Bit community. Therefore, it may not depend on components that reside in public scopes.
- Components in private scope cannot depend on components in other organizations: Dependencies in private scopes may depend on public scopes or on private scopes that belong to the same account (personal or organization).

You can create a scope for specific projects, ideas, teams and more. Components in remote scopes are discoverable by other developers.

## Creating a remote scope on [bit.dev](https://bit.dev/)

Once signed-in, click on the ’+ ADD PROJECTS’ button in the top-right corner of the screen. Choose ‘Create scope’ from the menu. In the ‘Create scope’ page, enter the following information:

- scope name
- Visibility - Determines who can view the scope:
  - Public - A free scope that is visible and searchable by the [bit.dev](https://bit.dev/) community. [bit.dev](https://bit.dev/) offers free hosting for public open source scopes, now and forever.
  - Private - A closed scope. You choose who has access permissions to the scope.
- License - Code license for all the scope’s contents.

Click on ‘Create scope’. Bit redirects you to the new scope.

## scope role types

There are 3 role types in a [bit.dev](https://bit.dev/) scope:

- Admin - a scope admin has root access. Including the ability to set permissions and manage the scope memberships.
- Developer - a developer can contribute, view and discover the scope’s components. A developer can’t invite new members.
- Viewer - a viewer can view and use the scope’s components. A viewer can’t contribute to the scope.

### Update scope settings

To update a scope's settings, click on 'Settings' in the scope page.

#### Update visibility

Changing a scope’s visibility affects all the components within that scope. Thus affects other developers that use components in that scope.

#### Add members

A scope admin can add an unlimited amount of signed-up users as members.

To add a member:

1. In the 'Settings' page, click on 'Permissions'.
2. Type either the username or email address of the member you wish to add under 'Add a member', and choose a role.
3. Click on 'Add'.

#### Remove members

To remove a member:

1. In the 'Settings' page, click on 'Permissions'.
2. Find the user you'd like to remove in the members list.
3. Click on the trash icon to the right.

Note: removing people might hurt their feelings :)

## Create a remote scope on your server

To create a scope on a self-managed server, [learn more here](/docs/conf-bit-on-the-server.html).
