const lightCodeTheme = require('prism-react-renderer/themes/nightOwlLight');
const darkCodeTheme = require('prism-react-renderer/themes/nightOwl');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'Chia Documentation',
    tagline:
      'The source of truth for Chia documentation. Start here to learn more about Chia. ',
    url: 'https://staging.docs.chia.net',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/chia_leaf_green.svg',
    organizationName: 'Chia-Network',
    projectName: '{{ REPOSITORY_NAME }}',
    plugins: [
      [
        require.resolve('@easyops-cn/docusaurus-search-local'),
        {
          hashed: true,
          language: ['en', 'zh'],
        },
      ],
    ],
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'zh'],
    },
    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          gtag: {
            trackingID: 'G-6HSSLLPE6Q',
            anonymizeIP: true,
          },
          docs: {
            routeBasePath: '/',
            sidebarPath: require.resolve('./sidebars.js'),
            editUrl:
              'https://github.com/Chia-Network/{{ REPOSITORY_NAME }}/blob/main/',
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
        announcementBar: {
          id: 'cat2_launch',
          content:
            'CAT2 Standard Released 🌱<a target="_blank" rel="noopener noreferrer" href="/docs/cat2/cat2-intro/"> Learn about CAT1 end-of-life and CAT2 reissuance</a>',
          backgroundColor: '#0d3349',
          textColor: '#fff',
          isCloseable: true,
        },
        image: '/img/og-chia.png',
        navbar: {
          title: ' Chia Docs',
          logo: {
            alt: 'Chia Logo',
            src: 'img/chia_leaf_green.svg',
          },
          items: [
            {
              to: '/quick-start-guide',
              activeBasePath: 'docs',
              label: 'Docs',
              position: 'left',
            },
            {
              to: 'https://www.chia.net/',
              label: 'Chia.net',
              position: 'left',
            },
            {
              to: 'https://github.com/Chia-Network/',
              label: 'Chia Github',
              position: 'left',
            },
            {
              type: 'localeDropdown',
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
                  to: 'https://www.chia.net/approach',
                },
              ],
            },
            {
              title: 'Technology',
              items: [
                {
                  label: 'Green Paper',
                  to: 'https://www.chia.net/greenpaper',
                },
                {
                  label: 'Consensus 1.1',
                  to: 'https://www.chia.net/assets/Chia-New-Consensus-0.9.pdf',
                },
              ],
            },
            {
              title: 'Developers',
              items: [
                {
                  label: 'Grants',
                  to: 'https://www.chia.net/grants',
                },
                {
                  label: 'Chialisp',
                  to: 'https://www.chialisp.com',
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
          copyright: `© ${new Date().getFullYear()} Chia Network Inc., Licensed under the <a href="https://github.com/Chia-Network/chia-docs/blob/main/LICENSE" target="_blank">Apache License, Version 2.0</a> | <a href="https://www.chia.net/terms">Terms</a>`,
        },
        prism: {
          darkTheme: require('./src/theme/prism-dark-theme-chialisp'),
          theme: require('./src/theme/prism-light-theme-chialisp'),
          additionalLanguages: ['powershell', 'lisp'],
        },
      }),
  }
);
