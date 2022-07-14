module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction/what-is-chia',
        'introduction/intro-to-cryptocurrencies',
        'introduction/chia-system-overview',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: ['architecture/p2p-system'],
    },
    {
      type: 'category',
      label: 'Consensus',
      items: [
        'consensus/consensus-intro',
        'consensus/proof-of-space',
        'consensus/vdfs',
        'consensus/challenges',
        'consensus/signage-points-and-infusion-points',
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
        'coin-set-model/what-is-a-coin',
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
      label: 'Networking',
      items: ['networking/networking'],
    },
    {
      type: 'category',
      label: 'Serialization',
      items: ['serialization/serialization'],
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
        'protocol/harvester-protocol',
        'protocol/full-node-protocol',
        'protocol/wallet-protocol',
      ],
    },
    {
      type: 'category',
      label: 'Pool Protocol',
      items: ['pooling/pooling', 'pooling/specification'],
    },
    {
      type: 'category',
      label: 'RPC APIs',
      items: [
        'rpcs/rpcs',
        'rpcs/full-node-api',
        'rpcs/data-layer-rpc-api',
        'rpcs/climate-warehouse-rpc-api',
        'rpcs/did-rpcs',
        'rpcs/nft-rpcs',
      ],
    },
    {
      type: 'category',
      label: 'Command Line Interface',
      items: ['cli/cli', 'cli/data', 'cli/did-cli', 'cli/nft-cli'],
    },
    {
      type: 'category',
      label: 'Python Implementation',
      items: ['python-implementation/python-implementation'],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/references',
        'resources/storage-farming',
        'resources/climate-warehouse-guide',
        'resources/climate-warehouse-guide-testnet',
        'resources/nft-dev-guide',
      ],
    },
    {
      type: 'category',
      label: 'Prefarm Custody',
      items: [
        'prefarm-custody/prefarm-custody-testing',
        'prefarm-custody/prefarm-cold-custodial-wallets',
        'prefarm-custody/custom-testnet',
        'prefarm-custody/testnet10-configuration',
        'prefarm-custody/custody-tool-cli-reference',
      ],
    },
  ],
};
