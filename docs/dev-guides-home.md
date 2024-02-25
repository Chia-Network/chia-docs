---
title: Dev Guides Home
slug: /dev-guides-home
---

import DevChia from '@site/static/img/home_pages/dev_on_chia.png';
import ChialispIntro from '@site/static/img/home_pages/chialisp_intro.png';
import SmartCoins from '@site/static/img/home_pages/smart_coins.png';
import Signatures from '@site/static/img/home_pages/signatures.png';
import State from '@site/static/img/home_pages/state.png';
import InnerPuzzles from '@site/static/img/home_pages/inner_puzzles.png';
import CatsOffersNfts from '@site/static/img/home_pages/cats_offers_nfts.png';
import ChialispTypescript from '@site/static/img/home_pages/chialisp_typescript.png';

import Nfts from '@site/static/img/home_pages/nfts.png';
import Cats from '@site/static/img/home_pages/cats.png';
import DataLayer from '@site/static/img/home_pages/datalayer.png';
import Clawback from '@site/static/img/home_pages/clawbacks.png';
import Offers from '@site/static/img/home_pages/offers.png';
import Daos from '@site/static/img/home_pages/daos.png';
import Vcs from '@site/static/img/home_pages/vcs.png';

import AppStructure from '@site/static/img/home_pages/app_structure.png';
import PuzzleLock from '@site/static/img/home_pages/custom_puzzle_lock.png';
import CustodyTool from '@site/static/img/home_pages/custody_tool.png';
import RpcCoinSpend from '@site/static/img/home_pages/rpc_coin_spends.png';
import SeederGuide from '@site/static/img/home_pages/seeder_guide.png';
import SimulatorGuide from '@site/static/img/home_pages/simulator_guide.png';
import WalletConnect from '@site/static/img/home_pages/wallet_connect.png';

import GreatChia from '@site/static/img/home_pages/chia_great.png';
import AppDev from '@site/static/img/home_pages/chia_dev.png';
import ToolsSetup from '@site/static/img/home_pages/env_setup.png';
import ProgrammingClsp from '@site/static/img/home_pages/clsp_programming.png';
import CoinLifecycle from '@site/static/img/home_pages/coin_lifecycle.png';
import SingletonContracts from '@site/static/img/home_pages/singleton_contracts.png';
import StateCoinsAnnounce from '@site/static/img/home_pages/state_coins_announce.png';
import SecArgSign from '@site/static/img/home_pages/sec_args_sigs.png';
import AnnounceOracle from '@site/static/img/home_pages/announcements_oracles.png';
import SiCats from '@site/static/img/home_pages/si_cat.png';
import MiCats from '@site/static/img/home_pages/mi_cat.png';

Welcome to the Chia Network Developer Guides hub! Your gateway to mastering the intricacies of Chia's blockchain and smart transaction platform. Whether you're a seasoned developer, a blockchain enthusiast, or just stepping into the world of decentralized technologies, our documentation is crafted to empower you with knowledge and tools for navigating the Chia ecosystem. From mastering the basics of Chialisp programming to exploring advanced primitives, our guides cover a spectrum of topics designed to elevate your development skills.  

---

## Chia Crash Course

Embark on a swift journey into Chia Network's Crash Course for developers. Start with an Intro to Developing on Chia, grasp the fundamentals of Chialisp, explore the world of Smart Coins, and understand the intricacies of Signatures, State, Inner Puzzles, and Primitives.  

<section class="carousel">
  <c-ol class="carousel-inner">
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/crash-course/introduction/'>
          <div class="card">
            <div class="card__image">
              <img src={DevChia} alt='Intro to Developing on Chia' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/crash-course/intro-to-chialisp/'>
          <div class="card">
            <div class="card__image">
              <img src={ChialispIntro} alt='Intro to Chialisp' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/crash-course/smart-coins/'>
          <div class="card">
            <div class="card__image">
              <img src={SmartCoins} alt='Intro to Smart Coins' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/crash-course/signatures/'>
          <div class="card">
            <div class="card__image">
              <img src={Signatures} alt='Intro to Signatures' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/crash-course/state/'>
          <div class="card">
            <div class="card__image">
              <img src={State} alt='Intro to State' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/crash-course/inner-puzzles/'>
          <div class="card">
            <div class="card__image">
              <img src={InnerPuzzles} alt='Intro to Inner Puzzles' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/crash-course/cats-offers-nfts/'>
          <div class="card">
            <div class="card__image">
              <img src={CatsOffersNfts} alt='Intro to Cats, Offers, and NFTs' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/chialisp-and-typescript/'>
          <div class="card">
            <div class="card__image">
              <img src={ChialispTypescript} alt='Chialisp and Typescript' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
  </c-ol>
