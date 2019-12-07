const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class Tutorials extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
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
        title: name,
    });

    const Features = () => (
            <Block layout="fourColumn">
                {['React', 'Vue', 'Angular', 'Nodejs'].map(feature)}
            </Block>
    )

    return (
      <div>
        {/* <HomeSplash siteConfig={siteConfig} language={language} /> */}
        <div className="mainContainer">
          <Features />
        </div>
      </div>
    );
  }
}

module.exports = Tutorials;
