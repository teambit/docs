---
id: create-build-task
title: Create a Custom Build Task
---

Build pipelines are determined by the environments in use. That means, in order to override the default pipeline, we need to create a new [environment extension](/environments/build-environment) or modify an existing one.

The example task below, shown being used by a customized environment, prints out the component name of every component handled by it. In addition to that, the task returns the component name as custom metadata to be logged and/or stored in the component tagged version. [See a demo project here](https://github.com/teambit/harmony-build-examples).

> Information returned by a build task will only persist if the build-pipeline was triggered by the 'hard-tag' command (`bit tag <component-id>`).

```ts title="print-cmp-name-task.ts"
import {
  BuildTask,
  BuildContext,
  BuiltTaskResult,
  ComponentResult,
} from '@teambit/builder';

// A task is an implementation of 'BuildTask' provided by the 'builder' aspect
export class PrintCmpNameTask implements BuildTask {
  // The constructor leaves these properties up to the hands of the environment using this task
  constructor(readonly aspectId: string, readonly name: string) {}

  // This is where the task logic is placed. It will be executed by the build pipeline
  async execute(context: BuildContext): Promise<BuiltTaskResult> {
    const componentsResults: ComponentResult[] = [];

    // Go through every isolated component instance
    context.capsuleNetwork.seedersCapsules.forEach((capsule) => {
      console.log(
        `The current component name is: ${capsule.component.id.name}`
      );

      componentsResults.push({
        component: capsule.component,
        metadata: { customProp: capsule.component.id.name },
      });
    });
    return {
      // An array of component objects, enriched with additional data produced by the task
      componentsResults,
    };
  }
}
```

```ts title="customized-react.extension.ts"
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';

// Import the task
import { PrintCmpNameTask } from './print-cmp-name-task';

export class CustomReact {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    // Get the environment's default build pipeline
    const reactPipe = react.env.getBuildPipe();

    // Add the custom task to the end of the build tasks sequence.
    // Provide the task with the component ID of the extension using it.
    // Provide the ask with a name.
    const tasks = [
      ...reactPipe,
      new PrintCompTask('extensions/custom-react', 'PrintCmpNameTask'),
    ];

    // Create a new environment by merging these configurations with the env's default ones
    const customReactEnv = react.compose([react.overrideBuildPipe(tasks)]);

    // register the extension as an environment
    envs.registerEnv(customReactEnv);
    return new CustomReact(react);
  }
}
```

## Positioning a build task in the pipeline

A build task is positioned in the build pipeline sequence either by overriding the entire _customizable_ pipeline or, by registering it to a location in the pipeline using the designated builder slot.

### Override the build pipeline sequence

This methodology leaves the task completely agnostic as to its position in the build pipeline. Instead, the task position is determined by the environment using the ['getBuildpipe' Environment Handler](docs/environments/service-handlers#getbuildpipe).

The example above shows the React environment `overrideBuildPipe` method being used to override its default pipeline. This method uses the `getBuildPipe()` Environment Handler, internally.

### Append to the start or end of the pipeline, in relation to other tasks

This methodology places the task at the start or end of the build pipeline sequence, and lists all other tasks needed to run successfully before it is executed.

Example:

```ts title="print-cmp-name-task.ts"
import {
  BuildTask,
  BuildContext,
  BuiltTaskResult,
  ComponentResult,
} from '@teambit/builder';

export class PrintCmpNameTask implements BuildTask {
  constructor(readonly aspectId: string, readonly name: string) {}

  // Place the task at the end of the build pipeline
  readonly location = 'end';

  // Run this task only after the '@teambit/preview' task is completed successfully
  readonly dependencies = ['@teambit/preview'];

  async execute(context: BuildContext): Promise<BuiltTaskResult> {
    const componentsResults: ComponentResult[] = [];
    context.capsuleNetwork.seedersCapsules.forEach((capsule) => {
      console.log(
        `The current component name is: ${capsule.component.id.name}`
      );

      componentsResults.push({
        component: capsule.component,
        metadata: { customProp: capsule.component.id.name },
      });
    });
    return {
      componentsResults,
    };
  }
}
```

```ts title="customized-react.extension.ts"
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';
import { BuilderMain } from '@teambit/builder';

// Import the task (in reality, it should be an independent component)
import { PrintCmpNameTask } from './print-cmp-name-task';

export class CustomReact {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect];

  // Inject the builder
  static async provider([envs, react, builder]: [
    EnvsMain,
    ReactMain,
    BuilderMain
  ]) {
    // Register this task using the registration slot, made available by the 'builder'.
    // Here, the environment has no say in the positioning of the task
    builder.registerBuildTasks([
      new ExampleTask('extensions/custom-react', 'PrintCmpNameTask'),
    ]);

    const customReactEnv = react.compose([]);

    envs.registerEnv(customReactEnv);
    return new CustomReact(react);
  }
}
```

## A build task anatomy

- **aspectId** <br />
  `aspectId: string`<br />
  The component ID of the environment using this task.

- **name** <br />
  `name: string` <br />
  A name for this task. Only alphanumerical characters are allowed. PascalCase should be used as a convention.

- **location** <br />
  `location?: 'start' | 'end'` <br />
  The section of the build-pipeline to which to append this task.

- **dependencies** <br />
  `dependencies?: string[]` <br />
  An list of tasks that must be completed before this task gets executed. <br />
  For example `dependencies = ['@teambit/preview']`.

- **execute** <br />
  `execute(context: BuildContext): Promise<BuiltTaskResult>` <br />
  The execute method is where all the task logic is placed.

  - **context** (argument) <br />
    `context: BuildContext` <br />
    The context of the build pipeline. Use this object (provided by the build pipeline) to get information regarding all components handled by the build pipeline. <br /><br />
    For example, `context.capsuleNetwork.seedersCapsules` are models representing isolated instances of components handled by the build pipeline. These isolated instances are independent projects, generated in your local filesystem (by the build pipeline).

  - **return** <br />
    `Promise<BuiltTaskResult>` <br />
    A `context` method returns an object with data regarding the build task process, additional data regarding the components handled by the task and, if available, data regarding the different artifacts generated by this task.<br />
    The returned object has the following attributes:

      * __componentsResults__ <br />
      `componentsResults: ComponentResult[]`
      An array of objects, each containing an instance of an object handled the task and additional information regarding the process and the component itself.
      * __component__ <br />
        `component: Component` <br />
        An instance of the component handled by the task (see the above task example).

      * __metadata__ <br />
        `metadata?: { [key: string]: Serializable }` <br />
        Component metadata generated during the build task.

      * __errors__ <br />
        `errors?: Array<Error | string>` <br />
        Build task errors. A task returning errors will abort the build pipeline and log the returned errors.

      * __warnings__ <br />
        `warnings?: string[]` <br />
        warnings generated throughout the build task.

      * __startTime__ <br />
        `startTime?: number` <br />
        A timestamp (in milliseconds) of when the task started

      * __endTime__ <br />
        `endTime?: number` <br />
        A timestamp (in milliseconds) of when the task ended
      * __artifacts__ <br />
      `artifacts?: ArtifactDefinition[]` <br />
      An array of artifact definitions to generate after a successful build
      * __name__ <br />
      `name: string` <br />
      The name of the artifact. <br />
      For example, a project might utilize two different artifacts for the same typescript compiler, one that generates ES5 files and another for ES6. This prop helps to distinguish between the two.
      * __generatedBy__ <br />
      `generatedBy?: string;` <br />
      Id of the component that generated this artifact.

      * __description__ <br />
      `description?: string` <br />
      A description of the artifact. <br />

      * __globPatterns__ <br />
      `globPatterns: string[]` <br />
      Glob patterns of files to include upon artifact creation. Minimatch is used to match the patterns. <br />
      For example, `['*.ts', '!foo.ts']` matches all ts files but ignores `foo.ts`.

      * __rootDir__ <br />
      `rootDir?: string` <br />
      Defines the root directory of the artifacts in the capsule file system. The rootDir must be unique for every artifact, otherwise data might be overridden.

      * __dirPrefix__ <br />
      `dirPrefix?: string` <br />
      Adds a directory prefix for all artifact files.

      * __context__ <br />
      `context?: 'component' | 'env'` <br />
      Determine the context of the artifact. The default artifact context is `component`. `env` is useful when the same file is generated for all components, for example, a "preview" task may create the same webpack file for all components of that env.

      * __storageResolver__ <br />
      `storageResolver?: string` <br />
      Used to replace the location of the stored artifacts. The default resolver persists artifacts on scope (that's not recommended for large files).

- **preBuild** (advanced) <br />
  `preBuild?(context: BuildContext): Promise<void>` <br />
  Runs before the build pipeline has started. This method should only be used when preparations are needed to be done on all environments before the build starts.

- **postBuild** (advanced) <br />
  `postBuild?(context: BuildContext, tasksResults: TaskResultsList): Promise<void>` <br />
  Runs after the dependencies were completed for all environments.
