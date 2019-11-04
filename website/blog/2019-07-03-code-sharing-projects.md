---
title: Bit and the Art of Sharing Components between Projects
author: Tally Barak
authorTwitter: baraktally
authorImageURL: https://avatars1.githubusercontent.com/u/7386255?s=460&v=4
---

Components, by their nature, are made for reuse. Modern software architecture for applications has evolved from page-based and MVC (Model View Controller) into component-based architecture.  
The evolution towards components derived by the desire to accelerate development, simplify the maintenance of apps, and help build better software.  

<!--truncate-->

Now imagine the following scenario: your company has two applications. You are developing one application, and your colleague has just developed a new component that you would like to use.  You peek into the code and find out that it is well written, with the correct amount of configuration, and you could make good use of it.  
But how can you take this code and add it to your project?  

## Option 1 - Copy the product-list source code

Copy-pasting code is the most naive option. Take the code and copy it into your project. Obviously, this is far from being the best possible option.  
First, copying the code is not enough. You need to identify any dependencies the code has. The code may depend on 3rd party code (namely NPM packages) or internal code that you need to isolate from the project.  
Also, the source code itself might not fit very well into your project. Maybe there is some plugin or transpiler used in the other project that does not exist in your project?  
But worse of all, copied code is dead code. You do not receive any changes or bug fixes from the original project.  

## Option 2 - Create a Package from a separate Repository

The standard way to share code in a maintainable manner is, of course, to publish it as a package. Packages do not come for free. There are some steps to take before you can share code as a package:  
Extract the code it to its own repository

- Configure the build tools
- Construct a publish chain

While building the repository is mostly a one-time effort, the higher costs hide when the component is changed. Here are the typical steps when you need to make a change to a shared component:  

- Clone the shared component repo
- Switch to the repo and install  
- Code and test the shared component
- Link the project code to the shared repo
- Check the component in the code
- Push the code to the original repo
- Publish the package from the original project
- Install the package and unlink the local project

Too many steps to do for every change.  

## Option 3 - Mono Repo

Mono repo has emerged as a popular solution for sharing code between projects while skipping the need to maintain multiple repositories and retaining all the code in a single repo.
Mono repos enforce that not only the shared components reside in a single repository, but also the projects that consume them.  
The debate around mono repo is still happening.  
Matt Klein canonical post titled ["monorepos, Please Don't"](https://medium.com/@mattklein123/monorepos-please-dont-e9a279be011b) details most of the downsides in mono repos.  
In addition to everything described there, it is worth noting that unless you start a completely new venture, there are also transition costs from many repos to a monorepo.  

## Option 4 - Bit

Bit goal is to fulfill this gap. Bit lets many repositories to behave as if they are a mono-repo for sharing components across them. In the cloud era, it only makes sense to have a cloud-based solution. Users can build a package from their existing repository and share it with others over the cloud.  
Bit marks the new generation of tools, focusing on components rather than on repositories and make components truly reusable by enabling collaboration.  
