---
title: 安装
slug: /installation
---

```mdx-code-block
从 '@theme/Tabs'导入标签页;
从'@theme/TabItem'导入标签页;
```

安装Chia的方法多种多样。 最好的方法取决于你打算做什么。

如果你打算使用Chia作为钱包或在个人电脑上经营一个农场， 我们建议从我们的 [官方下载页](https://www.chia.net/downloads) 安装GUI。 The best way to install the GUI on Linux is the command line, [as described below](#using-the-cli). GUI是与Chia客户端互动的最简单方式。

然而，仍然存在着这种情况。 如果您打算在服务器上运行一个完整的节点，并使用 [RPC 接口](/rpc)程序性连接， 最好的方法是在命令行上安装和运行 Chia。

最后，如果您计划为源代码做出贡献或者正在进行 [Chialisp](https://chialisp.com) 开发，我们建议从源代码安装Chia。 这提供了最高程度的灵活性。

## 系统要求

最少支持的试样是 Raspberry Pi 4, 4GB 模型：

- 四核1.5 Ghz CPU (必须是 64 位)
- 4 GB RAM
- 支持 Python 版本介于 3.7和 3.10 之间

### 驱动器格式

Chia 绘图文件大小至少为 108GB (为 K32)。 要成功绘图，需要格式化驱动器来支持大型文件。 可使用的格式包括NTFS、APFS、exFAT和ext4。 不使用 FAT格式化驱动器 (例如FAT12, FAT16, 和 FAT32)，否则绘图将失败。 Chia的未来版本将检查不支持的驱动器，但现在由每个用户检查他们的驱动器格式。

## 安装

### 使用 CLI

```mdx-code-block
<Tabs
  defaultValue="apt"
  groupId="install"
  values={[
    {label: 'APT', value: 'apt'},
    {label: 'YUM', value: 'yum'},
    {label: 'DNF', value: 'dnf'},
    {label: 'PIP', value: 'pip'},
]}>
<TabItem value="apt">
```

```bash
# 安装软件包
sudo apt-get update
sudo apt-get install ca-cancel gnupg

# 添加 GPG key
curl -sL https://repo.chia.net/FD39E6D3。 ubkey.asc | sudo gpg --dearmor -o /usr/share/keyrings/chia.gpg

# 设置仓库
echo "deb [arch=$(dpkg --print-structure) signed-by=/usr/share/keyrings/chia。 pg] https://repo.chia.net/debian/ stable main" | sudo tee /etc/apt/sources.list.d/chia。 ist > /dev/null
sudo apt-get update

# 安装 chia-blockchain
sudo apt-get install chia-blockchain-cli

# 使用 chia-blockchain-cli 而不是 CLI
```

```mdx-code-block
</TabItem>
<TabItem value="yum">
```

```bash
# 安装软件包
sudo yum-utils
sudo yum-config-manager --addrepo https://repo.chia.net/rhel/chia-blockchain. epo

# 安装chia-blockchain
sudo yum install chia-blockchain

# 仅用于 CLI 使用 chia-blockchain-cli
```

```mdx-code-block
</TabItem>
<TabItem value="dnf">
```

```bash
# 安装软件包
sudo dnf install 'dnf-command(config-manager)'
sudo dnf config-manager --add-repo https://repo.chia。 et/rhel/chia-blockchain.repo

# 安装chia-blockchain
sudo dnf install chia-blockchain

# 只为CLI 使用 chia-blockchain-cli
```

```mdx-code-block
</TabItem>
<TabItem value="pip">
```

:::note
请确认 [Python 3.10](https://www.python.org/downloads/release/python-3109) 和 [Git](https://git-scm.com/downloads) 已安装。
:::

```bash
# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
。 ./venv/bin/激活 # MacOS /Linux
./venv/Scripts/激活 s1 # Windows

# 更新pip
pip install --upgrade pip

# 安装chia-blockchain
pip install --extra-index-url https://pypi.chia.net/简单chia-blockchain miniupnpc
```

Chia试图为现代系统提供 [个二进制轮](https://pythonwheels.com)。 如果你的系统没有二进制轮子，你可能需要安装开发工具来从源代码构建一些Python扩展。 如果您正在尝试从源安装， 将环境变量 `BUILD_VDF_CLIENT` 设置为 `N` 将跳过尝试构建并非非常交叉平台的 Timelord 组件。 。 `导出BUILD_VDF_CLIENT=N`

```mdx-code-block
</TabItem>
</Tabs>
```

### 来自来源

```mdx-code-block
<Tabs
  defaultValue="linux-macos"
  groupId="source"
  values={[
    {label: 'Linux/MacOS', value: 'linux-macos'},
    {label: 'Windows', value: 'windows'},
]}>
<TabItem value="linux-macos">
```

:::note
请确认 [Python 3.10](https://www.python.org/downloads/release/python-3109) 和 [Git](https://git-scm.com/downloads) 已安装。
:::

```bash
# 下载chia-blockchain
git clone https://github. om/Chia-Network/chia-blockchain -b 最新的 --recurse-submodules

# 更改目录
cd chia-blockchain

# 安装依赖关系
sh install.sh

# 激活虚拟环境
 ./激活

# 初始化
chia init
```

以下是您更新到最新版本的方式：

```bash
# 更改目录
cd chia-blockchain

# 激活虚拟环境
。 ./激活

# 停止运行服务
chia stop -d all

# 停用虚拟环境
停用

# 拖动最新版本
git 获取
git 结帐最新
git reset --hard FETCH_HEAD --recurse-submodules

# 如果你得到了RELEASE。 ev0然后删除包锁。 在chia-blockchain-gui和install.sh 中的儿子再次

# 如果您有未提交的更改，请说“无需提交，清除工作树”
# ev0 将被报告
git 状态

# 安装新版本
sh install.sh

# 激活虚拟环境
。 ./激活

# 初始化新版本
chia init
```

```mdx-code-block
</TabItem>
<TabItem value="windows">
```

:::note
请确认 [Python 3.10](https://www.python.org/downloads/release/python-3109) 和 [Git](https://git-scm.com/downloads) 已安装。
:::

```bash
# 下载chia-blockchain
git clone https://github.com/Chia-Network/chia-blockchain -b 最新的 --recurse-submodules

# 更改目录
cd chia-blockchain

安装依赖关系
。 安装.ps1

# 激活虚拟环境
。 ./venv/Scripts/Activate.ps1

# 初始化
chia init
```

以下是您更新到最新版本的方式：

```bash
# 更改目录
cd chia-blockchain

# 激活虚拟环境
。 ./venv/Script/激活 s1

# 停止运行服务
chia stop -d all

# 停用虚拟环境
停用

# 拖动最新版本
git 抓取
git 结帐最新
git reset --hard FETCH_HEAD --recurse-submodules

# 如果你得到RELEASE。 ev0然后删除包锁。 在chia-blockchain-gui和install.sh 中的儿子再次

# 如果您有未提交的更改，请说“无需提交，清除工作树”
# ev0 将被报告
git 状态

# 安装新版本
./Install.ps1

# 激活虚拟环境
。 ./venv/Scripts/Activate.ps1

# 初始化新版本
chia init
```

```mdx-code-block
</TabItem>
<TabItem value="windows">
```

```mdx-code-block
</TabItem>
</Tabs>
```

### 树莓派4 {#raspberry-pi}

:::note
Chia 不支持树莓派3， 并且我们不建议在4GB 树莓派4型号上运行GUI。

强烈建议您将Chia区块链和钱包数据库放入一个 SSD 或 NVMe 驱动器，而不是SD卡。
:::

#### 切换 {#raspberry-pi-swap}

建议您设置1024 MiB 交换：

```mdx-code-block
<Tabs
  defaultValue="ubuntu"
  groupId="source"
  values={[
    {label: 'Ubuntu 20.04 LTS', value: 'ubuntu'},
    {label: 'Raspbian 64', value: 'raspbian'},
]}>
<TabItem value="ubuntu">
```

运行以下命令来设置交换：

```bash
sudo dd if=/dev/n0 of=/swap bs=1M count=1024
sudo chmod 600 /swap
sudo mkswap/swap
sudo swapon /swap
```

将此行添加到 `/etc/fstab` 以便在重启时交换：

```bash
/交换交换器交换默认值 0
```

```mdx-code-block
</TabItem>
<TabItem value="raspbian">
```

这里是一个极好的 [步行方式，增加了 Raspbian 64 上的](https://pimylifeup.com/raspberry-pi-swap-file/) 交换空间。

```mdx-code-block
</TabItem>
</Tabs>
```

#### 设置 {#raspberry-pi-setup}

运行以下命令来准备安装：

```bash
# 编译blockchain
sudo apt-get install -y build-essential python3-dev

# 如果你不使用 Raspbian 64, 添加这
导出 PIP_EXTRA_INDEX_URL=https://www。 iwheels.org/simple/

# 确保您有64 位 Python 版本3.7到3.10 之间
python3 -c 'import平台; print(aplatform.structure())'
```

#### 继续 {#raspberry-pi-install}

:::note
如果你在构建过程中出现错误，请确保你运行一个 64 位版本的 OS。

您可以通过运行 `uname -a` 来检查。 如果它说 `arm7l`, 你需要一个 64 位版本的 OS。 `uname -a` 输出应该以 `aarch64 GNU/Linux` 结尾。
:::

最后，关注Linux</a> 源安装的典型以继续。</p> 



#### 禁用定时器 {#raspberry-pi-timelord}

从源安装时不需要此操作。

然而，如果您以其他方式安装Chia，请禁用即时器构建流程：



```bash
导出 BUILD_VDF_CLIENT=N
```




## 目录结构



```
.chia/
compt：--mainnet/
      . --config/
      asset-config. aml
      ximent_ssl/
      / . - db/
      / . - log/
      debug. og
      / 
- run/
      - wallet/
```


Chia 区块链使用的所有数据都存储在有 `CHIA_ROOT` 环境变量的位置集中。 默认为 `~/。 hia/mainnet` (隐藏文件夹 `.chia` 您的主目录未设置)

区块链数据库存储在 `db` 子目录下。 可以复制数据库文件作为备份或放在另一台机器上。 要从开始重新同步完整的节点，请删除数据库文件并重启节点。

在 `配置` 子目录下的配置文件。 它的名称是 `config.yaml`, 它可以用来找到问题的根源。

可以将 `CHIA_ROOT` 环境变量配置到另一个位置。 一个常见的用途是将它切换到 `~/.chia/testnet` 来为测试网设置一个单独的配置。



## CLI Setup

使用CLI可以更多、更准确地控制各种Chia服务，例如全节点。 将命令上的更多详细信息改为 [CLI 参考](/cli)。



````mdx-code-block
<Tabs>
  <TabItem value="MacOS" label="MacOS" default>

CLI 命令存储在以下位置：

```bash
/Applications/Chia。 pp/Contents/Resources/app.asar.unpacked/daemon
```

要能够在终端中使用这些命令，请将其添加到路径中。

这可以通过运行以下命令来完成：

```bash
export PATH=/Applications/Chia.app/Contents/Resources/app.asar npacked/daemon:$PATH
```

若要在启动时加载，请将其添加到 `。 ashrc`, `.bash_profile`, 或 `.zshrc` 文件，这取决于哪个文件被炮弹使用。

</TabItem>
<TabItem value="Windows" label="Windows">

CLI 命令存储在以下位置：

```bash
~\AppData\Local\Programs\Chia\resources\appp. sar.unpacked\daemon
```

要能够在终端中使用这些命令而不去该目录，请将其添加到路径中。

This can be done by doing the following:

- Right-click on the Start menu
- Click on "System"
- Click "Advanced system settings"
- Click "Environment variables"
- Double-click "Path"
- Click "Add"
- Enter the path shown above

</TabItem>
<TabItem value="Linux" label="Linux">

:::note
If you installed Chia from source, the CLI will not require any further setup.
:::  

如果你安装了ChiaLinux安装程序文件, CLI 命令存储在以下位置之一：

```bash
/usr/lib/chia-blockchain/resources/app。 真。 npacked/daemon/chia
/lib/chia-blockchain/resources/app.asar npacked/daemon/chia
```

为了能够在终端中使用这些命令而不去该目录，请将其添加到路径中。

这可以通过运行以下任何一个命令来实现，这取决于使用的路径：

```bash
export PATH=/usr/lib/chia-blockchain/resources/app sar.unpacked/daemon/chia:$PATH
导出 PATH=/lib/chia-blockchain/resources/app。 sar.unpacked/daemon/chia:$PATH
```

若要在启动时加载它，请将它添加到 `。 ashrc`, `.bash_profile`, 或 `.zshrc` 文件，这取决于哪个文件被炮弹使用。
</TabItem>
</Tabs>
````



### 安装 GUI

GUI是一个更简单的与 Chia 互动方法，可以从CLI 手动安装。



````mdx-code-block
<Tabs>
  <TabItem value="MacOS / Linux" label="MacOS / Linux" default>

```bash
# 安装 GUI
。 ./install-gui.sh

# 开始GUI
sh start-gui。 h
```

下面是你更新到最新版本的方式：

```bash
# 更改目录到GUI
cd chia-blockchain-guiu

# 拖动最新版本
git 抓取

# 更改目录
cd ...

# 更改安装脚本
chmod +x ./install-gui.sh

# 安装新版本 GUI
./install-gui. h

# 启动界面
bash start-gui。 h
```

</TabItem>
<TabItem value="Windows" label="Windows">

```bash
# 安装 GUI
 .\Install-gui.ps1

# Change directory
cd chia-blockchain-gui

# Start the GUI
Start-Process -NoNewWindow npm run electron
```

The following is how you update to the latest version:

```bash
# Change directory
cd chia-blockchain-gui

# Pull the latest version
git fetch

# Change directory
cd ..

# 安装新版本的 GUI
./Install-gui。 s1

# 更改目录
cd chia-blockchain-guui

# 启动GUI
启动进程-NoNewWindow npm 运行电子版
```

</TabItem>
</Tabs>
````



### Initial Startup

图形界面将自动设置一切，而安装则需要在CLI上手动进行。

首先，初始化Chia配置文件：



```bash
chia init
```


然后，生成您的密钥：



```bash
chia密钥生成
```


最后，开始农民和他们的全部结点：



```bash
稻谷起始农民。
```
