module.exports = {
  title: 'Documentation',
  tagline: 'Bit v15 "Harmony"',
  url: 'https://bit-harmony-stg.netlify.app/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'teambit', // Usually your GitHub org/user name.
  projectName: 'docs-harmony', // Usually your repo name.
  themeConfig: {
      algolia: {
      apiKey: 'a966eb48e7122721c59de5aac52d269d',
      indexName: 'harmony',

      // Optional: see doc section bellow
      contextualSearch: false,

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
    },
    navbar: {
      title: 'v15 Harmony (beta)',
      logo: {
        alt: 'v15 Harmony',
        src: 'img/logo.svg',
        href: '/introduction/why-bit'
      },
      items: [
        {
          to: '/introduction/why-bit',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {
          href: 'https://bit.dev/support',
          label: 'Help',
          position: 'right',
        },
        {
          to: '/open-source/open-source',
          label: 'Open Source',
          position: 'right',
        },
        {
          href: 'https://bit.dev',
          label: 'Bit Cloud',
          position: 'right',
        },
        {
          href: 'https://docs.bit.dev',
          label: 'Bit v14',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bit.dev`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/teambit/docs/edit/harmony',
          routeBasePath: '/'
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