</section>

---

## Primitives

Explore the core building blocks of Chia development in the Primitives section. Unlock the potential of NFTs, embrace the versatility of CATs (Colored Coins), navigate the intricacies of Offers, leverage the DataLayer for efficient data management, implement Clawback mechanisms, understand the dynamics of DAOs, and secure your applications with Verifiable Credentials. These primitives are the foundation for creating robust and innovative solutions on the Chia Network.  

<section class="carousel">
  <c-ol class="carousel-inner">
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/nft-developer-guide/'>
          <div class="card">
            <div class="card__image">
              <img src={Nfts} alt='NFTs'/>
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/cat-developer-guide/'>
          <div class="card">
            <div class="card__image">
              <img src={Cats} alt='CATs' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/datalayer-developer-guide/'>
          <div class="card">
            <div class="card__image">
              <img src={DataLayer} alt='DataLayer™' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/clawback-developer-guide/'>
          <div class="card">
            <div class="card__image">
              <img src={Clawback} alt='Clawback' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/offers-developer-guide/'>
          <div class="card">
            <div class="card__image">
              <img src={Offers} alt='Offers' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/daos-developer-guide/'>
          <div class="card">
            <div class="card__image">
              <img src={Daos} alt='DAOs' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/verifiable-credentials-guide'>
          <div class="card">
            <div class="card__image">
              <img src={Vcs} alt='Verifiable Credentials' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
  </c-ol>
</section>

---

## Tutorials

Immerse yourself in Chia Network's Tutorials section for developers. Understand the intricacies of Application Structure, explore the art of Custom Puzzle Locks, wield the power of the Custody Tool, master Coin Spending via RPC, harness the capabilities of the Seeder and Simulator with our user guides, and gain insights into the WalletConnect framework.  

<section class="carousel">
  <c-ol class="carousel-inner">
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/application-structure-tutorial/'>
          <div class="card">
            <div class="card__image">
              <img src={AppStructure} alt='Application Structure' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/custom-puzzle-lock-tutorial/'>
          <div class="card">
            <div class="card__image">
              <img src={PuzzleLock} alt='Custom Puzzle Lock' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/custody-tool/'>
          <div class="card">
            <div class="card__image">
              <img src={CustodyTool} alt='Custody Tool' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/coin-spend-rpc-tutorial/'>
          <div class="card">
            <div class="card__image">
              <img src={RpcCoinSpend} alt='RPC Coin Spend' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/seeder-user-guide/'>
          <div class="card">
            <div class="card__image">
              <img src={SeederGuide} alt='Seeder User Guide' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/simulator-user-guide/'>
          <div class="card">
            <div class="card__image">
              <img src={SimulatorGuide} alt='Simulator User Guide' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/walletconnect/'>
          <div class="card">
            <div class="card__image">
              <img src={WalletConnect} alt='WalletConnect' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
  </c-ol>
</section>

---

## Video Series

Dive into the Video Series of Chia Network's Developer Guides for a dynamic learning experience. Discover why Chia is great, explore the essentials of developing Chia applications, set up your tools efficiently, delve into programming in Chialisp, understand the intricacies of the Coin Lifecycle, implement Singleton Contracts, master the dynamics of State, Coins, and Announcements, ensure security with insights into Arguments and Signing, explore Announcements and Oracles, and harness the potential of CATs (Chia Asset Tokens).  

<section class="carousel">
  <c-ol class="carousel-inner">
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/why-chia-is-great-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={GreatChia} alt='Why Chia is Great' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/developing-applications-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={AppDev} alt='Developing Chia Applications' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/tools-and-setup-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={ToolsSetup} alt='Tools and Setup' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/programming-chialisp-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={ProgrammingClsp} alt='Programming in ChiaLisp' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/coin-lifecycle-and-testing-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={CoinLifecycle} alt='Coin Lifecycle' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/singleton-contracts-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={SingletonContracts} alt='Singleton Contracts' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/state-coins-announcements-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={StateCoinsAnnounce} alt='State, Coins, and Announcements' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/security-arguments-signing-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={SecArgSign} alt='Security, Arguments, and Signing' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/announcements-oracles-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={AnnounceOracle} alt='Announcements and Oracles' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/single-issuance-cat-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={SiCats} alt='Single Issuance CATs' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
    <c-li class="carousel-item">
      <div class="card-demo">
        <a href='/guides/multiple-issuance-cat-video-series/'>
          <div class="card">
            <div class="card__image">
              <img src={MiCats} alt='Multiple Issuance CATs' />
            </div>
          </div>
        </a>
      </div>
    </c-li>
  </c-ol>
</section>

---
