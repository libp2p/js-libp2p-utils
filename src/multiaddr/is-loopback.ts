// @ts-expect-error is-loopback-addr does not publish types
import isLoopbackAddr from 'is-loopback-addr'
import type { Multiaddr } from 'multiaddr'

/**
 * Check if a given multiaddr is a loopback address.
 */
export function isLoopback (ma: Multiaddr) {
  const { address } = ma.nodeAddress()

  return isLoopbackAddr(address)
}
