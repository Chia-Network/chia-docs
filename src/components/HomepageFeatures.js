import Link from '@docusaurus/Link';
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Chia Docs',
    Svg: require('../../static/img/chia-docs-icon.svg').default,
    dest_url: '/docs/quick-start-guide',
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
        Documentation and tutorials for Chialisp, our new Turing complete
        on-chain smart transaction programming language and development
        environment.
      </>
    ),
  },
  {
    title: 'Chia Blockchain Wiki',
    Svg: require('../../static/img/chia_leaf_green.svg').default,
    dest_url: 'https://github.com/Chia-Network/chia-blockchain/wiki',
    description: (
      <>
        Community-run wiki containing instructions and information about best
        practices regarding setup, hardware, farming, plotting, security,
        timelords, and more.
      </>
    ),
  },
  {
    title: 'Cultivation Grant Program',
    Svg: require('../../static/img/grant_icon.svg').default,
    dest_url: 'https://www.chia.net/grants/',
    description: (
      <>
        Our Cultivation Grant Program is designed to enable and expand promising
        new projects that are being built on the Chia blockchain.
      </>
    ),
  },
  {
    title: 'Chia Technical FAQ',
    Svg: require('../../static/img/technical_faq_icon.svg').default,
    dest_url: 'https://github.com/Chia-Network/chia-blockchain/wiki/FAQ',
    description: (
      <>
        Frequently asked questions regarding the Chia blockchain and its
        function.
      </>
    ),
  },
  {
    title: 'Chia Network Inc. FAQ',
    Svg: require('../../static/img/chia_logo.svg').default,
    dest_url: 'https://www.chia.net/faq/',
    description: (
      <>Frequently asked questions about Chia Network Inc., the company.</>
    ),
  },
  {
    title: 'Chia Developer Forums',
    Svg: require('../../static/img/chiadevs-icon.svg').default,
    dest_url: 'https://developers.chia.net/',
    description: (
      <>
        Discuss all things development related: Chialisp, CATs, applications,
        NFTs, and more.
      </>
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
const EmailSvg = require('../../static/img/email_icon.svg').default;

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
            <div className={clsx('col col--4')}>
              <div id="mc_embed_signup">
                <form
                  action="https://chia.us20.list-manage.com/subscribe/post?u=e4d570ef4efb6250ec4a2d825&amp;id=bbcb58034c"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  class="validate"
                  target="_blank"
                  novalidate
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
                      placeholder="email address"
                      required
                      className={styles.emailInput}
                    />
                    <div
                      class="mc-field-group input-group"
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
                            style={{ display: 'none' }}
                            checked
                          />
                          <label for="mce-group[22233]-22233-0">dev</label>
                        </li>
                        <li>
                          <input
                            type="checkbox"
                            value="2"
                            name="group[22233][2]"
                            id="mce-group[22233]-22233-1"
                            style={{ display: 'none' }}
                          />
                          <label for="mce-group[22233]-22233-1">chia</label>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.mceResponses}>
                      <div
                        class="response display_none"
                        id="mce-error-response"
                      ></div>
                      <div
                        class="response display_none"
                        id="mce-success-response"
                      ></div>
                    </div>
                    <div
                      style={{ position: 'absolute', left: '-5000px' }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_e4d570ef4efb6250ec4a2d825_bbcb58034c"
                        tabindex="-1"
                        value=""
                      />
                    </div>
                    <div class="clear">
                      <input
                        type="submit"
                        value="Subscribe"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className={styles.button}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
