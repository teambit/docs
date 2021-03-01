// module.exports = {
//   someSidebar: {
//     GettingStarted: [
//       'install-bit'
//     ],
//   },
// };

module.exports = {
  docs: [
        {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction/why-bit',
        'introduction/try-bit',
        'introduction/resources',
        'introduction/community',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial',
      items: [
        'tutorial/install-bit',
        'tutorial/bit-account',
        'tutorial/set-up-workspace',
        'tutorial/choose-dev-env',
        'tutorial/add-components',
        'tutorial/render-component',
        'tutorial/document',
        'tutorial/test',
        'tutorial/version',
        'tutorial/import-components',
        'tutorial/explore-dependencies',
        'tutorial/auto-version-dependents',
        "tutorial/export-to-scope",
        'tutorial/install-components',
        'tutorial/ci-cd'
      ],
    },
    {
      type: 'category',
      label: 'Workspace',
      items: [
        "workspace/overview",
        "workspace/configurations",
        "workspace/cascading-rules",
        "workspace/workspace-ui",
        "workspace/component-status"
      ],
    },
    {
      type: 'category',
      label: 'Environments',
      items: [
        "environments/overview",
        "environments/choose-an-environment",
        "environments/build-environment",
        "environments/environment-services",
        "environments/service-handlers"
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        "components/overview",
        "components/tracking",
        "components/versioning",
        "components/exporting",
        "components/importing",
        "components/inspecting",
        "components/remove-deprecate-components"
      ],
    },
    {
      type: 'category',
      label: 'Scopes',
      items: [
        "scope/overview",
        "scope/set-up-remote-scope",
        "scope/self-host-bit-scope",
        "scope/scope-ui"
      ],
    },
    {
      type: 'category',
      label: 'CLI',
      items: [
        "cli/cheat-sheet"
      ],
    },
    {
      type: 'category',
      label: 'Dependencies',
      items: [
        "dependencies/overview",
        "dependencies/dependency-resolution",
        "dependencies/dependency-policies",
        "dependencies/dependency-installation"
      ],
    },
    {
      type: 'category',
      label: 'Documentating',
      items: [
        "documenting/overview",
        "documenting/using-docs-api",
        "documenting/properties-table"
      ],
    },
    {
      type: 'category',
      label: 'Compositions',
      items: [
        "compositions/compositions",
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      items: [
        "testing/overview",
        "testing/customize-the-tester"
      ],
    },
    {
      type: 'category',
      label: 'Compiling',
      items: [
        "compiling/overview",
        "compiling/customize"
      ],
    },
    {
      type: 'category',
      label: 'Build Pipeline',
      items: [
        "build-pipeline/overview",
        "build-pipeline/create-build-task"
      ],
    },
    {
      type: 'category',
      label: 'Packages',
      items: [
        "packages/overview",
        "packages/install-packages",
        "packages/publish-to-npm"
      ],
    },
    {
      type: 'category',
      label: 'React',
      items: [
        "react/overview",
        "react/using-react",
        "react/extending-react"
      ],
    },  
    {
      type: 'category',
      label: 'Node',
      items: [
        "nodejs/overview",
        "nodejs/using-node",
        "nodejs/extending-node"
      ],
    },
    {
      type: 'category',
      label: 'React Native',
      items: [
        "react-native/overview",
        "react-native/using-react-native",
        "react-native/extending-react-native"
      ],
    },
    {
      type: 'category',
      label: 'Authentication',
      items: [
        "authentication/overview"
      ],
    },
    {
      type: 'category',
      label: 'Usage Analytics',
      items: [
        "usage-analytics/overview"
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        "troubleshooting/troubleshooting"
      ],
    },
    {
      type: 'category',
      label: 'FAQs',
      items: [
        "faq/multiple-peer-dep-versions",
        "faq/set-runtime-globals"
      ],
    }
  ],
};