import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    title: translate({
      id: "feature1",
      message: "Chia Docs"
    }),
    Svg: require('../../static/img/chia-docs-icon.svg').default,
    dest_url: '/docs/01introduction/what-is-chia',
    description: translate({
      id: "detail1",
      message: "Documentation regarding the Chia blockchain, consensus, and protocols."
    }),
  },
  {
    title: translate({
      id: "feature2",
      message: "Chialisp"
    }),
    Svg: require('../../static/img/chialisp-icon.svg').default,
    dest_url: 'https://chialisp.com',
    description: translate({
      id: "detail2",
      message: "Documentation and tutorials for Chialisp, our new Turing complete on-chain smart transaction programming language and development environment."
    }),
  },
  {
    title: translate({
      id: "feature3",
      message: "Chia Blockchain Wiki"
    }),
    Svg: require('../../static/img/chia_leaf_green.svg').default,
    dest_url: 'https://github.com/Chia-Network/chia-blockchain/wiki',
    description:translate({
      id: "detail3",
      message: "Community-run wiki containing instructions and information about best practices regarding setup, hardware, farming, plotting, security, timelords, and more."
    }),
  },
  {
    title: translate({
      id: "feature4",
      message: "Cultivation Grant Program"
    }),
    Svg: require('../../static/img/grant_icon.svg').default,
    dest_url: 'https://www.chia.net/grants/',
    description: translate({
      id: "detail4",
      message: "Our Cultivation Grant Program is designed to enable and expand promising new projects that are being built on the Chia blockchain."
    }),
  },
  {
    title: translate({
      id: "feature5",
      message: "Chia Technical FAQ"
    }),
    Svg: require('../../static/img/technical_faq_icon.svg').default,
    dest_url: 'https://github.com/Chia-Network/chia-blockchain/wiki/FAQ',
    description: translate({
      id: "detail5",
      message: "Frequently asked questions regarding the Chia blockchain and its function."
    }),
  },
  {
    title: translate({
      id: "feature6",
      message: "Chia Network Inc. FAQ"
    }),
    Svg: require('../../static/img/chia_logo.svg').default,
    dest_url: 'https://www.chia.net/faq/',
    description: translate({
      id: "detail6",
      message: "Frequently asked questions about Chia Network Inc., the company."
    }),
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
