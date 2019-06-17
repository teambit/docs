---
id: sidebar
title: Configure your sidebar
sidebar_label: Configure your sidebar
---
After having created your docs you may want this will be associated to the link in the navigation, by default the sidebar is initialized with the `docs`, you can customize your sidebar by modify the **sidebars.json** file.


## Customize your sidebar
Sidebar in docusaurus contains two part the first one is category and the second is link in category.
### Category
To change, add, delete or do what you want in your sidebar category open the **sidebars.json** file:
```json
{
  "Docs": {
    "Setup": ["overview"],
    "Guide": ["header", "homepage", "doc", "sidebar"],
    "Mémos": [""],
    ...: [""],
  },
  ...: {

  }
}
```
 and replace the `Setup`, `Guide` property by your category name, it's also possible to add more category by create a new property (array).
### Links
To create links in your category sidebar you have to use the `id` field of your file:
```json
{
  "Docs": {
    "Setup": ["overview"],
    "Guide": ["header", "homepage", "doc", "sidebar"],
    "Mémos": [""],
    ...: [""],
  }
}
```
In the above example, we have three categories:
1. The `setup` category contains one link (overview) who represent the `overview.md` file with `id` equal to overview.
2. Repeat the process as much as you want to create links. If you want add many links in one category simply add elements in the array of your category.


## Right sidebar
The right sidebar in docusaurus is automatically generated via your markdown tag, use it for organize your content for a better understanding:

- The `##` tag generate an anchor and a `h2` HTML tag.
- The `###` tag generate and anchor and a `h3` HTML tag who can be nested.

> **Note:** the `h4`, `h5` and more don't generate title in the right sidebar.