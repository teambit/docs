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
      // collapsed: false - need to uncomment, it's just annoying to have this open when i build
    },

    {
      type: 'category',
      label: 'Essentials',
      items: [
        'essentials/what-is-bit',
      ]
    },

    {
      type: 'category',
      label: 'Building Components',
      items: [
        'bit-components/component-overview',
        'bit-components/component-compositions',
        'bit-components/dependencies',
        'bit-components/testing-components',
        'bit-components/documenting-components',
        'bit-components/scoping-components',
        'bit-components/compiling-components',
        'bit-components/building-components',
        'bit-components/component-configuration',
      ]
    },

    {
      type: 'category',
      label: 'Local Workspace',
      items: [
        'bit-workspace/component-monorepo',
        'bit-workspace/removing-components',
      ]
    },

    {
      type: 'category',
      label: 'Hosting Components',
      items: [
        'bit-workspace/workspace-scope',
        'bit-scopes/versioning-components',
        'bit-scopes/exporting-components', 
        'bit-scopes/consuming-components',
        'bit-scopes/remote-scope'
      ]
    },

    {
      type: 'category',
      label: 'Development Environment',
      items: [
        'bit-environments/environments',
        'bit-environments/component-config'
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
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/using-bvm',
        'reference/commands',
        'reference/ci-cd',
        'reference/pre-existing-components',
        'reference/bit-oss-server',
        'reference/usage-analytics',
        'reference/migration'
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
