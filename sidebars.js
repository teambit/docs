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
      label: 'Installation',
      items: [
        'getting-started/welcome',
        'getting-started/installation',
        {
          type: 'category',
          label: 'Troubleshooting',
          items: [
            "getting-started/troubleshooting/doctor-logs-cache",
            "getting-started/troubleshooting/multiple-peer-dep-versions",
            "getting-started/troubleshooting/set-runtime-globals",
            "getting-started/troubleshooting/components-envs",
            "getting-started/troubleshooting/installation-troubleshooting"
          ],
        },
      ],
      "collapsed": false,
    },
      {
        type: 'category',
        label: 'Why Bit',
        items: [
          'why-bit/modular-web-apps',
          'why-bit/what-can-bit-do-for-you',
          'why-bit/popular-use-cases',
          'why-bit/open-source-dev-tools',
          'why-bit/enterprise-grade-component-cloud',
        ],
      },
      

    {
      type: 'category',
      label: 'Tutorial',
      items: [
        {
          type:'category',
          label: 'Tech Jokes',
          items: [
            'tutorials/tech-jokes/install-bit',
            'tutorials/tech-jokes/create-remote-scope',
            'tutorials/tech-jokes/set-up-workspace',
            'tutorials/tech-jokes/choose-dev-env',
            'tutorials/tech-jokes/add-components',
            'tutorials/tech-jokes/render-component',
            'tutorials/tech-jokes/document',
            'tutorials/tech-jokes/test',
            'tutorials/tech-jokes/version',
            'tutorials/tech-jokes/import-components',
            'tutorials/tech-jokes/explore-dependencies',
            'tutorials/tech-jokes/auto-version-dependents',
            "tutorials/tech-jokes/export-to-scope",
            'tutorials/tech-jokes/install-components',
            'tutorials/tech-jokes/ci-cd'
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Demos',
      items: [
        'demos/try-bit',
      ],
    },
    {
      type: 'category',
      label: 'Aspects',
      items: [
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
          label: 'Documentating',
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
      ]
    },

    {
      type: 'category',
      label: 'Reference',
      items: [
        "reference/cli-commands",
        "reference/usage-analytics",
        "reference/authentication"
      ],
    },
    
        
  ],
};