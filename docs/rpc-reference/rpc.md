---
sidebar_label: Overview
title: RPC Overview
slug: /rpc
---

The Chia node and services come with a JSON RPC API server that allows you to access information and control the services.
These are accessible via HTTP, WebSockets, or via client SDKs.
The ports can be configured in `~/.chia/mainnet/config/config.yaml`.
The RPC ports should not be exposed to the internet.
TLS certificates are used to secure the communication.

### Default Ports:

- Daemon: 55400
- Full Node: 8555
- Farmer: 8559
- Harvester: 8560
- Wallet: 9256
- DataLayer: 8562

### HTTP/JSON

The certificates must be used when calling the RPCs from the command line, make sure to use the correct certificates for the services you are calling.
All endpoints are made with POST with JSON data. The response is a JSON dictionary with a success field, which can be true or false.

### WebSockets

If you are using the Websockets API, you can go directly through the daemon, which routes requests. Each WebSocket message contains the following fields:
Some examples can be found here: https://github.com/Chia-Mine/chia-agent.

```json
{
  "command": "get_blockchain_state",
  "ack": false,
  "data": {},
  "request_id": "123456",
  "destination": "wallet",
  "origin": "ui"
}
```

#### WebSockets Example (courtesy of [baerrs](https://github.com/baerrs))

```json
import json
from datetime import datetime
import websocket
import ssl


# websocket.enableTrace(True)
def on_message(ws, message):
    print('{0}: Got message: {1}'.format(datetime.now(), message))


def on_error(self, error):
    print('Error in websocket: {0}'.format(error))


def on_close(self, ws, e):
    print("{0]: Websocket closed: {1}".format(datetime.now(), e))


def on_open(self):
    print('{0}: Connected to Websocket'.format(datetime.now()))
    message = {"destination": "daemon", "command": "register_service", "request_id": "123456ca", "origin": "", "data": { "service": 'chia_agent'}}
    on_send_message(self, message)
    message = {"destination": "daemon", "command": "register_service", "request_id": "123456w", "origin": "", "data": { "service": 'wallet_ui'}}
    on_send_message(self, message)

def on_send_message(ws, message):
    print('{0}: Sent Message: {1}'.format(datetime.now(), message))
    wsapp.send(json.dumps(message))


def on_ping(ws, data):
    print('{0}: Got ping: {1}'.format(datetime.now(), data))


print("Starting Something")
wsapp = websocket.WebSocketApp("wss://localhost:55400",
                               on_open=on_open,
                               on_message=on_message,
                               on_error=on_error,
                               on_ping=on_ping)

wsapp.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE, "certfile": "ssl/daemon/private_daemon.crt",
                          "keyfile": "ssl/daemon/private_daemon.key", "ssl_context.check_hostname": False})
wsapp.close()
```

#### WebSockets Example Output

