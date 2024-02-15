const math = require('remark-math');
const katex = require('rehype-katex');
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'Chia Documentation',
    tagline:
      'The source of truth for Chia documentation. Start here to learn more about Chia.',
    url: 'https://docs.chia.net',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: '/svg/chia-leaf-green.svg',
    organizationName: 'Chia-Network',
    projectName: 'chia-docs',
    trailingSlash: true,
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'zh-Hans'],
    },
    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            routeBasePath: '/',
            sidebarPath: require.resolve('./sidebars.js'),
            editUrl: 'https://github.com/Chia-Network/chia-docs/blob/main/',
            remarkPlugins: [math],
            rehypePlugins: [katex],
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        image: '/img/og-chia.png',
        navbar: {
          title: 'Chia Docs',
          logo: {
            alt: 'Chia Logo',
            src: '/svg/chia-leaf-green.svg',
          },
          items: [
            {
              type: 'doc',
              docId: 'getting-started/introduction',
              position: 'left',
              label: 'Docs',
            },
            {
              type: 'doc',
              docId: 'guides/crash-course/introduction',
              position: 'left',
              label: 'Guides',
            },
            {
              type: 'doc',
              docId: 'academy/academy-intro/academy-home',
              position: 'left',
              label: 'Chia Academy',
            },
            {
              href: 'https://chialisp.com',
              label: 'Chialisp',
              position: 'left',
            },
            {
              href: 'https://chia.net',
              label: 'Chia Network',
              position: 'left',
            },
            {
              type: 'localeDropdown',
              position: 'left',
            },
            {
              href: 'https://github.com/Chia-Network/chia-blockchain',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Approach',
              items: [
                {
                  label: 'White Paper',
                  to: 'https://chia.net/approach',
                },
              ],
            },
            {
              title: 'Technology',
              items: [
                {
                  label: 'Green Paper',
                  to: 'https://chia.net/greenpaper',
                },
                {
                  label: 'Consensus 1.1',
                  to: 'https://docs.chia.net/consensus-intro',
                },
              ],
            },
            {
              title: 'Developers',
              items: [
                {
                  label: 'Chialisp',
                  to: 'https://chialisp.com',
                },
                {
                  label: 'Chia Academy',
                  to: 'https://docs.chia.net/academy-home/',
                },
              ],
            },
            {
              title: 'Company',
              items: [
                {
                  label: 'About',
                  to: 'https://chia.net/about',
                },
                {
                  label: 'Blog',
                  to: 'https://chia.net/blog',
                },
                {
                  label: 'Contact',
                  to: 'https://chia.net/contact',
                },
              ],
            },
          ],
          copyright: `© ${new Date().getFullYear()} Chia Network Inc., Licensed under the <a href="https://github.com/Chia-Network/chia-docs/blob/main/LICENSE" target="_blank">Apache License, Version 2.0</a> | <a href="https://chia.net/terms">Terms</a>`,
        },
        prism: {
          darkTheme: require('./src/theme/prism-dark-theme-chialisp'),
          theme: require('./src/theme/prism-light-theme-chialisp'),
          additionalLanguages: ['powershell', 'lisp'],
        },
      }),
    themes: [
      [
        '@easyops-cn/docusaurus-search-local',
        /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
        ({
          hashed: true,
          language: ['en', 'zh'],
          highlightSearchTermsOnTargetPage: true,
          explicitSearchResultPath: true,
          docsRouteBasePath: '/',
        }),
      ],
    ],
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],
    scripts: [
      {
        src: '/js/matomo.js',
        async: true,
        defer: true,
      },
    ],
  }
);
