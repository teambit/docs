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
  aspects: [
    {
      type: 'category',
      label: 'Aspects',
      items: [
        {
          type: 'doc',
          id: 'aspects/aspects'
        },
        {
          type: 'doc',
          id: 'aspects/bvm'
        },
        {
          type: 'category',
          label: 'Workspace',
          items: [
            "aspects/workspace/overview",
            "aspects/workspace/configurations",
            "aspects/workspace/cascading-rules",
            "aspects/workspace/workspace-ui",
            "aspects/workspace/workspace-status"
          ],
        },
        {
          type: 'category',
          label: 'Environments',
          items: [
            "aspects/environments/overview",
            "aspects/environments/choose-an-environment",
            "aspects/environments/create-environment",
            "aspects/environments/environment-services",
            "aspects/environments/service-handlers"
          ],
        },
        {
          type: 'category',
          label: 'Components',
          items: [
            "aspects/components/overview",
            "aspects/components/tracking",
            "aspects/components/versioning",
            "aspects/components/exporting",
            "aspects/components/importing",
            "aspects/components/installing",
            "aspects/components/inspecting",
            "aspects/components/remove-deprecate-components"
          ],
        },
        {
          type: 'category',
          label: 'Scopes',
          items: [
            "aspects/scopes/overview",
            "aspects/scopes/set-up-remote-scope",
            "aspects/scopes/self-host-bit-scope",
            "aspects/scopes/scope-ui"
          ],
        },
        {
          type: 'category',
          label: 'Dependencies',
          items: [
            "aspects/dependencies/overview",
            "aspects/dependencies/dependency-resolution",
            "aspects/dependencies/dependency-policies",
            "aspects/dependencies/dependency-installation",
            "aspects/dependencies/package-managers"
          ],
        },
        {
          type: 'category',
          label: 'Documenting',
          items: [
            "aspects/documenting/overview",
            "aspects/documenting/using-docs-api",
            "aspects/documenting/properties-table"
          ],
        },
        {
          type: 'category',
          label: 'Compositions',
          items: [
            "aspects/compositions/overview",
          ],
        },
        {
          type: 'category',
          label: 'Testing',
          items: [
            "aspects/testing/overview",
            "aspects/testing/customize-the-tester"
          ],
        },
        {
          type: 'category',
          label: 'Compiling',
          items: [
            "aspects/compiling/overview",
            "aspects/compiling/customize"
          ],
        },
        {
          type: 'category',
          label: 'Build Pipeline',
          items: [
            "aspects/build-pipeline/overview",
            "aspects/build-pipeline/create-build-task"
          ],
        },
        {
          type: 'category',
          label: 'Packages',
          items: [
            "aspects/packages/overview",
            "aspects/packages/publish-to-npm"
          ],
        },
        {
          type: 'category',
          label: 'React',
          items: [
            "aspects/react/overview",
            "aspects/react/using-react",
            "aspects/react/extending-react",
            "aspects/react/composition-providers"
          ],
        },  
        {
          type: 'category',
          label: 'Node',
          items: [
            "aspects/nodejs/overview",
            "aspects/nodejs/using-node",
            "aspects/nodejs/extending-node"
          ],
        },
        {
          type: 'category',
          label: 'React Native',
          items: [
            "aspects/react-native/overview",
            "aspects/react-native/using-react-native",
            "aspects/react-native/extending-react-native"
          ],
        },
      ],
      "collapsed": false,
    },
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
        'getting-started/installation',
        'getting-started/initializing-workspace',
        'getting-started/workspace-ui',
        'getting-started/creating-a-component',
        'getting-started/remote-scope',
        'getting-started/workspace-configuration',
        'getting-started/exporting-components',
        'getting-started/installing-components',
        
      ],
      "collapsed": false,
    },
      // {
      //   type: 'category',
      //   label: 'Why Bit',
      //   items: [
      //     'why-bit/modular-web-apps',
      //     'why-bit/what-can-bit-do-for-you',
      //     'why-bit/popular-use-cases',
      //     'why-bit/open-source-dev-tools',
      //     'why-bit/enterprise-grade-component-cloud',
      //   ],
      // },
      
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
          "building-with-bit/creating-components",
          "building-with-bit/styling-components",
        ],
      },
      {
        type: 'doc',
        id: 'aspects/aspects'
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