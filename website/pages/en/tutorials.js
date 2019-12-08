const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        Tutorials
        <small>Select the tutorial that matches your framework</small>
      </h2>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
        </div>
      </SplashContainer>
    );
  }
}
class Tutorials extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={[ 'top', 'bottom']}
        id={props.id}
        background={props.background}
        wrapper="true">
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const feature = (name) => ({   
        image: `${baseUrl}img/${name.toLowerCase()}.svg`,
        imageAlt: `${name}-logo`,
        imageLink: `${baseUrl}docs/tutorials/bit-${name.toLowerCase()}-tutorial`,
        imageAlign: 'top',
        title: name
    });

    const Features = () => (
      <Block layout="fourColumn">
          {['React', 'Vue', 'Angular', 'Nodejs'].map(feature)}
      </Block>
    );
    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        {/* <ProjectTitle/> */}
        <div className="mainContainer">
          <Features />
        </div>
      </div>
    );
  }
}

module.exports = Tutorials;
