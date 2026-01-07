module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Chia Blockchain',
      items: [
        'chia-blockchain/introduction',
        {
          type: 'category',
          label: 'Green Paper',
          items: [
            'chia-blockchain/green-paper/green-paper-abstract',
            'chia-blockchain/green-paper/constants-variables-notation',
            'chia-blockchain/green-paper/green-paper-introduction',
            'chia-blockchain/green-paper/longest-chain-protocols',
            'chia-blockchain/green-paper/rational-attackers',
            'chia-blockchain/green-paper/hash-and-vdf-chains',
            'chia-blockchain/green-paper/the-chia-blockchain',
            'chia-blockchain/green-paper/recovering-from-51-percent-attacks',
            'chia-blockchain/green-paper/green-paper-references',
            'chia-blockchain/green-paper/green-paper-appendix',
          ],
        },
        {
          type: 'category',
          label: 'Architecture',
          items: [
            'chia-blockchain/architecture/architecture-overview',
            'chia-blockchain/architecture/full-nodes',
            'chia-blockchain/architecture/farmers',
            'chia-blockchain/architecture/harvesters',
            'chia-blockchain/architecture/timelords',
            'chia-blockchain/architecture/pools',
            'chia-blockchain/architecture/wallets',
            'chia-blockchain/architecture/light-clients',
            'chia-blockchain/architecture/mempool',
          ],
        },
        {
          type: 'category',
          label: 'Consensus',
          items: [
            'chia-blockchain/consensus/consensus-intro',
            'chia-blockchain/consensus/proof-of-space-1.0',
            {
              type: 'category',
              label: 'Proof of Space 2.0',
              items: [
                'chia-blockchain/consensus/proof-of-space-2.0/new-proof-introduction',
                'chia-blockchain/consensus/proof-of-space-2.0/new-proof-plotting-requirements',
                'chia-blockchain/consensus/proof-of-space-2.0/new-proof-farming-requirements',
                'chia-blockchain/consensus/proof-of-space-2.0/new-proof-timeline',
                'chia-blockchain/consensus/proof-of-space-2.0/new-proof-faq',
                'chia-blockchain/consensus/proof-of-space-2.0/new-proof-technical-overview',
                'chia-blockchain/consensus/proof-of-space-2.0/new-proof-technical-details',
              ],
            },
            'chia-blockchain/consensus/proof-of-time',
            {
              type: 'category',
              label: 'Chains',
              items: [
                'chia-blockchain/consensus/chains/challenges',
                'chia-blockchain/consensus/chains/signage-and-infusion-points',
                'chia-blockchain/consensus/chains/harvester-algorithm',
                'chia-blockchain/consensus/chains/multiple-blocks',
                'chia-blockchain/consensus/chains/three-vdf-chains',
                'chia-blockchain/consensus/chains/overflow-blocks',
                'chia-blockchain/consensus/chains/foliage',
                'chia-blockchain/consensus/chains/epoch-and-difficulty',
              ],
            },
            {
              type: 'category',
              label: 'Block Validation',
              items: [
                'chia-blockchain/consensus/block-validation/block-validation',
                'chia-blockchain/consensus/block-validation/block-format',
                'chia-blockchain/consensus/block-validation/block-rewards',
              ],
            },
            'chia-blockchain/consensus/timelords',
            'chia-blockchain/consensus/attacks-and-countermeasures',
            'chia-blockchain/consensus/analysis',
            'chia-blockchain/consensus/forks',
          ],
        },
        {
          type: 'category',
          label: 'Coin Set Model',
          items: [
            'chia-blockchain/coin-set-model/intro',
            'chia-blockchain/coin-set-model/costs',
            'chia-blockchain/coin-set-model/conditions',
            'chia-blockchain/coin-set-model/spend-bundles',
            'chia-blockchain/coin-set-model/addresses',
            'chia-blockchain/coin-set-model/security',
            'chia-blockchain/coin-set-model/coin-set-vs-utxo',
            'chia-blockchain/coin-set-model/coin-set-vs-account',
            'chia-blockchain/coin-set-model/clvm-vs-evm',
          ],
        },
        {
          type: 'category',
          label: 'Keys',
          items: [
            'chia-blockchain/keys/architecture',
            'chia-blockchain/keys/keys-and-signatures',
            'chia-blockchain/keys/plot-ids',
            'chia-blockchain/keys/plot-public-keys',
          ],
        },
        {
          type: 'category',
          label: 'Protocol',
          items: [
            'chia-blockchain/protocol/protocol',
            'chia-blockchain/protocol/networking-protocol',
            'chia-blockchain/protocol/serialization-protocol',
            'chia-blockchain/protocol/harvester-protocol',
            'chia-blockchain/protocol/peer-protocol',
            {
              type: 'category',
              label: 'Pool Protocol',
              items: [
                'chia-blockchain/protocol/pool/pool-protocol',
                'chia-blockchain/protocol/pool/pool-protocol-specification',
              ],
            },
            'chia-blockchain/protocol/wallet-protocol',
          ],
        },
        {
          type: 'category',
          label: 'Resources',
          items: [
            'chia-blockchain/resources/cryptocurrency-intro',
            'chia-blockchain/resources/references',
            'chia-blockchain/resources/chia-farming-workload',
            'chia-blockchain/resources/k-sizes',
            'chia-blockchain/resources/faq',
            'chia-blockchain/resources/storage-benchmarks',
            'chia-blockchain/resources/glossary',
            {
              type: 'category',
              label: 'Timelord Contest',
              collapsible: true,
              collapsed: true,
              link: {
                type: 'generated-index',
                slug: '/chia-blockchain/resources/timelord-contest',
                title: 'Timelord Contest',
                description:
                  "We’re holding a contest for community members! May 1-May 31, 2024 at 11:59 p.m. EST, you could win a timelord for submitting a winning Chia Academy course. Not the strongest community-created courses for Chia Academy. Courses should be relevant to the Chia community and blockchain and neutral to third-party projects.",
              },
              items: [
                'chia-blockchain/resources/timelord-contest/timelord-contest',
                'chia-blockchain/resources/timelord-contest/timelord-contest-rules',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Chia Cloud Wallet',
      items: [
        'cloud-wallet/getting-started',
        'cloud-wallet/buy-xch',
        'cloud-wallet/faq',
        'cloud-wallet/known-issues',
        'cloud-wallet/tooltips',
      ]
    },
    {
      type: 'category',
      label: 'Chia Signer App',
      items: [
        'chia-signer/getting-started',
        'chia-signer/faq',
      ]
    },
    {
      type: 'category',
      label: 'Chia Reference Client',
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          items: [
            'reference-client/getting-started/farming-guide',
            'reference-client/getting-started/wallet-guide',
            'reference-client/getting-started/using-the-gui',
          ],
        },

        {
          type: 'category',
          label: 'Install and Setup',
          items: [
            'reference-client/install-and-setup/installation',
            'reference-client/install-and-setup/testnets',
            'reference-client/install-and-setup/timelord-install',
            'reference-client/install-and-setup/key-management',
            'reference-client/install-and-setup/password-protected-keys',
            'reference-client/install-and-setup/headless-node',
          ],
        },
        {
          type: 'category',
          label: 'Plotting',
          items: [
            'reference-client/plotting/plotting-basics',
            'reference-client/plotting/plotting-hardware',
            'reference-client/plotting/plotting-software',
            'reference-client/plotting/plotting-compression',
            'reference-client/plotting/plotting-how-to',
            'reference-client/plotting/ssd-endurance',
            'reference-client/plotting/moving-plots',
          ],
        },
        {
          type: 'category',
          label: 'Farming',
          items: [
            'reference-client/farming/farming-basics',
            'reference-client/farming/farming-compressed-plots',
            'reference-client/farming/farming-many-machines',
            'reference-client/farming/pool-farming',
            'reference-client/farming/reference-farming-hardware',
            'reference-client/farming/farming-considerations',
            'reference-client/farming/dual-farming-testnet-mainnet',
          ],
        },
        'reference-client/coin-selection',
        {
          type: 'category',
          label: 'RPC Reference',
          items: [
            'reference-client/rpc-reference/rpc',
            'reference-client/rpc-reference/dao-rpc',
            'reference-client/rpc-reference/daemon-rpc',
            'reference-client/rpc-reference/datalayer-rpc',
            'reference-client/rpc-reference/did-rpc',
            'reference-client/rpc-reference/nft-rpc',
            'reference-client/rpc-reference/offer-rpc',
            'reference-client/rpc-reference/simulator-rpc',
            'reference-client/rpc-reference/vc-rpc',
            'reference-client/rpc-reference/wallet-rpc',
            'reference-client/rpc-reference/farmer-rpc',
            'reference-client/rpc-reference/full-node-rpc',
            'reference-client/rpc-reference/harvester-rpc',
          ],
        },
        {
          type: 'category',
          label: 'CLI Reference',
          items: [
            'reference-client/cli-reference/cli',
            'reference-client/cli-reference/dao-cli',
            'reference-client/cli-reference/datalayer-cli',
            'reference-client/cli-reference/did-cli',
            'reference-client/cli-reference/nft-cli',
            'reference-client/cli-reference/offer-cli',
            'reference-client/cli-reference/plotter-cli',
            'reference-client/cli-reference/simulator-cli',
            'reference-client/cli-reference/vc-cli',
            'reference-client/cli-reference/wallet-cli',
            'reference-client/cli-reference/cat-admin-cli',
            'reference-client/cli-reference/clawback-cli',
            'reference-client/cli-reference/custody-tool-cli',
            'reference-client/cli-reference/asic-hwvdf-cli',
          ],
        },
        {
          type: 'category',
          label: 'WalletConnect',
          items: [
            'reference-client/walletconnect/walletconnect',
            'reference-client/walletconnect/cat-wc',
            'reference-client/walletconnect/nft-wc',
            'reference-client/walletconnect/did-wc',
            'reference-client/walletconnect/offer-wc',
          ],
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          items: [
            'reference-client/troubleshooting/check-if-things-are-working',
            'reference-client/troubleshooting/checking-farm-health',
            'reference-client/troubleshooting/farming-faq',
            'reference-client/troubleshooting/plotting-faq',
            'reference-client/troubleshooting/node-syncing',
            'reference-client/troubleshooting/logging-reference',
            'reference-client/troubleshooting/locating-keys',
            'reference-client/troubleshooting/timelords',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'contribution/using-github',
      ],
    },
  ],
  guides: [
    {
      type: 'category',
      label: 'Crash Course',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'dev-guides-home',
      },
      items: [
        'guides/crash-course/introduction',
        'guides/crash-course/intro-to-chialisp',
        'guides/crash-course/smart-coins',
        'guides/crash-course/signatures',
        'guides/crash-course/state',
        'guides/crash-course/inner-puzzles',
        'guides/crash-course/cats-offers-nfts',
        'guides/crash-course/chialisp-and-typescript',
      ],
    },
    {
      type: 'category',
      label: 'Primitives',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/guides/primitives',
        title: 'Chia Primitives',
        description:
          "These guides will guide you through interacting with the various Chia primitives.",
      },
      items: [
        {
          type: 'category',
          label: 'NFT Guide',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'generated-index',
            slug: '/guides/nft-developer-guide',
            title: 'NFT Developer Guide',
            description:
              "This tutorial will guide you through the process of creating DIDs that conform to Chia's DID standard, as well as minting NFTs that adhere to Chia's NFT standard.",
          },
          items: [
            'guides/nft/nft-intro',
            'guides/nft/nft-cli',
            'guides/nft/nft-rpc',
            'guides/nft/nft-bulk-mint',
          ],
        },
        {
          type: 'category',
          label: 'CAT Guide',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'generated-index',
            slug: '/guides/cat-developer-guide',
            title: 'CAT Developer Guide',
            description:
              "These guides will guide you through the process of creating CATs that conform to Chia's CAT standard.",
          },
          items: [
            {
              'CAT2 Upgrade': [
                'guides/cat/cat2-upgrade/cat2-intro',
                'guides/cat/cat2-upgrade/cat2-snapshot',
                'guides/cat/cat2-upgrade/cat2-issuance',
              ],
            },
            'guides/cat/cat-creation-tutorial',
            'guides/cat/cr-cat-tutorial',
          ],
        },
        {
          type: 'category',
          label: 'DataLayer™',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'generated-index',
            slug: '/guides/datalayer-developer-guide',
            title: 'DataLayer™ Developer Guide',
            description:
              "These guides will guide you through interacting with DataLayer™.",
          },
          items: [
            'guides/datalayer/datalayer-user-guide',
            'guides/datalayer/datalayer-permissions',
          ],
        },
        {
          type: 'category',
          label: 'Clawback',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'generated-index',
            slug: '/guides/clawback-developer-guide',
            title: 'Clawback Developer Guide',
            description:
              "These guides will guide you through interacting with Clawback.",
          },
          items: [
            'guides/clawback/clawback-user-guide',
            'guides/clawback/clawback-primitive-guide',
          ],
        },
        {
          type: 'category',
          label: 'Offers',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'generated-index',
            slug: '/guides/offers-developer-guide',
            title: 'Offers Developer Guide',
            description:
              "These guides will guide you through interacting with Offers.",
          },
          items: ['guides/tutorials/offers-gui', 'guides/tutorials/offers-cli'],
        },
        {
          type: 'category',
          label: 'DAOs',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'generated-index',
            slug: '/guides/daos-developer-guide',
            title: 'DAOs Developer Guide',
            description:
              "These guides will guide you through interacting with DAOs.",
          },
          items: ['guides/dao/dao-cli-guide', 'guides/dao/dao-known-issues'],
        },
        {
          type: 'category',
          label: 'Gaming',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'generated-index',
            slug: '/guides/gaming',
            title: 'Gaming',
            description:
              "These guides will guide you through developing and testing gaming implementations on Chia.",
          },
          items: [
            'guides/chia-gaming/gaming-developers-guide',
            'guides/chia-gaming/gaming-users-guide',
            {
              type: 'category',
              label: 'Game Rules',
              collapsible: true,
              collapsed: true,
              items: [
                'guides/chia-gaming/gaming-california-poker-rules',
                'guides/chia-gaming/gaming-space-poker-rules',
                'guides/chia-gaming/gaming-krunk-rules',
              ],
            },
            'guides/chia-gaming/gaming-troubleshooting',
            'guides/chia-gaming/gaming-known-issues',
            {
              type: 'category',
              label: 'Gaming RFP',
              collapsible: true,
              collapsed: true,
              items: [
                'guides/chia-gaming/gaming-partner-rfp',
                'guides/chia-gaming/gaming-partner-rfp-qa',
              ],
            },
          ],
        },
        'guides/verifiable-credentials-guide',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/guides/tutorials',
        title: 'Tutorials',
        description:
          "These tutorials overview interacting with the Chia client.",
      },
      items: [
        'guides/tutorials/application-structure',
        'guides/tutorials/custom-puzzle-lock',
        {
          type: 'category',
          label: 'Custody Tool',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'generated-index',
            slug: '/guides/custody-tool',
            title: 'Custody Tool',
            description:
              "These documents overview the Chia internal custody tool, how to use it, and how to audit the pre-farm.",
          },
          items: [
            'guides/custody/custody-tool-description',
            'guides/custody/custody-tool-user-guide',
            'guides/custody/prefarm-audit',
          ],
        },
        'guides/observer-wallet-guide',
        'guides/tutorials/coin-spend-rpc',
        'guides/seeder-user-guide',
        'guides/simulator-user-guide',
        'guides/rpc-validation-tool',
        {
          type: 'category',
          label: 'WalletConnect',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'generated-index',
            slug: '/guides/walletconnect',
            title: 'WalletConnect',
            description:
              "These documents overview WalletConnect integration, how to use it and how to develop upon it.",
          },
          items: [
            'guides/walletconnect/walletconnect-user-guide',
            'guides/walletconnect/walletconnect-developer-guide',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Video Series',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/guides/video-series',
        title: 'Video Series',
        description:
          "This video series introduces you to Chia and overviews how to develop in ChiaLisp.",
      },
      items: [
        'guides/tutorials/video-series/why-chia-is-great',
        'guides/tutorials/video-series/developing-applications',
        'guides/tutorials/video-series/tools-and-setup',
        'guides/tutorials/video-series/programming-chialisp',
        'guides/tutorials/video-series/coin-lifecycle-and-testing',
        'guides/tutorials/video-series/singleton-contracts',
        'guides/tutorials/video-series/state-coins-announcements',
        'guides/tutorials/video-series/security-arguments-signing',
        'guides/tutorials/video-series/announcements-oracles',
        'guides/tutorials/video-series/single-issuance-cat',
        'guides/tutorials/video-series/multiple-issuance-cat',
      ],
    },
  ],
  academy: [
    {
      type: 'category',
      label: 'Chia Academy Intro',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: '/academy-intro',
        title: 'Chia Academy Intro',
        description:
          'Welcome to Chia Academy, the scholarly hub for delving deep into Chia blockchain technology. In an age characterized by rapid digital transformation, this institution offers a comprehensive exploration of the Chia blockchain, dissecting its technical intricacies, real-world applications, and the nuances of its secure data handling. The Chia blockchain, created by Bram Cohen, stands out from traditional cryptocurrencies with its unique Proof of Space and Time (PoST) model, which contrasts with the energy-intensive Proof of Work model (PoW) used by Bitcoin. This innovation is notable for its eco-friendly approach to blockchain. Check out the pages below to start your journey!',
      },
      items: [
        'academy/academy-intro/academy-home',
        'academy/academy-intro/academy-overview',
      ],
    },
    {
      type: 'category',
      label: 'Chialisp Overview',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/academy/chialisp',
        title: 'Chialisp Overview',
        description:
          'These lessons cover the basics of Chialisp, the smart coin language used on the Chia blockchain.',
      },
      items: [
        'academy/chialisp/chialisp-intro',
        'academy/chialisp/chialisp-smart-coin',
        'academy/chialisp/chialisp-signatures',
        'academy/chialisp/chialisp-inner-puzzle',
      ],
    },
    {
      type: 'category',
      label: 'Plotting & Farming',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/academy/plotting-farming',
        title: 'Plotting & Farming',
        description:
          'These lessons cover the basics of Plotting and Farming. How challenges are distributed and processed, and how pooling and plot filters benefit the network. At the end, we include a tutorial on creating your first plot.',
      },
      items: [
        'academy/plotting-farming/farming-overview',
        'academy/plotting-farming/challenges-plot-filters',
        'academy/plotting-farming/pools',
        'academy/plotting-farming/first-plot',
      ],
    },
    {
      type: 'category',
      label: 'Blockchain Basics Overview',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/academy/blockchain-basics',
        title: 'Blockchain Basics Overview',
        description:
          'These lessons cover the basics of the Chia Blockchain including consensus, timelords, block formation, the coin-set model, and security.',
      },
      items: [
        'academy/blockchain-basics/consensus-basics',
        'academy/blockchain-basics/timelord-basics',
        'academy/blockchain-basics/block-formation-basics',
        'academy/blockchain-basics/coinset-basics',
        'academy/blockchain-basics/security-basics',
      ],
    },
    {
      type: 'category',
      label: 'Primitives',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/academy/primitives',
        title: 'Primitives',
        description:
          'These lessons serve as an overview of the natively supported features available on the Chia Blockchain.',
      },
      items: [
        'academy/primitives/primitives-overview',
        'academy/primitives/academy-nft',
        'academy/primitives/academy-did',
        'academy/primitives/academy-cat',
        'academy/primitives/academy-offers',
      ],
    },
  ],
};
