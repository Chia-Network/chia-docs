module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/introduction',
        'getting-started/installation',
        'getting-started/using-the-gui',
        'getting-started/cryptocurrency-intro',
      ],
    },
    {
      type: 'category',
      label: 'Plotting',
      items: [
        'plotting/plotting-basics',
        'plotting/plotting-software',
        'plotting/k-sizes',
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
        'farming/farming-many-machines',
        'farming/pool-farming',
        'farming/checking-farm-health',
        'farming/reference-farming-hardware',
        'farming/farming-considerations',
        'farming/dual-farming-testnet-mainnet',
        'farming/farming-faq',
      ],
    },
    {
      type: 'category',
      label: 'RPC Reference',
      items: [
        'rpc-reference/rpc',
        'rpc-reference/datalayer',
        'rpc-reference/dids',
        'rpc-reference/farmer',
        'rpc-reference/full-node',
        'rpc-reference/harvester',
        'rpc-reference/nfts',
        'rpc-reference/offers',
        'rpc-reference/simulator',
        'rpc-reference/wallet',
      ],
    },
    {
      type: 'category',
      label: 'CLI Reference',
      items: [
        'cli-reference/cat-admin',
        'cli-reference/cli',
        'cli-reference/clawback',
        'cli-reference/custody-tool',
        'cli-reference/datalayer',
        'cli-reference/dids',
        'cli-reference/nfts',
        'cli-reference/offers',
        'cli-reference/simulator',
        'cli-reference/wallet',
      ],
    },
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
      label: 'Reference Client',
      items: [
        'reference-client/check-if-things-are-working',
        'reference-client/node-syncing',
        'reference-client/key-management',
        'reference-client/logging-reference',
        'reference-client/password-protected-keys',
        'reference-client/headless-node',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/references',
        'resources/chia-farming-workload',
        'resources/faq',
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
        type: 'generated-index',
        slug: '/guides/crash-course/introduction',
        title: 'Chia Introduction',
        description:
          'This course is designed to give you an end-to-end introduction to Chia.',
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
      label: 'Chialisp Primer',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/guides/chialisp-primer',
        title: 'Chialisp Primer',
        description:
          'This guide will teach you the basics of Chialisp, a smart coin language used on the Chia blockchain. You will learn the skills required to write basic programs that can dictate how and when coins (including XCH) can be spent.',
      },
      items: [
        'guides/chialisp-primer/intro',
        'guides/chialisp-primer/using-modules',
        'guides/chialisp-primer/testnet-setup',
        'guides/chialisp-primer/first-smart-coin',
        'guides/chialisp-primer/bls-signatures',
      ],
    },
    {
      type: 'category',
      label: 'Chialisp Concepts',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/guides/chialisp-concepts',
        title: 'Chialisp Concepts',
        description:
          'This guide introduces some key Chialisp concepts. Understanding these concepts will enable you to write Chialisp programs more easily.',
      },
      items: [
        'guides/chialisp-concepts/currying',
        'guides/chialisp-concepts/inner-puzzles',
        'guides/chialisp-concepts/condition-morphing',
      ],
    },
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
        'guides/cat/cat-creation-tutorial',
        {
          type: 'category',
          label: 'CAT2 Upgrade',
          items: [
            'guides/cat/cat2-upgrade/cat2-intro',
            'guides/cat/cat2-upgrade/cat2-snapshot',
            'guides/cat/cat2-upgrade/cat2-issuance',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Custody Tool',
      collapsible: true,
      collapsed: true,
      items: [
        'guides/custody/custody-tool-description',
        'guides/custody/custody-tool-user-guide',
      ],
    },
    {
      type: 'category',
      label: 'WalletConnect',
      collapsible: true,
      collapsed: true,
      items: [
        'guides/wallet_connect/walletconnect-user-guide',
        'guides/wallet_connect/walletconnect-developer-guide',
      ],
    },
    'guides/datalayer-user-guide',
    'guides/simulator-user-guide',
    'guides/seeder-user-guide',
    'guides/clawback-primitive-guide',
    {
      type: 'category',
      label: 'Tutorials',
      collapsible: true,
      collapsed: true,
      items: [
        {
          'Video Series': [
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
        'guides/tutorials/custom-puzzle-lock',
        'guides/tutorials/coin-spend-rpc',
        'guides/tutorials/application-structure',
        'guides/tutorials/offers-gui',
        'guides/tutorials/offers-cli',
      ],
    },
  ],
};
