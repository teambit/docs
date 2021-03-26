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
  

  // whyBit: [
  //   {
  //     type: 'category',
  //     label: 'Why Bit',
  //     items: [
  //       'why-bit/modular-web-apps',
  //       'why-bit/what-can-bit-do-for-you',
  //       'why-bit/popular-use-cases',
  //       'why-bit/open-source-dev-tools',
  //       'why-bit/enterprise-grade-component-cloud',
  //     ],
  //   },
  // ],

  resources: [
    {
      type: 'category',
      label: 'resources',
      items: [
        'resources/videos',
        'resources/podcasts',
        'resources/articles'
      ]
    },
  ],

  aspects: [
    {
      type: 'category',
      label: 'aspects',
      items: [
        'aspects/bvm',
        'aspects/teambit.generator/generator/generator',
        'aspects/teambit.pkg/pkg/pkg',
        'aspects/teambit.compositions/compositions/compositions',
        'aspects/teambit.mdx/mdx/mdx',
        'aspects/teambit.preview/preview/preview',
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
      // {
      //   type: 'category',
      //   label: 'Building with Bit',
      //   items: [
      //     "building-with-bit/install-bit",
      //     "building-with-bit/create-remote-scope",
      //     "building-with-bit/set-up-workspace",
      //     "building-with-bit/choose-dev-env",
      //     "building-with-bit/render-component",
      //     "building-with-bit/document-components",
      //     "building-with-bit/test-components",
      //     "building-with-bit/version-components",
      //     "building-with-bit/import-components",
      //     "building-with-bit/explore-dependencies",
      //     "building-with-bit/auto-version-dependents",
      //     "building-with-bit/export-to-scope",
      //     "building-with-bit/install-components",
      //     "building-with-bit/ci-cd",
      //   ],
      // },
      // {
      //   type: 'doc',
      //   id: 'building-with-bit/aspects'
      // },
        // {
        //   type: 'category',
        //   label: 'Building with Bit',
        //   items: [
            
        //     {
        //       type: 'doc',
        //       id: 'building-with-bit/aspects'
        //     },
        //     {
        //       type: 'doc',
        //       id: 'building-with-bit/bvm'
        //     },
        //     {
        //       type: 'category',
        //       label: 'Workspace',
        //       items: [
        //         "building-with-bit/workspace/overview",
        //         "building-with-bit/workspace/configurations",
        //         "building-with-bit/workspace/cascading-rules",
        //         "building-with-bit/workspace/workspace-ui",
        //         "building-with-bit/workspace/workspace-status"
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'Environment',
        //       items: [
        //         "building-with-bit/environment/overview",
        //         "building-with-bit/environment/choose-an-environment",
        //         "building-with-bit/environment/create-environment",
        //         "building-with-bit/environment/environment-services",
        //         "building-with-bit/environment/service-handlers"
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'Component',
        //       items: [
        //         "building-with-bit/component/overview",
        //         "building-with-bit/component/tracking",
        //         "building-with-bit/component/versioning",
        //         "building-with-bit/component/exporting",
        //         "building-with-bit/component/importing",
        //         "building-with-bit/component/installing",
        //         "building-with-bit/component/inspecting",
        //         "building-with-bit/component/remove-deprecate-components"
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'Scope',
        //       items: [
        //         "building-with-bit/scope/overview",
        //         "building-with-bit/scope/set-up-remote-scope",
        //         "building-with-bit/scope/self-host-bit-scope",
        //         "building-with-bit/scope/scope-ui"
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'Dependency Resolver',
        //       items: [
        //         "building-with-bit/dependency-resolver/overview",
        //         "building-with-bit/dependency-resolver/dependency-resolution",
        //         "building-with-bit/dependency-resolver/dependency-policies",
        //         "building-with-bit/dependency-resolver/dependency-installation",
        //         "building-with-bit/dependency-resolver/package-managers"
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'Documenting',
        //       items: [
        //         "building-with-bit/documenting/overview",
        //         "building-with-bit/documenting/using-docs-api",
        //         "building-with-bit/documenting/properties-table"
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'Composition',
        //       items: [
        //         "building-with-bit/composition/overview",
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'Testing',
        //       items: [
        //         "building-with-bit/testing/add-tests",
        //         "building-with-bit/testing/running-tests",
        //         "building-with-bit/testing/testing-dependent-components",
        //         "building-with-bit/testing/customize-the-tester"
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'Compiling',
        //       items: [
        //         "building-with-bit/compiling/overview",
        //         "building-with-bit/compiling/compiling-components",
        //         "building-with-bit/compiling/customize"
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'Build Pipeline',
        //       items: [
        //         "building-with-bit/build-pipeline/overview",
        //         "building-with-bit/build-pipeline/create-build-task"
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'Package',
        //       items: [
        //         "building-with-bit/package/publish-component-packages",
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'React',
        //       items: [
        //         "building-with-bit/react/overview",
        //         "building-with-bit/react/using-react",
        //         "building-with-bit/react/extending-react",
        //         "building-with-bit/react/composition-providers"
        //       ],
        //     },  
        //     {
        //       type: 'category',
        //       label: 'Node',
        //       items: [
        //         "building-with-bit/nodejs/overview",
        //         "building-with-bit/nodejs/using-node",
        //         "building-with-bit/nodejs/extending-node"
        //       ],
        //     },
        //     {
        //       type: 'category',
        //       label: 'React Native',
        //       items: [
        //         "building-with-bit/react-native/overview",
        //         "building-with-bit/react-native/using-react-native",
        //         "building-with-bit/react-native/extending-react-native"
        //       ],
        //     },
        //   ],
        // },

        {
            type: 'category',
            label: 'Building with Bit',
            items: [
              "building-with-bit/workspace",
              "building-with-bit/environments",
              "building-with-bit/components",
              "building-with-bit/scopes",
              "building-with-bit/dependencies",
              "building-with-bit/documentation",
              "building-with-bit/compositions",
              "building-with-bit/testing",
              "building-with-bit/compiling",
              "building-with-bit/build-pipeline",
              "building-with-bit/packages",
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
          // "component-architecture/build-like-google",
        ],
      },
     

    {
      type: 'category',
      label: 'Reference',
      items: [
        "reference/commands",
        "reference/usage-analytics",
        // "reference/authentication"
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