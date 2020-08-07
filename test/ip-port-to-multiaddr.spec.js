/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const toMultiaddr = require('../src/ip-port-to-multiaddr')
const { Errors } = require('../src/ip-port-to-multiaddr')

describe('IP and port to Multiaddr', () => {
  it('creates multiaddr from valid IPv4 IP and port', () => {
    const ip = '127.0.0.1'
    const port = '9090'
    expect(toMultiaddr(ip, port).toString()).to.equal(`/ip4/${ip}/tcp/${port}`)
  })

  it('creates multiaddr from valid IPv4 IP and numeric port', () => {
    const ip = '127.0.0.1'
    const port = 9090
    expect(toMultiaddr(ip, port).toString()).to.equal(`/ip4/${ip}/tcp/${port}`)
  })

  it('creates multiaddr from valid IPv4 in IPv6 IP and port', () => {
    const ip = '0:0:0:0:0:0:101.45.75.219'
    const port = '9090'
    expect(toMultiaddr(ip, port).toString()).to.equal(`/ip4/101.45.75.219/tcp/${port}`)
  })

  it('creates multiaddr from valid IPv6 IP and port', () => {
    const ip = '::1'
    const port = '9090'
    expect(toMultiaddr(ip, port).toString()).to.equal(`/ip6/${ip}/tcp/${port}`)
  })

  it('throws for missing IP address', () => {
    expect(() => toMultiaddr()).to.throw('invalid ip provided').with.property('code', Errors.ERR_INVALID_IP_PARAMETER)
  })

  it('throws for invalid IP address', () => {
    const ip = 'aewmrn4awoew'
    const port = '234'
    expect(() => toMultiaddr(ip, port)).to.throw('invalid ip:port for creating a multiaddr').with.property('code', Errors.ERR_INVALID_IP)
  })

  it('throws for invalid port', () => {
    const ip = '127.0.0.1'
    const port = 'garbage'
    expect(() => toMultiaddr(ip, port)).to.throw('invalid port provided').with.property('code', Errors.ERR_INVALID_PORT_PARAMETER)
  })
})
