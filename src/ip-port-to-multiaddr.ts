import debug from 'debug'
import { Multiaddr } from '@multiformats/multiaddr'
import errCode from 'err-code'
import { Address4, Address6 } from '@achingbrain/ip-address'

const log = Object.assign(debug('libp2p:ip-port-to-multiaddr'), {
  error: debug('libp2p:ip-port-to-multiaddr:err')
})

export const Errors = {
  ERR_INVALID_IP_PARAMETER: 'ERR_INVALID_IP_PARAMETER',
  ERR_INVALID_PORT_PARAMETER: 'ERR_INVALID_PORT_PARAMETER',
  ERR_INVALID_IP: 'ERR_INVALID_IP'
}

/**
 * Transform an IP, Port pair into a multiaddr
 */
export function ipPortToMultiaddr (ip: string, port: number | string) {
  if (typeof ip !== 'string') {
    throw errCode(new Error(`invalid ip provided: ${ip}`), Errors.ERR_INVALID_IP_PARAMETER) // eslint-disable-line @typescript-eslint/restrict-template-expressions
  }

  if (typeof port === 'string') {
    port = parseInt(port)
  }

  if (isNaN(port)) {
    throw errCode(new Error(`invalid port provided: ${port}`), Errors.ERR_INVALID_PORT_PARAMETER)
  }

  try {
    // Test valid IPv4
    new Address4(ip) // eslint-disable-line no-new
    return new Multiaddr(`/ip4/${ip}/tcp/${port}`)
  } catch {}

  try {
    // Test valid IPv6
    const ip6 = new Address6(ip)
    return ip6.is4()
      ? new Multiaddr(`/ip4/${ip6.to4().correctForm()}/tcp/${port}`)
      : new Multiaddr(`/ip6/${ip}/tcp/${port}`)
  } catch (err) {
    const errMsg = `invalid ip:port for creating a multiaddr: ${ip}:${port}`
    log.error(errMsg)
    throw errCode(new Error(errMsg), Errors.ERR_INVALID_IP)
  }
}