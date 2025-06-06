module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'doc',
        id: 'docs-home',
      },
      items: [
        'getting-started/introduction',
        'getting-started/farming-guide',
        'getting-started/wallet-guide',
        'getting-started/using-the-gui',
        'getting-started/bridge-guide',
        {
          type: 'category',
          label: 'Cloud Wallet',
          items: [
            'getting-started/cloud-wallet/getting-started',
            'getting-started/cloud-wallet/faq',
            'getting-started/cloud-wallet/tooltips',
          ]
        } 
      ],
    },
    {
      type: 'category',
      label: 'Advanced User Docs',
      items: [
        'getting-started/installation',
        'getting-started/testnets',
        'getting-started/timelords',
        {
          type: 'category',
          label: 'Plotting',
          items: [
            'plotting/plotting-basics',
            'plotting/plotting-hardware',
            'plotting/plotting-software',
            'plotting/plotting-compression',
            'plotting/plotting-how-to',
            'plotting/ssd-endurance',
            'plotting/moving-plots',
            'plotting/plotting-faq',
          ],
        },
        {
          type: 'category',
          label: 'Farming',
          items: [
            'farming/farming-basics',
            'farming/farming-compressed-plots',
            'farming/farming-many-machines',
            'farming/pool-farming',
            'farming/reference-farming-hardware',
            'farming/farming-considerations',
            'farming/dual-farming-testnet-mainnet',
          ],
        },
        {
          type: 'category',
          label: 'Reference Client',
          items: [
            'reference-client/key-management',
            'reference-client/password-protected-keys',
            'reference-client/headless-node',
            'reference-client/coin-selection',
          ],
        },
        {
          type: 'category',
          label: 'RPC Reference',
          items: [
            'rpc-reference/rpc',
            'rpc-reference/daos',
            'rpc-reference/daemon',
            'rpc-reference/datalayer',
            'rpc-reference/dids',
            'rpc-reference/nfts',
            'rpc-reference/offers',
            'rpc-reference/simulator',
            'rpc-reference/vcs',
            'rpc-reference/wallet',
            'rpc-reference/farmer',
            'rpc-reference/full-node',
            'rpc-reference/harvester',
          ],
        },
        {
          type: 'category',
          label: 'CLI Reference',
          items: [
            'cli-reference/cli',
            'cli-reference/daos',
            'cli-reference/datalayer',
            'cli-reference/dids',
            'cli-reference/nfts',
            'cli-reference/offers',
            'cli-reference/plotters',
            'cli-reference/simulator',
            'cli-reference/vcs',
            'cli-reference/wallet',
            'cli-reference/cat-admin',
            'cli-reference/clawback',
            'cli-reference/custody-tool',
            'cli-reference/asic-hwvdf',
          ],
        },
        {
          type: 'category',
          label: 'WalletConnect',
          items: [
            'walletconnect/general',
            'walletconnect/cats',
            'walletconnect/nfts',
            'walletconnect/dids',
            'walletconnect/offers',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/check-if-things-are-working',
        'troubleshooting/checking-farm-health',
        'troubleshooting/farming-faq',
        'troubleshooting/node-syncing',
        'troubleshooting/logging-reference',
        'troubleshooting/locating-keys',
        'troubleshooting/timelords',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'contribution/using-github',
      ],
    },
    {
      type: 'category',
      label: 'Learn More',
      items: [
        {
          type: 'category',
          label: 'Coin Set Model',
          items: [
            'coin-set-model/intro',
            'coin-set-model/costs',
            'coin-set-model/conditions',
            'coin-set-model/spend-bundles',
            'coin-set-model/addresses',
            'coin-set-model/security',
            'coin-set-model/coin-set-vs-utxo',
            'coin-set-model/coin-set-vs-account',
            'coin-set-model/clvm-vs-evm',
          ],
        },
        {
          type: 'category',
          label: 'Architecture',
          items: [
            'architecture/architecture-overview',
            'architecture/full-nodes',
            'architecture/farmers',
            'architecture/harvesters',
            'architecture/timelords',
            'architecture/pools',
            'architecture/wallets',
            'architecture/mempool',
          ],
        },
        {
          type: 'category',
          label: 'Consensus',
          items: [
            'consensus/consensus-intro',
            'consensus/proof-of-space',
            {
              type: 'category',
              label: 'New Proof Format',
              items: [
                'new-proof-format/new-proof-introduction',
                'new-proof-format/new-proof-plotting-requirements',
                'new-proof-format/new-proof-farming-requirements',
                'new-proof-format/new-proof-timeline',
                'new-proof-format/new-proof-faq',
                'new-proof-format/new-proof-technical-overview',
                'new-proof-format/new-proof-technical-details',
              ],
            },
            'consensus/proof-of-time',
            {
              type: 'category',
              label: 'Chains',
              items: [
                'consensus/challenges',
                'consensus/signage-and-infusion-points',
                'consensus/harvester-algorithm',
                'consensus/multiple-blocks',
                'consensus/three-vdf-chains',
                'consensus/overflow-blocks',
                'consensus/foliage',
                'consensus/epoch-and-difficulty',
              ],
            },
            {
              type: 'category',
              label: 'Block Validation',
              items: [
                'block-validation/block-validation',
                'consensus/light-clients',
                'block-validation/block-format',
                'block-validation/block-rewards',
              ],
            },
            'consensus/timelords',
            'consensus/attacks-and-countermeasures',
            'consensus/analysis',
            'consensus/forks',
          ],
        },
        {
          type: 'category',
          label: 'Keys',
          items: [
            'keys/architecture',
            'keys/keys-and-signatures',
            'keys/plot-ids',
            'keys/plot-public-keys',
          ],
        },
        {
          type: 'category',
          label: 'Protocol',
          items: [
            'protocol/protocol',
            'protocol/networking-protocol',
            'protocol/serialization-protocol',
            'protocol/harvester-protocol',
            'protocol/peer-protocol',
            {
              type: 'category',
              label: 'Pool Protocol',
              items: [
                'protocol/pool/pool-protocol',
                'protocol/pool/pool-protocol-specification',
              ],
            },
            'protocol/wallet-protocol',
          ],
        },
        {
          type: 'category',
          label: 'Green Paper',
          items: [
            'green-paper/green-paper-abstract',
            'green-paper/constants-variables-notation',
            'green-paper/green-paper-introduction',
            'green-paper/longest-chain-protocols',
            'green-paper/rational-attackers',
            'green-paper/hash-and-vdf-chains',
            'green-paper/the-chia-blockchain',
            'green-paper/recovering-from-51-percent-attacks',
            'green-paper/green-paper-references',
            'green-paper/green-paper-appendix',
          ],
        },
        {
          type: 'category',
          label: 'Resources',
          items: [
            'resources/cryptocurrency-intro',
            'resources/references',
            'resources/chia-farming-workload',
            'resources/k-sizes',
            'resources/faq',
            'resources/storage-benchmarks',
            'resources/glossary',
            {
              type: 'category',
              label: 'Timelord Contest',
              collapsible: true,
              collapsed: true,
              link: {
                type: 'generated-index',
                slug: '/resources/timelord-contest',
                title: 'Timelord Contest',
                description:
                  "We’re holding a contest for community members! May 1-May 31, 2024 at 11:59 p.m. EST, you could win a timelord for submitting a winning Chia Academy course. Not the strongest community-created courses for Chia Academy. Courses should be relevant to the Chia community and blockchain and neutral to third-party projects.",
              },
              items: [
                'resources/timelord-contest/timelord-contest',
                'resources/timelord-contest/timelord-contest-rules',
              ],
            },
          ],
        },
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
