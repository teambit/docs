---
id: publish
title: Publish your site
sidebar_label: Publishing your site
---
Docusaurus make things really simple when you have to push your site online, we will see here how to correctly do that with the Github pages hosting service.

## Create your structure
First we have to create a new branch in our repo `gh-pages` this branch will be the place where our HTML codes will lives, docusaurus push the `HTML` file in the `build` folder in the `gh-pages` branch which is used by Github to send on a server. By default your `gh-pages` branch will be your website online so never merge this with the `master` branch or your website will be deleted, if you know Github you can define settings in the branch that you want and avoid certain actions on her.
> **Note** In the settings of your repo configure your github pages source on the `gh-pages` branch. 

## Building your HTML pages
Like you probably know web browsers cannot read your markdown files so you have to create HTML pages, but for now we only work with markdown files so how is it possible ? Remember docusaurus is a tool who can convert your .md files in .html, let's see how to do this: 

Place yourself in the `website` folder and run:
```
npm run build
```
this command will build your HTML pages in a folder called `build`.

## Push on github page
### Configure your siteConfig.js file
You first need to add some information's in your `siteConfig.js` file:

- `projectName`.
- `organizationName`.

Follow the instructions in comments to correctly set the information's.

### Send online
Once all the configurations are ok you can send your website online to do that, you have to be on the `master` branch or everything where your build folder is, and run the following command:
```
npm run publish-gh-pages
```
This will send all your code in the `gh-pages` push your code on github and that's it your website is alive.
> **Note** you can have some SSH issue if we ask you to enter some password stop the process with CTRL + c and run this new command: `USE_SSH=true npm run publish-gh-pages`.

## Currents errors 
> **Note:** Please fell free to add an issue in the [Github repo](https://github.com/luctst/docusaurus-starter-pack) if you have any problem..