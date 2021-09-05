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
                'getting-started/release-components/create-remote-scope/publish-to-external-reg'
              ]
            },
            {
              type: 'category',
              label: 'Set Up Your CI',
              items: [
                'getting-started/release-components/set-up-ci/use-your-own-ci',
                'getting-started/release-components/set-up-ci/github-actions',
                'getting-started/release-components/set-up-ci/gitlab'
                // TODO 'getting-started/release-components/set-up-ci/use-ripple-ci'
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
                'getting-started/start-from-existing-project/init-workspace-on-existing-project/general-purpose'
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/cra',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/nextjs',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/gatsby',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/angular-app',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/docusaurus'
              ]
            },
            'getting-started/start-from-existing-project/tracking-existing-components'
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
            'workspace/moving-components',
            'workspace/versioning-components',
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
            'components/component-id',
            'components/main-file',
            'components/component-config',
            'components/creating-components',
            'components/inspecting-components',
            'components/comparing-components',
            'components/merging-components',
            'components/lanes',
            'components/snaps',
            'components/tags',
            'components/removing-components'
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
            // TODO 'dependencies/ui',
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
            // TODO 'envs/creating-new-env',
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
                //TODO 'envs/services/component-generators',
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
            // TODO 'scope/configuring-scope',
            'scope/setting-remote-scope'
            // TODO 'scope/importing-components',
            // TODO 'scope/exporting-components'
            // TODO'scope/scope-ui'
          ]
        },
        {
          type: 'category',
          label: 'CI/CD',
          collapsed: true,
          items: [
            // TODO 'cicd/overview',
            'cicd/cicd-setup-with-bit',
            'cicd/soft-tags',
            {
              type: 'category',
              label: 'Configuring Bit on Your CI',
              items: [
                // TODO 'cicd/configuring-bit-on-your-ci/circle-ci',
                'cicd/configuring-bit-on-your-ci/github-actions',
                'cicd/configuring-bit-on-your-ci/gitlab-ci'
                // TODO 'cicd/configuring-bit-on-your-ci/jenkins'
              ]
            }
            // TODO 'cicd/ripple-ci'
          ]
        },
        {
          type: 'category',
          label: 'Builder',
          collapsed: true,
          items: [
            'builder/overview',
            'builder/component-isolation',
            // TODO 'builder/component-build',
            'builder/build-pipelines',
            'builder/build-pipeline-customization'
            // TODO 'builder/build-on-ci'
          ]
        }
        // {
        //   type: 'category',
        //   label: 'Apps',
        //   collapsed: true,
        //   items: [
        //     // TODO 'apps/overview',
        //     // TODO 'apps/create-app',
        //     {
        //       type: 'category',
        //       label: 'Deploy an App',
        //       items: [
        //         // TODO 'apps/deploy-app/netlify',
        //         // TODO 'apps/deploy-app/vercel',
        //         // TODO 'apps/deploy-app/aws'
        //       ]
        //     }
        //     // TODO 'apps/recomposing-apps'
        //   ]
        // }
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
            'docs/overview'
            // TODO 'docs/doc-files',
            // TODO 'docs/rendering-docs',
            // TODO 'docs/doc-templates'
          ],
          collapsed: true
        },
        {
          type: 'category',
          label: 'Compositions',
          items: [
            'compositions/overview'
            // TODO 'compositions/composition-format',
            // TODO 'compositions/visualizing-components'
          ]
        },
        {
          type: 'category',
          label: 'Generator',
          collapsed: true,
          items: [
            'generator/overview',
            'generator/workspace-template',
            'generator/components-template'
          ]
        },
        {
          type: 'category',
          label: 'Tester',
          collapsed: true,
          items: [
            'tester/overview',
            'tester/workspace-testing'
            // TODO 'tester/testing-during-build'
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
        // TODO 'extending-bit/extension-capabilities',
        // TODO 'extending-bit/getting-started-with-extensions',
        {
          type: 'category',
          label: 'Guides',
          items: [
            'extending-bit/guides/adding-tab-to-workspace-ui',
            'extending-bit/guides/creating-component-templates',
            'extending-bit/guides/creating-workspace-templates'
            // TODO 'extending-bit/guides/adding-cli-command',
            // TODO 'extending-bit/guides/adding-graphql-route'
          ]
        }
        // TODO 'extending-bit/aspect-environment'
      ]
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        // TODO 'reference/api-reference',
        'reference/cli-reference',
        // TODO 'reference/common-commands',
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
        }
        // {
        //   type: 'category',
        //   label: 'Guides',
        //   items: [
        //     // TODO'reference/guides/publishing-components-to-external-registries',
        //     // TODO'reference/guides/setting-up-remote-scope-server',
        //     // TODO'reference/guides/component-driven-apps',
        //     // TODO'reference/guides/cross-team-collaboration',
        //     // TODO'reference/guides/upgrading-react-version',
        //     // TODO'reference/guides/using-global-types'
        //   ]
        // }
      ]
    }
  ]
};
