---
id: overview
title: Getting started
sidebar_label: Overview
---
This project was created to be easily used and quickly online, is powered by docusaurus and maintained by Facebook. This documentation provides quick and easy process to launch your static site as quickly as possible, it implies that you adhere to the custom structure know in any case that you can modify, add as you wish the pages but you will have to read the official documentation of docusaurus [https://www.docusaurus.com](https://www.docusaurus.com) to do that.


## Structure
After install your project should be like that:
```bash
root-of-repo
├── docs
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   ├── exampledoc4.md
│   └── exampledoc5.md
├── website
│   ├── blog
│   ├── core
│   │   └── Footer.js
│   ├── node_modules
│   ├── package.json
│   ├── pages
│   ├── sidebars.json
│   ├── siteConfig.js
│   ├── static
│   │   └── css
│   │      └── custom.css
│   │   └── img
│   │      └── favicon
│   │      └── docusaurus.png
```
- **docs** - include all your documentation file.
- **website** - this folder represent the file who run your website.
  - **blog** - this folder should be empty in our starter-pack we don't include blog, however you can check [this page](https://docusaurus.io/docs/en/blog.html) to know how to add a blog in your website.
  - **core** - include the file who load the footer on the whole website.
  - **i18n** - include the files in connection with translation.
  - **pages** -  include the pages of the website.
  - **static** - include static files.
    - **css** - include css custom files.
    - **img** - include all the image for the website.
- **package-lock, package.json** - files npm need to work.
- **sidebars.json** - Json file who generate content in sidebar pages.
- **siteConfig.js** - files who handle the website.


## Launch your site
To see your website you have to:
````bash
cd website
npm start
````
This commands tells to your computer to run a server on port 3000, copy and paste in your browser the URL written in your terminal and your website should be alive :)

Every time you made changes on your website simply reload your page to see your changes, if you create a new page of folder or everything else you have to turn off your server and reload him to see changes.
> **Note:**  To properly use docusaurus we admit that you have a minimum knowledge's with CLI.


## Currents errors 
> **Note:** Please fell free to add an issue in the [Github repo](https://github.com/luctst/docusaurus-starter-pack) if you have any problem..
