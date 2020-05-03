/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const GITHUB_LOGO = `data:image/png;base64,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`

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }


  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href='https://bit.dev' className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>bit.dev </h5>            
            <a href='https://bit.dev'>
              bit.dev 
              </a>
            <a href='https://bit.dev/support'>
              Support 
            </a>
            <a href='https://stg.bit.dev/resources/terms'>
              Terms and Privacy 
            </a>
            <a href='https://stg.bit.dev/resources/sla'>
              SLA
            </a>
          </div>
          <div>
          
            <h5>Community</h5>
            <a href="https://join.slack.com/t/bit-dev-community/shared_invite/enQtNzM2NzQ3MTQzMTg3LWI2YmFmZjQwMTkxNmFmNTVkYzU2MGI2YjgwMmJlZDdkNWVhOGIzZDFlYjg4MGRmOTM4ODAxNTIxMTMwNWVhMzg">
              Slack
            </a>
            <a
              href="https://twitter.com/bitdev_"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.repoUrl} target="_blank" rel="noreferrer noopener">
              <img src={GITHUB_LOGO} width="24" height="24"/>
            </a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
