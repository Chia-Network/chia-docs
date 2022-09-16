---
sidebar_position: 3
---

# 15.3 Climate Warehouse Install Guide

### This website is a temporary home for this document. The permanent home of the mainnet version of this document will likely in the public wiki.

---

This document will guide you through the process of installing the Climate Warehouse application on Windows and MacOS. For additional technical resources, see the following:

- [Data Layer (Beta) RPC API](/docs/12rpcs/data_layer_rpcs "Section 12.3: Data Layer Beta RPC API")
- [Data Layer (Beta) CLI Reference](/docs/13cli/data "Section 12.3: Data Layer Beta CLI Reference")

## Contents:

- Installation

  - [Install and configure Chia and the Data Layer (Beta) server](#install-and-configure-chia-and-the-data-layer-beta-server)
  - [Install the Climate Warehouse service](#install-the-climate-warehouse-service)
  - [Install and configure the Climate Warehouse Aux Application (GUI)](#install-and-configure-the-climate-warehouse-aux-application-gui)

- Using the Climate Warehouse
  - [Create a new Organization](#create-a-new-organization)
  - [Create a new project](#create-a-new-project)
  - [Create a new Unit](#create-a-new-unit)
  - [Connect to a remote node](#connect-to-a-remote-node)

---

## Install and configure Chia and the Data Layer Beta server

> Note: Your firewall might give warnings when installing both Chia and the Climate Warehouse. This is normal. Allow the installations to continue.

1. Download the latest [Chia + Data Layer (Beta) installer](https://todo_unknown_url)

2. Install Chia

Windows: \* Double click ChiaSetup-[version].exe. The installation process will take less than 30 seconds on most computers.

MacOS: \* Double click Setup-[version].dmg. Drag the Chia icon to the Applications folder.

<figure>
  <img src="images/data_layer/01_downloads.png" alt="Chia installation file"/>
  <figcaption>
    <em>Windows installer (left) and MacOS installer (right).</em>
  </figcaption>
</figure><br/>

3. On MacOS, Chia will not start automatically. Instead, start Chia from your _Applications_ folder. (On Windows, Chia will start automatically after the installation completes.)

<figure>
  <img src="images/data_layer/02_start_chia_mac.png" alt="Choose Farming Mode"/>
  <figcaption>
    <em>Starting Chia on MacOS.</em>
    </figcaption>
</figure><br/>

4. If this is your first time installing Chia on this machine, the _Select Your Client Mode_ dialog will appear.

We recommend that you select Wallet Mode. This mode will quickly sync your wallet.

<figure>
  <img src="images/data_layer/03_choose_wallet_mode.png" alt="Choose Wallet Mode"/>
  <figcaption>
    <em>We recommend that you choose Farming Mode.</em>
    </figcaption>
</figure>

<br/>

5. If you don't already have a Chia wallet, you'll need to create one now. If you already have a wallet, proceed to step 6.

<figure>
  <img src="images/data_layer/04_create_private_key.png" alt="Create a private key"/>
</figure>

<br/>

You'll be shown a list of 24 words. Copy these words to a private location. Order is important. These words are all you'll need to recover your wallet later.

> **IMPORTANT**: Your seed phrase is all that is required to recover your wallet. If you lose your seed phrase, recovery will not be possible. If a bad actor gains access to your seed phrase, they'll be able to steal your Chia, including the singletons you'll use for the data layer. Do not take a picture of your seed phrase or store it on a computer.

<figure>
  <img src="images/data_layer/05_seed_phrase.png" alt="24-word seed phrase"/>
  <figcaption>
    <em>Carefully copy your mnemonic seed phrase for future wallet recovery.</em>
    </figcaption>
</figure>

<br/>

6. The _Select Key_ dialog will appear. If you see multiple keys, select one that has some XCH (if possible).

<figure>
  <img src="images/data_layer/06_choose_key.png" alt="Select Key dialog"/>
  <figcaption>
    <em>If the Select Key dialog appears, choose your primary key.</em>
    </figcaption>
</figure>

<br/>

7. Your wallet will begin syncing. "Not Synced" will appear in the upper right corner. You may proceed to the next step while syncing is in progress.

<figure>
  <img src="images/data_layer/07_not_synced.png" alt="Not synced"/>
  <figcaption>
    <em>The wallet is syncing.</em>
    </figcaption>
</figure>

<br/>

8. Open PowerShell on Windows, or Terminal on MacOS.

We'll create an alias to run the `chia` command from any folder.

Windows:

    * Run `Set-Alias -Name chia C:\Users\&#060;username&#062;\AppData\Local\chia-blockchain\app-&#060;version&#062;\resources\app.asar.unpacked\daemon\chia.exe`

    (Be sure to update &lt;username&gt; and &lt;version&gt; to match the actual folder structure.)

MacOS: \* Run `alias chia='/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia'`

9. MacOS only:

Run `chia init --fix-ssl-permissions`. This will update the permissions for Chia's SSL files.

```shell
~ % chia init --fix-ssl-permissions
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@             WARNING: UNPROTECTED SSL FILE!              @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0777 for '/Users/user/.chia/mainnet/config/ssl/ca/chia_ca.crt' are too open. Expected 0644
Permissions 0777 for '/Users/user/.chia/mainnet/config/ssl/ca/chia_ca.crt' are too open. Expected 0644
...
Finished updating SSL file permissions
No keys are present in the keychain. Generate them with 'chia keys generate'
```

10. Run `chia version`. You should be shown the correct version. For example:

```powershell
PS C:\Users\User> chia version
1.3.2.dev694
```

11. Run `chia configure --set-log-level INFO`. This will instruct your Chia installation to log more info than it would have with the default level of WARNING.

```powershell
PS C:\Users\User> chia configure --set-log-level INFO
Logging level updated. Check C:\Users\User\.chia\mainnet/log/debug.log
Restart any running chia services for changes to take effect
```

12. Acquire some XCH in order to use the Climate Warehouse. If you are unsure how to do this, ask a Chia employee for help.

> NOTE: If you ever need to display your address, run `chia keys show`. This command will only output your public keys and address; your private keys and seed phrase will not be shown.

13. Configure your router to forward ports 8575 (data propagation server) and 31310 (Climate Warehouse) to your local machine. To configure your router's settings, typically you'll need enter `http://192.168.1.1` in a web browser, though this address varies for different routers. From your router's settings, locate the Port Forwarding section and add a rule to forward ports 8575 and 31310 to your local IP address.

14. You'll also need to configure your firewall to allow connections on ports 8575 and 31310.

    Windows:

    - From a PowerShell prompt, run `Start-Process powershell -Verb runAs`. This will open a new PowerShell window as an Administrator. From this new window, you'll need to run four commands, two for incoming connections and two for outgoing connections.

    - `netsh advfirewall firewall add rule name="allowDataServerIn" dir=in action=allow protocol=TCP localport=8575`

    - `netsh advfirewall firewall add rule name="allowDataServerOut" dir=out action=allow protocol=TCP localport=8575`

    - `netsh advfirewall firewall add rule name="allowClimateWarehouseIn" dir=in action=allow protocol=TCP localport=31310`

    - `netsh advfirewall firewall add rule name="allowClimateWarehouseOut" dir=out action=allow protocol=TCP localport=31310`

    - Each of these commands should give a response of `Ok.` Once you have successfully run the commands, exit the Administrator PowerShell window.

    MacOS:

    - Open /etc/pf.conf in a text editor. You'll need administrative privileges. For example,

      `sudo vi /etc/pf.conf`

    - Add the following lines to the end of the file:

      ```bash
      # Open port 8575 for Chia Data Server
      pass in proto tcp from any to any port 8575
      # Open port 31310 for Climate Warehouse Server
      pass in proto tcp from any to any port 31310
      ```

    - Save and close the file.

    - Run `sudo pfctl -f /etc/pf.conf` to load the changes.

    - Run `sudo pfctl -sr | grep 8575` and `sudo pfctl -sr | grep 31310` to verify that the changes are active.

15. Run `chia start data` to start the Data Layer Beta server.

```powershell
PS C:\Users\User> chia start data
chia_data_layer: started
```

16. "Synced" should now appear in the upper right corner of your wallet. You should have a balance greater than 0. If your wallet still says "Syncing", then you'll need to wait before continuing.

<figure>
  <img src="images/data_layer/16_synced.png" alt="Synced wallet"/>
</figure>

<br/>

17. Chia uses the coin set (similar to UTXO) model of accounting. In the example above, the wallet contains 1 coin worth 1 XCH. However, several coins are needed in order to configure the Climate Warehouse. To fix this, send yourself some money, and include a small fee so the transaction gets processed quickly. For this example, we'll create a new coin worth 0.25 XCH, with a 0.0001 XCH fee, sent to our own wallet:

<figure>
  <img src="images/data_layer/17_send_self_money.png" alt="An example of a wallet sending money to itself"/>
</figure>

<br/>

If you do something similar on your wallet three times, while waiting for the transaction to complete each time, you'll end up with four coins in your wallet. This will be sufficient to use the Climate Warehouse.

Chia is now installed and configured properly. Next you'll install the Climate Warehouse.

---

## Install the Climate Warehouse service

1. Visit Chia's [Climate Warehouse download site](https://github.com/Chia-Network/climate-warehouse/releases/latest). Download the zip file according to your OS.

2. Install the Climate Warehouse

Windows:

     * Extract `windows-x64-<version>.zip` to the folder you want to run the Climate Warehouse from.
    

  <div class="figure">
    <img src="images/climate_warehouse/01_cw_installer_windows.png" alt="Climate Warehouse installation file"/>
    <div class="figcaption">
    <em>The contents of windows-x64.zip.</em>
    </div>
  </div>

    * Open a PowerShell window, change to the `windows-x64` folder, and run `climate-warehouse.exe`. The application will begin polling for updates.

      ```powershell
      PS C:\Users\User> cd C:\Users\User\Downloads\ClimateWarehouse\windows-x64
      PS C:\Users\User\Downloads\ClimateWarehouse\windows-x64> .\climate-warehouse.exe
      Start Datalayer Update Polling
      Syncing PickLists
      Subscribing to default organizations
      (node:7588) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
      (Use `climate-warehouse --trace-warnings ...` to show where the warning was created)
      Mirror DB not connected
      ...
      Mirror DB not connected
      Connected to database
      Polling For Updates \
      ```

MacOS:

    * Double click `ClimateWarehouse-macos-installer-x64.pkg` to run the installer. Choose the default settings. When the installation process completes, close the installer.

  <div class="figure">
      <img src="images/climate_warehouse/02_cw_installer_macos.png" alt="CW installer on MacOS"/>
      <div class="figcaption">
        <em>The final panel of the Climate Warehouse installer.</em>
      </div>
  </div>

  * Open a Terminal window, change to the `~/ClimateWarehouse` folder, and run `./climate-warehouse`. The application will begin polling for updates.

```shell
~ % cd ~/ClimateWarehouse
ClimateWarehouse % ./climate-warehouse
Start Datalayer Update Polling
Syncing PickLists
Subscribing to default organizations
(node:29004) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
(Use climate-warehouse --trace-warnings ... to show where the warning was created)
Mirror DB not connected
...
Mirror DB not connected
Connected to database
Polling For Updates \
```

3. To create your organization from the CLI (Can also be done later from the GUI):

   - Windows: Download and install [Git for Windows](https://gitforwindows.org/ "Git for Windows website") (GitBash). Run the application, which looks similar to the Windows command prompt.

   - MacOS: Open a normal Terminal window.

4. Create your organization

   - Run the following command to create a new organization.

   ```powershell
   curl --location --request POST 'localhost:31310/v1/organizations' \
     --header 'Content-Type: application/json' \
     --data-raw '{
     "name": "<Your Org Name>",
     "icon": "<Icon URL>"
     }'
   ```

   Be sure to replace &lt;Your Org Name&gt; and &lt;Icon URL&gt;. If you don't have an icon URL, you can use our default: `https://climate-warehouse.s3.us-west-2.amazonaws.com/public/orgs/me.svg`

   If the command succeeds, you'll receive this message: `"New organization created successfully"`, along with an orgId. For example:

   ```bash
   ~ $ curl --location --request POST 'localhost:31310/v1/organizations' --header 'Content-Type: application/json' --data-raw '{
   "name": "Test Org",
   "icon": "https://climate-warehouse.s3.us-west-2.amazonaws.com/public/orgs/me.svg"
   }'
   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
   100   238  100   127  100   111    112     98  0:00:01  0:00:01 --:--:--   211{"message":"New organization created successfully.","orgId":"7c256cee3b1bda974259ae5e887bcd5b86c88bc49e353aaf3533a7823d93be42"}
   ```

5. Get your root hash

   - To verify your local organization, you can query its root hash by running `chia data get_root --id=<orgId>`, using the `orgId` from the previous command:

   ```powershell
   PS C:\Users\User> chia data get_root --id=7c256cee3b1bda974259ae5e887bcd5b86c88bc49e353aaf3533a7823d93be42
   {'confirmed': True, 'hash': '0x1714ec438ddb0846425a1e47352b5e17e723d9ce27924ed0c5cec338c7a56b69', 'success': True, 'timestamp': 1645404216}
   ```

---

## Install and configure the Climate Warehouse Aux Application (GUI)

1. Visit Chia's [Climate Warehouse Aux Application download site](https://github.com/Chia-Network/climate-warehouse-ui/releases/latest). Download the appropriate installer for your OS:

- Windows -- `Climate.Warehouse.Setup.<version>.exe`
- MacOS -- `Climate.Warehouse-<version>-universal.dmg`

2. Install the Climate Warehouse Aux Application

   Windows:

   - Double click `Climate.Warehouse.Setup.<version>.exe`. The application will be installed automatically and will create a Desktop icon called `Climate Warehouse`. The application will launch automatically.

   MacOS:

   - Double click `Climate.Warehouse-<version>-universal.dmg`. The application will install automatically. You'll need to drag the `Climate Warehouse` icon to the `Applications` folder.

<div class="figure">
      <img src="images/climate_warehouse/03_cw_gui_installer_macos.png" alt="CW GUI on MacOS"/>
      <div class="figcaption">
        <em>Drag the Climate Warehouse icon to complete the installation.</em>
      </div>
</div><br/>

- Open the `Applications` folder and double click `Climate Warehouse` to run the application.

3. Initially, there will be no projects in the Climate Warehouse.

<div class="figure">
  <img src="images/climate_warehouse/04_empty_projects.png" alt="Climate Warehouse empty Projects List"/>
</div>

You have successfully installed the Climate Warehouse. The rest of this document will show you how to create an organization, create a new project, create a new unit, and connect to a remote node.

---

## Create a new Organization

1. If you have not yet created your organization, you'll need to do so now. Click "+ Create Organization".

<div class="figure">
  <img src="images/climate_warehouse/05_create_organization.png" alt="Create a new organization"/>
</div><br/>

2. Fill in your Organization Name and Icon URL, as they are required fields. If you don't have an icon URL, you can use our default: `https://climate-warehouse.s3.us-west-2.amazonaws.com/public/orgs/me.svg`

<div class="figure">
  <img src="images/climate_warehouse/06_create_organization_fields.png" alt="Fill in fields to create a new organization"/>
</div><br/>

3. Click `OK`. You should be informed that your organization was successfully added. You will also be given an Organization ID.

<div class="figure">
  <img src="images/climate_warehouse/07_create_organization_success.png" alt="Success creating a new organization"/>
</div>

---

## Create a new project

1. To create a new project, click `My Projects`, then click `+ Create`:

<div class="figure">
  <img src="images/climate_warehouse/08_create_new_project.png" alt="Create a new project"/>
</div><br/>

2. Fill in the required fields.

<div class="figure">
  <img src="images/climate_warehouse/09_cw_new_project.png" alt="Step 1 to register a project"/>
</div>

    * Required Field

- \*Project Name -- The name of the project.
- \*Project ID -- Identifier used to track the project in the current registry.
- \*Project Developer -- Enter the name(s) of the developer(s) associated with this project, separating each with a comma.
- Program -- Use this field to categorize the project into a specific program, if applicable.
- \*Project Link -- Place a URL link to the project website or website that hosts the project and its descriptions.
- \*Sector -- Select the industry sector which the project is associated with.
- \*Project Type -- Select the corresponding type to describe the project.
- \*Project Status -- Select the status that best describes the current state of the project.
- \*Project Status Date -- Enter the date that corresponds to the above status selection.
- \*Covered by NDC -- Select whether the project is covered by Nationally Determined Contributions.
- NDC Information -- Add text description to show how the project falls under NDC.
- \*Current Registry -- Name of the registry that currently hosts the project.
- \*Registry of Origin -- The registry that originally hosted the project. If it is the same as the current registry, please list the registry again.
- \*Origin Project ID -- Identifier used to track the project in the registry that first held this project. If it is the same as the Project ID, please list the project ID again.
- \*Unit Metric -- Select the metric that best describes the mitigation outcomes achieved by this project.
- \*Methodology -- Select the methodology that is being used to evaluate the project.
- Validation Body -- Select the validation organization that is, or will, validate the project.
- Validation Date -- Enter the date when a validation was granted to the project.
- Project Tags -- Add any tags, separated by commas, to apply to this project. This can capture information not shown in other fields. <br/><br/>The rest of the steps in the registration form allow you to add optional information.

3. When you reach Step 8, click Create Project.

<div class="figure">
  <img src="images/climate_warehouse/10_ratings_tab.png" alt="Step 8 to register a project"/>
</div><br/>

4. You'll receive a message that the project was successfully created. Your project will be held in `STAGING` until you click the `Commit` button.

<div class="figure">
  <img src="images/climate_warehouse/11_successful_creation.png" alt="Success creating a project"/>
</div><br/>

5. After you click the `Commit` button, the `Commit Message` dialog will appear. If you have Units in the staging state, click `Everything`. Otherwise, clicking `Only Projects` will suffice.

<div class="figure">
  <img src="images/climate_warehouse/26_commit_message.png" alt="Commit Message dialog"/>
</div><br/>

6. You'll receive a message that the transactions have been committed. They will now be `PENDING`.

<div class="figure">
  <img src="images/climate_warehouse/12_transactions_committed.png" alt="Transactions committed pending"/>
</div><br/>

7. The blockchain will confirm the transactions after a few minutes. You'll receive a message that your data may be out of date. Click the message to refresh the Climate Warehouse.

<div class="figure">
  <img src="images/climate_warehouse/27_click_to_refresh.png" alt="Click to refresh"/>
</div><br/>

8. Your project should now be visible.

<div class="figure">
  <img src="images/climate_warehouse/14_projects_list.png" alt="New project listed"/>
</div>

You have successfully created your new project.

---

## Create a new Unit

1. To create a new unit, click `My Units`, then click `+ Create`:

<div class="figure">
  <img src="images/climate_warehouse/15_new_unit.png" alt="Create a new unit"/>
</div><br/>

2. Fill in the required fields.

<div class="figure">
  <img src="images/climate_warehouse/16_unit_fields.png" alt="Step 1 to register a unit"/>
</div>

    * Required Field

- \*External Project Location ID -- Enter the location from which the particular block of units derives. This could be the same as the project location or it might be a more specific location within the project.
- \*Unit Owner -- Enter the name of the organization that currently owns the specific set of units issued.
- \*Serial Number Pattern -- If the serial number format is different from what your organization typically uses, please enter the format here.

  > **Note: It is very important to use a well-formed regex pattern.** The default pattern of `[.*\D]+([0-9]+)+[-][.*\D]+([0-9]+)$` will allow a combination of letters and numbers with a hyphen separating them, such as `abc100-abd105` and `abcde1-a12345`.
- \*Serial Number Block -- Enter the serial number block.
- In-Country Jurisdiction Of Owner -- If applicable, enter the region within the country selected above.
- \*Country Jurisdiction Of Owner -- Select the country which has jurisdiction over the set of units issued.
- \*Unit Type -- Select the type that best describes the units produced.
- \*Unit Status -- Select the status that best describes the current state of the units.
- \*Unit Status Reason -- Enter the appropriate reason for the status. If no reason is needed, simply enter 'N/A'.
- \*Unit Registry Link -- Enter the URL which links to the registry which hosts the units.
- \*Vintage Year -- Enter the year in which the units were awarded.
- Marketplace -- Select, or manually enter, the market on which the units are listed, if applicable.
- Marketplace Identifier -- Enter the unique identifier being listed on the marketplace which corresponds to the units in question, if applicable.
- Marketplace Link -- Enter the URL which links to the marketplace which the unit is being sold, if applicable.
- \*Corresponding Adjustment Declaration -- Select whether the units have a corresponding adjustment capability or not.
- \*Corresponding Adjustment Status -- Select the corresponding status of the corresponding adjustment.
- Unit Tags -- Enter additional information, separated by a comma, to track any additional notes against these units not already submitted in previous fields.

<br/>The rest of the steps allow you to add optional information.

3. When you reach Step 3, click Create.

<div class="figure">
  <img src="images/climate_warehouse/17_create_unit.png" alt="Step 3 to register a unit."/>
</div><br/>

4. You'll receive a message that the unit was successfully created. Your unit will be held in `STAGING` until you click the `Commit` button.

<div class="figure">
  <img src="images/climate_warehouse/18_unit_create_success.png" alt="Success creating a unit"/>
</div><br/>

5. After you click the `Commit` button, the `Commit Message` dialog will appear. If you have Projects in the staging state, click `Everything`. Otherwise, clicking `Only Units` will suffice.

<div class="figure">
  <img src="images/climate_warehouse/28_unit_commit_message.png" alt="Unit Commit Message dialog"/>
</div><br/>

6. You'll receive a message that the transactions have been committed. They will now be `PENDING`.

<div class="figure">
  <img src="images/climate_warehouse/19_unit_pending.png" alt="Unit committed pending"/>
</div><br/>

7. The blockchain will confirm the transactions after a few minutes. `No pending data at this time` will be displayed.

<div class="figure">
  <img src="images/climate_warehouse/20_no_units_pending.png" alt="No units pending"/>
</div><br/>

8. Either refresh the GUI or click `My Projects` and click `My Units` again. Your unit will now be listed in the COMMITTED tab.

<div class="figure">
  <img src="images/climate_warehouse/21_unit_committed.png" alt="New unit listed"/>
</div>

You have successfully created your new unit.

---

## Connect to a remote node

1. To connect to a remote node, first you must have created your organization. After you have done so, the `Connect` button will appear. Click this button to get started.

<div class="figure">
  <img src="images/climate_warehouse/22_connect_remote.png" alt="Connect to a remote node"/>
</div><br/>

2. The `Log in to remote node` dialog will appear. Fill in a valid server address and API key for the remote node and click `Connect`.

<div class="figure">
  <img src="images/climate_warehouse/23_remote_log_in_dialog.png" alt="Log in to remote node dialog"/>
</div><br/>

3. You will now be connected to the remote node. You'll be able to view that node's projects and units. If you would like to disconnect, click the `Disconnect` button.

<div class="figure">
  <img src="images/climate_warehouse/24_remote_connected.png" alt="Log in to remote node dialog"/>
</div><br/>

4. Click any project for a detailed view, including any locations, labels, co benefits, estimations etc which may exist.

<div class="figure">
  <img src="images/climate_warehouse/25_view_remote_project.png" alt="Log in to remote node dialog"/>
</div>
