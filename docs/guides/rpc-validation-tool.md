---
slug: /guides/rpc-validation-tool
title: RPC Validation Tool
---

# RPC Validation Tool

The RPC Validation Tool is a new utility introduced in Chia Blockchain version 2.5.5 that allows developers and node operators to independently validate the functionality of full node RPC endpoints.

:::info Related Documentation

- **[Full Node RPC Reference](/reference-client/rpc-reference/full-node-rpc)** - Complete documentation of all available RPC endpoints
- **[RPC Overview](/reference-client/rpc-reference/rpc)** - General information about Chia's RPC system
- **[Node Troubleshooting](/reference-client/troubleshooting/node-syncing)** - Common node issues and solutions
  :::

## Overview

The `tools/validate_rpcs.py` tool provides a comprehensive way to test and validate that your Chia full node's RPC endpoints are working correctly. This is particularly useful for:

:::note What This Tool Is

- **Type**: Python utility script (not an RPC service)
- **Purpose**: Tests and validates existing RPC endpoints
- **Target**: Your running full node's RPC functionality
- **No New RPCs**: This tool does not add new RPC endpoints
  :::

- **Testing RPC functionality** after node updates
- **Debugging RPC issues** in development environments
- **Validating RPC responses** for consistency
- **Ensuring RPC compliance** with expected behavior

## Availability

**Available in**: Chia Blockchain 2.5.5 and later versions

## Prerequisites

- Chia Blockchain 2.5.5+ installed
- A running full node (local or remote)
- Python environment with access to the chia-blockchain tools directory

## Location

The tool is located at:

```
tools/validate_rpcs.py
```

## Usage

### Basic Usage

```bash
python tools/validate_rpcs.py [OPTIONS]
```

### Command Line Options

| Option      | Description                    | Default                                                      |
| ----------- | ------------------------------ | ------------------------------------------------------------ |
| `--host`    | Full node host address         | `localhost`                                                  |
| `--port`    | Full node RPC port             | `8555`                                                       |
| `--cert`    | Path to SSL certificate        | `~/.chia/mainnet/config/ssl/full_node/private_full_node.crt` |
| `--key`     | Path to SSL private key        | `~/.chia/mainnet/config/ssl/full_node/private_full_node.key` |
| `--timeout` | RPC request timeout in seconds | `30`                                                         |
| `--verbose` | Enable verbose output          | `False`                                                      |
| `--help`    | Show help message              | N/A                                                          |

### Example Commands

#### Validate Local Node

```bash
python tools/validate_rpcs.py
```

#### Validate Remote Node

```bash
python tools/validate_rpcs.py --host 192.168.1.100 --port 8555
```

#### Validate with Custom Certificates

```bash
python tools/validate_rpcs.py --cert /path/to/cert.crt --key /path/to/key.key
```

#### Verbose Validation

```bash
python tools/validate_rpcs.py --verbose
```

:::info RPC Endpoint Details
For detailed information about each RPC endpoint, including parameters, response formats, and examples, see the [Full Node RPC Reference](/reference-client/rpc-reference/full-node-rpc).
:::

## What Gets Validated

The tool validates all available full node RPC endpoints and their responses. For a complete list of RPC endpoints and their detailed documentation, see the [Full Node RPC Reference](/reference-client/rpc-reference/full-node-rpc).

### RPC Endpoints Validated

The validation tool tests all RPC endpoints documented in the [Full Node RPC Reference](/reference-client/rpc-reference/full-node-rpc), including but not limited to:

- **Block-related endpoints**: `get_block`, `get_blocks`, `get_block_record`, etc.
- **Mempool endpoints**: `get_all_mempool_items`, `get_mempool_item_by_tx_id`, etc.
- **Coin endpoints**: `get_coin_records_by_puzzle_hash`, `get_coin_record_by_name`, etc.
- **Network endpoints**: `get_network_space`, `get_blockchain_state`, etc.
- **Transaction endpoints**: `push_tx`, `get_puzzle_and_solution`, etc.

:::info Tool vs RPC Service
**Important**: The `tools/validate_rpcs.py` is a **Python utility script**, not an RPC service. It does not expose RPC endpoints itself. Instead, it connects to your existing full node and tests all of its RPC endpoints to ensure they're working correctly.
:::

### Validation Checks

For each RPC endpoint, the tool performs:

1. **Connectivity Test** - Verifies the node is reachable
2. **Authentication Test** - Validates SSL certificate and key
3. **Response Format Test** - Checks response structure and required fields
4. **Data Consistency Test** - Validates response data types and ranges
5. **Error Handling Test** - Tests proper error responses for invalid requests

## Output

### Success Output

```
✅ RPC Validation Complete
Total Endpoints Tested: 25
Successful Validations: 25
Failed Validations: 0
Validation Time: 12.34 seconds
```

### Error Output

```
❌ RPC Validation Failed
Total Endpoints Tested: 25
Successful Validations: 23
Failed Validations: 2

Failed Endpoints:
- get_block: Connection timeout
- get_blocks: Invalid response format
```

### Verbose Output

With `--verbose` flag, you'll see detailed information for each endpoint:

```
🔍 Testing get_blockchain_state...
  ✅ Response received in 0.15s
  ✅ Response format valid
  ✅ Required fields present
  ✅ Data types correct

🔍 Testing get_block...
  ❌ Request failed: Connection timeout
```

## Troubleshooting

### Common Issues

#### Connection Refused

```
Error: Connection refused to localhost:8555
```

**Solution**: Ensure your full node is running and the RPC port is accessible.

#### SSL Certificate Issues

```
Error: SSL certificate validation failed
```

**Solution**: Verify the certificate and key paths are correct and the files exist.

#### Timeout Errors

```
Error: Request timeout after 30 seconds
```

**Solution**: Increase the timeout value with `--timeout 60` or check network connectivity.

#### Permission Denied

```
Error: Permission denied accessing certificate files
```

**Solution**: Ensure proper file permissions on SSL certificate and key files.

### Debug Mode

For advanced troubleshooting, you can run the tool with Python's debugger:

```bash
python -m pdb tools/validate_rpcs.py --verbose
```

## Integration

### Continuous Integration

You can integrate this tool into your CI/CD pipeline to validate RPC functionality:

```yaml
# Example GitHub Actions workflow
- name: Validate RPC Endpoints
  run: |
    python tools/validate_rpcs.py --host ${{ secrets.NODE_HOST }} --port ${{ secrets.NODE_PORT }}
```

### Automated Testing

Use the tool in automated testing scenarios:

```bash
# Run validation before deployment
python tools/validate_rpcs.py --host staging-node.example.com

# Run validation after deployment
python tools/validate_rpcs.py --host production-node.example.com
```

## Best Practices

1. **Run validation regularly** - Test RPC functionality after node updates
2. **Test in staging first** - Validate changes before applying to production
3. **Monitor validation results** - Track validation success rates over time
4. **Use appropriate timeouts** - Set realistic timeout values for your network
5. **Secure certificate access** - Ensure SSL certificates are properly protected

## Related Documentation

- [Full Node RPC Reference](/reference-client/rpc-reference/full-node-rpc)
- [Chia Installation Guide](/reference-client/install-and-setup/installation)
- [Node Troubleshooting](/reference-client/troubleshooting/node-syncing)

---

**Note**: This tool is primarily intended for developers and advanced users. Use with caution in production environments and ensure proper security measures are in place.
