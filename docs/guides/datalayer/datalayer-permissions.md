---
slug: /guides/datalayer-permissions
title: DataLayer Permissions
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

Chia DataLayer™ is a decentralized database that enables the redundant storage of off-chain data, auditable on the Chia blockchain. DataLayer uses an open and permissionless publish/subscribe model, which makes it possible for anyone to view and audit the data.

Many users -- especially those in the enterprise space -- would like to keep their data private.

DataLayer Permissions give owners of data stores a method to gate participation, thus keeping their data private. This is accomplished by using customizable plugins.

This guide will show you how to get started with DataLayer Permissions. Additional resources include:
* [DataLayer user guide](/guides/datalayer-user-guide) -- You should already be familiar with using DataLayer before working with permissions. This guide will help you to get started
* [S3 plugin](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/data_layer/s3_plugin_service.py) -- This is the reference plugin for Amazon S3 integration. It is [discussed](#the-chia-s3-plugin) later in this guide
* [Source API calls](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/data_layer/data_layer.py) -- In case you want to dig into the source code
* [CLI documentation](/datalayer-cli) for DataLayer
* [RPC documentation](/datalayer-rpc) for DataLayer

## About DataLayer permissions

Support for permissions were added to DataLayer in version 1.8.0 of the Chia reference wallet. The permissioning system requires uploader (publisher) and downloader (subscriber) plugins, which function as follows:
* When you push any changes to your DataLayer singleton, the uploader plugin is called
* When one of your subscribed singletons makes any on-chain changes, the downloader plugin is called

The uploader and downloader plugins take the form of a service that exposes a specific RESTful API that DataLayer will call. This service can be configured in multiple different ways:
* Uploader only
* Downloader only
* Both uploader and downloader

Multiple instances of the same service are also possible. The service can be configured to require credentials, thereby gating access to data.

## Chia configuration

To configure Chia to use DataLayer permissions, you need to add a list of URLs to config.yaml which allows access to the uploaders and downloaders. The settings to configure are new as of 1.8.0. To add them, you have two options:

1. Start from scratch
    * Delete or rename `~/.chia/mainnet/config/config.yaml`
    * Run `chia init`; a new copy of config.yaml that contains the new settings will be generated

2. Add the settings manually
    * Edit `~/.chia/mainnet/config/config.yaml`
    * Under the `data_layer:` settings, add the following new lines:
      * `downloaders: []`
      * `uploaders: []`

At this point, you can edit config.yaml and add the URL path(s) to either or both of the plugins. Be sure to remove the square brackets `[]` if you add any URLs. For example, a snippet of config.yaml with the uploaders and downloaders configured might look like this:

```yaml
data_layer:
  client_timeout: 15
  database_path: data_layer/db/data_layer_CHALLENGE.sqlite
  downloaders:
  - http://localhost:9456
  - http://localhost:3145
...
  uploaders:
  - http://localhost:9456
  - http://localhost:9384
```

Finally, restart Chia, ensuring that DataLayer and the propagation server are both configured to run. This is the only configuration that is required in Chia itself. The rest of the configuration is left up to the plugin service.

## REST API

The expected REST API for the plugins is as follows - all requests are `POST` requests.

:::note
TLS connections are not yet supported. They may work as long as the proper root certificates are in the Chia certificate bundle, but this is untested.
:::

---

### `handle_upload`

Functionality: Configure a store for uploading

Request Parameters:

| Parameter          | Type   | Required | Description                 |
| :----------------- | :----- | :------- | :-------------------------- |
| store_id           | STRING | True     | The store ID, in hex format |

Response: `{"handle_upload": [true|false]}`

---

### `handle_download`

Functionality: Configure a store for downloading from a mirror

Request Parameters:

| Parameter          | Type   | Required | Description                            |
| :----------------- | :----- | :------- | :------------------------------------- |
| store_id           | STRING | True     | The store ID, in hex format            |
| url                | STRING | True     | The URL of the mirror to download from |

Response: `Response: {"handle_download": [true|false]}`

:::note
Technically the mirror URL is just a string. It's not required to be formatted as a URI, but it's expected it will normally be such (eg, http://, s3://, file://, ftp://, etc)
:::

---

### `upload`

Functionality: Upload data to a store

Request Parameters:

| Parameter          | Type   | Required | Description                 |
| :----------------- | :----- | :------- | :-------------------------- |
| store_id           | STRING | True     | The store ID, in hex format |
| full_tree_filename | STRING | True     | Name of full tree dat file  |
| diff_filename      | STRING | True     | Name of delta dat file      |

Response: `{"uploaded": [true|false]}`

:::note
The filenames are just - names - and the plugin is expected to be configured such that it can locate these files. We do _not_ send the entire file contents. This does mean that the plugin needs access to a shared file system. Therefore, although the plugin service could technically run on a separate machine, we expect most plugin services to be run on the localhost.
:::

---

### `download`

Functionality: Download a data file from a URI

Request Parameters:

| Parameter          | Type   | Required | Description                                          |
| :----------------- | :----- | :------- | :--------------------------------------------------- |
| url                | STRING | True     | The URI for the download, eg `"server_info.url"`     |
| filename           | STRING | True     | The name of the file to download, eg `"file1.dat"`   |

Response:  `{"downloaded": [true|false]}`

:::note
The downloader plugin _must_ place the files into the same directory that Chia DataLayer expects files - which is configured in the chia config.yaml configuration as `service_files_location`
:::

---

### `add_missing_files`

Functionality: Add missing files to a store

Request Parameters:

| Parameter          | Type   | Required | Description                                                              |
| :----------------- | :----- | :------- | :----------------------------------------------------------------------- |
| store_id           | STRING | True     | The store ID, in hex format                                              |
| files              | LIST   | True     | The list of files to be added, for example: `["file1.dat", "file2.dat"]` |

Response: `{"uploaded": [true|false]}`

:::note
Chia DataLayer will provide a complete list of DAT files for all generations from the beginning to the end that are needed to reconstruct the entire data. The plugin is expected to check its internal list of files and then upload whatever files might be missing. This is useful when adding a new uploader plugin to an existing deployment, or for troubleshooting. This is triggered automatically when [add_missing_files](/datalayer-cli#add_missing_files) is run on the CLI.
:::

---

### `plugin_info`

Functionality: Show info about the plugin

Request Parameters: None

Response: The plugin may return any information it considers useful for this call. The output will be displayed when the `chia data plugins check` CLI command is run. As a minimum, the plugin should response with an `HTTP 200` response code , but typically some amount of text information is also expected (name, version, etc) in JSON format.

## The Chia S3 plugin

Chia Network has released a [reference S3 uploader/downloader plugin](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/data_layer/s3_plugin_service.py), which demonstrates how to use the plugin system, and also offers support for [Amazon S3](https://aws.amazon.com/s3/).

This plugin implements the REST API from the [previous section](#rest-api). It uses the native AWS python library ([boto3](https://pypi.org/project/boto3/)) to upload and download from S3. Along with this, it uses the typical credentials expected by an AWS resource.

By providing credentials configured correctly, the plugin can do downloads with a read-only credential and uploads with a write-credential. **Without access to the credentials, the data in S3 is unavailable at large to the public - hence "permissioned".**

A few notes about the S3 plugin:
* It expects the mirror URL to use the `s3://` scheme for downloads; it requires a bucket name for uploads.
* It expects to be configured with a list of `store_ids` it is responsible for, along with an `upload_bucket` and/or a list of s3 `download_urls`.
* Either `upload_bucket`, or `download_urls`, or both must be configured.

Example configuration:

```
Test-Instance: # just a name for the instance
  log_filename: "s3_plugin.log"
  log_level: INFO 
  server_files_location: # generally this only works if set to the same location as the Chia DataLayer `server_files_location`
  port: 8998
  aws_credentials:
    access_key_id: "xxx"
    secret_access_key: "xxx"
    region: "xxx"

  stores:
    - store_id: "7acfcbd1ed73bfe2b698508f4ea5ed353c60ace154360272ce91f9ab0c8423c3"
      upload_bucket: "chia-datalayer-test-bucket-2"
      download_urls: ["s3://hello", "s3://goodbye"]
    - store_id: "a14daf55d41ced6419bcd011fbc1f74ab9567fe55340d88435aa6493d628fa47"
      upload_bucket:
      download_urls: ["s3://hello", "s3://goodbye"]
```

The S3 plugin also supports the following optional endpoints. These are not called directly by the chia datalayer service, but are useful for further configuration of the plugin:

### `healthz`

Functionality: Verifies that the RPC service is running

Request Parameters: None

Response: `{"success": true}`

---

### `add_store_id`

Functionality: Add a new store

Request Parameters:

| Parameter          | Type   | Required | Description                                                                                                 |
| :----------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------- |
| store_id           | STRING | True     | The store ID, in hex format                                                                                 |
| bucket             | STRING | True*    | The name of the S3 bucket [* Either `bucket` or `urls` or both is required]                                 |
| urls               | LIST   | True*    | A list of s3 URLs, for example `["s3://one", "s3://two"]` [* Either `bucket` or `urls` or both is required] |

Success Response: `{"success": true, "id": store id}`

Failure Response: `{"success": false, "reason": "reason for failure"}`

:::note
Calling `add_store_id` for a `store_id` already in the config returns an error - there is no update option, only add and delete.
:::

---

### `remove_store_id`

Functionality: Remove a store

Request Parameters:

| Parameter          | Type   | Required | Description                                                              |
| :----------------- | :----- | :------- | :----------------------------------------------------------------------- |
| store_id           | STRING | True     | The store ID, in hex format                                              |

Response: `{"success": [true|false], "store_id":store id in hex if successful}`

:::note
Removing a store ID that is not present in the config returns a True success code, but is otherwise ignored
:::

---