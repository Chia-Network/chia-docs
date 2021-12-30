import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
      <h1 className="hero__title"><Translate id="banner.title">{siteConfig.title}</Translate></h1>
      <p className="hero__subtitle"><Translate id="banner.content">{siteConfig.tagline}</Translate></p>
{/*    
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/01introduction/what-is-chia">
            <Translate id="banner.start.button">
              Start Learning about Chia ⏱️
            </Translate>
          </Link>
        </div>
*/}
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title=
      {
        translate({
          id:"index.title",
          message:"{siteConfig.title}"
        })
      }
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
