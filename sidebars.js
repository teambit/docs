module.exports = {
  resources: [
    {
      type: "category",
      label: "resources",
      items: [
        "resources/videos",
        "resources/conference-talks",
        "resources/interviews",
        "resources/podcasts",
        "resources/live-streams",
        "resources/articles",
        "resources/community",
      ],
    },
  ],

  aspects: [
    "aspects/aspects-overview",
    {
      type: "category",
      label: "aspects",
      items: [
        "aspects/babel/babel",
        "aspects/builder/builder",
        "aspects/compiler/compiler",
        "aspects/component/component",
        "aspects/compositions/compositions",
        "aspects/dependency-resolver/dependency-resolver",
        "aspects/envs/envs",
        "aspects/generator/generator",
        "aspects/logger/logger",
        "aspects/mdx/mdx",
        "aspects/multi-compiler/multi-compiler",
        "aspects/node/node",
        "aspects/pkg/pkg",
        "aspects/pnpm/pnpm",
        "aspects/preview/preview",
        "aspects/react/react",
        "aspects/react-native/react-native",
        "aspects/typescript/typescript",
        "aspects/variants/variants",
        "aspects/yarn/yarn",
      ],
      collapsed: false,
    },
  ],
  docs: [
    {
      type: "doc",
      id: "intro",
      label: "Introduction",
    },
    {
      type: "doc",
      id: "quick-start",
      label: "Quick Start",
    },
    {
      type: "category",
      label: "Get Started",
      collapsed: false,
      // collapsible: false,
      items: [
        "getting-started/install-bit",
        "getting-started/create-workspace",
        {
          type: "category",
          label: "Compose",
          items: [
            "getting-started/compose-components/create-components",
            "getting-started/compose-components/use-dependencies",
            "getting-started/compose-components/dev-envs",
          ],
        },
        {
          type: "category",
          label: "Collaborate",
          collapsed: true,
          items: [
            // 'getting-started/release-components/building-components',
            "getting-started/release-components/version-components",
            "getting-started/release-components/export-components",
            // 'getting-started/release-components/create-remote-scope/publish-to-external-reg',
            {
              type: "category",
              label: "Create a Remote Scope",
              items: [
                "getting-started/release-components/create-remote-scope/self-host-scope",
                "getting-started/release-components/create-remote-scope/host-on-bit-cloud",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Use",
          collapsed: true,
          items: [
            "getting-started/use-components/install-components",
            "getting-started/use-components/import-components",
            // 'getting-started/use-components/propose-changes',
            "getting-started/use-components/update-components",
            // {
            //   type: 'category',
            //   label: 'Composition Strategies',
            //   items: [
            //     'getting-started/use-components/composition-strategies/build-time-integration',
            //     'getting-started/use-components/composition-strategies/esmodules',
            //     'getting-started/use-components/composition-strategies/module-federation'
            //   ]
            // }
          ],
        },
        {
          type: "category",
          label: "Set Up CI",
          items: [
            // 'getting-started/release-components/set-up-ci/use-ripple-ci',
            "getting-started/set-up-ci/use-your-own-ci",
            "getting-started/set-up-ci/install-during-ci",
          ],
        },
        {
          type: "category",
          label: "Start from an Existing Repository",
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Initialize a Workspace on an Existing Project",
              items: [
                "getting-started/start-from-existing-project/init-workspace-on-existing-project/general-purpose",
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/cra',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/nextjs',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/gatsby',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/angular-app',
                // TODO 'start-from-existing-project/init-workspace-on-existing-project/docusaurus'
              ],
            },
            "getting-started/start-from-existing-project/tracking-existing-components",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Understanding Bit",
      items: [
        "understanding-bit/why-bit",
        // 'understanding-bit/component-driven-software',
        // TODO 'understanding-bit/economy-of-scale',
        {
          type: "category",
          label: "Repository Architecture",
          items: [
            "understanding-bit/repository-architecture/overview",
            "understanding-bit/repository-architecture/bit-polyrepo",
            "understanding-bit/repository-architecture/bit-monorepo",
          ],
        },
        // 'understanding-bit/package-managers',
        "understanding-bit/micro-architecture/micro-architecture",
        // TODO 'understanding-bit/dogfooding'
      ],
    },
    {
      type: "category",
      label: "Aspects",
      items: [
        {
          type: "category",
          label: "Workspace",
          collapsed: true,
          items: [
            "workspace/overview",
            "workspace/creating-workspaces",
            "workspace/component-link",
            "workspace/directory-structure",
            "workspace/resetting-workspace",
            "workspace/workspace-component",
            "workspace/bitmap",
            "workspace/node-modules",
            "workspace/component-directory",
            "workspace/initializing-workspaces",
            "workspace/workspace-ui",
            "workspace/workspace-status",
            "workspace/workspace-json",
            "workspace/variants",
            "workspace/importing-components",
            "workspace/creating-components",
            "workspace/moving-components",
            "workspace/versioning-components",
            "workspace/workspace-starters",
            "workspace/workspace-templates",
          ],
        },
        {
          type: "category",
          label: "Components",
          collapsed: true,
          items: [
            "components/overview",
            "components/component-id",
            "components/main-file",
            "components/component-config",
            "components/creating-components",
            "components/inspecting-components",
            "components/comparing-components",
            "components/merging-components",
            "components/lanes",
            "components/snaps",
            "components/tags",
            "components/removing-components",
          ],
        },
        {
          type: "category",
          label: "Dependencies",
          collapsed: true,
          items: [
            "dependencies/overview",
            "dependencies/external-dependencies",
            "dependencies/installing-dependencies",
            "dependencies/configuring-dependencies",
            "dependencies/dependency-resolution",
            // TODO 'dependencies/ui',
            "dependencies/package-managers",
          ],
        },
        {
          type: "category",
          label: "Envs",
          collapsed: true,
          items: [
            "envs/overview",
            "envs/inspecting-env",
            "envs/extending-env",
            "envs/implement-new-env",
            "envs/envs-troubleshooting",
          ],
        },
        {
          type: "category",
          label: "Scope",
          collapsed: true,
          items: [
            "scope/overview",
            "scope/hosting-remote-scope",
            // TODO 'scope/configuring-scope',
            "scope/setting-remote-scope",
            // TODO 'scope/importing-components',
            // TODO 'scope/exporting-components'
            // TODO'scope/scope-ui'
          ],
        },
        {
          type: "category",
          label: "CI",
          collapsed: true,
          items: [
            // TODO 'cicd/overview',
            "cicd/cicd-setup-with-bit",
            "cicd/soft-tags",
            {
              type: "category",
              label: "Configuring Bit on Your CI",
              items: [
                // TODO 'cicd/configuring-bit-on-your-ci/circle-ci',
                "cicd/configuring-bit-on-your-ci/github-actions",
                "cicd/configuring-bit-on-your-ci/gitlab-ci",
                // TODO 'cicd/configuring-bit-on-your-ci/jenkins'
              ],
            },
            // TODO 'cicd/ripple-ci'
          ],
        },
        {
          type: "category",
          label: "Webpack",
          items: [
            "webpack/config-webpack"
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
      ],
    },

    {
      type: "category",
      label: "Dev Services",
      // collapsed: false,
      // collapsible: false,
      items: [
        "envs/services/dev-services-overview",
        {
          type: "category",
          label: "Generator",
          collapsed: true,
          items: [
            "generator/overview",
            "generator/workspace-template",
            "generator/components-template",
          ],
        },
        {
          type: "category",
          label: "Compiler",
          collapsed: true,
          items: [
            "compiler/overview",
            "compiler/workspace-compilation",
            "compiler/compiling-during-build",
            "compiler/configure-env",
            "compiler/implement-compiler",
            "compiler/multi-compiler",
          ],
        },
        {
          type: "category",
          label: "Tester",
          collapsed: true,
          items: [
            "tester/overview",
            "tester/workspace-testing",
            "tester/testing-during-build",
            "tester/configure-env",
            "tester/implement-tester",
          ],
        },
        {
          type: "category",
          label: "Builder",
          collapsed: true,
          items: [
            "builder/overview",
            "builder/component-isolation",
            // TODO 'builder/component-build',
            "builder/build-pipelines",
            "builder/build-pipeline-customization",
            // TODO 'builder/build-on-ci'
          ],
        },
        {
          type: "category",
          label: "Docs",
          items: [
            "docs/overview",
            "docs/mdx",
            "docs/doc-templates",
            "docs/rendering-docs",
          ],
          collapsed: true,
        },
        {
          type: "category",
          label: "Compositions",
          items: [
            "compositions/overview",
            // TODO 'compositions/composition-format',
            // TODO 'compositions/visualizing-components'
          ],
        },
        {
          type: "category",
          label: "Linter",
          collapsed: true,
          items: [
            "linter/overview",
            "linter/workspace-linting",
            "linter/configure-env",
            "linter/implement-linter",
          ],
        },
        {
          type: "category",
          label: "Formatter",
          collapsed: true,
          items: [
            "formatter/overview",
            "formatter/workspace-formatting",
            "formatter/implement-formatter",
          ],
        },
        {
          type: "category",
          label: "Config",
          collapsed: true,
          items: [
            "configurations/config-files",
            "configurations/global-configurations",
          ],
        },
        {
          type: "category",
          label: "Packages",
          collapsed: true,
          items: [
            "packages/overview",
            "packages/managing-packagejson",
            "packages/package-name",
            "packages/package-json",
            "packages/packing-components",
            "packages/publishing-to-commonjs-registries",
            "packages/build-tasks",
          ],
        },
        {
          type: "category",
          label: "Preview",
          items: [
            "preview/overview"
          ]
        }
      ],
    },
    {
      type: "category",
      label: "Platforms",
      items: [
        {
          type: "category",
          label: "NodeJS",
          items: ["platforms/nodejs/node-overview"],
        },
        {
          type: "category",
          label: "React",
          items: [
            "platforms/react/react-overview",
            "platforms/react/customizing-react-env",
            "platforms/react/data-fetching",
            "platforms/react/fonts",
            "platforms/react/react-hooks",
            "platforms/react/react-context",
            "platforms/react/styling-react-components",
            "platforms/react/theming",
          ],
        },
        {
          type: "category",
          label: "Angular",
          items: ["platforms/angular/angular-overview"],
        },
      ],
    },
    {
      type: "category",
      label: "Extending Bit",
      collapsed: true,
      items: [
        "extending-bit/overview",
        // TODO 'extending-bit/extension-capabilities',
        // TODO 'extending-bit/getting-started-with-extensions',
        {
          type: "category",
          label: "Guides",
          items: [
            "extending-bit/guides/adding-tab-to-workspace-ui",
            "extending-bit/guides/creating-component-templates",
            "extending-bit/guides/creating-workspace-templates",
            // TODO 'extending-bit/guides/adding-cli-command',
            // TODO 'extending-bit/guides/adding-graphql-route'
          ],
        },
        // TODO 'extending-bit/aspect-environment'
      ],
    },
    {
      type: "category",
      label: "Reference",
      collapsed: true,
      items: [
        // TODO 'reference/api-reference',
        "reference/cli-reference",
        // TODO 'reference/common-commands',
        "reference/bvm",
        "reference/migration",
        {
          type: "category",
          label: "Troubleshooting",
          items: [
            "reference/troubleshooting/doctor-logs-cache",
            "reference/troubleshooting/multiple-peer-dep-versions",
            "reference/troubleshooting/runtime-globals",
            "reference/troubleshooting/multiple-envs",
          ],
        },
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
      ],
    },
  ],
};
