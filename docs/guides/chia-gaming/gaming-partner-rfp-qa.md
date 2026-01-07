---
slug: /guides/gaming-partner-rfp-qa
title: Gaming RFP Q&A
---

# Gaming RFP Questions & Answers

## Summary

This page contains questions and answers regarding the Gaming Partner RFP (CHIA-GAMING-01). Questions were submitted by participants during the question submission period and responses were provided by Chia Network Inc.

## Questions & Answers

### What does the "Partner" get... other than that label? It looks like they're committing to timelines on maintenance and improvements. But if the code is open-source... anyone interested could do maintenance+improvements anyways?

(I guess the potential-partner would just include payment milestones in their proposal?)

- In addition to potential funding the Partner(s) get access to direct development and marketing support. We will supply the resources to get to a fully functioning framework to work off of. We will also provide normal reasonable support for getting vendors up to speed on what we've made available.

### Is the partner already known and can you share some details if yes?

- Partner(s) is/are not known, the RFP process will yield that. Goal is to have a number of submissions for the RFP, with the Partner(s) being selected in a few months. Currently we have concluded the Q&A portion of the RFP. Next step is we want potential Partner(s) to submit their proposals for how they will manage and build on top of the gaming solution. NOTE - there may be more than 1 partner selected. More information about the RFP can be found here: [Gaming RFP | Chia Documentation](/guides/gaming-partner-rfp)

### Are CATs usable for the stake in a game out of the box or is this something that will come later?

- No, CAT support would need to be added as one has to manage wrapped addresses for the cats within the state channel. Our initial focus is to drive XCH transactions but we are open to add CAT support eventually.

### Will the partner retain 100% of platform revenue, or is there a revenue-share arrangement with Chia Network?

- The Partner(s) will retain 100% of the platform revenue using their solution(s). Do take note that there could be multiple partners selected with the end goal of an interoperable and open ecosystem.

### What revenue streams currently exist or are anticipated (e.g., transaction fees, premium features, token economics)?

- The revenue streams are to be determined by the Partner(s) and their proposal(s). Some revenue streams we expect are premium features including potential subscription models, UI theming, direct pay from users for access, metrics, training, promotion, outside assistance detection, ads, and partnerships.

### Are there budget parameters or cost expectations Chia Network has established for this engagement? Understanding whether proposals should optimize for cost-efficiency versus comprehensive capability would help ensure our proposal aligns with your expectations.

- Partner(s) funding will be based on cost and time efficiency.

### Beyond the initial evaluation criteria, what KPIs will Chia Network use to measure partner success post-handoff? (e.g., user acquisition targets, revenue milestones, uptime SLAs, feature delivery cadence). Understanding success metrics will help us propose realistic commitments and resource allocation.

- We are interested in real increased demand for XCH as measured by N channels created in blocks, amount of funding in channels, and amount of money moving through channels. Partner(s) can (and we expect them to) define their own metrics. Note we recognize some of these metrics can be manipulated but we expect the Partner(s) traffic to be legitimate.

### The evaluation criteria mentions 'cost and applicable web2 experience' as most heavily weighted. Can you provide approximate weighting across all evaluation criteria (e.g., cost 40%, web2 experience 30%, blockchain familiarity 20%, etc.)? This would help us prioritize our proposal accordingly.

- There is no specific breakdown and all of the proposals will be reviewed on independent merit.

### Given that Chia Network will deliver v1 with core blockchain and state channel logic completed, what is the anticipated frequency and complexity of Chialisp and Rust modifications the partner would need to make in the first 12 months? Are we primarily maintaining existing code, or should we expect significant new development in these languages?

- We will supply the resources to get to a fully functioning framework to work off of. We will also provide normal reasonable support for getting Partner(s) up to speed on what we've made available. We expect that Partner(s) will be working primarily on frontend development and game logic with some chialisp development for the games themselves.

### Will the partner have access to Chia Network engineering resources for consultation during the transition period and for complex Chialisp/state channel issues that may arise post-handoff? If so, what is the expected duration and scope of this support?

- Yes, we will also provide normal reasonable support for getting Partner(s) up to speed on what we've made available.

### Given that the platform involves real-value gaming outcomes, are there specific jurisdictions the partner should avoid operating in, or regulatory frameworks (e.g., gaming licenses, money transmission laws) we should anticipate needing to comply with? Has Chia Network obtained any legal opinions on the regulatory classification of the gaming platform?

