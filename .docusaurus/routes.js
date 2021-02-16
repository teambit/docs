
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/',
  component: ComponentCreator('/','deb'),
  exact: true,
},
{
  path: '/__docusaurus/debug',
  component: ComponentCreator('/__docusaurus/debug','3d6'),
  exact: true,
},
{
  path: '/__docusaurus/debug/config',
  component: ComponentCreator('/__docusaurus/debug/config','914'),
  exact: true,
},
{
  path: '/__docusaurus/debug/content',
  component: ComponentCreator('/__docusaurus/debug/content','c28'),
  exact: true,
},
{
  path: '/__docusaurus/debug/globalData',
  component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
  exact: true,
},
{
  path: '/__docusaurus/debug/metadata',
  component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
  exact: true,
},
{
  path: '/__docusaurus/debug/registry',
  component: ComponentCreator('/__docusaurus/debug/registry','0da'),
  exact: true,
},
{
  path: '/__docusaurus/debug/routes',
  component: ComponentCreator('/__docusaurus/debug/routes','244'),
  exact: true,
},
{
  path: '/docs',
  component: ComponentCreator('/docs','fe0'),
  
  routes: [
{
  path: '/docs/authentication/overview',
  component: ComponentCreator('/docs/authentication/overview','b91'),
  exact: true,
},
{
  path: '/docs/build-pipeline/create-build-task',
  component: ComponentCreator('/docs/build-pipeline/create-build-task','e49'),
  exact: true,
},
{
  path: '/docs/build-pipeline/overview',
  component: ComponentCreator('/docs/build-pipeline/overview','5ed'),
  exact: true,
},
{
  path: '/docs/cli/cheat-sheet',
  component: ComponentCreator('/docs/cli/cheat-sheet','97e'),
  exact: true,
},
{
  path: '/docs/compiling/customize',
  component: ComponentCreator('/docs/compiling/customize','65c'),
  exact: true,
},
{
  path: '/docs/compiling/overview',
  component: ComponentCreator('/docs/compiling/overview','e85'),
  exact: true,
},
{
  path: '/docs/components/exporting',
  component: ComponentCreator('/docs/components/exporting','15b'),
  exact: true,
},
{
  path: '/docs/components/importing',
  component: ComponentCreator('/docs/components/importing','ef2'),
  exact: true,
},
{
  path: '/docs/components/inspecting',
  component: ComponentCreator('/docs/components/inspecting','214'),
  exact: true,
},
{
  path: '/docs/components/installing',
  component: ComponentCreator('/docs/components/installing','cad'),
  exact: true,
},
{
  path: '/docs/components/overview',
  component: ComponentCreator('/docs/components/overview','ca5'),
  exact: true,
},
{
  path: '/docs/components/remove-deprecate-components',
  component: ComponentCreator('/docs/components/remove-deprecate-components','252'),
  exact: true,
},
{
  path: '/docs/components/tracking',
  component: ComponentCreator('/docs/components/tracking','e54'),
  exact: true,
},
{
  path: '/docs/components/versioning',
  component: ComponentCreator('/docs/components/versioning','c6d'),
  exact: true,
},
{
  path: '/docs/compositions/compositions',
  component: ComponentCreator('/docs/compositions/compositions','e95'),
  exact: true,
},
{
  path: '/docs/dependencies/dependency-installation',
  component: ComponentCreator('/docs/dependencies/dependency-installation','688'),
  exact: true,
},
{
  path: '/docs/dependencies/dependency-policies',
  component: ComponentCreator('/docs/dependencies/dependency-policies','914'),
  exact: true,
},
{
  path: '/docs/dependencies/dependency-resolution',
  component: ComponentCreator('/docs/dependencies/dependency-resolution','6f8'),
  exact: true,
},
{
  path: '/docs/dependencies/overview',
  component: ComponentCreator('/docs/dependencies/overview','30f'),
  exact: true,
},
{
  path: '/docs/documenting/overview',
  component: ComponentCreator('/docs/documenting/overview','876'),
  exact: true,
},
{
  path: '/docs/documenting/properties-table',
  component: ComponentCreator('/docs/documenting/properties-table','25d'),
  exact: true,
},
{
  path: '/docs/documenting/using-docs-api',
  component: ComponentCreator('/docs/documenting/using-docs-api','780'),
  exact: true,
},
{
  path: '/docs/environments/build-environment',
  component: ComponentCreator('/docs/environments/build-environment','e29'),
  exact: true,
},
{
  path: '/docs/environments/choose-an-environment',
  component: ComponentCreator('/docs/environments/choose-an-environment','862'),
  exact: true,
},
{
  path: '/docs/environments/environment-services',
  component: ComponentCreator('/docs/environments/environment-services','a31'),
  exact: true,
},
{
  path: '/docs/environments/overview',
  component: ComponentCreator('/docs/environments/overview','1fb'),
  exact: true,
},
{
  path: '/docs/environments/service-handlers',
  component: ComponentCreator('/docs/environments/service-handlers','57a'),
  exact: true,
},
{
  path: '/docs/faq/multiple-peer-dep-versions',
  component: ComponentCreator('/docs/faq/multiple-peer-dep-versions','29b'),
  exact: true,
},
{
  path: '/docs/faq/set-runtime-globals',
  component: ComponentCreator('/docs/faq/set-runtime-globals','d4c'),
  exact: true,
},
{
  path: '/docs/getting-started/add-components',
  component: ComponentCreator('/docs/getting-started/add-components','5fc'),
  exact: true,
},
{
  path: '/docs/getting-started/bit-account',
  component: ComponentCreator('/docs/getting-started/bit-account','7c6'),
  exact: true,
},
{
  path: '/docs/getting-started/choose-dev-env',
  component: ComponentCreator('/docs/getting-started/choose-dev-env','ce1'),
  exact: true,
},
{
  path: '/docs/getting-started/ci-cd',
  component: ComponentCreator('/docs/getting-started/ci-cd','61a'),
  exact: true,
},
{
  path: '/docs/getting-started/compile',
  component: ComponentCreator('/docs/getting-started/compile','6dd'),
  exact: true,
},
{
  path: '/docs/getting-started/document',
  component: ComponentCreator('/docs/getting-started/document','442'),
  exact: true,
},
{
  path: '/docs/getting-started/export-to-scope',
  component: ComponentCreator('/docs/getting-started/export-to-scope','f60'),
  exact: true,
},
{
  path: '/docs/getting-started/import-components',
  component: ComponentCreator('/docs/getting-started/import-components','1f6'),
  exact: true,
},
{
  path: '/docs/getting-started/install-bit',
  component: ComponentCreator('/docs/getting-started/install-bit','cb6'),
  exact: true,
},
{
  path: '/docs/getting-started/install-components',
  component: ComponentCreator('/docs/getting-started/install-components','d48'),
  exact: true,
},
{
  path: '/docs/getting-started/introduction',
  component: ComponentCreator('/docs/getting-started/introduction','e01'),
  exact: true,
},
{
  path: '/docs/getting-started/manage-dependencies',
  component: ComponentCreator('/docs/getting-started/manage-dependencies','508'),
  exact: true,
},
{
  path: '/docs/getting-started/render-component',
  component: ComponentCreator('/docs/getting-started/render-component','e66'),
  exact: true,
},
{
  path: '/docs/getting-started/set-up-workspace',
  component: ComponentCreator('/docs/getting-started/set-up-workspace','cf9'),
  exact: true,
},
{
  path: '/docs/getting-started/set-up-workspace',
  component: ComponentCreator('/docs/getting-started/set-up-workspace','802'),
  exact: true,
},
{
  path: '/docs/getting-started/test',
  component: ComponentCreator('/docs/getting-started/test','42d'),
  exact: true,
},
{
  path: '/docs/getting-started/version',
  component: ComponentCreator('/docs/getting-started/version','07d'),
  exact: true,
},
{
  path: '/docs/nodejs/extending-node',
  component: ComponentCreator('/docs/nodejs/extending-node','623'),
  exact: true,
},
{
  path: '/docs/nodejs/overview',
  component: ComponentCreator('/docs/nodejs/overview','b00'),
  exact: true,
},
{
  path: '/docs/nodejs/using-node',
  component: ComponentCreator('/docs/nodejs/using-node','2bf'),
  exact: true,
},
{
  path: '/docs/packages/install-packages',
  component: ComponentCreator('/docs/packages/install-packages','5b8'),
  exact: true,
},
{
  path: '/docs/packages/overview',
  component: ComponentCreator('/docs/packages/overview','772'),
  exact: true,
},
{
  path: '/docs/packages/publish-to-npm',
  component: ComponentCreator('/docs/packages/publish-to-npm','66f'),
  exact: true,
},
{
  path: '/docs/react-native/extending-react-native',
  component: ComponentCreator('/docs/react-native/extending-react-native','045'),
  exact: true,
},
{
  path: '/docs/react-native/overview',
  component: ComponentCreator('/docs/react-native/overview','58c'),
  exact: true,
},
{
  path: '/docs/react-native/using-react-native',
  component: ComponentCreator('/docs/react-native/using-react-native','685'),
  exact: true,
},
{
  path: '/docs/react/extending-react',
  component: ComponentCreator('/docs/react/extending-react','bc0'),
  exact: true,
},
{
  path: '/docs/react/overview',
  component: ComponentCreator('/docs/react/overview','167'),
  exact: true,
},
{
  path: '/docs/react/using-react',
  component: ComponentCreator('/docs/react/using-react','ac9'),
  exact: true,
},
{
  path: '/docs/scope/overview',
  component: ComponentCreator('/docs/scope/overview','04b'),
  exact: true,
},
{
  path: '/docs/scope/scope-ui',
  component: ComponentCreator('/docs/scope/scope-ui','5aa'),
  exact: true,
},
{
  path: '/docs/scope/self-host-bit-scope',
  component: ComponentCreator('/docs/scope/self-host-bit-scope','7b7'),
  exact: true,
},
{
  path: '/docs/scope/set-up-remote-scope',
  component: ComponentCreator('/docs/scope/set-up-remote-scope','4bd'),
  exact: true,
},
{
  path: '/docs/testing/add-tester-to-pipeline',
  component: ComponentCreator('/docs/testing/add-tester-to-pipeline','00c'),
  exact: true,
},
{
  path: '/docs/testing/customize-the-tester',
  component: ComponentCreator('/docs/testing/customize-the-tester','f04'),
  exact: true,
},
{
  path: '/docs/testing/overview',
  component: ComponentCreator('/docs/testing/overview','7f9'),
  exact: true,
},
{
  path: '/docs/testing/run-tests',
  component: ComponentCreator('/docs/testing/run-tests','746'),
  exact: true,
},
{
  path: '/docs/troubleshooting/troubleshooting',
  component: ComponentCreator('/docs/troubleshooting/troubleshooting','515'),
  exact: true,
},
{
  path: '/docs/usage-analytics/overview',
  component: ComponentCreator('/docs/usage-analytics/overview','d96'),
  exact: true,
},
{
  path: '/docs/workspace/cascading-rules',
  component: ComponentCreator('/docs/workspace/cascading-rules','9c3'),
  exact: true,
},
{
  path: '/docs/workspace/component-status',
  component: ComponentCreator('/docs/workspace/component-status','a16'),
  exact: true,
},
{
  path: '/docs/workspace/configurations',
  component: ComponentCreator('/docs/workspace/configurations','41f'),
  exact: true,
},
{
  path: '/docs/workspace/overview',
  component: ComponentCreator('/docs/workspace/overview','19e'),
  exact: true,
},
{
  path: '/docs/workspace/workspace-ui',
  component: ComponentCreator('/docs/workspace/workspace-ui','1db'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
