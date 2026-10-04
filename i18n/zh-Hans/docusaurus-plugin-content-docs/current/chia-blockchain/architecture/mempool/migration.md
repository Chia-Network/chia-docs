---
title: Migration
slug: /chia-blockchain/architecture/mempool/migration
---

## Schema Changes and Migration (Chia 2.5.5+)

Starting in Chia 2.5.5, the mempool has undergone backwards incompatible schema changes to support the new fast-forward functionality and optimizations.

### Backwards Incompatible Changes

**Available in**: Chia 2.5.5 and later versions

The mempool schema has been updated to support:

- **Fast-forward processing** for singleton and vault transactions
- **Enhanced transaction deduplication** mechanisms
- **Improved memory management** and performance optimizations

### Migration Notes

**Important**: These changes are backwards incompatible. Nodes running versions prior to 2.5.5 may experience issues when connecting to nodes running 2.5.5+.

**Required Actions**:

- **Upgrade all nodes** to Chia 2.5.5+ simultaneously
- **Clear mempool data** if upgrading from versions prior to 2.5.5, this will occur automatically after restarting services
- **Restart services** after upgrade to ensure new schema is applied

**Downgrade Instructions**:
If you need to downgrade from Chia 2.5.5+ back to an earlier version, you must first fix the database schema incompatibility. See the [Database Schema Compatibility Issues section](/reference-client/troubleshooting/node-syncing#database-schema-compatibility-issues) for the required database fix command and detailed instructions.

**Impact**:

- Existing mempool data may not be compatible with new schema
- Transaction processing behavior has changed (see optimizations above)
- Performance improvements require full network adoption
