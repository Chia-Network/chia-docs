import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Chia Docs',
    Svg: require('../../static/img/chia-docs-icon.svg').default,
    dest_url: '/docs/01introduction/what-is-chia',
    description: (
      <>
        Documentation regarding the Chia blockchain, consensus, and protocols.
      </>
    ),
  },
  {
    title: 'Chialisp',
    Svg: require('../../static/img/chialisp-icon.svg').default,
    dest_url: 'https://chialisp.com',
    description: (
      <>
      Documentation and tutorials for Chialisp, our new Turing complete on-chain smart transaction programming language and development environment.
      </>
      
    ),
  },
  {
    title: 'Chia Blockchain Wiki',
    Svg: require('../../static/img/chia_leaf_green.svg').default,
    dest_url: 'https://github.com/Chia-Network/chia-blockchain/wiki',
    description: (
      <>
      Community-run wiki containing instructions and information about best practices regarding setup, hardware, farming, plotting, security, timelords, and more.
      </>
    ),
  },
  {
    title: 'Cultivation Grant Program',
    Svg: require('../../static/img/grant_icon.svg').default,
    dest_url: 'https://www.chia.net/grants/',
    description: (
      <>
      Our Cultivation Grant Program is designed to enable and expand promising new projects that are being built on the Chia blockchain.
      </>
    ),
  },
  {
    title: 'Chia Network Company FAQ',
    Svg: require('../../static/img/chia_logo.svg').default,
    dest_url: 'https://www.chia.net/faq/',
    description: (
      <>
      Frequently asked questions about Chia Network, LLC, the company.
      </>
    ),
  },
  {
    title: 'Chia Technical FAQ',
    Svg: require('../../static/img/technical_faq_icon.svg').default,
    dest_url: 'https://github.com/Chia-Network/chia-blockchain/wiki/FAQ',
    description: (
      <>
      Frequently asked questions regarding the Chia blockchain and its function.
      </>
    ),
  },
];

function Feature({Svg, title, description, dest_url}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={dest_url}><Svg className={styles.featureSvg} alt={title} /></a>
      </div>
      <div className="text--center padding-horiz--md feature-item">
        <h3><a href={dest_url}>{title}</a></h3>
        <p>{description}</p>
        
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
