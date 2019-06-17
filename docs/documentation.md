---
id: doc
title: Create your documentation
sidebar_label: Start your documentation
---
The doc part is where magic happen, docusaurus parse your markdown and create HTML pages with it.
In this section we won't gonna see how docusaurus work behind the scene but we gonna explain how to create your documentation and what you need to do that correctly.


## Create your files
To start creating your documentation you first need to add a new file in your `docs/` folder, this will tell to docusaurus, "*Okay this file will be part of the documentation of the site*".
> **Note:** Don't forget to add the markdown extension to your files.
### Add header information
To communicate between them, files need some information's that you have to add at the top of your file:
1. Enclosed your Information's by a line `---` on either side.
2. Use the `id` to define the url of your file (don't include URL just the name).
3. Use the `title` to define the main title of your file.
4. Use the `sidebar_label` to define the link in the sidebar.

This information's are optional but it's advisable to put them.
> **Note:** There are more header information's that you can add, check the [official documentation to see the possibilities](https://docusaurus.io/docs/en/doc-markdown.html).
### Link documents
If you want reference another document in your `docs` folder, simply use the name of the `id` define in the document.

For example i want a add a link to the `header.md` simply do:
```
 I'm a link to the [header](header.md)
 ```


## Currents errors 
> **Note:** Please fell free to add an issue in the [Github repo](https://github.com/luctst/docusaurus-starter-pack) if you have any problem..

- **Do not have the same `id` and `sidebar_label`** Be careful to have a different name for your `id` and your `sidebar_label` or the link won't be available in the sidebar.