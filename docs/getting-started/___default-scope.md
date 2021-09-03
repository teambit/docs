### Setting the Default Scope

The default scope is the collection, or remote scope, that you want your components to be exported to. By default all components will be exported to this scope. The default scope is made up of the 'owner' of the collection, for example a username or organization, followed by the name of the collection and is separated by a dot.

<Tabs
groupId="frameworks"
defaultValue="React"
values={[
{label: 'React', value: 'React'},
{label: 'Angular', value: 'Angular'},
]}>
<TabItem value="React">

```bash
bit new react my-workspace --default-scope my-org.my-scope
```

Or configure it manually

```jsonc title=worksapce.jsonc
"defaultScope": "my-org.my-scope"
```

  </TabItem>
  <TabItem value="Angular">

This can be configured manually in the `workspace.jsonc` file.

```jsonc title=worksapce.jsonc
"defaultScope": "my-org.my-scope"
```

  </TabItem>
</Tabs>

:::warning
When components are created they use the default scope as part of the component id. If you modify the default scope after creating components and consuming them, you will need to update any import statements of these components. Then run `bit link` and `bit compile`and the components will work as expected.
:::

:::info Exporting to Different Scopes
You can also set components to be exported to different scopes by configuring them under the [variants](/) in the `workspace.jsonc` file. This means you can have one workspace that exports to multiple remote scopes.
:::
