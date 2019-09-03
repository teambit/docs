---
id: netlify
title: Deploy Bit project on Netlify
---

## Get a Bit token

To deploy a project, you need to have a Bit token that has access to all the collections that have the components to be installed. 
You can create a dedicated user such as dev@company.com for the deployment, or use an existing user's token.  
You can get the bit token from a logged-in user by running 

```bash
bit config get user.token
```

## Deploy a project with installed @bit components

In your local project, do  the following:  

- Add a `.npmrc` file in your project with the following:

```bash
@bit:registry=https://node.bit.dev
//node.bit.dev/:_authToken=${BIT_TOKEN}
```

Go to your Netlify account and do the following: 

- In Build & Deploy -> Environment, create a new ENV variable named `BIT_TOKEN` and add the Bit token you got from bit.dev
Bit installs the project's components from the @bit registry. 

> Working this way,  requires that you set the BIT_TOKEN variable in your local machine as well. You can add to your shell environment the following to set the token, or run it locally: 

```bash
export BIT_TOKEN=$(bit config get user.token)
```

> The problem is due to an issue that exists for Netlify to make this process easier: https://community.netlify.com/t/common-issue-using-private-npm-modules-on-netlify/795/11

### deploy a project with Bit imported components

This configuration uses Bit to build components on Netlify before building the project.  

- Create the configuration as required for installing Bit components (Bit is installing the compiler from the @bit registry), described in the previous section.  

Inside your project, do the following steps: 

- Create a script in a `bit-ci.sh` file at the root of your project. 

```bash
bit config set analytics_reporting false
bit config set anonymous_reporting false
bit config set user.token ${BIT_TOKEN}
```

- Make sure the config file has execution permissions by running `chmod +x ./bit-ci.sh`.
- Install bit-bin as a dev dependency on your project
  
```bash
npm install -D bit-bin
```

- Add the following scripts to your package.json:

```bash
"bit-ci": "./bit-ci.sh",
"bit-build": "bit build",
```

Go to your Netlify account and do the following steps: 

- In Build & Deploy -> Continuous Deployment -> Build settings, edit the build command to be: 

```bash
npm run bit-ci; npm run bit-build; <rest of your build settings>
```

Now your deployment should run and builds the bit component before building your project.
