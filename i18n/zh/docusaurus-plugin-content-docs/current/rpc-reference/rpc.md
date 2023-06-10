---
sidebar_label: Overview
title: RPC Overview
slug: /rpc
---

The Chia node and services come with a JSON RPC API server that allows you to access information and control the services. These are accessible via HTTP, WebSockets, or via client SDKs. The ports can be configured in `~/.chia/mainnet/config/config.yaml`. The RPC ports should not be exposed to the internet. TLS certificates are used to secure the communication.

### Default Ports:

- Daemon: 55400
- Full Node: 8555
- Farmer: 8559
- Harvester: 8560
- Wallet: 9256
- DataLayer: 8562

### HTTP/JSON

The certificates must be used when calling the RPCs from the command line, make sure to use the correct certificates for the services you are calling. All endpoints are made with POST with JSON data. The response is a JSON dictionary with a success field, which can be true or false.

### WebSockets

If you are using the Websockets API, you can go directly through the daemon, which routes requests. Each WebSocket message contains the following fields: Some examples can be found here: https://github.com/Chia-Mine/chia-agent.

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

(Long strings have been replace with `XxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.)

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

Most of the rpc methods are accessible through the different client objects in `chia-blockchain/chia/rpc`. For examples of usage, see the command line implementation (chia wallet, chia show, etc).

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

A javascript client can be found here: https://github.com/Chia-Mine/chia-agent. There is also another client here: https://github.com/freddiecoleman/chia-client.

## Services

The service RPC APIs are documented in the following sections: TODO: add links here and create the other sections

- Shared: RPCs that all services share
- Full Node
- Farmer
- Harvester
- Timelord
- Wallet (This API is still a WIP and likely to change soon)
