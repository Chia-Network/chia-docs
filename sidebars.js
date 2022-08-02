module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'CAT2 Upgrade Guide',
      items: ['cat2/cat2-intro', 'cat2/cat2-snapshot', 'cat2/cat2-issuance'],
    },
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction/what-is-chia',
        'introduction/getting-started',
        'introduction/using-the-client',
        'introduction/chia-concepts',
        'introduction/node-syncing',
      ],
    },
    {
      type: 'category',
      label: 'Plotting',
      items: [
        'plotting/plotting-basics',
        'plotting/plotting-software',
        'plotting/ssd-ram-endurance',
        'plotting/moving-plots',
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
        'farming/farming-best-practices',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: ['architecture/architecture-overview'],
    },
    {
      type: 'category',
      label: 'Consensus',
      items: [
        'consensus/consensus-intro',
        'consensus/proof-of-space',
        'consensus/vdfs',
        'consensus/challenges',
        'consensus/signage-and-infusion-points',
        'consensus/harvester-algorithm',
        'consensus/multiple-blocks',
        'consensus/three-vdf-chains',
        'consensus/overflow-blocks',
        'consensus/foliage',
        'consensus/epochs',
        'consensus/light-clients',
        'consensus/timelords',
        'consensus/attacks-and-countermeasures',
        'consensus/analysis',
      ],
    },
    {
      type: 'category',
      label: 'Coin Set Model',
      items: [
        'coin-set-model/coin-set-intro',
        'coin-set-model/conditions',
        'coin-set-model/spend-bundles',
        'coin-set-model/addresses',
      ],
    },
    {
      type: 'category',
      label: 'Block Validation',
      items: [
        'block-validation/block-validation',
        'block-validation/block-format',
        'block-validation/block-rewards',
      ],
    },
    {
      type: 'category',
      label: 'Mempool',
      items: ['mempool/mempool'],
    },
    {
      type: 'category',
      label: 'Keys',
      items: [
        'keys/keys-and-signatures',
        'keys/plot-ids',
        'keys/plot-public-keys',
        'keys/architecture',
      ],
    },
    {
      type: 'category',
      label: 'Protocol',
      items: [
        'protocol/protocol',
        'protocol/networking',
        'protocol/serialization',
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
      label: 'RPC APIs',
      items: [
        'rpcs/rpcs',
        'rpcs/full-node-api',
        'rpcs/did-rpcs',
        'rpcs/nft-rpcs',
      ],
    },
    {
      type: 'category',
      label: 'Command Line Interface',
      items: ['cli/cli', 'cli/did-cli', 'cli/nft-cli'],
    },
    {
      type: 'category',
      label: 'Client Implementations',
      items: [
        {
          type: 'category',
          label: 'Reference Client',
          items: [
            'client-implementations/reference-client/chia-installation-guide',
            'client-implementations/reference-client/check-if-things-are-working',
            'client-implementations/reference-client/key-management',
            'client-implementations/reference-client/chia-seeder-guide',
            'client-implementations/reference-client/directory-structure',
            'client-implementations/reference-client/freebsd-install',
            'client-implementations/reference-client/openbsd-install',
            'client-implementations/reference-client/logging-reference',
            'client-implementations/reference-client/password-protected-keys',
            'client-implementations/reference-client/raspberry-pi',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/references',
        'resources/storage-farming',
        'resources/faq',
      ],
    },
  ],
};
