---
id: overview
title: Overview
---

//TODO use imported compositions file

import { Theme } from '@teambit/base-ui.theme.theme-provider'
import { UserHeroExample } from '@site/src/components/user-hero'
import { UserProfileExample } from '@site/src/components/user-profile'
import { Image } from '@site/src/components/image'

'Compositions' are, essentially, small apps that exhibit and test a component in different contexts and variations.
They provide insight into the component's look and behavior in various likely usages.
They help component maintainers to deliver components that are "true to their promise" and behave as expected when consumed by other web projects.

Compositions play an important role in authoring and testing _independent_ components as they render component instances in "controlled environments",
isolated and un-affected by the rest of their authoring workspace, or by any other code that was not purposefully included.

Moreover, compositions are a way to demonstrate a component for other developers looking to use it, and non-developers,
such as designers and product managers, looking to inspect it.

## Viewing compositions

To explore compositions in your **Workspace UI**, start the local development server for your workspace (`bit start`),
browse to a specific component and select the compositions tab.
There, you will see the full list of compositions available for that component,along with additional component meta-data.

Compositions are also available to be viewed in the remote **Scope UI** (for example, on [Bit.dev](https://bit.dev)).

<Image src="/img/mfe_compositions.png" />

## Creating compositions

Create a `*.compositions.*` file inside your component's directory. Import the component into the compositions file to use it in a new composition.
Export that composition (the new component) with a name. The name of that export will be converted from PascalCase/camelCase and used for the composition name (e.g, "CompositionName" --> "Composition name").

For example, a composition for a 'user hero' component will looks like so:

```shell title="The 'user hero' component file structure"
├── user-hero
    ├── index.tsx
    ├── user-hero.compositions.tsx
    ├── user-hero.docs.mdx
    ├── user-hero.spec.tsx
    └── user-hero.tsx
```

```tsx title="example #1: user-hero.compositions.tsx"
import { Hero } from './user-hero'

const profileImage = 'https://storage.googleapis.com/docs-images/jessica.jpg'

const UserHero = () => {
  return (
    <Hero
      title="Jessica Pegula"
      description="Frontend developer and designer."
      profileImage={profileImage}
      data-testid="test-hero"
      userName="jessica"
    />
  )
}
```

<Theme>
  <UserHeroExample />
</Theme>

<br />

```tsx title="example #2: user-hero.compositions.tsx"
import { Hero } from './user-hero'

import React, { useEffect } from 'react'
import { DotsLoader } from '@teambit/base-ui.elements.dots-loader'
import { Error } from '@teambit/base-ui.input.error'
import { ScopeList } from '@harmony-mfe/scopes.ui.scopes.scopes-list'
import { useUser } from '@harmony-mfe/people.ui.hooks.use-user'
import styles from './user-profile.module.scss'

export const UserHeroWithScopeList = () => {
  const [getUser, scopes, user, isLoading, error] = useUser()

  useEffect(() => {
    getUser()
  }, [])

  if (isLoading) return <DotsLoader active={isLoading} />
  return (
    <div className={styles.userProfile}>
      <Hero
        title={user.title}
        description={user.description}
        profileImage={user.image}
      />
      {error !== '' ? <Error>{error}</Error> : <ScopeList list={scopes} />}
    </div>
  )
}
```

<Theme>
  <UserProfileExample />
</Theme>

## Loading compositions

The [Development Environment](/building-with-bit/environments) will automatically detect the composition file for each component
and use it to load its compositions to the workspace UI.

## Using compositions for automated testing

Compositions are not only a way to manually validate a component behaves as expected. Each composition can and should be used as a test sample for automated tests.

Import the compositions into your test file to run the appropriate tests.

For example, a test for a 'button' component may look like so:

```tsx {3} title="button.spec.tsx"
import React from 'react'
import testRenderer from 'react-test-renderer'
import { PrimaryButton } from './button.compositions'

describe('Button', () => {
  it('renders correctly as "primary"', () => {
    const component = testRenderer.create(
      <PrimaryButton>test primary variant</PrimaryButton>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

- Learn more about running tests in a Bit workspace, [here](/building-with-bit/testing-components)

## Setting providers for all your compositions

Extend the [React environment](/building-with-bit/react/) to customize its list of providers with your own composition providers.
The extended environment will then wrap every composition with these providers to make sure your themes or mock data are accessible to all of them,
without you having to repeat that task ever again.

## Compositions and storybook

Storybook displays individual components in different states and variations. It is designed to help in authoring and displaying standalone components, each of which is usually part of a design system. In contrast, 'Compositions' is mainly about examining how an independent component looks and behaves when used with other components. These component integrations serve as a way to examine compositions that are likely to be part of real applications, using manual and automated testing.

If you're looking for a Storybook-like solution, you can find that either in the Storybook extension (currently in development) or by using 'Compositions' for that use-case as well.
