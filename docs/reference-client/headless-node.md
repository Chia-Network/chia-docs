---
title: Headless Node
slug: /headless-node
---

Exposing a Chia daemon to the network is an advanced configuration. This allows other computers to communicate with the Chia daemon, including the ability to create transactions and send XCH.

**If you do not know how to configure and properly secure a computer network _do not_ use a remote daemon.**

_Never_ expose the chia daemon to the internet.

# Setup

The following instructions are for a Linux-based farmer (daemon host) and Windows GUI (main node). The same concept applies to other OS combinations.

## On the daemon host

### Expose the daemon to the network

In `config.yaml`, change `self_hostname` from `localhost` to `0.0.0.0`. This binds the daemon to all IPv4 addresses on the local machine.

Next, open the port that the daemon is listening on (55400 by default). The UI assumes that the daemon is already running and it will _not_ attempt to start a remote daemon. Using [ufw](https://help.ubuntu.com/community/UFW) and restricting traffic to just the UI's host:

```bash
sudo ufw allow from <IP of UI machine> to any port 55400 proto tcp
```

### Copy the daemon's cert files

To secure their connection, the GUI will need the daemon's certificates. Copy these files to the Windows machine:

```bash
~/.chia/mainnet/config/ssl/daemon/private_daemon.crt
~/.chia/mainnet/config/ssl/daemon/private_daemon.key
```

## On the GUI host

### Reference the daemon's cert files

Place the daemon's cert files, copied earlier, in the following location:

```bash
~/.chia/mainnet/config/ssl/ui/
~/.chia/mainnet/config/ssl/ui/
```

Find the `ui` section in `config.yaml` and specify the following settings:

```yaml
daemon_host: <name or IP of the daemon host>
daemon_port: 55400
daemon_ssl:
  private_crt: config/ssl/ui/private_daemon.crt
  private_key: config/ssl/ui/private_daemon.key
```

# Troubleshooting

## GUI Client

### Can the GUI find the config folder?

The first thing to check is that the daemon's websocket URI shows up on the title bar. It should look like this:

![image](https://user-images.githubusercontent.com/5160233/111890456-6ca97f00-89b7-11eb-8f20-a8dc80d0d138.png)

Make sure there isn't a [syntax error](https://yamlchecker.com/) in config.yaml.

### Can the GUI find the remote daemon's certs?

Double check that in the `ui` section the crt and key paths are correct. It _shouldn't_ point to the folder where the local certs are stored. It has to point to the folder where you copied the daemon's certs.

## Connectivity

### Has the daemon been bound to a routable IP address?

On the daemon host run `sudo netstat -tulpn | grep 55400` or your OS's equivalent. It should show something similar to `tcp 0 0 0.0.0.0:55400 0.0.0.0:* LISTEN 2925/chia_daemon`.

If you see `127.0.0.1` it means you haven't changed the daemon's bind IP address. The loopback address is not routable on the network. Double check that `self_hostname: 0.0.0.0` is correct in the config. Also, make sure you have fully restarted the daemon:

```bash
chia stop all -d
chia start farmer
```

### Is the daemon's port opened on the firewall?

Run `sudo ufw status | grep 55400` or your OS and firewall equivalent. You should see something like `55400/tcp ALLOW`.

### Is VMWare Plugin Service bound to daemon port?

Verify that the default port 55400 is not bound to VMWare Plugin or other service on the daemon host. If pre-bound, stop that other service or change the `daemon_port` value in `config.yaml`. `netstat -tulpn` includes the process name of listeners. It should be `chia_daemon`.
