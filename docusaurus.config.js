module.exports = {
  title: 'Documentation',
  tagline: 'Bit Harmony',
  url: 'https://harmony-docs.bit.dev',
  baseUrl: '/',
  onBrokenLinks: 'error',
  onBrokenMarkdownLinks: 'error',
  favicon: 'img/favicon.ico',
  organizationName: 'teambit', // Usually your GitHub org/user name.
  projectName: 'docs-harmony', // Usually your repo name.
  plugins: [
    'docusaurus-plugin-sass',
    [
      'docusaurus-plugin-plausible',
      {
        domain: 'harmony-docs.bit.dev'
      }
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'react',
        path: 'tutorials/react',
        routeBasePath: 'tutorials/react',
        editUrl: 'https://github.com/teambit/docs/edit/harmony',
        postsPerPage: 3,
        feedOptions: {
          type: 'all',
          copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`
        }
      }
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'bit',
        path: 'tutorials/bit',
        routeBasePath: 'tutorials/bit',
        editUrl: 'https://github.com/teambit/docs/edit/harmony',
        postsPerPage: 3,
        feedOptions: {
          type: 'all',
          copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`
        }
      }
    ]
  ],
  themeConfig: {
    algolia: {
      apiKey: '58b48f3589d91aba567e8709de785bdd',
      indexName: 'harmony',
      appId: 'BH4D9OD16A',
      // Optional: see doc section bellow
      contextualSearch: false,

      // Optional: Algolia search parameters
      searchParameters: {}

      //... other Algolia params
    },
    navbar: {
      hideOnScroll: false,
      title: 'Harmony Beta',
      logo: {
        alt: 'v15 Harmony',
        src: 'img/logo.svg',
        href: '/'
      },
      items: [
        {
          activeBasePath: '/getting-started',
          label: 'Docs',
          position: 'left',
          to: '/getting-started/installing-bit',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started/installing-bit'
            },
            {
              label: 'What is Bit?',
              to: '/essentials/what-is-bit'
            },
            {
              label: 'Building with Bit',
              to: '/building-with-bit/manage-workspace'
            },
            {
              label: 'Extending Bit',
              to: '/extending-bit/adding-a-new-tab'
            },
            {
              label: 'Component Architecture',
              to: '/component-architecture/thinking-in-components'
            },
            {
              label: 'Bit Commands',
              to: '/reference/commands'
            },
            {
              label: 'Bit.dev',
              to: '/bit-dot-dev/bit-dev'
            },
            {
              label: 'Migrating From Legacy Bit',
              to: '/reference/migration'
            }
            // {  // TODO restore once we have a troubleshooting landing page
            //   label: 'Troubleshooting',
            //   to: '/troubleshooting/commands'
            // }
          ]
        },

        {
          label: 'Aspects',
          activeBasePath: 'aspects',
          position: 'left',
          to: '/aspects/aspects-overview',
          items: [
            {
              label: 'Overview',
              to: '/aspects/aspects-overview'
            },
            {
              label: 'React',
              to: '/aspects/react'
            },
            {
              label: 'Node',
              to: '/aspects/node'
            },
            {
              label: 'React Native',
              to: '/aspects/react-native'
            },
            {
              label: 'Dependency Resolver',
              to: '/aspects/dependency-resolver'
            },
            {
              label: 'Variants',
              to: '/aspects/variants'
            }
          ]
        },
        {
          label: 'Resources',
          to: '/resources/conference-talks',
          activeBasePath: 'resources',
          position: 'left',
          items: [
            {
              label: 'Videos',
              to: '/resources/videos'
            },
            {
              label: 'Conference Talks',
              to: '/resources/conference-talks'
            },
            {
              label: 'Interviews',
              to: '/resources/interviews'
            },
            {
              label: 'Podcasts',
              to: '/resources/podcasts'
            },
            {
              label: 'Live Streams',
              to: '/resources/live-streams'
            },
            {
              label: 'Articles',
              to: '/resources/articles'
            },
            {
              label: 'Community',
              to: '/resources/community'
            }
          ]
        },
        {
          label: 'Tutorials',
          to: '/tutorials/react',
          activeBasePath: 'tutorials',
          position: 'left',
          items: [
            {
              label: 'Create and Consume Components',
              to: '/tutorials/react/create-and-consume-components'
            }
          ]
        },

        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            { to: 'https://docs.bit.dev/', label: 'v14 - Legacy' }
          ]
        },

        {
          href: 'https://github.com/teambit/bit/issues',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository'
        },
        {
          href: 'https://join.slack.com/t/bit-dev-community/shared_invite/zt-o2tim18y-UzwOCFdTafmFKEqm2tXE4w',
          className: 'slack-link',
          'aria-label': 'Slack',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started/installing-bit'
            },
            {
              label: 'Building with Bit',
              to: '/building-with-bit/manage-workspace'
            },
            {
              label: 'What is Bit',
              to: '/essentials/what-is-bit'
            }
          ]
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Videos',
              to: '/resources/videos'
            },
            {
              label: 'Podcasts',
              to: '/resources/podcasts'
            },
            {
              label: 'Live Streams',
              to: '/resources/live-streams'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Help',
              href: 'https://bit.dev/support'
            },
            {
              label: 'Bit Cloud',
              href: 'https://bit.dev/'
            },
            {
              label: 'Bit Legacy Docs',
              href: 'https://docs.bit.dev/'
            }
          ]
        },
        {
          title: 'Follow us',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/bitdev_'
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/c/Bitdev'
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/bit-dev/mycompany/'
            }
          ]
        }
      ],
      logo: {
        alt: 'Bit Logo',
        src: 'img/logo.svg',
        href: 'https://bit.dev'
      },
      copyright: `Copyright © ${new Date().getFullYear()} Bit.dev`
    },
    image: 'img/bit-logo.png',
    announcementBar: {
      id: 'support_us', // Any value that will identify this message.
      content:
        'Welcome to Harmony Beta which at the moment supports <b>React</b>, <b>React Native</b> and <b>NodeJS</b>',
      backgroundColor: '#fafbfc', // Defaults to `#fff`.
      textColor: '#091E42', // Defaults to `#000`.
      isCloseable: true // Defaults to `true`.
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/teambit/docs/edit/harmony',
          routeBasePath: '/',
          versions: {
            current: {
              label: 'v15'
            }
          }
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/teambit/docs/edit/harmony'
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')]
        }
      }
    ]
  ]
};
