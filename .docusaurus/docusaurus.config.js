export default {
  "title": "Documentation",
  "tagline": "Bit",
  "url": "https://bit-harmony-stg.netlify.app/",
  "baseUrl": "/",
  "onBrokenLinks": "warn",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "img/favicon.ico",
  "organizationName": "teambit",
  "projectName": "docs-harmony",
  "themeConfig": {
    "navbar": {
      "title": "v15 Harmony",
      "logo": {
        "alt": "v15 Harmony",
        "src": "img/logo.svg"
      },
      "items": [
        {
          "to": "docs/getting-started/introduction",
          "activeBasePath": "docs",
          "label": "Docs",
          "position": "right"
        },
        {
          "href": "https://blog.bitsrc.io/tagged/bit",
          "label": "Blog",
          "position": "right"
        },
        {
          "href": "https://github.com/teambit/bit",
          "label": "GitHub",
          "position": "right"
        },
        {
          "href": "https://bit.dev/support",
          "label": "Help",
          "position": "right"
        },
        {
          "href": "https://docs.bit.dev",
          "label": "Bit Legacy Docs",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "dark",
      "links": [],
      "copyright": "Copyright © 2021 Bit.dev"
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "prism": {
      "additionalLanguages": []
    },
    "hideableSidebar": false
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/eden/Documents/Projects/docs/sidebars.js",
          "editUrl": "https://github.com/teambit/docs/edit/harmony"
        },
        "blog": {
          "showReadingTime": true,
          "editUrl": "https://github.com/facebook/docusaurus/edit/master/website/blog/"
        },
        "theme": {
          "customCss": "/Users/eden/Documents/Projects/docs/src/css/custom.css"
        }
      }
    ]
  ],
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "plugins": [],
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};