---
sidebar_position: 1
---

# 14.1 chia-blockchain
`chia-blockchain` is the first and official implementation of the Chia protocol. It is written
in python, with a few dependencies written in C++ or rust in order to improve performance. It
is written from the ground up by the Chia team as well as open source contributors, and is not
a fork of any other blockchain system.

https://github.com/Chia-Network/chia-blockchain


The codebase is split into several subfolders which categorize code on the different components
of the system. Inside the source root (chia folder).

* **cmds**: Contains the command line interface program, wihch is a python wrapper around the chia RPC api. When a command is run, a connection is established directly to the Chia services running locally.
* **consensus**: Consensus critical code that is high risk to change.
* **daemon**: Server that runs the daemon, launching and stopping the other services.
* **farmer**: Farmer server which handles signing blocks, coordinating the harvesters and communicating with a node. 
* **full_node**: A large portion of the business logic of Chia is here, storing blocks and coins, full node protocol, etc.
* **harvester**: Code to handle harverster interaction with plot files and the filesystem
* **introducer**: Temporary introducer server which has been partially replaced with DNS introducers.
* **plotters**: Code for wrapping 3rd party plotters such as MadMax and Bladebit.
* **plotting**: Code for creating plots and handling plot creation parameters, as well as checking plot correctness.
* **pools**: Code for the 
* protocols
* rpc
* server
* simulator
* ssl
* timelord
* types
* util
* wallet
