---
id: ci-cd
title: Add to CI/CD
---

Bit integrates into your CI/CD pipeline to achieve the following:

1. Install Bit components from Bit.dev or self-hosted Bit servers

2. Version and export components to remote scopes. These are components that are 'soft-tagged' (i.e, pending to be versioned).

> Components in local workspaces should only be 'soft-tagged'. That means they are registered in the `.bitmap` file as pending to be versioned, but not yet versioned. The versioning process should only happen in the CI (once changes to the workspace are pushed to the remote repository). This enables collaboration on components before they are tagged and exported.

3. Publish components (as packages) to NPM or other registries (learn more, [here](/packages/publish-to-npm))

4. Run custom tasks that are part of the 'build pipeline'. Build tasks can be executed to perform custom actions as part of the CI/CD process (for example, to bundle and deploy the 'App' component). To learn how to extend an environment with your own 'build task', see here.

## Setting up the CI with Github Actions

### 1. Create a new [Github](https://github.com) repository

You can also follow along with this [example project.](https://github.com/teambit/harmony-with-github-actions)

### 2. Set the user authentication token as a secret repository variable

To perform [Bit.dev](https://bit.dev) operations from the CI runner, use the authentication key of a registered Bit.dev user. It is advisable to create a user solely for that purpose.

To get the authentication token, run the following command (in your local terminal) and copy the `user.token` value (make sure the user is logged-in in your machine using `$ bbit login`)

```shell
$ bbit config

analytics_id                  xxxxxxxxxxxxx
analytics_reporting           false
registry                      https://node.bit.dev
anonymous_reporting           false
error_reporting               false
analytics_domain              https://analytics.bit.dev/
hub_domain_login              https://bit.dev/bit-login
hub_domain                    hub.bit.dev
user.token                    xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
```

Create a new [secret variable](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets) in your Github repository. Name it `BIT_TOKEN` and set the value of it to the `user.token` value.

### 3. Create a new Github workflow

Create a new `tag-and-export.yml` file in your remote repository `./.github/workflows` directory:

For example:

```sh
your-repository-name/.github/workflows/tag-and-export.yml
```

### 4. Name your workflow and set the triggering events

```yaml
name: Tag and Export Components

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

### 5. Set up the right environment for the CI runner

That includes installing Bit globally. In addition to that, make sure to set `BIT_TOKEN` as an environment variable (to use later on).

```yaml
jobs:
  tag-and-export:
    runs-on: ubuntu-latest
    env:
      BIT_TOKEN: ${{ secrets.BIT_TOKEN }}

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 12
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - name: Install latest version of bit
        run: npm i -g @teambit/bit
```

### 6. Disable any type of analytics reporting and set the user authentication token

```yaml
- name: Set up bit config
      run: |
          bbit config set analytics_reporting false
          bbit config set anonymous_reporting false
          bbit config set user.token $BIT_TOKEN
```

### 7. Add steps to tag and export the pending components

1. **Install packages** using Bit (this will also create packages for tracked components that are not yet tagged).
2. **Hard-tag** all components pending to be versioned. These are components that were 'soft-tagged' by a workspace in a local repository (the source of the 'push' or pull-request that triggered the CI).
3. **Export** all tagged components.

```yaml
- name: Install packages using bit
  run: bbit install
- name: Hard-tag pending components
  run: bbit tag --persist
- name: Export components
  run: bbit export
```

> **Where is the 'test' and 'build'?**
>
> The `tag` command runs the 'build pipeline' before versioning a component. This pipeline includes building and testing. if any of these tasks fails, the versioning process will be aborted.

### 8. Commit the modified .bitmap file

The previously soft-tagged components are no longer registered as pending to be versioned. Instead, they are registered with a new bumped version. All these changes happen in the `.bitmap` file. These changes need to be committed back to the repository.

```yaml
- name: Commit changes made to .bitmap
  run: |
    git config --global user.name '${{ github.actor }}'
    git config --global user.email '${{ github.actor }}@users.noreply.github.com'
    git add .bitmap
    git commit -m "update .bitmap with new component versions (automated)."
    git push
```
