---
id: build-artifacts
title: Build Artifacts
---

Artifacts are files that are generated, in a capsule, by a build task, and persisted in the component objects (the component version).

For example, TypeScript's build task generates compiled files, type decelerations and source maps. These artifacts are persisted in the component object when running the snap or tag pipelines.

```bash title="Listing the TypeScript Aspect artifacts for component ui/text"
$ bit artifacts ui/text --aspect teambit.compilation/compiler

my-workspace/ui/text@0.0.1
  teambit.compilation/compiler
    TSCompiler
      dist/index.d.ts
      dist/index.js
      dist/index.js.map
      dist/text.composition.d.ts
      dist/text.composition.js
      dist/text.composition.js.map
      dist/text.d.ts
      dist/text.docs.mdx
      dist/text.js
      dist/text.js.map
      dist/text.module.scss
      dist/text.spec.d.ts
      dist/text.spec.js
      dist/text.spec.js.map
```

## Using artifacts - CLI

Use the `--out-dir` option to extract artifacts from the component objects.

```
bit artifacts <component-id> --out-dir <dir-name>
```

## Using artifacts - API

### getArtifacts

```ts
getArtifacts(component: Component): ArtifactObject[] | undefined
```

### getArtifactsVinylByExtension

```ts
getArtifactsVinylByExtension(component: Component, aspectName: string): Promise<ArtifactVinyl[]>
```

### getArtifactsVinylByExtensionAndName

```ts
getArtifactsVinylByExtensionAndName(component: Component, aspectName: string, name: string): Promise<ArtifactVinyl[]>
```

### getArtifactsByName

```ts
getArtifactsByName(component: Component, name: string): ArtifactObject[] | undefined
```

### getArtifactsByExtension

```ts
getArtifactsByExtension(component: Component, aspectName: string): ArtifactObject[] | undefined
```

### getArtifactsByExtensionAndName

```ts
getArtifactsByExtensionAndName(component: Component, aspectName: string, name: string): ArtifactObject[] | undefined
```

### getDataByAspect

```ts
getDataByAspect(component: Component, aspectName: string): Serializable | undefined
```
