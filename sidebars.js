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
      id: 'intro',
      label: 'Introduction'
    },
    {
      type: 'doc',
      id: 'quick-start',
      label: 'Quick Start'
    },
    {
      type: 'category',
      label: 'Get Started',
      collapsed: false,
      // collapsible: false,
      items: [
        'getting-started/install-bit',
        'getting-started/create-workspace',
        {
          type: 'category',
          label: 'Compose Components',
          items: [
            'getting-started/compose-components/create-components',
            'getting-started/compose-components/use-dependencies',
            'getting-started/compose-components/component-ops'
          ]
        },
        {
          type: 'category',
          label: 'Release Components',
          collapsed: true,
          items: [
            // 'getting-started/release-components/building-components',
            'getting-started/release-components/version-components',
            'getting-started/release-components/export-components',
            {
              type: 'category',
              label: 'Create a Remote Scope',
              items: [
                'getting-started/release-components/create-remote-scope/self-host-scope',
                'getting-started/release-components/create-remote-scope/host-on-bit-cloud',
                'getting-started/release-components/create-remote-scope/publish-on-external-reg'
              ]
            },
            {
              type: 'category',
              label: 'Set Up Your CI',
              items: [
                'getting-started/release-components/set-up-ci/use-your-own-ci',
                'getting-started/release-components/set-up-ci/github-actions',
                'getting-started/release-components/set-up-ci/gitlab',
                'getting-started/release-components/set-up-ci/use-ripple-ci'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'Use Components',
          collapsed: true,
          items: [
            'getting-started/use-components/install-dependencies',
            'getting-started/use-components/import-components'
            /* TODO 'getting-started/use-components/propose-changes' */
            // {
            //   type: 'category',
            //   label: 'Composition Strategies',
            //   items: [
            //     'getting-started/use-components/composition-strategies/build-time-integration',
            //     'getting-started/use-components/composition-strategies/esmodules',
            //     'getting-started/use-components/composition-strategies/module-federation'
            //   ]
            // }
          ]
        },
        {
          type: 'category',
          label: 'Start from an Existing Repository',
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Initialize a Workspace on an Existing Project',
              items: [
                'start-from-existing-project/init-workspace-on-existing-project/general-purpose'
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/cra',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/nextjs',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/gatsby',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/angular-app',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/docusaurus'
              ]
            },
            'start-from-existing-project/tracking-existing-components'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Understanding Bit',
      items: [
        'understanding-bit/why-bit',
        // TODO 'understanding-bit/component-driven-software',
        {
          type: 'category',
          label: 'Repository Architecture',
          items: [
            'understanding-bit/repository-architecture/overview',
            'understanding-bit/repository-architecture/bit-polyrepo',
            'understanding-bit/repository-architecture/bit-monorepo'
          ]
        },
        // TODO 'understanding-bit/economy-of-scale',
        'understanding-bit/package-managers'
        // TODO 'understanding-bit/micro-architecture/micro-architecture',
        // TODO 'understanding-bit/dogfooding'
      ]
    },
    {
      type: 'category',
      label: 'Fundamentals',
      items: [
        {
          type: 'category',
          label: 'Workspace',
          collapsed: true,
          items: [
            'workspace/overview',
            'workspace/creating-workspaces',
            'workspace/component-link',
            'workspace/directory-structure',
            'workspace/resetting-workspace',
            'workspace/workspace-component',
            'workspace/workspace-configuration',
            'workspace/bitmap',
            'workspace/node-modules',
            'workspace/component-directory',
            'workspace/initializing-workspaces',
            'workspace/workspace-ui',
            'workspace/workspace-status',
            'workspace/workspace-json',
            'workspace/variants',
            'workspace/importing-components',
            'workspace/creating-components',
            'workspace/workspace-starters',
            'workspace/workspace-templates'
          ]
        },
        {
          type: 'category',
          label: 'Components',
          collapsed: true,
          items: [
            'components/overview',
            'components/namespaces',
            'components/component-id',
            'components/main-file',
            'components/creating-components',
            'components/inspecting-components',
            'components/comparing-components',
            'components/merging-components',
            'components/lanes',
            'components/snaps',
            'components/tags'
          ]
        },
        {
          type: 'category',
          label: 'Dependencies',
          collapsed: true,
          items: [
            'dependencies/overview',
            'dependencies/external-dependencies',
            'dependencies/installing-dependencies',
            'dependencies/configuring-dependencies',
            'dependencies/dependency-resolution',
            'dependencies/ui',
            'dependencies/package-managers'
          ]
        },
        {
          type: 'category',
          label: 'Envs',
          collapsed: true,
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
                'envs/services/visualizing-components'
              ]
            }
          ]
        },
        {
          type: 'category',
          label: 'Scope',
          collapsed: true,
          items: [
            'scope/overview',
            'scope/hosting-remote-scope',
            'scope/configuring-scope',
            'scope/setting-remote-scope',
            'scope/importing-components',
            'scope/exporting-components',
            'scope/scope-ui'
          ]
        },
        {
          type: 'category',
          label: 'CI/CD',
          collapsed: true,
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
                'cicd/configuring-bit-on-your-ci/jenkins'
              ]
            },
            'cicd/ripple-ci'
          ]
        },
        {
          type: 'category',
          label: 'Builder',
          collapsed: true,
          items: [
            'builder/overview',
            'builder/component-isolation',
            'builder/component-build',
            'builder/build-pipelines',
            'builder/build-pipeline-customization',
            'builder/build-on-ci'
          ]
        },
        {
          type: 'category',
          label: 'Apps',
          collapsed: true,
          items: [
            'apps/overview',
            'apps/create-app',
            {
              type: 'category',
              label: 'Deploy an App',
              items: [
                'apps/deploy-app/netlify',
                'apps/deploy-app/vercel',
                'apps/deploy-app/aws'
              ]
            },
            'apps/recomposing-apps'
          ]
        }
      ]
    },

    {
      type: 'category',
      label: 'Advanced',
      // collapsed: false,
      // collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Docs',
          items: [
            'docs/overview',
            'docs/doc-files',
            'docs/rendering-docs',
            'docs/doc-templates'
          ],
          collapsed: true
        },
        {
          type: 'category',
          label: 'Compositions',
          items: [
            'compositions/overview',
            'compositions/composition-format',
            'compositions/visualizing-components'
          ]
        },
        {
          type: 'category',
          label: 'Generator',
          collapsed: true,
          items: [
            'generator/overview',
            'generator/workspace-template',
            'generator/template-components'
          ]
        },
        {
          type: 'category',
          label: 'Tester',
          collapsed: true,
          items: [
            'tester/overview',
            'tester/workspace-testing',
            'tester/testing-during-build'
          ]
        },
        {
          type: 'category',
          label: 'Compiler',
          collapsed: true,
          items: [
            'compiler/overview',
            'compiler/workspace-compilation',
            'compiler/compiling-during-build',
            'compiler/configure-env'
          ]
        },
        {
          type: 'category',
          label: 'Linter',
          collapsed: true,
          items: ['linter/overview', 'linter/workspace-linting']
        },
        {
          type: 'category',
          label: 'Formatter',
          collapsed: true,
          items: ['formatter/overview', 'formatter/workspace-formatting']
        },
        {
          type: 'category',
          label: 'Config',
          collapsed: true,
          items: [
            'configurations/config-files',
            'configurations/global-configurations'
          ]
        },
        {
          type: 'category',
          label: 'Packages',
          collapsed: true,
          items: [
            'packages/overview',
            'packages/managing-packagejson',
            'packages/package-json',
            'packages/packing-components',
            'packages/publishing-to-commonjs-registries',
            'packages/build-tasks'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Extending Bit',
      collapsed: true,
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
          ]
        },
        'extending-bit/aspect-environment'
      ]
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/api-reference',
        'reference/cli-reference',
        'reference/common-commands',
        'reference/bvm',
        'reference/migration',
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
