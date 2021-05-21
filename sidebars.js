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
      id: 'welcome'
    },

    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installing-bit',
        'getting-started/initializing-workspace',
        'getting-started/creating-components',
        'getting-started/workspace-ui',
        'getting-started/composing-components',
        'getting-started/remote-scope',
        'getting-started/exporting-components',
        'getting-started/installing-components',
        'getting-started/whats-next'
      ],
      collapsed: false
    },

    {
      type: 'category',
      label: 'Essentials',
      items: [
        'essentials/what-is-bit',
        'essentials/components',
        'essentials/workspace'
      ]
    },

    {
      type: 'category',
      label: 'Building with Bit',
      items: [
        'building-with-bit/manage-workspace',
        'building-with-bit/environments',
        'building-with-bit/scopes',
        {
          type: 'category',
          label: 'Components',
          items: [
            'building-with-bit/creating-components',
            //'building-with-bit/tracking-components',
            'building-with-bit/inspecting-components',
            'building-with-bit/removing-components',
            'building-with-bit/component-compositions',
            'building-with-bit/documenting-components',
            'building-with-bit/testing-components',
            'building-with-bit/compiling-components',
            'building-with-bit/versioning-components',
            'building-with-bit/exporting-components',
            'building-with-bit/consuming-components'
            //'building-with-bit/publishing-components',
          ]
        }
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
      label: 'Component Architecture',
      items: [
        'component-architecture/thinking-in-components'
        // "component-architecture/composing-components",
        // "component-architecture/naming-components",
        // "component-architecture/organizing-components",
        // "component-architecture/theming-components",
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

    // {
    //   type: 'doc',
    //   id: 'aspects/aspects-overview'
    // },

    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/using-bvm',
        'reference/commands',
        'reference/ci-cd',
        'reference/pre-existing-components',
        'reference/bit-oss-server',
        'reference/usage-analytics'
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
