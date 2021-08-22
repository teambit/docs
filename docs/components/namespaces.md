---
title: Namespaces
id: namespaces
---


### Component Namespaces

Namespaces are a way of grouping your components together. When creating ui components, for example, we might want to create them under the namespace of 'ui'. This makes it easier to find all 'ui' components as well as apply specific environments to a set of components. You can have more than one level of namespaces such as 'ui/styles', this namespace will then become part of the components id which is used when installing and consuming the component.

Namespaces do not have to be the same as the directory structure of your project however we encourage you to use the same structure for ease of use.

You can add namespaces to your components when creating them by adding the namespace followed by a slash before your component name or by using the `--namespace` flag.

<Tabs
groupId="frameworks"
defaultValue="React"
values={[
{label: 'React', value: 'React'},
{label: 'Angular', value: 'Angular'},
]}>
<TabItem value="React">

```bash
bit create react ui/my-component
bit create react my-component --namespace ui
```

  </TabItem>
  <TabItem value="Angular">

```bash
bit create ng-lib ui/my-component
bit create ng-lib my-component --namespace ui
```

  </TabItem>
</Tabs>

