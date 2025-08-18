---
title: Configuration
slug: /reference-client/install-and-setup/configuration
---

# Chia Configuration Guide

This page provides comprehensive documentation for all Chia configuration options. The configuration file is located at `~/.chia/mainnet/config/config.yaml` and controls various aspects of your Chia node's behavior.

## Configuration File Location

| Operating System | Path |
|------------------|------|
| Linux/macOS | `~/.chia/mainnet/config/config.yaml` |
| Windows | `C:\Users\%USERNAME%\.chia\mainnet\config\config.yaml` |

## Configuration Structure

The Chia configuration file uses YAML format and is organized into service-specific sections. Each service (full_node, farmer, harvester, etc.) has its own configuration block.

## Full Node Configuration

### Block Creation Settings

#### `full_node:block_creation`

**Available in**: Chia 2.5.5 and later versions

Controls which block creation algorithm to use.

**Values**:
- `0` (default): Legacy block creation algorithm
- `1`: New, optimized block creation algorithm

**Example**:
```yaml
full_node:
  block_creation: 1  # Enable new algorithm
```

**Benefits of New Algorithm**:
- Improved block creation performance
- Better memory management during block creation
- Enhanced handling of high-transaction-volume scenarios
- More efficient resource utilization

#### `full_node:block_creation_timeout`

**Available in**: Chia 2.5.5 and later versions

Sets a configurable timeout for block creation operations.

**Default**: No timeout (uses system default)

**Example**:
```yaml
full_node:
  block_creation: 1  # Enable new algorithm
  block_creation_timeout: 30  # 30 second timeout
```

**Use Cases**:
- Fine-tune block creation based on network conditions
- Prevent hanging on complex block creation scenarios
- Optimize for different hardware capabilities

### Complete Full Node Configuration Example

```yaml
full_node:
  # Block creation settings (Chia 2.5.5+)
  block_creation: 1
  block_creation_timeout: 30
  
  # Network settings
  port: 8444
  max_inbound_connections: 50
  max_outbound_connections: 50
  
  # Database settings
  db_path: db/blockchain_v2_mainnet.sqlite
  
  # Logging
  logging:
    log_level: INFO
    log_filename: log/debug.log
```

## Farmer Configuration

### Basic Farmer Settings

```yaml
farmer:
  # Network settings
  port: 8447
  
  # Logging
  logging:
    log_level: INFO
    log_filename: log/debug.log
```

## Harvester Configuration

### Basic Harvester Settings

```yaml
harvester:
  # Plot directory settings
  plot_directories:
    - /path/to/plots
  
  # Logging
  logging:
    log_level: INFO
    log_filename: log/debug.log
```

## Wallet Configuration

### Basic Wallet Settings

```yaml
wallet:
  # Network settings
  port: 9256
  
  # Logging
  logging:
    log_level: INFO
    log_filename: log/debug.log
```

## Logging Configuration

### Log Levels

All services support configurable logging levels:

```yaml
logging:
  log_level: INFO  # Options: DEBUG, INFO, WARNING, ERROR
  log_filename: log/debug.log
  log_stdout: false
```

### Log File Management

By default, Chia rotates log files when they reach 20MB, keeping up to 7 old log files.

## SSL/TLS Configuration

SSL certificates are automatically generated and stored in the `ssl/` directory. These are used to secure RPC communications between services.

## Environment-Specific Configurations

### Mainnet vs Testnet

By default, Chia uses the same configuration file for both mainnet and testnet:

- **Default Location**: `~/.chia/mainnet/config/config.yaml`

**Note**: The same `config.yaml` file is used for both networks unless you explicitly set a different `CHIA_ROOT` environment variable and initialize a new directory structure.

To use separate configurations for testnet:
1. Set `CHIA_ROOT=~/.chia/testnet` before running `chia init`
2. This creates a separate `~/.chia/testnet/config/config.yaml` file
3. Each network will then use its own configuration file

### Headless vs GUI

The same configuration file is used for both headless and GUI installations. The GUI reads from this file and updates it when settings are changed through the interface.

## Configuration Best Practices

### 1. Backup Your Configuration

Always backup your configuration file before making changes:

```bash
cp ~/.chia/mainnet/config/config.yaml ~/.chia/mainnet/config/config.yaml.backup
```

### 2. Test Changes

Test configuration changes on testnet before applying to mainnet.

### 3. Restart Services

Most configuration changes require restarting the affected services to take effect.

### 4. Use YAML Syntax

Ensure proper YAML formatting:
- Use spaces (not tabs) for indentation
- Maintain consistent indentation levels
- Quote values that contain special characters

## Common Configuration Issues

### 1. YAML Syntax Errors

**Problem**: Invalid YAML syntax prevents the configuration from loading.

**Solution**: Use a YAML validator or check indentation and formatting.

### 2. Permission Issues

**Problem**: Configuration file cannot be read or written.

**Solution**: Ensure proper file permissions and ownership.

### 3. Service-Specific Errors

**Problem**: Individual services fail to start due to configuration issues.

**Solution**: Check the service-specific configuration blocks and logs.

## Advanced Configuration

### Custom RPC Endpoints

You can configure custom RPC endpoints and authentication:

```yaml
full_node:
  rpc_port: 8555
  rpc_host: 127.0.0.1
```

### Network Optimization

For advanced users, you can optimize network settings:

```yaml
full_node:
  max_inbound_connections: 100
  max_outbound_connections: 100
  target_outbound_connections: 8
```

## Getting Help

If you encounter configuration issues:

1. Check the [Troubleshooting section](/reference-client/troubleshooting/check-if-things-are-working)
2. Review the [Logging Reference](/reference-client/troubleshooting/logging-reference)
3. Check the [Node Syncing guide](/reference-client/troubleshooting/node-syncing) for network-related issues
4. Join the [Chia Discord](https://discord.gg/chia) for community support

## Related Documentation

- [Installation Guide](/reference-client/install-and-setup/installation)
- [Headless Node Setup](/reference-client/install-and-setup/headless-node)
- [Key Management](/reference-client/install-and-setup/key-management)
- [Troubleshooting](/reference-client/troubleshooting/check-if-things-are-working)
