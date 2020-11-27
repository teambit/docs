---
id: create-build-task
title: Create a Build Task
---

Customized build tasks are another way to tailor a Bit environment to your own specific needs.

The example below shows a customized task that is built as part of an environment extension (go through the tabs to see it used by the customized environment).
<!--DOCUSAURUS_CODE_TABS-->
<!--print-component-id.ts-->
```ts
import { BuildTask, BuildContext, BuiltTaskResult, ComponentResult } from '@teambit/builder';

export class PrintComponentId implements BuildTask {
  readonly aspectId = 'extensions/customized-react-env';
  readonly name = 'print-component-id';

  async execute(context: BuildContext): Promise<BuiltTaskResult> {
    const componentsResults: ComponentResult[] = [];
    context.capsuleNetwork.seedersCapsules.forEach(capsule => {

      console.log('This is the current component ID:', capsule.component.id);
      componentsResults.push({ component: capsule.component, metadata: { addedInfo: 'new-info' } });
    });
    return {
      componentsResults
    }
  }
}
```

<!--customized-react.extension.ts-->

```ts
import { BuilderMain } from '@teambit/builder';
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';
import { PrintComponentId } from './print-component-id.ts';

export class CustomizedReactExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react, builder]: [EnvsMain, ReactMain, BuilderMain]) {
    const reactDefaultPipe = react.env.getBuildPipe();
    const tasks = [...reactDefaultPipe, new PrintComponentId()];
    const customizedReactEnv = react.compose([
      react.overrideBuildPipe(tasks)
    ]);

    envs.registerEnv(harmonyReactEnv);
    return new CustomizedReactExtension(react);
  }
}
```
<!--index.ts-->
```ts
import { CustomizedReactExtension } from './customized-react.extension';

export { CustomizedReactExtension };
export default CustomizedReactExtension;
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Positioning a build task in the pipeline
### Override the entire build pipeline

### Append to the start, middle or end of the pipeline