- It is the Partner(s) responsibility to ensure compliance with local regulatory environments.

### What role will Chia Network play in marketing and user acquisition for the gaming platform post-handoff? Should the partner budget for significant marketing spend, or will Chia Network actively promote the platform through its existing channels and community?

- We're anticipating viral and influencer marketing being the primary driver of Chia gaming marketing driven by the Partner(s). Primarily we will direct our promotions on the Chia gaming solutions themselves and secondarily we will promote the Partner(s) as part of our normal partnerships promotions. Out of necessity any promotion will drive users to particular games, game apps, and trackers for onboarding. Partner(s) are expected to use their own marks when promoting themselves with usage of Chia trademark guidelines subject to approval and the terms outlined here: https://www.chia.net/ip-trademarks/

### Where does Chia Network envision the gaming platform in 3–5 years? Are there specific scale targets (users, transaction volume, game types) or strategic objectives the partner should be building toward?

- The long term vision for Chia gaming is of it being an ecosystem involving multiple, possibly many vendors interacting via open source protocols.

The primary types of vendors are game app providers and tracker runners (still not sure what to call these things). The idea is that any game app can work with any tracker, any two game apps can talk to each other as long as they play shared games, and games can easily be added to game apps by them implementing our game handlers API.

There likely isn't so much of a pure game writing business in there. Games should be interoperable across vendors, and when playing for money standardization on a few formats which people can directly train on is the norm. Poker is the main example.

### Beyond the scope outlined in the RFP, are there adjacent opportunities Chia Network would value from the right partner—such as bringing an existing gaming user base, developing additional game types, or contributing to the broader Chia gaming ecosystem? We want to understand if there is appetite for a partner who can deliver beyond platform maintenance and into ecosystem growth.

- Yes there is an appetite for a Partner(s) who can deliver beyond platform maintenance including bringing an existing gaming user base and further developing the gaming primitives. The long term vision for Chia gaming is of it being an ecosystem involving multiple, possibly many vendors interacting via open source protocols.

There's an open question of who maintains the standard for interoperability which the whole ecosystem uses. That should be a consensus-driven process with several vendors participating including Chia Network Inc; with CNI doing some amount of direct participation and/or funding others who are contributing to it.

### What's the existing infrastructure, where is it hosted and how is it managed? Do we have an idea of traffic one would need to support?

- Since these are decentralized gaming primitives, there is no traditional centralized hosting infrastructure. CNI will not be hosting publicly accessible versions of the gaming solutions. The project has been designed to run as two separate docker images (tracker and game host) with the intention that these are interoperable with other implementations (i.e. trackers can identify games from other providers). This interoperability is one core reason we may select more than 1 partner during this process. The technical load on Chia gaming infrastructure is very low due to it being super-optimized for keeping the load on chain down.

### Since most of the tasks related with the RFP are maintenance/support/refactor tasks, with the exception of UI/UX and a few features to develop, what is the scope of the Demo? What will be evaluated in this deliverable?

- We would like to see a proof of concept of your proposed solutions (a hosted instance of the current gaming solution with your teams improvements and added features). This proof of concept need not be feature complete but progress, code quality, and functionality will all be evaluated with the intention that the potential Partner(s) need to show they can develop towards their proposed solutions.

### What specific acceptance criteria or milestones define v1 completion? Will there be a formal sign-off process before the partner assumes responsibility?

- We expect an ongoing collaboration between CNI and the Partner(s). We will supply the resources to get to a fully functioning framework to work off of. We will also provide normal reasonable support for getting vendors up to speed on what we've made available. Generally we will provide all of our proposed games (CalPoker, SpacePoker, and Krunk) with a functional walletConnect integration for the Chia reference client.

The long term vision for Chia gaming is of it being an ecosystem involving multiple, possibly many vendors interacting via open source protocols.

There's an open question of who maintains the standard for interoperability which the whole ecosystem uses. That should be a consensus-driven process with several vendors participating including Chia Network Inc; with CNI doing some amount of direct participation and/or funding others who are contributing to it.

### After the official handoff, will the partner have full ownership of the product roadmap, or will Chia Network Inc. retain approval or veto rights over feature development, UX changes, or monetization strategies?

