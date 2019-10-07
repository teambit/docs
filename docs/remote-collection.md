---
id: remote-collection
title: Creating a Remote Collection
---

A Remote Collection is a components' scope hosted on bit.dev. 

## Collection Information

 and dynamic list of shared components on a remote server. Use collection for collaborating on components between repositories.


Each remote collection contains the bit scope of its components as well as additional information on the collection:  

- **Collection name** - The name by which the bit scope in the collection is available to developers for sharing or consuming components.  
- Visibility - Determines who can view the Collection: A public collection is a free collection that is visible for all registered users. A private collection is limited to the organizations registered users.  
- License - The default code license that is applicable for all the components shared in the collection (such as MIT, GPL or other licenses)  
- Users & Roles - the users that have access to the collection and their roles on the collection (admin, developer, or viewer).

### Permissions for Collections

bit.dev provides a secured and reliable hub for sharing both public and private code. There are few cases where dependencies between components that are hosted in different collections and owners may harm reliability to provide with working components and not exposing private code.  
To ensure this does not happen, bit.dev enforces the following rules on components exported to multiple collections:

- Components in public collections cannot depend on private components: A public component is available for the entire Bit community. Therefore, it may not depend on components that reside in public collections.  
- Components in private collection cannot depend on components in other organizations: Dependencies in private collections may depend on public collections or on private collections that belong to the same account (personal or organization).  


You can create a Collection for specific projects, ideas, teams and more. Components in remote collections are discoverable by other developers.

## Creating a remote Collection on [bit.dev](https://bit.dev/)

Once signed-in, click on the ’+ ADD PROJECTS’ button in the top-right corner of the screen. Choose ‘Create Collection’ from the menu. In the ‘Create Collection’ page, enter the following information:

* Collection name
* Visibility - Determines who can view the Collection:
  * Public - A free Collection that is visible and searchable by the [bit.dev](https://bit.dev/)  community. [bit.dev](https://bit.dev/) offers free hosting for public open source Collections, now and forever.
  * Private - A closed Collection. You choose who has access permissions to the collection.
* License - Code license for all the Collection’s contents.

Click on ‘Create Collection’. Bit redirects you to the new Collection.

## Collection role types

There are 3 role types in a [bit.dev](https://bit.dev/) Collection:

* Admin - a collection admin has root access. Including the ability to set permissions and manage the Collection memberships.
* Developer - a developer can contribute, view and discover the Collection’s components. A developer can’t invite new members.
* Viewer - a viewer can view and use the Collection’s components. A viewer can’t contribute to the Collection.



### Update Collection settings

To update a Collection's settings, click on 'Settings' in the Collection page.

#### Update visibility

Changing a Collection’s visibility affects all the components within that Collection. Thus affects other developers that use components in that collection.

#### Add members

A Collection admin can add an unlimited amount of signed-up users as members.

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

## Create a remote Collection on your server

To create a Collection on a self-managed server, [learn more here](/docs/conf-bit-on-the-server.html).