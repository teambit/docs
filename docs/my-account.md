---
id: my-account
title: bit.dev Account
sidebar_label: Account
---

## User settings

To view the profile page, log-in and click on your avatar at the top right page corner. Then click on the profile name. Select the settings page where you can: 

- Change the avatar
- Update password
- Add and update email addresses
- Delete organizations
  > You must be an admin to delete an organization.
- Leave organizations
  > You can leave an organization on which you are an admin only if other admins exist on that organization.  
- Manage SSH keys for accessing the account
- Delete your account
  > Deleting your account is possible only if you are not an admin on any organization.

## Organization settings

To view an organization, select the organization from the avatar's drop-down list. An organization's admin can:  

- Click on the edit button to change the organization's image, name, homepage, or description.  
- Click on the Settings button to edit the organization's members, billing and integrations.  

## Collections management

Change the settings of the collections by clicking the settings on the collection page. You can access the collection page via the url: `bit.dev/<owner>/<collection>`. Then click the settings button. To make modifications to the collection you need to have admin privileges.  

### Collection's settings

On the collection page you can edit the collection's description or access the settings page to:  

- Change the collection's license.
- Change the collection's visibility (public / private).
- Delete the collection from bit.dev.
- Manage the users that can access the collection and change their permissions.

### Users and Roles

Use the permission tab of the collection to add, remove, and change permissions for users for the collection.  
Collection's members are assigned with 3 possible roles:  

| Role | Admin | Developer | Viewer |
|---|---|---|---|
| View Components* | Yes | Yes | Yes |
| Import Components* | Yes | Yes | Yes |
| Install Components* | Yes| Yes | Yes |
| Export Components | Yes| Yes | No |
| Manage members | Yes | No | No |
| Edit collection's information | Yes | No | No |
| Define integrations | Yes | No | No |

> *Viewing, importing and installing is available for all users for public collections.  

### Transfer collections

Here are the steps to transfer collections that were created on personal account to an organizations account (or between different owners or collections).  

Make sure you have both collections defined on bit.dev and that you have writing permissions to the new collection, and at least viewing permissions to the old collection.  

```shell
# Create an empty directory and initialize it with a bit scope
$ mkdir <collection-dir> # create an empty directory
$ cd <collection-dir>
$ bit init
successfully initialized a bit workspace.

# Import all components from the old collection to the local scope
$ bit import "<old-owner>.<old-collection-name>/*"
successfully imported x components

# Export all components to the new scope rewiring all their dependencies to the new collection
$ bit export <new-owner>.<new-collection> --set-current-scope --rewire --include-dependencies --all
# bit requests approval
exported x components to scope <new-owner>.<new-collection>
```
