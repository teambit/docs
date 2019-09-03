---
id: reference-cli
title: Bit CLI Reference
layout: docs
category: Reference
---

Overview of Bit cli commands

## Start a working area

  **init** -        create or reinitialize an empty Bit scope or reinitialize an existing one

## Add, modify and control components

  **add** -       add any subset of files to be tracked as a component(s)  
  **status** -      show the working area component(s) status  
  **tag** -       record component changes and lock versions  
  **checkout** -      switch between component versions  
  **merge** -       merge changes of different component versions  
  **diff** -        show diff between components files  
  **untag** -       revert versions tagged for component(s)  
  **move** -        move a component to a different filesystem path  
  **untrack** -     untrack a new component(s)  

## Collaborate and share components

  **import** -      import components into your current working area  
  **export** -      export components to a remote scope  
  **install** -     install node packages of all components and calls the link command  
  **remote** -      manage set of tracked bit scope(s)  
  **remove** -      remove component(s) from your working area, or a remote scope  
  **eject** -       replaces the components from the local scope with the corresponding packages  
  **link** -        generate symlinks for sourced components absolute path resolution  
  **deprecate** -     deprecate a component
  **undeprecate** -   undeprecate a deprecated component

## Discover components

  **list** -        list components on a local or a remote scope  
  **graph** -       EXPERIMENTAL   generate an image file with the dependencies graph  

## Examine component history and state

  **log** -       show components(s) version history  
  **show** -        show component overview  

## Component environment operations

  **build** -       build any set of components with configured compiler (component compiler or as defined in bit  json)  
  **test** -        test any set of components with configured tester (component tester or as defined in bit  json)  
  **watch** -       watch components and perform `build` on changes  

## General commands

  **login** -       log the CLI into bit  dev  
  **logout** -      log the CLI out of bit dev  
  **config** -      global config management  
  **doctor** -      diagnose a bit workspace  
  **cc** -        clears Bit's cache from current working machine
