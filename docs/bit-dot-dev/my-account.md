---
id: my-account
title: bit.dev Account
sidebar_label: Account
---

## User settings

To view the profile page, log-in and click on your avatar in the top right corner. Then click on the profile name and select the settings page where you can: 

- Change the avatar 
- Update password
- Add and update email addresses
- Delete organizations
  > You must be an admin to delete an organization.
- Leave organizations
  > You can leave an organization for which you are an admin only if other admins exist on that organization.  
- Manage SSH keys for accessing the account
- Delete your account
  > Deleting your account is possible only if you are not an admin on any organization.

## Organization settings

To view an organization, select the organization from the avatar's drop-down list, and click the settings button near the top-right of the page. An organization's admin can:  

- Click on the edit button to change the organization's image, name, homepage, or description.  
- Click on the Settings button to edit the organization's members, billing settings, and integrations.  

## Scope management

Change the settings of a scope by clicking the settings button above the side-bar on the scope page. You can access the scope page via the url: `bit.dev/<owner>/<scope>`. To make modifications to the scope you need to have admin privileges on the scope.  

### Scope settings

On the scope page you can edit the scope's description, or access the settings page to:  

- Change the scope's license.
- Change the scope's visibility (public / private).
- Delete the scope from bit.dev.
- Manage the users that can access the scope and change their permissions.

### Users and Roles

Use the permission tab of the scope to add, remove, and change permissions for users for the scope.  
A scope's members are assigned with 3 possible roles:  

| Role | Admin | Developer | Viewer |
|---|---|---|---|
| View Components* | Yes | Yes | Yes |
| Import Components* | Yes | Yes | Yes |
| Install Components* | Yes| Yes | Yes |
| Export Components | Yes| Yes | No |
| Manage members | Yes | No | No |
| Edit scope's information | Yes | No | No |
| Define integrations | Yes | No | No |

> *Viewing, importing and installing is available for all users for public scopes.  

### Transfer scopes

Here are the steps to transfer scopes that were created on personal account to an organizations account (or between different owners or scopes).  

Make sure you have both scopes defined on bit.dev and that you have writing permissions to the new scope, and at least viewing permissions to the old scope.  

```shell
# Create an empty directory and initialize it with a bit scope
$ mkdir <scope-dir> # create an empty directory
$ cd <scope-dir>
$ bit init
successfully initialized a bit workspace.

# Import all components from the old scope to the local scope
$ bit import "<old-owner>.<old-scope-name>/*"
successfully imported x components

# Export all components to the new scope rewiring all their dependencies to the new scope
$ bit export <new-owner>.<new-scope> --set-current-scope --rewire --include-dependencies --all
# bit requests approval
exported x components to scope <new-owner>.<new-scope>
```
