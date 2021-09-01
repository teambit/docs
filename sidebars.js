module.exports = {
  resources: [
    {
      type: 'category',
      label: 'resources',
      items: [
        'resources/videos',
        'resources/conference-talks',
        'resources/interviews',
        'resources/podcasts',
        'resources/live-streams',
        'resources/articles',
        'resources/community'
      ]
    }
  ],

  aspects: [
    'aspects/aspects-overview',
    {
      type: 'category',
      label: 'aspects',
      items: [
        'aspects/aspects-overview',
        'aspects/babel',
        'aspects/builder',
        'aspects/compiler',
        'aspects/component',
        'aspects/compositions',
        'aspects/dependency-resolver',
        'aspects/envs',
        'aspects/generator',
        'aspects/logger',
        'aspects/mdx',
        'aspects/multi-compiler',
        'aspects/node',
        'aspects/pkg',
        'aspects/pnpm',
        'aspects/preview',
        'aspects/react',
        'aspects/react-native',
        'aspects/typescript',
        'aspects/variants',
        'aspects/yarn'
      ],
      collapsed: false
    }
  ],

  docs: [
    {
      type: 'doc',
      id: 'welcome',
      label:'Introduction'
    },

    {
      type: 'doc',
      id: 'quick-start',
      label: 'Quick Start'
    },

    {
      type: 'category',
      label: 'How-to Guides',
      items: [
        'getting-started/installing-bit',
        {
          type: 'category',
          label: 'Bit Workspace',
          items: [
            'getting-started/initializing-workspace',
            'getting-started/workspace-ui',
            'bit-environments/component-config',
          ]
        },
        {
          type: 'category',
          label: 'Component Development',
          items: [
            'getting-started/creating-components',
            'bit-components/component-compositions',
            'getting-started/deps-between-components',
            'bit-components/dependencies',
            'bit-components/testing-components',
            'bit-components/documenting-components',
            'bit-components/scoping-components',
          ]
        },
        {
          type: 'category',
          label: 'Versioning',
          items: [
            // 'bit-.../versioning-overview',
            'bit-scopes/versioning-components',
            'bit-workspace/checkout',
            // 'bit-workspace/snaps',
            // 'bit-workspace/lanes',
          ]
        },
        {
          type: 'category',
          label: 'Sharing Components',
          items: [
            'getting-started/export-to-remote-scope',
            'getting-started/host-on-bit-cloud',
            'getting-started/self-host-scope',
            'getting-started/publish-on-external-reg',
          ]
        },
        {
          type: 'category',
          label: 'Use Remote Components',
          items: [
            'getting-started/installing-components',
            'getting-started/import-components',
          ]
        },
        {
          type: 'category',
          label: 'Automation and CI',
          items: [
            'getting-started/install-during-ci',
            'getting-started/use-your-own-ci'
          ]
        },
        {
          type: 'category',
          label: 'Existing Projects',
          items: [
            'reference/pre-existing-components',
          ]
        }
      ],
      // collapsed: false - need to uncomment, it's just annoying to have this open when i build
    },

    {
      type: 'category',
      label: 'References',
      items: [
        'essentials/what-is-bit',
        'bit-workspace/workspace-scope',
        'bit-workspace/component-monorepo',
        'bit-workspace/removing-components',
        'bit-scopes/exporting-components', 
        'bit-scopes/consuming-components',
        'bit-scopes/remote-scope',
        'bit-environments/environments',
        'reference/using-bvm',
        'reference/commands',
        'reference/usage-analytics',
        'reference/migration',
        'bit-components/compiling-components',
        'bit-components/building-components',
        'bit-components/component-configuration',
      ]
    },


    {
      type: 'category',
      label: 'Extending Bit',
      items: [
        'extending-bit/adding-a-new-tab',
        'extending-bit/creating-a-custom-generator'
      ]
    },

    {
      type: 'category',
      label: 'Bit.dev',
      items: [
        'bit-dot-dev/bit-dev',
        'bit-dot-dev/my-account',
        'bit-dot-dev/authentication'
      ]
    },

    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/doctor-logs-cache',
        'troubleshooting/multiple-peer-dep-versions',
        'troubleshooting/set-runtime-globals'
      ]
    }
  ]
};
