module.exports = {
  title: 'Documentation',
  tagline: 'Bit Harmony',
  url: 'https://harmony-docs.bit.dev',
  baseUrl: '/',
  onBrokenLinks: 'error',
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
        href: '/welcome'
      },
      items: [
        
        {
          to: '/getting-started/installing-bit',
          activeBasePath: '/docs',
          label: 'Docs',
          position: 'left',
        },
        
        {
          label: 'Building with Bit',
          to: '/building-with-bit/aspects',
          activeBasePath: 'building-with-bit',
          position: 'left',
        },
        {
          label: 'CLI',
          to: '/cli',
          activeBasePath: 'cli',
          position: 'left',
        },
        
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {to: 'https://docs.bit.dev/',
              label: 'v14 - Legacy'},
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
      
    
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started/installing-bit',
            },
            {
              label: 'Building with Bit',
              to: '/building-with-bit/aspects',
            },
            {
              label: 'What is Bit',
              to: '/essentials/what-is-bit',
            },
            
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Talk to Us',
              to: '/community/talk-to-us',
            },
            {
              label: 'Resources',
              to: '/community/resources',
            },
            {
              label: 'Open Source',
              to: '/community/open-source',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Help',
              href: 'https://bit.dev/support',
            },
            {
              label: 'Bit Cloud',
              href: 'https://bit.dev/',
            },
            {
              label: 'Bit Legacy Docs',
              href: 'https://docs.bit.dev/',
            },
          ],
        },
        {
          title: 'Follow us',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/bitdev_',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/c/Bitdev',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/bit-dev/mycompany/',
            },
          ],
        },
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
          routeBasePath: '/',
          versions: {
            current: {
              label: 'v15',
            }
          }

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
