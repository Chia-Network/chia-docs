const lightCodeTheme = require('prism-react-renderer/themes/nightOwlLight');
const darkCodeTheme = require('prism-react-renderer/themes/nightOwl');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Chia Documentation',
  tagline: 'The source of truth for Chia documentation. Start here to learn more about Chia. ',
  url: 'https://docs.chia.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/chia_leaf_green.svg',
  organizationName: 'Chia-Network', // Usually your GitHub org/user name.
  projectName: 'chia-docs', // Usually your repo name.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'cn'],
  },
  plugins: [require.resolve("@cmfcmf/docusaurus-search-local")],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/Chia-Network/chia-docs',
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
      navbar: {
        title: ' Chia Docs',
        logo: {
          alt: 'My Site Logo',
          src: 'img/chia-docs-icon.svg',
        },
        items: [
          {
            to: '/docs/01introduction/what-is-chia',
            activeBasePath: 'docs',
            label: 'Docs',
            position: 'left',
          },
          {to: 'https://www.chia.net/', label: 'Chia.net', position: 'left'},
          {to: 'https://github.com/Chia-Network/', label: 'Chia Github', position: 'left'}
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
        copyright: `© Chia Network ${new Date().getFullYear()}, Licensed under the <a href="https://github.com/Chia-Network/chia-docs/blob/main/LICENSE" target="_blank">Apache License, Version 2.0</a> | <a href="https://www.chia.net/terms">Terms</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
