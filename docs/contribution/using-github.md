---
title: Using Github for Chia Contributions
slug: /contribution/using-github
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import ForkButton from '@site/static/img/contributing/fork-button.webp';
import CodeButton from '@site/static/img/contributing/code-button.webp';
import AddGPG from '@site/static/img/contributing/userbar-account-settings-global-nav-update.webp';

## Using GitHub

We use Github for source code control, the two main ways to interact with Github are via the web browser or via cli commands, the below links are focused on the web browser access.

### Create a Github Account
:::info
The below information has been copied from the [Github docs](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github).
:::

To get started with GitHub, you'll need to create a free personal account on GitHub.com and verify your email address.

Every person who uses GitHub.com signs in to a personal account. Your personal account is your identity on GitHub.com and has a username and profile. For example, see [@octocat's profile](https://github.com/octocat).

Later, you can explore the different types of accounts that GitHub offers, and decide if you need a billing plan. For more information, see ["Types of GitHub accounts"](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts) and ["GitHub’s plans"](https://docs.github.com/en/get-started/learning-about-github/githubs-plans).

Note that the steps in this article don't apply to Enterprise Managed Users. If your GitHub account has been created for you by your company, you can skip this article and continue to ["Hello World"](https://docs.github.com/en/get-started/start-your-journey/hello-world).

#### Signing up for a Personal Account

1. Navigate to https://github.com/. 
2. Click Sign up. 
3. Follow the prompts to create your personal account.

During sign up, you'll be asked to verify your email address. Without a verified email address, you won't be able to complete some basic GitHub tasks, such as creating a repository.

If you're having problems verifying your email address, there are some troubleshooting steps you can take. For more information, see ["Verifying your email address"](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/verifying-your-email-address#troubleshooting-email-verification).

#### Next Steps

- Now that you've created your personal account, we'll start to explore the basics of GitHub. In the next tutorial, "Hello World," you'll learn about repositories and how to create one, and you'll be introduced to concepts such as branching, commits, and pull requests. 
- We strongly recommend that you configure 2FA for your account. 2FA is an extra layer of security that can help keep your account secure. For more information, see "Configuring two-factor authentication."

---

### Installing Github Desktop

:::info
The below information has been adapted from the [Github docs](https://docs.github.com/en/desktop/installing-and-authenticating-to-github-desktop/installing-github-desktop).
:::

You can install GitHub Desktop on Windows 10 64-bit or later.

:::warning
You must have a 64-bit operating system to run GitHub Desktop.
:::

1. Visit the [download page for GitHub Desktop](https://desktop.github.com/). 
2. Click Download for Windows. 
3. In your computer's Downloads folder, double-click the GitHub Desktop setup file. 
4. GitHub Desktop will launch after installation is complete.

---

### Forking a Repository

:::info
The below information has been adapted from the [Github docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
:::

A fork is a new repository that shares code and visibility settings with the original “upstream” repository.  

You might fork a project to propose changes to the upstream repository. In this case, it's good practice to regularly sync your fork with the upstream repository. To do this, you'll need to use Git on the command line. You can practice setting the upstream repository using the same [Chia-Network/chia-docs](https://github.com/Chia-Network/chia-docs) repository you just forked.

1. On GitHub.com, navigate to the [Chia-Network/chia-docs](https://github.com/Chia-Network/chia-docs) repository. 
2. In the top-right corner of the page, click Fork.
<div style={{ textAlign: 'left' }}>
  <img src={ForkButton} alt='Fork a Repository in Github' />
</div>
<br />

3. Under "Owner," select the dropdown menu and click an owner for the forked repository. 
4. By default, forks are named the same as their upstream repositories. Optionally, to further distinguish your fork, in the "Repository name" field, type a name. 
5. Optionally, in the "Description" field, type a description of your fork. 
6. Optionally, select Copy the DEFAULT branch only. 
For many forking scenarios, such as contributing to open-source projects, you only need to copy the default branch. If you do not select this option, all branches will be copied into the new fork.
7. Click Create fork.

:::note
If you want to copy additional branches from the upstream repository, you can do so from the Branches page. For more information, see ["Creating and deleting branches within your repository"](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository).
:::

#### Cloning a Forked Repository

:::info
The below information has been adapted from the [Github docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo?tool=webui#cloning-your-forked-repository).
:::

Right now, you have a fork of the chia-docs repository, but you do not have the files in that repository locally on your computer.

1. On GitHub.com, navigate to your fork of the Chia-Network/chia-docs repository. 
2. Above the list of files, click <> **Code**.

<div style={{ textAlign: 'left' }}>
  <img src={CodeButton} alt='Clone a Repository in Github' />
</div>
<br />

3. Click "Open with Github Desktop" (this clones the repo locally where you can edit it)

---

### Setup Commit Signing

:::info
All Chia related Github repos require the signing of commits, follow the outlined process to setup automated commit signing for the Github Desktop Application.
:::

#### Generating a New GPG Key

:::info
The below information has been adapted from the [Github docs](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key).
:::

:::note
Note: Before generating a new GPG key, make sure you've verified your email address. If you haven't verified your email address, you won't be able to sign commits and tags with GPG. For more information, see ["Verifying your email address"](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/verifying-your-email-address).
:::

1. Download and install [the GPG command line tools](https://www.gnupg.org/download/) for your operating system. We generally recommend installing the latest version for your operating system. 
2. Open Git Bash. 
3. Generate a GPG key pair. Since there are multiple versions of GPG, you may need to consult the relevant [man page](https://en.wikipedia.org/wiki/Man_page) to find the appropriate key generation command. 
   - If you are on version 2.1.17 or greater, paste the text below to generate a GPG key pair.
    ```shell
      gpg --full-generate-key
    ```
   - If you are not on version 2.1.17 or greater, the gpg --full-generate-key command doesn't work. Paste the text below and skip to step 6.
    ```shell
      gpg --default-new-key-algo rsa4096 --gen-key
    ```

4. At the prompt, specify the kind of key you want, or press `Enter` to accept the default. 
5. At the prompt, specify the key size you want, or press `Enter` to accept the default.
6. Enter the length of time the key should be valid. Press `Enter` to specify the default selection, indicating that the key doesn't expire. Unless you require an expiration date, we recommend accepting this default. 
7. Verify that your selections are correct. 
8. Enter your user ID information.
:::note
When asked to enter your email address, ensure that you enter the verified email address for your GitHub account. To keep your email address private, use your GitHub-provided no-reply email address. For more information, see "Verifying your email address" and "Setting your commit email address."
:::
9. Type a secure passphrase. 
10. Use the `gpg --list-secret-keys --keyid-format=long` command to list the long form of the GPG keys for which you have both a public and private key. A private key is required for signing commits or tags.
    ```shell
      gpg --list-secret-keys --keyid-format=long
    ```
:::note
Some GPG installations on Linux may require you to use gpg2 --list-keys --keyid-format LONG to view a list of your existing keys instead. In this case you will also need to configure Git to use gpg2 by running git config --global gpg.program gpg2.
:::
11. From the list of GPG keys, copy the long form of the GPG key ID you'd like to use. In this example, the GPG key ID is 3AA5C34371567BD2:
  ```shell
    $ gpg --list-secret-keys --keyid-format=long
    /Users/hubot/.gnupg/secring.gpg
    ------------------------------------
    sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
    uid                          Hubot <hubot@example.com>
    ssb   4096R/4BB6D45482678BE3 2016-03-10
  ```
12. Paste the text below, substituting in the GPG key ID you'd like to use. In this example, the GPG key ID is `3AA5C34371567BD2`:
  ```
    gpg --armor --export 3AA5C34371567BD2
    # Prints the GPG key ID, in ASCII armor format
  ```
13. Copy your GPG key, beginning with `-----BEGIN PGP PUBLIC KEY BLOCK-----` and ending with `-----END PGP PUBLIC KEY BLOCK-----`.
14. [Add the GPG key to your GitHub account](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account). 

#### Configure Git to Sign Commits by Default
    - open Git Bash and run `git config --global commit.gpgsign true`

#### Store your GPG Key Passphrase 
:::info
Storing your passphrase ensures you don't have to enter it every time you want to sign a commit, this is strictly optional.
:::
    - For Mac users, the [GPG Suite](https://gpgtools.org/) allows you to store your GPG key passphrase in the macOS Keychain. 
    - For Windows users, the [Gpg4win](https://www.gpg4win.org/) integrates with other Windows tools. 
    - You can also manually configure [gpg-agent](http://linux.die.net/man/1/gpg-agent) to save your GPG key passphrase, but this doesn't integrate with macOS Keychain like ssh-agent and requires more setup.

#### Add a GPG Key to Your GitHub Account

:::info
The below information has been adapted from the [Github docs](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account).
:::

1. In the upper-right corner of any page, click your profile photo, then click `Settings`.
<div style={{ textAlign: 'left' }}>
  <img src={AddGPG} alt='Add a GPG Key to Your Github Account' />
</div>
<br />

2. In the "Access" section of the sidebar, click **SSH and GPG keys**. 
3. Next to the "GPG keys" header, click **New GPG key**. 
4. In the "Title" field, type a name for your GPG key. 
5. In the "Key" field, paste the GPG key you copied when you [generated your GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key). 
6. Click **Add GPG key**. 
7. To confirm the action, authenticate to your GitHub account.

---

### Making a Pull Request

:::info
The below information has been adapted from the [Github docs](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project#making-a-pull-request).
:::

At last, you're ready to propose changes into the main project! This is the final step in producing a fork of someone else's project, and arguably the most important. If you've made a change that you feel would benefit the community as a whole, you should definitely consider contributing back.

To do so, head on over to the repository on GitHub where your project lives. For this example, it would be at https://github.com/<your_username>/chia-docs. You'll see a banner indicating that your branch is one commit ahead of chia-docs:main. Click **Contribute** and then **Open a pull request**.

GitHub will bring you to a page that shows the differences between your fork and the Chia-Network/chia-docs repository. Click **Create pull request**.

GitHub will bring you to a page where you can enter a title and a description of your changes. It's important to provide as much useful information and a rationale for why you're making this pull request in the first place. The project owner needs to be able to determine whether your change is as useful to everyone as you think it is. Finally, click **Create pull request**.

---

## Contribution support

Join Our [Discord](https://discord.gg/chia) and jump into the #support channel for support.

---
