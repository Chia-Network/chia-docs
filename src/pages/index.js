import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';
import HomepageFeatures from '../components/HomepageFeatures';
import RibbonHero from '../components/RibbonHero';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <RibbonHero
        eyebrow="docs.chia.net"
        title={siteConfig.title}
        lede={siteConfig.tagline}
        actions={[
          { label: 'Get Started', to: '/chia-blockchain/introduction' },
          { label: 'Dev Guides', to: '/dev-guides-home' },
        ]}
      />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
