# bit.dev docs
This repo contains the source code and documentation powering [bit.dev](https://docs.bit.dev/).
The website is based on [Docusaurus1](https://docusaurus.io/en/)

## Getting started

### Installation
1. `npm i` to install top level dependencies

### Running locally

1. `cd website` to go into the project root
1. `npm i` to install the website's npm dependencies
1. `npm run start` to start the hot-reloading development server 
1. `open http://localhost:3000` to open the site in your browser

## Deployment
Deployment (for authorized users) is done on firebase-hosting. 
1. Push changes to the github repo
1. run `$(npm bin)/firebase login` from root directory to open your browser and login into firebase (firebase tools )
1. Run `npm run deploy` to build and publish the latest version.  

## Contributing

Contributions are welcome. 
You can just hit the "Edit" button on each page to make change to the content of the page. 

Images should be placed in the `docs/assets` files and be linked into. 
