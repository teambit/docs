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
        href: '/'
      },
      items: [
        
        {
          to: '/getting-started/installing-bit',
          activeBasePath: '/docs',
          label: 'Docs',
          position: 'left',
        },
      
        {
          label: 'Aspects',
          to: '/aspects/bit-aspects',
          activeBasePath: 'aspects',
          position: 'left',
        },
        {
          label: 'Resources',
          to: '/resources/podcasts',
          activeBasePath: 'community',
          position: 'left',
        },
        // {
        //   label: 'CLI',
        //   to: '/cli',
        //   activeBasePath: 'cli',
        //   position: 'left',
        // },

        {
          label: 'Help',
          to: 'https://bit.dev/support',
          position: 'right',
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
        {
          href: 'https://github.com/teambit',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
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
              to: '/building-with-bit/workspace',
            },
            {
              label: 'What is Bit',
              to: '/essentials/what-is-bit',
            },
            
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Videos',
              to: '/resources/videos',
            },
            {
              label: 'Podcasts',
              to: '/resources/podcasts',
            },
            {
              label: 'Articles',
              to: '/resources/articles',
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
      logo: {
        alt: 'Bit Logo',
        src: 'img/logo.svg',
        href: 'https://bit.dev',
      },
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
