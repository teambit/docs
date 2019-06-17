---
id: siteconfig
title: siteConfig.js file
sidebar_label: siteConfig.js
---
The `siteConfig.js` file is the engine of the site a lot of configuration is enable on this file. He's composed of two arrays `users` and `siteConfig`.

## Users
For our project we don't need to use this array, but if you want you can check the official documentation to correctly using it.
> [What is the user array ?](https://docusaurus.io/docs/en/site-config.html)

## SiteConfig
This array contains the bulk of the configuration of the website:

`title` the main title of the website.

`tagline` the sub-title of the website.

`url` the url of the website.

`baseUrl` the base url of the website (field after your url).

`projectName` the name of your repo (case sensitive).

`organizationName` the user or organization who posseses the repo.

`headerLinks`  is an array who contains the navigation links.

`footerIcon` the image in the footer.

`colors` is an object who indicate the colors of your website.

`copyright` the sentence in the bottom of the footer.

`highlight` object used to define the syntax highlighting in code blocks.

`scripts` array of script inserted in the HTML pages.

`onPageNav` currently possesses one value `separate` who separate the nav in the docs files.

`ogImage` , `twitterImage`  image shows when share this project in social medias.

`repoUrl` the url of your repo.

## Currents errors 
> **Note:** Please fell free to add an issue in the [Github repo](https://github.com/luctst/docusaurus-starter-pack) if you have any problem..