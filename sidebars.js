module.exports = {

  community: [
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/talk-to-us',
        'community/resources',
        'community/open-source',
      ],
    },
  ],
  // tutorials: [
    
  //   {
  //     type: 'category',
  //     label: 'React',
  //     items: [
  //       {
  //         type:'category',
  //         label: 'Tech Jokes',
  //         items: [
  //           'tutorials/react/tech-jokes/try-bit',
  //           'tutorials/react/tech-jokes/install-bit',
  //           'tutorials/react/tech-jokes/create-remote-scope',
  //           'tutorials/react/tech-jokes/set-up-workspace',
  //           'tutorials/react/tech-jokes/choose-dev-env',
  //           'tutorials/react/tech-jokes/add-components',
  //           'tutorials/react/tech-jokes/render-component',
  //           'tutorials/react/tech-jokes/document',
  //           'tutorials/react/tech-jokes/test',
  //           'tutorials/react/tech-jokes/version',
  //           'tutorials/react/tech-jokes/import-components',
  //           'tutorials/react/tech-jokes/explore-dependencies',
  //           'tutorials/react/tech-jokes/auto-version-dependents',
  //           "tutorials/react/tech-jokes/export-to-scope",
  //           'tutorials/react/tech-jokes/install-components',
  //           'tutorials/react/tech-jokes/ci-cd'
  //         ]
  //       }
  //     ]
  //   }
      
  // ],
  

  resources: [
    {
      type: 'category',
      label: 'resources',
      items: [
        'resources/conference-talks',
        'resources/interviews',
        'resources/podcasts',
        'resources/live-streams',
        'resources/articles'
      ]
    },
  ],

  aspects: [
    {
      type: 'category',
      label: 'aspects',
      items: [
        'aspects/bit-aspects',
        'aspects/bvm',
        'aspects/teambit.generator/generator/generator',
        'aspects/teambit.pkg/pkg/pkg',
        'aspects/teambit.compositions/compositions/compositions',
        'aspects/teambit.mdx/mdx/mdx',
        'aspects/teambit.preview/preview/preview',
        'aspects/teambit.workspace/variants/variants',
        'aspects/teambit.component/component/component',
        'aspects/teambit.envs/envs/envs',
        'aspects/teambit.dependencies/dependency-resolver/dependency-resolver',
        'aspects/teambit.dependencies/yarn/yarn',
        'aspects/teambit.dependencies/pnpm/pnpm',
        'aspects/teambit.pipelines/builder/builder',
        'aspects/teambit.compilation/compiler/compiler',
        'aspects/teambit.compilation/multi-compiler/multi-compiler',
        'aspects/teambit.compilation/babel/babel',
        'aspects/teambit.typescript/typescript/typescript',
        'aspects/teambit.harmony/logger/logger',
        'aspects/teambit.react/react/react',
        'aspects/teambit.react/react-native/react-native',
      ]
    },
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
        'getting-started/whats-next',
      ],
      "collapsed": false,
    },
    

      
      {
        type: 'category',
        label: 'Essentials',
        items: [
          "essentials/what-is-bit",
          "essentials/advantages-of-bit",
          
        ],
      },
  

        {
            type: 'category',
            label: 'Building with Bit',
            items: [
              "building-with-bit/workspace",
              "building-with-bit/scopes",
              "building-with-bit/environments",
              {
                type: 'category',
                label: 'Components',
                items: [
                  "building-with-bit/tracking-components",
                  "building-with-bit/removing-components",
                  "building-with-bit/inspecting-components",
                  "building-with-bit/documenting-components",
                  "building-with-bit/testing-components",
                  "building-with-bit/compiling-components",
                  "building-with-bit/exporting-components",
                  "building-with-bit/publishing-components",
                  "building-with-bit/versioning-components",
                  "building-with-bit/importing-components",
                  "building-with-bit/installing-components",
                ]
              },
              "building-with-bit/build-pipeline",
              "building-with-bit/react",
              "building-with-bit/node",
              "building-with-bit/react-native"

            ]
        },
      
      {
        type: 'category',
        label: 'Component Architecture',
        items: [
          "component-architecture/thinking-in-components",
          "component-architecture/composing-components",
          "component-architecture/naming-components",
          "component-architecture/organizing-components",
          "component-architecture/theming-components",
        ],
      },
     

    {
      type: 'category',
      label: 'Reference',
      items: [
        "reference/commands",
        "reference/usage-analytics",
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        "troubleshooting/doctor-logs-cache",
        "troubleshooting/multiple-peer-dep-versions",
        "troubleshooting/set-runtime-globals",
        "troubleshooting/components-envs",
        "troubleshooting/installation-troubleshooting"
      ],
    },
    
        
  ],
};