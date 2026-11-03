import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import HomepageFeatures from '../components/HomepageFeatures';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroArt} aria-hidden="true">
        <div className={styles.heroRibbon}>
          <div className={styles.heroHolo} />
        </div>
      </div>
      <div className={clsx('container', styles.heroContent)}>
        <p className={clsx('eyebrow', styles.heroEyebrow)}>docs.chia.net</p>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className={clsx('hero__subtitle', styles.heroLede)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--lg', styles.buttonInverse)}
            to="/chia-blockchain/introduction"
          >
            Get Started
          </Link>
          <Link
            className={clsx('button button--lg', styles.buttonInverseOutline)}
            to="/dev-guides-home"
          >
            Dev Guides
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
