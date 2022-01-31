---
sidebar_position: 1
---

# 14.1 chia-blockchain
`chia-blockchain` is the first and official implementation of the Chia protocol. It is written in python, with a few dependencies written in C++ or rust in order to improve performance. It is written from the ground up by the Chia team as well as open source contributors, and is not a fork of any other blockchain system. It is written in python, with a few dependencies written in C++ or rust in order to improve performance. It is written from the ground up by the Chia team as well as open source contributors, and is not a fork of any other blockchain system.

https://github.com/Chia-Network/chia-blockchain


The codebase is split into several subfolders which categorize code on the different components of the system. Inside the source root (chia folder). Inside the source root (chia folder).

* **cmds**: Contains the command line interface program, wihch is a python wrapper around the chia RPC api. When a command is run, a connection is established directly to the Chia services running locally. When a command is run, a connection is established directly to the Chia services running locally.
* **consensus**: Consensus critical code that is high risk to change.
* **daemon**: Server that runs the daemon, launching and stopping the other services.
* **farmer**: Farmer server which handles signing blocks, coordinating the harvesters and communicating with a node.
* **full_node**: A large portion of the business logic of Chia is here, storing blocks and coins, full node protocol, etc.
* **harvester**: Code to handle harverster interaction with plot files and the filesystem
* **introducer**: Temporary introducer server which has been partially replaced with DNS introducers.
* **plotters**: Code for wrapping 3rd party plotters such as MadMax and Bladebit.
* **plotting**: Code for creating plots and handling plot creation parameters, as well as checking plot correctness.
* **pools**: Code for the handling of plot NFTs and pooling (on the wallet side).
* **protocols**: Protocol specification, also explained in section 10.
* **rpc**: RPC Server and RPC api specification for all services.
* **server**: Networking and Webscoket server.
* **simulator**: A wrapper around the full node which allows creating and farming blocks, and running a local custom blockchain.
* **ssl**: Managing TLS connections and certificates.
* **timelord**: Code for running timelords, which uses the `chiavdf` dependency and connects to vdf clients.
* **types**: Blockchain format and python types used throughout the project.
* **util**: A collection of many utility files and functions used throughout the project.
* **wallet**: Subdirectory containing all code relating to wallets and chialisp. This contains a large amount of code. This contains a large amount of code.
