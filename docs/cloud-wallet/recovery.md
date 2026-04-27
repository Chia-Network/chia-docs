---
title: Recovery
slug: /cloud-wallet/recovery
---

In the Cloud Wallet, recovery means rekeying your vault: you change one or more of the vault’s spend key, recovery key, and/or recovery timelock. Recovery does not move your coins to a different vault by itself; it updates which keys and recovery timelock/clawback rules control the vault you already have.

There are two ways to recover a vault: Instant Recovery and Timelocked Recovery. They address different situations depending on whether you still have your spend key.

## Instant Recovery

Instant Recovery (also called Instant Rekey) lets you rotate your vault’s spend key, recovery key, and/or recovery timelock immediately, in a single transaction, with no waiting period. You prove you still control the vault by signing with your current spend key. The app asks you to confirm explicitly; nothing runs automatically.

### When to use it

Use Instant Recovery when you still have your spend key and you need to change keys or the timelock without going through timelocked recovery.

Primary use cases:

1. New device. If you use the Chia Signer app, your spend key lives in hardware-backed storage on your phone and cannot be copied to another device. When you get a new phone, you migrate by rekeying. As long as you still have the old device, you can use Instant Recovery to point the vault at keys on the new device.

2. Emergency or compromised recovery key. If someone else gets your recovery material (for example your 24-word phrase) and starts a timelocked recovery, they must wait for the recovery clawback timer to expire. You will receive an email alert for the attempted recovery. You cancel that recovery with your spend key during the clawback window, then use Instant Recovery to set a new recovery key so the compromised recovery key is no longer valid.

3. Lost recovery key. If you still have your spend key but never backed up your recovery phrase (or lost it), you are not stuck forever: use Instant Recovery to install a new recovery key without waiting.

### Requirements

You must still possess the vault’s current spend key. Instant Recovery is not available if the spend key is lost, stolen in a way you cannot use, or otherwise inaccessible. In those cases you use Timelocked Recovery with your recovery key (if you have it).

### How it works (high level)

You choose the new spend key, recovery key, and/or timelock values the vault should use next. You confirm the action in the app. You sign the rekey transaction with your existing spend key. After the transaction confirms on-chain, the vault is updated immediately. There is no clawback wait for this path.

## Timelocked Recovery

Timelocked Recovery is for when you no longer have access to your spend key, for example if your phone is lost or damaged and you cannot sign with the Signer key anymore.

### What you need

Your recovery key (for example your 24-word recovery phrase for a BLS recovery key).

### What to expect

You initiate recovery with the recovery key and propose the new keys/timelock. The vault enforces a recovery clawback period before the recovery can be completed. During that window, anyone who still has the old spend key can cancel the recovery. After the timer expires, you complete recovery with the keys you locked in when you started (you cannot silently swap to different keys mid-flight without going through the rules described in the [FAQ](/cloud-wallet/faq#recovery)).

:::warning

If you lose both your spend key and your recovery key (with no usable backup), no recovery path can restore the vault. Chia Network does not hold copies of your keys.

:::

## Which should I use?

| Situation                                  | Path                                                                                                                                          |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| You still have your spend key              | Instant Recovery: fast rekey, no clawback wait for the rekey itself.                                                                          |
| You lost your spend key (or cannot use it) | Timelocked Recovery: use your recovery phrase and wait for the clawback period before completing recovery.                                    |
| Your recovery key is compromised           | Cancel any pending timelocked recovery with your spend key during the clawback window, then Instant Recovery to rotate to a new recovery key. |

## Recovery clawback

When a vault is created, you set a recovery clawback duration (a waiting period). If someone starts a timelocked recovery, that timer must elapse before the recovery can finish. The delay gives the legitimate owner, who may still have the spend key, time to see an alert (for example by email) and cancel a malicious attempt. Instant Recovery does not replace this mechanism for the timelocked path; it is the fast path when the spend key is still yours.
