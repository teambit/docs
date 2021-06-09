import { MainRuntime } from '@teambit/cli';
import { ReactAspect, ReactMain } from '@teambit/react';
import { EnvsAspect, EnvsMain } from '@teambit/envs';
import { DocsAspect } from './docs.aspect';

export class BitDocsMain {
  static slots = [];
  static dependencies = [ReactAspect, EnvsAspect];
  static runtime = MainRuntime;

  static async provider([react, envs]: [ReactMain, EnvsMain]) {
    const DocsEnv = envs.compose(react.reactEnv, [
      react.overrideDependencies({
        devDependencies: {
          '@types/react': '17.0.3'
        }
      })
    ]);

    envs.registerEnv(DocsEnv);

    return new BitDocsMain();
  }
}

DocsAspect.addRuntime(BitDocsMain);
