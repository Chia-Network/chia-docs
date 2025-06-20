import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Chia Docs',
    Svg: require('@site/static/svg/chia-docs-icon.svg').default,
    dest_url: '/docs-home',
    description: (
      <>
        Documentation regarding the Chia blockchain, consensus, and protocols.
      </>
    ),
  },
  {
    title: 'Chialisp',
    Svg: require('@site/static/svg/chialisp-icon.svg').default,
    dest_url: 'https://chialisp.com',
    description: (
      <>
        Documentation and tutorials for Chialisp, our new Turing complete
        on-chain smart transaction programming language and development
        environment.
      </>
    ),
  },
  {
    title: 'Chia Network Inc. FAQ',
    Svg: require('@site/static/svg/chia-logo.svg').default,
    dest_url: 'https://www.chia.net/faq/',
    description: (
      <>Frequently asked questions about Chia Network Inc., the company.</>
    ),
  },
  {
    title: 'Chia Discord Server',
    Svg: require('@site/static/svg/discord-icon.svg').default,
    dest_url: 'https://discord.gg/chia',
    description: (
      <>Chia Official discord server, join for support and to interact with the community.</>
    ),
  },
  {
    title: 'Chia Academy',
    Svg: require('@site/static/svg/academy-logo.svg').default,
    dest_url: 'https://docs.chia.net/academy-home/',
    description: (
      <>Learn about the Chia Blockchain, its consensus, primitives, on-chain language, and more!</>
    ),
  },
];

function Feature({ Svg, title, description, dest_url }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Link href={dest_url}>
          <Svg className={styles.featureSvg} alt={title} />
        </Link>
      </div>
      <div className="text--center padding-horiz--md feature-item">
        <h3>
          <Link href={dest_url}>{title}</Link>
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
const EmailSvg = require('@site/static/svg/email-icon.svg').default;

export default function HomepageFeatures() {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
            {/* Below is the mail chimp signup */}
            {/*
            <div className={clsx('col col--4')}>
              <div id="mc_embed_signup">
                <form
                  action="https://chia.us20.list-manage.com/subscribe/post?u=e4d570ef4efb6250ec4a2d825&amp;id=bbcb58034c"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_blank"
                  noValidate
                >
                  <div id="mc_embed_signup_scroll">
                    <EmailSvg
                      className={styles.featureSvg}
                      alt="Developer Mailing List"
                    />
                    <h3>Developer Mailing List</h3>
                    <input
                      type="email"
                      name="EMAIL"
                      id="mce-EMAIL"
                      placeholder="Email address"
                      required
                      className={styles.emailInput}
                    />
                    <input
                      type="submit"
                      value="Subscribe"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className={styles.button}
                    />
                    <div
                      className="mc-field-group input-group"
                      style={{ display: 'none' }}
                    >
                      <strong>Interest </strong>
                      <ul>
                        <li>
                          <input
                            type="checkbox"
                            value="1"
                            name="group[22233][1]"
                            id="mce-group[22233]-22233-0"
                            style={{
                              display: 'none',
                            }}
                            checked
                          />
                          <label htmlFor="mce-group[22233]-22233-0">dev</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            value="2"
                            name="group[22233][2]"
                            id="mce-group[22233]-22233-1"
                            style={{
                              display: 'none',
                            }}
                          />
                          <label htmlFor="mce-group[22233]-22233-1">chia</label>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.mceResponses}>
                      <div
                        className="response display_none"
                        id="mce-error-response"
                      ></div>
                      <div
                        className="response display_none"
                        id="mce-success-response"
                      ></div>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        left: '-5000px',
                      }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_e4d570ef4efb6250ec4a2d825_bbcb58034c"
                        tabIndex={-1}
                        value=""
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            */}
          </div>
        </div>
      </section>
    </>
  );
}