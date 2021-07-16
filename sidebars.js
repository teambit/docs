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
        'aspects/babel/babel',
        'aspects/builder/builder',
        'aspects/compiler/compiler',
        'aspects/component/component',
        'aspects/compositions/compositions',
        'aspects/dependency-resolver/dependency-resolver',
        'aspects/envs/envs',
        'aspects/generator/generator',
        'aspects/logger/logger',
        'aspects/mdx/mdx',
        'aspects/multi-compiler/multi-compiler',
        'aspects/node/node',
        'aspects/pkg/pkg',
        'aspects/pnpm/pnpm',
        'aspects/preview/preview',
        'aspects/react/react',
        'aspects/react-native/react-native',
        'aspects/typescript/typescript',
        'aspects/variants/variants',
        'aspects/yarn/yarn'
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
        'getting-started/install-bit',
        'getting-started/create-workspace',
        {
          type: 'category',
          label: 'Compose components',
          items: [
            'getting-started/compose-components/create-components',
            'getting-started/compose-components/manage-dependencies',
            'getting-started/compose-components/from-document-to-build'
          ]
        }
      ],
      collapsed: false
    },
  ]
};
