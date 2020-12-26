---
id: export-to-scope
title: Export to a Remote Scope
---

A scope is where the release versions of independent components are stored. Scopes are used both locally and remotely:
* __Local scopes__ store "staged" components that are ready to be exported from the local environment to a remote scope. You'll find your local scope in the `.bit` or  `.git/bit` directory inside your workspace directory.
* [__Remote scopes__](/docs/scope/remote-scope), either on Bit.dev or other self-hosted Bit servers, store exported components that are available to be used by other repositories.

A single server may host multiple scopes. Each of these scopes groups together components that are related to each other by function or purpose. Each scope naturally corresponds to a specific team of developers (and even non-developers).

So far, we've tracked a component and tagged it. As mentioned earlier, the tagging process prepares the component to be exported to a remote scope by running the [build pipeline](/docs/getting-started/version#1-runs-the-environments-build-pipeline) on it and storing it in the local scope with a new version number.

## Setting up your remote Bit Scope
To set a remote scope for your soon-to-be exported components, use the `workspace.jsonc` configuration file.

For example:

```json
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "getting-started-harmony",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
```
The `defaultScope` field suggests it can be overridden. To learn about setting different scopes for different sets of components in your workspace, [see here.](TODO)
### Scope on bit.dev

To host components on [Bit.dev](https://bit.dev), [create a scope](https://bit.dev/~create-collection)  (or "collection").


<img src="/img/scope_type.png" alt="Choose scope type" width="50%" height="50%">
> If you are self-hosting a Bit server, you need to ensure you create a Bit server. Please follow [this guide](TODO) for additional details.

## Sign in from your terminal
After registering to [Bit.dev](https://bit.dev), head over to your terminal and run the login command:
```shell
$ bbit login
```
This should open up your browser and display a "Signed in successfully" message.
## Export all staged components to a remote scope

Run the `bit export` command to have Bit publish all versioned components. In our case it is only the previously tagged 'Button' component.

```sh
$ bbit export
```

## Post export operations

The export process updates your workspace' `.bitmap` file. Make sure to commit these changes to Git.

```sh
git commit -am 'updated .bitmap file after a successful export'
```
