---
id: footer
title: Configure your footer
sidebar_label: Customize your footer
---
Your footer is the place where you can place any links that you want, to modify this section open the `website/core/footer.js` file. The footer is composed by 3 sections:
- The first is the `Docs` section, include a link to your documentation.
- the second one is the `Community` section, include a link to the repository of this project (if it's a project under git).
- The third is the `More` section, include a link to your personal social medias, website etc..

## Docs
Find in the `footer.js` file the section who start with the `<h5>Docs</h5>` title, change the content of the link below the title don't forget to change the link by the name of the file you want a link.
> **Note:** To change the footer image go in the `siteConfig.js` file and change the `footerIcon`  property.

## Community
This section contain a link and the number of stars that your repo has, everything is take in charge by the `siteConfig.js` file find the `repoURL` property and add a link to your repository and the numbers of stars will automatically display.

## More
Repeat the same process than above by changing the content and the url of your link directly in the `footer.js` file.

## Currents errors 
> **Note:** Please fell free to add an issue in the [Github repo](https://github.com/luctst/docusaurus-starter-pack) if you have any problem..