- The Partner(s) are responsible for their own roadmaps. CNI will continue to support the underlying primitives and standards. The long term vision for Chia gaming is of it being an ecosystem involving multiple vendors interacting via open source protocols. Partner(s) are expected to use their own marks when promoting themselves with usage of Chia trademark guidelines subject to approval and the terms outlined here: [Intellectual Property & Trademarks](https://www.chia.net/ip-trademarks/)

### Beyond the games currently documented (California Poker, Rock Paper Scissors, Battleship, Tic Tac Toe), are there additional game types in development or planned for v1 that the partner should anticipate supporting at handover?

- CNI will provide all of our proposed games (CalPoker, SpacePoker, and Krunk) with a functional walletConnect integration for the Chia reference client (note that Rock Paper Scissors, Battleship, Tic Tac Toe, and Connect 4 are all community built projects with no support or development from CNI).

### Will existing infrastructure (servers, domains, SSL certificates, CI/CD pipelines, monitoring systems) transfer to the partner, or is the partner expected to provision entirely new infrastructure?

- CNI will not host and does not plan to host public facing instances for the gaming solution. The Partner(s) will need to setup and manage their own infrastructure to support their proposed solution. Note these are decentralized gaming primitives, there is no traditional centralized hosting infrastructure. The technical load on Chia gaming infrastructure is very low due to it being super-optimized for keeping the load on chain down.

### Are there existing vendor contracts, third-party service agreements, or licensing arrangements the partner will need to assume, renegotiate, or replace?

- There are no current or planned contracts, service agreements, or licensing arrangements for the Partner(s) to assume, renegotiate, or replace. Note that the code itself has the Apache 2.0 license.

### What is the current user capacity of the platform infrastructure, and are there known scalability limitations the partner should plan to address within the first 6-12 months?

- These are decentralized gaming primitives, there is no traditional centralized hosting infrastructure. CNI will not host and does not plan to host public facing instances for the gaming solution. The project has been designed to run as two separate docker images (tracker and game host) with the intention that these are interoperable with other implementations (i.e. trackers can identify games from other providers). The technical load on Chia gaming infrastructure is very low due to it being super-optimized for keeping the load on chain down.

### Will the partner be permitted to rebrand the gaming platform, or is maintaining "Chia Gaming" branding a requirement? What are the guidelines for use of Chia trademarks and logos in partner marketing?

- Partner(s) are expected to use their own marks when promoting themselves with usage of Chia trademark guidelines subject to approval and the terms outlined here: [Intellectual Property & Trademarks](https://www.chia.net/ip-trademarks/)

### The codebase is open-source under Apache 2.0. Does the partner retain the right to develop proprietary features, games, or integrations on top of the open-source foundation, or must all partner development remain open-source?

- We request that interoperability across game and tracker hosts be maintained but recognize that Partner(s) may create their own closed-source proprietary games, features, or integrations on top of that foundation as permitted by the Apache 2.0 license.

### For the demo submission phase, are there specific features, capabilities, or scenarios the demo must demonstrate, or is the format and scope at the partner's discretion?

- We would like to see a proof of concept of your proposed solutions. This proof of concept need not be feature complete but progress, code quality, and functionality will all be evaluated with the intention that the potential Partner(s) need to show they can develop towards their proposed solutions.

### Will Chia Network Inc. consider existing operational tools and infrastructure built for the Chia Gaming ecosystem (such as game room trackers or monitoring systems) as evidence of capability and commitment?

- Yes these are evidence of capability and commitment and will be weighted accordingly during the demo review process. While we expect some demos to show game hosts demos could also be focused on infrastructure components.

### The RFP notes this project validates state channel primitives for payment channels. Will the partner have input into or early access to future Chia protocol developments that could enhance gaming functionality?

- Yes, the long term vision for Chia gaming is of it being an ecosystem involving multiple vendors interacting via open source protocols.

There's an open question of who maintains the standard for interoperability which the whole ecosystem uses. That should be a consensus-driven process with several vendors participating including Chia Network Inc; with CNI doing some amount of direct participation and/or funding others who are contributing to it.

### Is there an expectation that the partner will contribute improvements to the core state channel or Chialisp logic back to Chia Network Inc., or will the partner's technical development be fully independent after handover?

- Yes we do expect the Partner(s) to contribute to the long term vision for Chia gaming. The vision being an ecosystem involving multiple vendors interacting via open source protocols.

There's an open question of who maintains the standard for interoperability which the whole ecosystem uses. That should be a consensus-driven process with several vendors participating including Chia Network Inc and CNI doing some amount of direct participation and/or funding others who are contributing to it.
