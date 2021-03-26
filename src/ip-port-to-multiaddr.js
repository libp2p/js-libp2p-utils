'use strict'

const multiaddr = require('multiaddr')
const errCode = require('err-code')
const { Address4, Address6 } = require('ip-address')

const errors = {
  ERR_INVALID_IP_PARAMETER: 'ERR_INVALID_IP_PARAMETER',
  ERR_INVALID_PORT_PARAMETER: 'ERR_INVALID_PORT_PARAMETER',
  ERR_INVALID_IP: 'ERR_INVALID_IP'
}

/**
 * Transform an IP, Port pair into a multiaddr
 *
 * @param {string} ip
 * @param {number|string} port
 */
function ipPortToMultiaddr (ip, port) {
  if (typeof ip !== 'string') {
    throw errCode(new Error(`invalid ip provided: ${ip}`), errors.ERR_INVALID_IP_PARAMETER)
  }

  // @ts-ignore parseInt expects only string
  port = parseInt(port)

  if (isNaN(port)) {
    throw errCode(new Error(`invalid port provided: ${port}`), errors.ERR_INVALID_PORT_PARAMETER)
  }

  try {
    // Test valid IPv4
    new Address4(ip) // eslint-disable-line no-new
    return multiaddr(`/ip4/${ip}/tcp/${port}`)
  } catch (_) {}

  try {
    // Test valid IPv6
    const ip6 = new Address6(ip)
    return ip6.is4()
      ? multiaddr(`/ip4/${ip6.to4().correctForm()}/tcp/${port}`)
      : multiaddr(`/ip6/${ip}/tcp/${port}`)
  } catch (err) {
    throw errCode(new Error(`invalid ip:port for creating a multiaddr: ${ip}:${port}`), errors.ERR_INVALID_IP)
  }
}

module.exports = ipPortToMultiaddr

module.exports.Errors = errors
