---
title: Chia on Raspberry Pi
slug: /chia-on-raspberry-pi
---

Try our [GUI installer](https://download.chia.net/latest/ARM64-Ubuntu-gui) for Raspberry Pi OS 64 and Ubuntu 20.04 LTS or newer on ARM64.

Tom's Hardware now has a [nice piece on farming with the Pi](https://www.tomshardware.com/how-to/raspberry-pi-chia-coin).

:::info

The Raspberry Pi 3 is not supported.

It is highly recommended you put the Chia blockchain and wallet DB on an SSD (or NVMe) drive. Do not use the SD card for the blockchain or wallet DB location.

We do not recommend running the Chia GUI on the Pi4 4GB model

:::

The following recipe was tested on a Pi 4 (4GiB RAM) running both Ubuntu Server 20.04 LTS 64 bit and Raspbian 64 bit. 64 bit OSes and python 3.7+ are required but helpfully Ubuntu 20.04 has python 3.8 out of the box and Raspbian ships with python 3.7. You can't just run a 64 bit kernel with a 32 bit OS install as you need 64 bit python 3.7+ also.

This was tested with [Raspberry Pi Imager](https://www.raspberrypi.org/downloads/), using image _Ubuntu Server 20.04 LTS (Pi 3/4) 64 bit_, and Raspbian 64 bit using the _2020-08-20-raspios-buster-arm64.zip_ image. We make available manylinux2014 ARM64 binary wheels for the main Chia dependencies which makes installing on Raspberry Pi pretty easy.

We recommend setting up swap in all cases on the 4GB Pi4 version

For Ubuntu 20.04 LTS, 1024MiB is suggested:

```bash
sudo dd if=/dev/zero of=/swap bs=1M count=1024
sudo chmod 600 /swap ; sudo mkswap /swap ; sudo swapon /swap
```

Add this line to /etc/fstab so that swap available on reboot.

```bash
/swap swap swap defaults 0 0
```

For Raspbian 64:

You need 1000/1024MiB of swap space. Here is an excellent [walk through of increasing swap space](https://pimylifeup.com/raspberry-pi-swap-file/) on Raspbian 64.

First some setup:

```bash
# Make sure you have a couple of requirements to compile items that aren't in binary form
sudo apt-get install -y build-essential python3-dev

# If you are not using Raspbian 64 (it pre-specifies it) add this
export PIP_EXTRA_INDEX_URL=https://www.piwheels.org/simple/

# Make sure you have 64 bit Python 3
python3 -c 'import platform; print(platform.architecture())'
```

Then proceed with a relative usual install process:

```bash
git clone https://github.com/Chia-Network/chia-blockchain.git -b latest
cd chia-blockchain

sh install.sh
. ./activate
chia init

# Optionally generate keys - can be done in the GUI later
chia keys generate

# Or you can import from 24 words
chia keys add

# and then enter your 24 words
```

But you are getting an error related to not being able to find a blspy version that satisfies 0.3.1 you say or `ERROR: Could not find a version that satisfies the requirement clvm-rs==0.1.3`? Frankly, with any install error message, you're probably trying to install on 32 bit Raspbian. You can check by running `uname -a` and if it says arm7l you need a 64 bit version of your favorite OS. `uname -a` should end with `aarch64 GNU/Linux`.

The Pi isn't cut out to be a Timelord and the Timelord requirements are very x86-64 specific currently and there is one piece of magic. You don't need this magic anymore now that chiavdf comes from a binary wheel on PyPi but we're leaving this here for people trying to build in other environments. This environment variable is set so that chiavdf doesn't attempt to compile Timelord components.

```bash
export BUILD_VDF_CLIENT=N
```

## Headless

You can run without the GUI using commands like `chia init`, `chia start farmer`, and `watch 'chia show -s -c'`. Be sure to check out `chia show -h` if you do. It is also possible to [remotely connect the UI to a headless node](/headless-node).

## Installing and running the GUI on Ubuntu 20.04 or Raspbian 64 bit

```
sh install-gui.sh
cd chia-blockchain-gui
npm run electron &
```
