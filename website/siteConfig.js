/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/undraw_open_source.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Bit Docs', // Title for your website.
  tagline: 'The Components Collaboration Platform',
  url: 'https://docs.bit.dev', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'bit-docs',
  organizationName: 'bit.dev',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'overview', label: 'What is Bit?'},
    {doc: 'apis/cli', label: 'APIs'},
    // {blog: true, label: 'Blog'}
  ],

  docsSideNavCollapsible: true,
  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/logo.svg',
  footerIcon: 'img/logo.svg',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#6C5CE7',
    secondaryColor: '#3A27CE',
    fontColor: '#686868',
    onPageNavFont: '#6C707C' 
  },

  /* Custom fonts for website */

  fonts: {
    myFont: [
      "CircularProBook",
      "/css/custom.css"
    ],
    myOtherFont: [
      "CircularProBlack"
    ],
    bookFont: [
      "CircularProBook"
    ],
    blackFont: [
      "CircularProBlack"
    ],
    boldFont: [
      "CircularProBold"
    ],
    mediumFont: [
      "CircularProMedium"
    ]



  },

  editUrl: 'https://github.com/teambit/docs/edit/master/docs/',

  algolia: {
    apiKey: '563802eec701896d912fda3505a903ae',
    indexName: 'bit__docs'
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} bit.dev`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/teambit/bit',
};

module.exports = siteConfig;
