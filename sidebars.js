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
      id: 'welcome',
      label: 'Welcome'
    },
    {
      type: 'doc',
      id: 'quick-start',
      label: 'Quick Start'
    },
    {
      type: 'category',
      label: 'Get Started',
      items: [
        'getting-started/install-bit',
        'getting-started/create-workspace',
        {
          type: 'category',
          label: 'Compose Components',
          items: [
            'getting-started/compose-components/create-components',
            'getting-started/compose-components/manage-dependencies',
            'getting-started/compose-components/from-document-to-build'
          ]
        },
        {
          type: 'category',
          label: 'Release Components',
          items: [
            'getting-started/release-components/version-components',
            'getting-started/release-components/export-components',
            {
              type: 'category',
              label: 'Create a Remote Scope',
              items: [
                'getting-started/release-components/create-remote-scope/self-host-scope',
                'getting-started/release-components/create-remote-scope/host-on-bit-cloud',
                'getting-started/release-components/create-remote-scope/publish-on-external-reg',
              ]
            },
            {
              type: 'category',
              label: 'Set Up Your CI',
              items: [
                'getting-started/release-components/set-up-ci/use-your-own-ci',
                'getting-started/release-components/set-up-ci/use-ripple-ci',
              ]
            },
          ],
        },
        {
          type: 'category',
          label: 'Use Components',
          items: [
            'getting-started/use-components/install-dependencies',
            'getting-started/use-components/import-components',
            'getting-started/use-components/propose-changes',
            {
              type: 'category',
              label: 'Composition Strategies',
              items: [
                'getting-started/use-components/composition-strategies/build-time-integration',
                'getting-started/use-components/composition-strategies/esmodules',
                'getting-started/use-components/composition-strategies/module-federation',
              ]
            }
          ]
        },
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Start from an Existing Repository',
      items: [
        {
          type: 'category',
          label: 'Initialize a Workspace on an Existing Project',
          items: [
            'start-from-existing-project/init-workspace-on-existing-project/general-purpose',
            'start-from-existing-project/init-workspace-on-existing-project/cra',
            'start-from-existing-project/init-workspace-on-existing-project/nextjs',
            'start-from-existing-project/init-workspace-on-existing-project/gatsby',
            'start-from-existing-project/init-workspace-on-existing-project/angular-app',
            'start-from-existing-project/init-workspace-on-existing-project/docusaurus'
          ]
        },
        'start-from-existing-project/tracking-existing-components'
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Workspace',
      items: [
        'workspace/overview',
        'workspace/creating-new-workspace',
        'workspace/initializing-workspace-on-existing-project',
        'workspace/workspace-ui',
        'workspace/workspace-status',
        'workspace/workspace-',
        'workspace/variants',
        'workspace/importing-components',
        'workspace/creating-components',
        'workspace/workspace-starters',
        'workspace/workspace-templates'
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/overview',
        'components/component-id',
        'components/creating-components',
        'components/inspecting-components',
        'components/comparing-components',
        'components/merging-components',
        'components/lanes',
        'components/snaps',
        'components/tags',
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Dependencies',
      items: [
        'dependencies/overview',
        'dependencies/installing-dependencies',
        'dependencies/configuring-dependencies',
        'dependencies/dependency-resolution',
        'dependencies/package-managers',
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Envs',
      items: [
        'envs/overview',
        {
          type: 'category',
          label: 'Pre-Configured Envs',
          items: [
            'envs/pre-configured-envs/html',
            'envs/pre-configured-envs/nodejs',
            'envs/pre-configured-envs/react',
            'envs/pre-configured-envs/react-native',
            'envs/pre-configured-envs/angular',
            'envs/pre-configured-envs/aspect'
          ]
        },
        'envs/customizing-env',
        'envs/creating-new-env',
        {
          type: 'category',
          label: 'Env Services',
          items: [
            'envs/services/overview',
            'envs/services/compiling',
            'envs/services/building',
            'envs/services/testing',
            'envs/services/linting',
            'envs/services/formatting',
            'envs/services/packaging',
            'envs/services/documenting',
            'envs/services/component-generators',
            'envs/services/visualizing-components',
          ],
        }
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'CI/CD',
      items: [
        'cicd/overview',
        'cicd/cicd-setup-with-bit',
        'cicd/soft-tags',
        {
          type: 'category',
          label: 'Configuring Bit on Your CI',
          items: [
            'cicd/configuring-bit-on-your-ci/circle-ci',
            'cicd/configuring-bit-on-your-ci/github-actions',
            'cicd/configuring-bit-on-your-ci/gitlab-ci',
            'cicd/configuring-bit-on-your-ci/jenkins',
          ],
          collapsed: true
        },
        'cicd/ripple-ci',
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Builder',
      items: [
        'builder/overview',
        'builder/component-isolation',
        'builder/component-build',
        'builder/build-pipelines',
        'builder/build-pipeline-customization',
        'builder/build-on-ci',
      ],
      collapsed: true
    },
    // {
    //   type: 'category',
    //   label: 'Docs',
    //   items: [
    //     'docs/overview',
    //     'docs/doc-files',
    //     'docs/rendering-docs',
    //     'docs/doc-templates',
    //   ],
    //   collapsed: true
    // },
    // {
    //   type: 'category',
    //   label: 'Compositions',
    //   items: [
    //     'compositions/overview',
    //     'compositions/composition-format',
    //     'compositions/visualizing-components',
    //   ],
    //   collapsed: true
    // },
    // {
    //   type: 'category',
    //   label: 'Testing',
    //   items: [
    //     'testing/overview',
    //     'testing/testing-during-development',
    //     'testing/testing-during-build',
    //   ],
    //   collapsed: true
    // },
    // {
    //   type: 'category',
    //   label: 'Compiling',
    //   items: [
    //     'compiling/overview',
    //     'compiling/compiling-during-development',
    //     'compiling/compiling-during-build'
    //   ]
    // },
    {
      type: 'category',
      label: 'Scope',
      items: [
        'scope/overview',
        'scope/hosting-remote-scope',
        'scope/configuring-scope',
        'scope/setting-remote-scope',
        'scope/importing-components',
        'scope/exporting-components',
        'scope/scope-ui',
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Config',
      items: [
        'configurations/overview',
        'configurations/config-files',
        'configurations/global-configurations',
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Packages',
      items: [
        'packages/overview',
        'packages/managing-packagejson',
        'packages/packing-components',
        'packages/publishing-to-commonjs-registries',
        'packages/build-tasks',
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Apps',
      items: [
        'apps/overview',
        'apps/create-app',
        {
          type: 'category',
          label: 'Deploy an App',
          items: [
            'apps/deploy-app/netlify',
            'apps/deploy-app/vercel',
            'apps/deploy-app/aws',
          ],
          collapsed: true
        },
        'apps/recomposing-apps',
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Extending Bit',
      items: [
        'extending-bit/overview',
        'extending-bit/extension-capabilities',
        'extending-bit/getting-started-with-extensions',
        {
          type: 'category',
          label: 'Guides',
          items: [
            'extending-bit/guides/adding-tab-to-workspace-ui',
            'extending-bit/guides/creating-custom-generator',
            'extending-bit/guides/adding-cli-command',
            'extending-bit/guides/adding-graphql-route'
          ],
          collapsed: true
        },
        'extending-bit/aspect-environment'
      ],
      collapsed: true
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/api-reference',
        'reference/cli-reference',
        'reference/common-commands',
        {
          type: 'category',
          label: 'Troubleshooting',
          items: [
            'reference/troubleshooting/doctor-logs-cache',
            'reference/troubleshooting/multiple-peer-dep-versions',
            'reference/troubleshooting/runtime-globals',
            'reference/troubleshooting/multiple-envs'
          ]
        },
        {
          type: 'category',
          label: 'Guides',
          items: [
            'reference/guides/publishing-components-to-external-registries',
            'reference/guides/setting-up-remote-scope-server',
            'reference/guides/component-driven-apps',
            'reference/guides/cross-team-collaboration',
            'reference/guides/upgrading-react-version',
            'reference/guides/using-global-types'
          ]
        }
      ]
    }
  ]
};
