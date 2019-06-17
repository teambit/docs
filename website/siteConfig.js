/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    // image: '/img/docusaurus.svg',
    infoLink: 'https://www.lucas-tostee.com',
    pinned: true,
  },
];

const siteConfig = {
  algolia: {
    apiKey: '1077bef6e0ae2a88b95cf88629df5250',
    indexName: 'luctst_docusaurus',
  },
  
  title: 'docusaurus starter pack' /* title for your website */,
  tagline: 'A starter pack for docusaurus project.',
  url: 'https://luctst.github.io' /* your website url */,
  baseUrl: '/docusaurus-starter-pack/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://your-name.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: "docusaurus-starter-pack",
  organizationName: "luctst",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'overview', label: 'Docs'},
    {page: 'help', label: 'Help'},
    {languages: true},
    { href: 'https://github.com/luctst/docusaurus-starter-pack', label: 'Github', external: true}, // Enter url in href field of your repo
    {search: true}
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  // headerIcon: 'img/docusaurus.svg',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/docusaurus.svg',

  /* colors for website */
  colors: {
    primaryColor: '#CCC',
    secondaryColor: '#EEE',
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Avenir",
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: 'Copyright © ' + new Date().getFullYear() +' Tostée Lucas',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: '',
  twitterImage: '',

  repoUrl: 'https://github.com/luctst/docusaurus-starter-pack', // Enter the link of your repo url.
};

module.exports = siteConfig;
