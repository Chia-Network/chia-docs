---
sidebar_position: 1
---

# 12.1 Chia RPC API
The chia node and services come with a JSON rpc api server that allows you to access information and control the services.
These are accessible via HTTP, WebSockets, or via client SDKs.
The ports can be configured in `~/.chia/mainnet/config/config.yaml`. 
The rpc ports should not be exposed to the internet. 
TLS certificates are used to secure the communication.

### Default Ports:
- Daemon: 55400
- Full Node: 8555
- Farmer: 8559
- Harvester: 8560
- Wallet: 9256

### HTTP/JSON
The certificates must be used when calling the RPCs from the command line, make sure to use the correct certificates for the services you are calling.
All endpoints are made with POST with JSON data. The response is a JSON dictionary with a success field, which can be true or false. 

### WebSockets
If you are using the Websockets API, you can go directly through the daemon, which routes requests. Each WebSocket message contains the following fields:

```json
{
    "command": "get_blockchain_state",
    "ack": false,
    "data": {},
    "request_id": "123456",
    "destination": "wallet",
    "origin": "ui",
}
```

### Python
Most of the rpc methods are accessible through the different client objects in `chia-blockchain/chia/rpc`.
For examples of usage, see the command line implementation (chia wallet, chia show, etc).

### Javascript
A javascript client can be found here: https://github.com/Chia-Mine/chia-agent.
There is also another client here: https://github.com/freddiecoleman/chia-client.

## Services
The service RPC Apis are documented in the following sections:
* Shared: RPCs that all services share
* Full Node
* Farmer
* Harvester
* Timelord
* Wallet