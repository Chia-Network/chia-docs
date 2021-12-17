import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Secure',
    Svg: require('../../static/img/shield-lock.svg').default,
    description: (
      <>
        Chia is the most decentralized blockchain ever with approximately 350,000 nodes employing the first new Nakamoto Consensus since 2009. The Chialisp on chain programming environment is fully featured while being far more auditable, and secure.
      </>
    ),
  },
  {
    title: 'Compliant',
    Svg: require('../../static/img/check-badge.svg').default,
    description: (
      <>
      Chia believes that in order to deliver on the promise of the next generation blockchains, we must be regulatory compliant. It is our stated goal to become a public reporting company subject to the Securities Act of 1933. Chia's native currency, XCH or chia, has never been sold by Chia Network for money and we believe it will be regulated as a commodity by the CFTC.
      </>
    ),
  },
  {
    title: 'Sustainable',
    Svg: require('../../static/img/recycle.svg').default,
    description: (
      <>
      With its innovative Proof Of Space and Time consensus, Chia uses 0.16% of the annual energy consumption of Bitcoin, and 0.36% of Ethereum. Chia is part of the Circular Drive Initiative that reduces e-waste through the secure reuse of storage, promoting the second use of hard drives for Chia farming.
      </>
    ),
  },
  {
    title: 'Sustainable',
    Svg: require('../../static/img/recycle.svg').default,
    description: (
      <>
      With its innovative Proof Of Space and Time consensus, Chia uses 0.16% of the annual energy consumption of Bitcoin, and 0.36% of Ethereum. Chia is part of the Circular Drive Initiative that reduces e-waste through the secure reuse of storage, promoting the second use of hard drives for Chia farming.
      </>
    ),
  },
  {
    title: 'Sustainable',
    Svg: require('../../static/img/recycle.svg').default,
    description: (
      <>
      With its innovative Proof Of Space and Time consensus, Chia uses 0.16% of the annual energy consumption of Bitcoin, and 0.36% of Ethereum. Chia is part of the Circular Drive Initiative that reduces e-waste through the secure reuse of storage, promoting the second use of hard drives for Chia farming.
      </>
    ),
  },
  {
    title: 'Sustainable',
    Svg: require('../../static/img/recycle.svg').default,
    description: (
      <>
      With its innovative Proof Of Space and Time consensus, Chia uses 0.16% of the annual energy consumption of Bitcoin, and 0.36% of Ethereum. Chia is part of the Circular Drive Initiative that reduces e-waste through the secure reuse of storage, promoting the second use of hard drives for Chia farming.
      </>
    ),
  },
  {
    title: 'Sustainable',
    Svg: require('../../static/img/recycle.svg').default,
    description: (
      <>
      With its innovative Proof Of Space and Time consensus, Chia uses 0.16% of the annual energy consumption of Bitcoin, and 0.36% of Ethereum. Chia is part of the Circular Drive Initiative that reduces e-waste through the secure reuse of storage, promoting the second use of hard drives for Chia farming.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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
