---
id: header
title: Configure your header
sidebar_label: Header 
---
The header contains the link of your navigation menu and the title of your project. You can customize the content of your links and change the name of your project, you also have the possibility to change the color of your header.


## Title of your project
To change the name of your project you have to go in the **siteConfig.js** files at the lines 14:
```js
const siteConfig  {
    title: 'Enter the name of your project here'
}
```
and change the content in the `title` property.


## Links in navigation
### Menu
Those links allow you to navigate between the different pages of your website, to change the direction in the `Docs` link simply change in the **siteConfig.js** file:
```js
headerLinks: [
    {doc: 'name of a page in your docs folder', label: 'Docs'},
]
```
The content of the `doc` property.

This structure contains a link to your github repo, simply change:
```js
headerLinks: [
    {href: 'URL of your repo', label: 'Github'}
]
```
The content of the `href` property by your URL repo.
> **Note:** It's possible to add, modify and change the content of this navigation, check the [official documentation](https://docusaurus.io/docs/en/navigation.html#additions-to-the-site-navigation-bar) to customize your navigation.
### Search bar
Docusaurus supports Search with Algolia to quickly find the content that you want, to do that it's really simple submit your website URL to this address and follow the instructions. [Start with Algolia](https://community.algolia.com/docsearch/) .

After submit you should receive an email with some information's to enter in your `siteConfig.js` file:
```js
const siteConfig = {
    ...
    algolia: {
        apiKey: 'my-api-key',
        indexName: 'my-index-name',
        algoliaOptions: {} // This is optional
    }
} 
```

From now everything should be good except that your search bar is not display in your navigation menu. To correct that add in the `headerLinks` array the following instruction's `{search: true}`.

### Language 


## Change the style
You can change the `background-color` of your header in the **siteConfig.js** file:
```js
colors: {
    primaryColor: 'Enter RGBA, Hexadecimal, HSLA etc..'
}
```
By changes the content of the `primaryColor` property.
> **Note:** You can if you want customize your header with CSS in the static/css/custom.css file.


## Currents errors 
> **Note:** Please fell free to add an issue in the [Github repo](https://github.com/luctst/docusaurus-starter-pack) if you have any problem..