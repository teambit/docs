---
id: building-components
title: Compiling
---

## Understanding build

Most modern frameworks require a compilation or transpilation project to transform the source code into executable code that can run in multiple browsers or Nodejs.  
Bit transpiles the code using a special component called a compiler. The compiler uses tools specific to the project to result in plain JS code. The underlying tools vary according to the specific framework (Angular, React) or the specific language flavor (ES6, Typescript, Flow). The internal implementation of each compiler varies according to the specific input it uses.  
Bit is building the code in isolation. Creating an isolated component environment for a component allows Bit to run the build tasks outside the context of a project, thus increasing the chance that the component is completely decoupled from any project and can work independently in other projects.  
The isolation directory is called "capsule". Bit creates the capsule in a directory under the temp directory and performs the build task in this directory. The compiler returns the compiled files to Bit that stores with the component.  
The officially maintained compilers are stored in the [bit/envs](https://bit.dev/bit/envs) collection. Issues regarding any of the compilers can be [reported here](https://github.com/teambit/envs).

### Target platform

Typically, the component code needs to be transpiled to work in the browser. Inside a project, the building tools are responsible for the compilation / transpilation.  

Most of Bit compilers generate the following:  

- JS syntax ES2015 (ES6)
- Module system as [ES Modules](https://flaviocopes.com/es-modules/)

Typically, projects tooling is doing two things:  

- Transpiles code in the source code folder (very often this is called `src`) with tools such as babel or Typescript
- Bundles the code into chunks using tools like webpack or rollup. The bundlers bundle the source code, assets, and packages code, that is already compiled.  

The Bit compiler generates code that the hosting project can bundle without the need to compile it. The ES Module format lets the bundler analyze the code and apply optimization techniques such as code splitting for creating smaller chunks and tree shaking to eliminate unused code.  

However, in certain cases the defaults mentioned above are unsuitable. For example, if the code is rendered on the server, using Node (up to version 12). Node cannot import the ES Modules format code and require the format to be in CommonJS. If the code is loaded directly from a CDN (using a script tag), it needs to be in UMD format. To support older browsers (read: IE6), you may want to transpile to ES5 and not to ES6.  

## Defining a Compiler

To define a compiler to your workspace, you should import the compiler using the following command:  

```shell
$ bit import bit.envs/compilers/babel --compiler
the following component environments were installed
- bit.envs/compilers/babel@0.0.7
```

The above command updates the compiler stored in the workspace configuration file under the `env` key:  

```json
"env": {
      "compiler": {
        "bit.envs/compilers/react-typescript": "3.1.5"
      }
```

For compilers that get parameters, you can extend this entry to contain additional variables. Check the compilers documentation for more details:  

```json
"env": {
      "compiler": {
        "bit.envs/compilers/react-typescript": {
          "rawConfig": {
            "tsconfig": {
              "compilerOptions": {
                "target": "ES5",
                "module": "CommonJS"
              }
            }
          }
        }
      }
```

Bit uses the default compiler for newly authored components. When importing components, the compiler is attached to the component. You can see the compiler of the authored component by looking at its package.json file or by running the `bit show` command.  

You can also use the [overrides](/docs/overrides) configuration to change the compiler to specific components or a set of components (by using a namespace or glob pattern).  

```json
"overrides": {
        "utils/*": {
          "env": {
            "compiler": {
              "bit.envs/compilers/react-typescript": {
                "rawConfig": {
                  "tsconfig": {
                    "compilerOptions": {
                      "target": "ES5",
                      "module": "CommonJS"
                    }
                  }
                }
              }
            }
          }
        }
      }
```

Bit does not enforce attaching a compiler to a component, and a specific code may not require a compiler. Such as pure CSS code used for global variables or code already written in ES5. To remove a compiler from a set of components, use the overrides option:  

```json
"overrides": {
        "styles/*": {
          "env": {
            "compiler": "-"
        }
      },
```

## Compiled code

Bit stores the compiled code according to the [dist configuration](/docs/conf-bit-json#dist) parameter.  

The dist location differs for [imported](/docs/workspace#build-directory) and [authored](/docs/workspace#build-files) components.  

Some compilers, such as Typescript and React Typescript, are supporting changing the configuration. Otherwise, you need to [fork the compiler](/docs/building-components#where-is-the-code-compiled) and change the code.  
Changing the configuration works according to [overriding rules](/docs/overrides#overriding-rules).  

To change the configuration for the compiler add it to the package.json for the workspace or under the overrides. Under the `env` key change the compiler to be as follow:  

```json
"bit.envs/compilers/react-typescript": {
    "rawConfig": {
        "tsconfig": {
            "compilerOptions": {
                "target": "ES5",
                "module": "CommonJS"
            }
        }
    }
}
```


## Debugging compilation

Debugging differs for compilers that use the capsule and for those that do not.  

### Capsule compilers

During the compilation process, the Bit compiler generates a full environment for the component and may add some configuration files that are required for the compilation, such as `tsconfig.json` when compiling Typescript code.  
If you want to see the generated code, you can precede the build command with a `DEBUG=true` flag. When running the build, it displays a message specifying the location of the development folder.  

![debug](https://storage.googleapis.com/static.bit.dev/docs/gifs/build-debug.gif)

### Non capsule compilers

In order to debug your compiler, first [import it](/docs/apis/cli-all#import) as you would any other component (e.g not as an environment).
Next, head over to the compiler's code, and add the following lines:

```javascript
const vinylFile = require('vinyl-file');
const file = vinylFile.readSync('first/file/path');
const file2 = vinylFile.readSync('second/file/path');

compile([file,file2],'/tmp');
```

These lines load all the component files (here we have just two files as an example) as [vinyl files](https://github.com/sindresorhus/vinyl-file), and invoke the `compile` function with the files and a dist path. Now you can run this file and debug as you would any other code file.

## Forking a compiler

Bit compilers provide some default configuration. If you need to change the configuration of a compiler, here are the recommended steps to follow:  

### Fork an existing compiler

- Create a new directory and an empty workspace in it
- Import the compiler you want to modify but without the --compiler flag
- Modify the compiler code or configuration to fit your needs

To test your compiler from your local code, by setting the [bit workspace configuration](/docs/conf-bit-json.html) env compiler to point to the local file:  

```json
"env": {
      "compiler": {
        "bit.envs/compilers/test@0.0.1": {
          "options": {
            "file": "../../path-to-my-compiler-file"
          }
        }
      }
    }
```

Once done, you can export the new version of the component to a scope and use it in other projects.  
