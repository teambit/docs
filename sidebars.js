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
  tutorials: [
    
    {
      type: 'category',
      label: 'React',
      items: [
        {
          type:'category',
          label: 'Tech Jokes',
          items: [
            'tutorials/react/tech-jokes/try-bit',
            'tutorials/react/tech-jokes/install-bit',
            'tutorials/react/tech-jokes/create-remote-scope',
            'tutorials/react/tech-jokes/set-up-workspace',
            'tutorials/react/tech-jokes/choose-dev-env',
            'tutorials/react/tech-jokes/add-components',
            'tutorials/react/tech-jokes/render-component',
            'tutorials/react/tech-jokes/document',
            'tutorials/react/tech-jokes/test',
            'tutorials/react/tech-jokes/version',
            'tutorials/react/tech-jokes/import-components',
            'tutorials/react/tech-jokes/explore-dependencies',
            'tutorials/react/tech-jokes/auto-version-dependents',
            "tutorials/react/tech-jokes/export-to-scope",
            'tutorials/react/tech-jokes/install-components',
            'tutorials/react/tech-jokes/ci-cd'
          ]
        }
      ]
    }
      
  ],
  

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
  
  docs: [
   
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/welcome',
        'getting-started/installing-bit',
        'getting-started/initializing-workspace',
        'getting-started/creating-components',
        'getting-started/adding-components',
        'getting-started/workspace-ui',
        'getting-started/remote-scope',
        'getting-started/workspace-configuration',
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
        {
          type: 'category',
          label: 'Building with Bit',
          items: [
            
            {
              type: 'doc',
              id: 'building-with-bit/aspects'
            },
            {
              type: 'doc',
              id: 'building-with-bit/bvm'
            },
            {
              type: 'category',
              label: 'Workspace',
              items: [
                "building-with-bit/workspace/overview",
                "building-with-bit/workspace/configurations",
                "building-with-bit/workspace/cascading-rules",
                "building-with-bit/workspace/workspace-ui",
                "building-with-bit/workspace/workspace-status"
              ],
            },
            {
              type: 'category',
              label: 'Environments',
              items: [
                "building-with-bit/environments/overview",
                "building-with-bit/environments/choose-an-environment",
                "building-with-bit/environments/create-environment",
                "building-with-bit/environments/environment-services",
                "building-with-bit/environments/service-handlers"
              ],
            },
            {
              type: 'category',
              label: 'Components',
              items: [
                "building-with-bit/components/overview",
                "building-with-bit/components/tracking",
                "building-with-bit/components/versioning",
                "building-with-bit/components/exporting",
                "building-with-bit/components/importing",
                "building-with-bit/components/installing",
                "building-with-bit/components/inspecting",
                "building-with-bit/components/remove-deprecate-components"
              ],
            },
            {
              type: 'category',
              label: 'Scopes',
              items: [
                "building-with-bit/scopes/overview",
                "building-with-bit/scopes/set-up-remote-scope",
                "building-with-bit/scopes/self-host-bit-scope",
                "building-with-bit/scopes/scope-ui"
              ],
            },
            {
              type: 'category',
              label: 'Dependencies',
              items: [
                "building-with-bit/dependencies/overview",
                "building-with-bit/dependencies/dependency-resolution",
                "building-with-bit/dependencies/dependency-policies",
                "building-with-bit/dependencies/dependency-installation",
                "building-with-bit/dependencies/package-managers"
              ],
            },
            {
              type: 'category',
              label: 'Documenting',
              items: [
                "building-with-bit/documenting/overview",
                "building-with-bit/documenting/using-docs-api",
                "building-with-bit/documenting/properties-table"
              ],
            },
            {
              type: 'category',
              label: 'Compositions',
              items: [
                "building-with-bit/compositions/overview",
              ],
            },
            {
              type: 'category',
              label: 'Testing',
              items: [
                "building-with-bit/testing/overview",
                "building-with-bit/testing/customize-the-tester"
              ],
            },
            {
              type: 'category',
              label: 'Compiling',
              items: [
                "building-with-bit/compiling/overview",
                "building-with-bit/compiling/customize"
              ],
            },
            {
              type: 'category',
              label: 'Build Pipeline',
              items: [
                "building-with-bit/build-pipeline/overview",
                "building-with-bit/build-pipeline/create-build-task"
              ],
            },
            {
              type: 'category',
              label: 'Packages',
              items: [
                "building-with-bit/packages/overview",
                "building-with-bit/packages/publish-to-npm"
              ],
            },
            {
              type: 'category',
              label: 'React',
              items: [
                "building-with-bit/react/overview",
                "building-with-bit/react/using-react",
                "building-with-bit/react/extending-react",
                "building-with-bit/react/composition-providers"
              ],
            },  
            {
              type: 'category',
              label: 'Node',
              items: [
                "building-with-bit/nodejs/overview",
                "building-with-bit/nodejs/using-node",
                "building-with-bit/nodejs/extending-node"
              ],
            },
            {
              type: 'category',
              label: 'React Native',
              items: [
                "building-with-bit/react-native/overview",
                "building-with-bit/react-native/using-react-native",
                "building-with-bit/react-native/extending-react-native"
              ],
            },
          ],
          "collapsed": false,
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
        "reference/authentication"
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