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
        href: '/getting-started/welcome'
      },
      items: [
        
        {
          to: '/getting-started/welcome',
          activeBasePath: '/getting-started/welcome',
          label: 'Docs',
          position: 'left',
        },
        
        {
          label: 'Aspects',
          to: '/aspects',
          activeBasePath: 'aspects',
          position: 'left',
        },
        {
          label: 'CLI',
          to: '/cli',
          activeBasePath: 'cli',
          position: 'left',
        },
        {
          label: 'Tutorials',
          to: '/tutorials/react/tech-jokes/install-bit',
          activeBasePath: 'tutorials',
          position: 'left',
        },
        
        
        // {
        //   to: '/why-bit/modular-web-apps',
        //   activeBasePath: 'why-bit',
        //   label: 'Why Bit',
        //   position: 'right',
        // },
        // {
        //   label: 'Try Bit',
        //   to: '/demos/try-bit',
        //   activeBasePath: 'demo',
        //   position: 'right',
        // },
        // {
        //   label: 'Community',
        //   position: 'right',
        //   activeBasePath: 'community',
        //   items: [
        //     {
        //       label: 'Talk To Us',
        //       to: '/community/talk-to-us',
        //     },
        //     {
        //       label: 'resources',
        //       to: '/community/resources',
        //     },
            
        //     {
        //       label: 'Open Source',
        //       to: '/community/open-source',
        //     },
        //     // ... more items
        //   ],
        // },
        
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
          title: 'Why Bit',
          items: [
            {
              label: 'Modular Web Apps',
              to: '/why-bit/modular-web-apps',
            },
            {
              label: 'What Can Bit do for you',
              to: '/why-bit/what-can-bit-do-for-you',
            },
            {
              label: 'Popular Use Cases',
              to: '/why-bit/popular-use-cases',
            },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started/welcome',
            },
            {
              label: 'Try Bit',
              to: '/installation/try-bit',
            },
            {
              label: 'Demo',
              to: '/demo/try-bit',
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
