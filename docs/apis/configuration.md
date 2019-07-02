---
id: bit-configuration
title: Bit Configuration 
sidebar_label: Configuration
---
These configurations are global on your machine. 

use `bit config` to view the current definitions
Use `bit config set <name> <value>` to change a configuration. 

### User configuration
#### ssh_key_file
Defines the path the ssh key files that will be used to log into Bit cloud. If not set, it will default to `~/.ssh/id_rsa`. 

#### user.email
The email of the user that will be saved on the component history when a component is tagged. During bit init, the git `user.email` configuration on the machine, if exists, will be copied to the bit `user.email`. 
```bash
bit config set user.email "tuko@bit.dev"
```

#### user.name
The name of the user that will be saved on the component history when a component is tagged. During bit init, the git `user.name` configuration on the machine, if exists, will be copied to the bit `user.name`. 

#### user.token
Authentication token for a [bit.dev](https://bit.dev) account. [Read more about setting bit cloud authentication.](/docs/setup-authentication.html)

### Bit Cloud configuration
These values need to be changed only if a private server or private registery is used. Otherwise, it will be defaulted to Bit cloud server. 

#### hub_domain
The domain of the default bit cloud component hub. Optional and defaulted to bit cloud hub  `hub.bit.dev`. 

#### hub_domain_login
The service against which the user will be authenticated. Optional and will be defaulted to `https://bit.dev/bit-login`

#### registry
Bit npm registery url. Optional and defaulted to `https://node.bit.dev`. 

### Reporting configuration
#### analytics_reporting
Will determine if anonymous usage data is sent to Bit. 

#### anonymous_reporting
By default, analytics data is sent as anonymous data. Set the value to `false` to send unmasked data. 

#### error_reporting
Send anomumous errors data to Bit. Defaulted to false. 

### Local Configuration
#### git_path
Path to the location of the Git executable.