(Long strings have been replaced with `XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.)

```json
Starting Something
2022-01-24 21:20:39.782297: Connected to Websocket
2022-01-24 21:20:39.782297: Sent Message: {'destination': 'daemon', 'command': 'register_service', 'request_id': '123456ca', 'origin': '', 'data': {'service': 'chia_agent'}}
2022-01-24 21:20:39.782297: Sent Message: {'destination': 'daemon', 'command': 'register_service', 'request_id': '123456w', 'origin': '', 'data': {'service': 'wallet_ui'}}
2022-01-24 21:20:39.782297: Got message: {"ack": true, "command": "register_service", "data": {"success": true}, "destination": "", "origin": "daemon", "request_id": "123456ca"}
2022-01-24 21:20:39.782297: Got message: {"ack": true, "command": "register_service", "data": {"success": true}, "destination": "", "origin": "daemon", "request_id": "123456w"}
2022-01-24 21:20:45.053029: Got message: {"ack": false, "command": "get_connections", "data": {"connections": [{"bytes_read": 3094726, "bytes_written": 1545670, "creation_time": 1642488338.7817655, "last_message_time": 1643077239.4690468, "local_port": 8447, "node_id": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "peer_host": "127.0.0.1", "peer_port": 3445, "peer_server_port": 8448, "type": 2}, {"bytes_read": 870298, "bytes_written": 51, "creation_time": 1642743064.406306, "last_message_time": 1643077239.4690468, "local_port": 8447, "node_id": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "peer_host": "127.0.0.1", "peer_port": 8444, "peer_server_port": 8444, "type": 1}], "success": true}, "destination": "wallet_ui", "origin": "chia_farmer", "request_id": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
2022-01-24 21:20:48.417804: Got message: {"ack": false, "command": "new_signage_point", "data": {"proofs": [], "signage_point": {"challenge_chain_sp": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "challenge_hash": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "difficulty": 2672, "reward_chain_sp": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "signage_point_index": 8, "sub_slot_iters": 135266304}, "success": true}, "destination": "wallet_ui", "origin": "chia_farmer", "request_id": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
2022-01-24 21:20:48.417804: Got message: {"ack": false, "command": "new_farming_info", "data": {"farming_info": {"challenge_hash": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "passed_filter": 0, "proofs": 0, "signage_point": "0x35e9aaf13ebca31660f9720f97cf2c127a01a24440a6a253b5953196da715162", "timestamp": 1643077248, "total_plots": 3}, "success": true}, "destination": "wallet_ui", "origin": "chia_farmer", "request_id": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
2022-01-24 21:20:57.402740: Got message: {"ack": false, "command": "new_signage_point", "data": {"proofs": [], "signage_point": {"challenge_chain_sp": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "challenge_hash": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "difficulty": 2672, "reward_chain_sp": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "signage_point_index": 9, "sub_slot_iters": 135266304}, "success": true}, "destination": "wallet_ui", "origin": "chia_farmer", "request_id": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
2022-01-24 21:20:57.402740: Got message: {"ack": false, "command": "new_farming_info", "data": {"farming_info": {"challenge_hash": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "passed_filter": 0, "proofs": 0, "signage_point": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "timestamp": 1643077257, "total_plots": 3}, "success": true}, "destination": "wallet_ui", "origin": "chia_farmer", "request_id": "XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
```

### Python

Most of the rpc methods are accessible through the different client objects in `chia-blockchain/chia/rpc`.
For examples of usage, see the command line implementation (chia wallet, chia show, etc).

#### Python Example (courtesy of [baerrs](https://github.com/baerrs))

```python
import requests
import urllib3
import json
urllib3.disable_warnings()

headers = {'Content-Type': 'application/json'}
url = "https://localhost:8555/get_blockchain_state"
data = '{}'
cert = ('ssl/full_node/private_full_node.crt', 'ssl/full_node/private_full_node.key')
response = json.loads(requests.post(url, data=data, headers=headers, cert=cert, verify=False).text)
print(json.dumps(response, indent=4, sort_keys=True))
```

### Javascript

A javascript client can be found here: https://github.com/Chia-Mine/chia-agent.
There is also another client here: https://github.com/freddiecoleman/chia-client.

#### C# Example (courtesy of [Kryptomine](https://www.nuget.org/profiles/Kryptomine.ch))

A C# Client can be found on Nuget/Github: https://www.nuget.org/packages/Chia-Client-API

```C#
using System;
using Chia_Client_API.WalletAPI_NS;
using CHIA_RPC.General_NS;
using CHIA_RPC.Wallet_NS.Wallet_NS;

namespace ChiaExamples
{
    internal class Program
    {
        private static Wallet_RPC_Client Wallet = new Wallet_RPC_Client(reportResponseErrors: false);

        public static void Main()
        {
            WalletID_RPC walletID_RPC = new WalletID_RPC(1);
            GetWalletBalance_Response response = Wallet.GetWalletBalance_Sync(walletID_RPC);
            Console.WriteLine(response.wallet_balance.confirmed_wallet_balance_in_xch);
            Console.ReadKey();
        }
    }
}
```

## Services

| Service           | Managed Objects                                                                                       | Associated API                                                                                               | Associated RPC API                                                                                          |
|-------------------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| FarmerService     | [Farmer](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/farmer/farmer.py)             | [FarmerAPI](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/farmer/farmer_api.py)             | [FarmerRpcApi](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/rpc/farmer_rpc_api.py)        |
| FullNodeService   | [FullNode](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/full_node.py)     | [FullNodeAPI](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/full_node_api.py)     | [FullNodeRpcApi](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/rpc/full_node_rpc_api.py)   |
| HarvesterService  | [Harvester](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/harvester/harvester.py)    | [HarvesterAPI](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/harvester/harvester_api.py)    | [HarvesterRpcApi](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/rpc/harvester_rpc_api.py)  |
| IntroducerService | [Introducer](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/introducer/introducer.py) | [IntroducerAPI](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/introducer/introducer_api.py) | [FullNodeRpcApi](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/rpc/full_node_rpc_api.py)   |
| CrawlerService    | [Crawler](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/seeder/crawler.py)           | [CrawlerAPI](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/seeder/crawler_api.py)           | [CrawlerRpcApi](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/rpc/crawler_rpc_api.py)      |
| DataLayerService  | [DataLayer](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/data_layer/data_layer.py)  | [DataLayerAPI](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/data_layer/data_layer_api.py)  | [DataLayerRpcApi](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/rpc/data_layer_rpc_api.py) |
| TimelordService   | [Timelord](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/timelord/timelord.py)       | [TimelordAPI](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/timelord/timelord_api.py)       | [TimelordRpcApi](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/rpc/timelord_rpc_api.py)    |
| WalletService     | [WalletNode](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/wallet_node.py)    | [WalletNodeAPI](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/wallet_node_api.py)    | [WalletRpcApi](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/rpc/wallet_rpc_api.py)        |

**Explanation:**
Each service is composed of a managed object, an API for control, and an RPC API for remote control. The combination of these into the service is controlled by the [service alias](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/types/aliases.py) types.

- **Service**: This column lists the different manager services within the Chia system.
- **Managed Objects**: This column details the core entities or components that each service oversees.
- **Associated API**: This column specifies the API class associated with each service. This API class defines the interface for interacting with the corresponding managed objects.
- **Associated RPC API**: This column lists the RPC API class associated with each service. This RPC API class allows for remote control of the managed objects through Remote Procedure Calls (RPC).
