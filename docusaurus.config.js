module.exports = {
  title: 'Documentation',
  tagline: 'Bit Harmony',
  url: 'https://harmony-docs.bit.dev',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'teambit', // Usually your GitHub org/user name.
  projectName: 'docs-harmony', // Usually your repo name.
  plugins: ['docusaurus-plugin-sass'],
  themeConfig: {
      algolia: {
      apiKey: '58b48f3589d91aba567e8709de785bdd',
      indexName: 'harmony',
      appId: 'BH4D9OD16A',
      // Optional: see doc section bellow
      contextualSearch: false,

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
    },
    navbar: {
      title: 'Harmony Beta',
      logo: {
        alt: 'v15 Harmony',
        src: 'img/logo.svg',
        href: '/introduction/installation'
      },
      items: [
        {
          to: '/introduction/installation',
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
