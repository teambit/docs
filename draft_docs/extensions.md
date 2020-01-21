---
id: extensions
title: Extending Bit
---
// happens during load phase 
// get the config and returns set of packages to add to the component deps
getDynamicPackageDependencies({
        rawConfig: envExtensionProps.rawConfig,
        dynamicConfig: envExtensionProps.dynamicConfig,
        configFiles: envExtensionProps.files,
        context: envExtensionProps.context // Object
      }): Object(dependencies, devDeps, peerDeps: {lodash: "4.0.0"});

// happens during load phase  
// Get the raw config and returns the calculated config
// used mostly for getting a path to file and read it or read values from env variabel
// the result of this function is what saved in the component model and used as the config 
// on imported envioronment 
getDynamicConfig({
          rawConfig: envExtensionProps.rawConfig,
          configFiles: envExtensionProps.files,
          context: envExtensionProps.context
        });
ExtensionProps - https://github.com/teambit/bit/blob/b8b1c8255dfe46b910aeb81faeb86dc65ac479cb/src/extensions/extension.ts#L36

// happens during load phase 
init({
          rawConfig: this.rawConfig,
          dynamicConfig: this.dynamicConfig,
          api: this.api
        });
api: {getLogger: () => LoggerInstance (winston.createLogger)}

// compiler run args
const actionParams = {
          files, // vinyl[]
          rawConfig: compiler.rawConfig, //object
          dynamicConfig: compiler.dynamicConfig, // object
          configFiles: compiler.files, // do not use
          api: compiler.api, // logger and ?
          context // see below
        };
const context: Record<string, any> = {
    componentObject: component.toObject(),
    rootDistDir, // string (path)
    componentDir,  // string (path)
    isolate: isolateFunc // function to isolate 
  };
const isolateFunc = async ({
    targetDir,
    shouldBuildDependencies,
    installNpmPackages,
    keepExistingCapsule
  }: {
    targetDir?: string;
    shouldBuildDependencies?: boolean;
    installNpmPackages?: boolean;
    keepExistingCapsule?: boolean;
  }): Promise<ExtensionIsolateResult>
// ExtensionIsolateResult
https://github.com/teambit/bit/blob/871b5c8a39a9c9e7afd9b061aedde0d670e759dc/src/extensions/extension-isolate-result.ts#L14