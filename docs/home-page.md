---
id: homepage
title: Configure your homepage
sidebar_label: Homepage
---
Every pages with docusaurus are create with ReactJs so it's better if you already handle this language but it's not an obligation.
> **Note:** Not all the pages are in ReactJs, in the docs folder pages are written in markdown.


## Float line
### Title
To change the main title and the sub-title of your landing pages you should changes in the **siteConfig.js** file:
```js
const siteConfig = {
    title: 'Title of your project',
    tagline: 'Sub-title of your project'
}
```
The content of the `title` and the `tagline`property.
### Image
To change the image of your float line section you first need to:
- Add your image in the `static/img/` folder.
- Go to the **index.js** file in `pages/en/index.js`:
```js
class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('docusaurus.svg')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            {/* <Button href="#try">Try It Out</Button> */}
            <Button href={docUrl('doc1.html', language)}>Example Link</Button>
            <Button href={docUrl('doc2.html', language)}>Example Link 2</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}
```
Find the component who return the float line section and change the source of the `<Logo/>` tag.
### Buttons
To customize the buttons repeat the same process than above with some changes:
- **First button:** - Identify his location in the component and change the name of the file in the href attribute, `<Button href={docUrl('overview.html',language) }>Get started</Button>` don't forget to change the content of the button.
> **Note:** When you change the name of the file don't delete the .html extension or it won't work.
- **Second button** - Repeat the same process than the first button but this time we want redirect to an external link so you have to delete the `docUrl` function in the href attribute.


## First section
To change the content and the image of this section identify the component `<LearnHow>` in the `index.js` file:
```js
const LearnHow = props => (
  <Block background="light">
    {[
      {
        content: 'Enter your text who describe the first feature talk about learning how to use this',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'right',
        title: 'First feature',
      },
    ]}
  </Block>
);
```
To change the title add a custom content in the `title` property, do the same for the `content` property.   For the image don't forget to add your image in the `static/img/` folder and change the source of the `image`.


## Second section
Follow the same process than above to change the content of the second section except than you have to find the `<TryOut>` component:
```js
const TryOut = props => (
  <Block id="try">
    {[
      {
        content: 'Enter your text who describe the second feature talk about learning how to use this',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'left',
        title: 'Second feature',
      },
    ]}
  </Block>
);
```


## Currents errors 
> **Note:** Please fell free to add an issue in the [Github repo](https://github.com/luctst/docusaurus-starter-pack) if you have any problem..
