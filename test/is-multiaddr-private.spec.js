/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const multiaddr = require('multiaddr')

const isMultiaddrPrivate = require('../src/is-multiaddr-private')

describe('isMultiaddrPrivate', () => {
  it('identifies private ip4 multiaddrs', () => {
    const m1 = multiaddr('/ip4/127.0.0.1/tcp/1000')
    const m2 = multiaddr('/ip4/10.0.0.1/tcp/1000')
    const m3 = multiaddr('/ip4/192.168.0.1/tcp/1000')
    const m4 = multiaddr('/ip4/172.16.0.1/tcp/1000')

    expect(isMultiaddrPrivate(m1)).to.eql(true)
    expect(isMultiaddrPrivate(m2)).to.eql(true)
    expect(isMultiaddrPrivate(m3)).to.eql(true)
    expect(isMultiaddrPrivate(m4)).to.eql(true)
  })

  it('identifies public ip4 multiaddrs', () => {
    const m1 = multiaddr('/ip4/101.0.26.90/tcp/1000')
    const m2 = multiaddr('/ip4/40.1.20.9/tcp/1000')
    const m3 = multiaddr('/ip4/92.168.0.1/tcp/1000')
    const m4 = multiaddr('/ip4/2.16.0.1/tcp/1000')

    expect(isMultiaddrPrivate(m1)).to.eql(false)
    expect(isMultiaddrPrivate(m2)).to.eql(false)
    expect(isMultiaddrPrivate(m3)).to.eql(false)
    expect(isMultiaddrPrivate(m4)).to.eql(false)
  })

  it('identifies private ip6 multiaddrs', () => {
    const m1 = multiaddr('/ip6/fd52:8342:fc46:6c91:3ac9:86ff:fe31:7095/tcp/1000')

    expect(isMultiaddrPrivate(m1)).to.eql(true)
  })

  it('identifies public ip6 multiaddrs', () => {
    const m1 = multiaddr('/ip6/2001:8a0:7ac5:4201:3ac9:86ff:fe31:7095/tcp/1000')

    expect(isMultiaddrPrivate(m1)).to.eql(false)
  })

  it('identifies dns multiaddrs as not private', () => {
    const m1 = multiaddr('/dns4/wss0.bootstrap.libp2p.io/tcp/443')

    expect(isMultiaddrPrivate(m1)).to.eql(false)
  })
})
