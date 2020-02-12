/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

const pair = require('it-pair')
const multiaddr = require('multiaddr')

const streamToMaConn = require('../src/stream-to-ma-conn')

describe('Convert stream into a multiaddr connection', () => {
  it('converts a stream and adds the provided metadata', () => {
    const stream = pair()
    const localAddr = multiaddr('/ip4/101.45.75.219/tcp/6000')
    const remoteAddr = multiaddr('/ip4/100.46.74.201/tcp/6002')

    const maConn = streamToMaConn({
      stream,
      localAddr,
      remoteAddr
    })

    expect(maConn).to.exist()
    expect(maConn.sink).to.exist()
    expect(maConn.source).to.exist()
    expect(maConn.localAddr).to.eql(localAddr)
    expect(maConn.remoteAddr).to.eql(remoteAddr)
    expect(maConn.timeline).to.exist()
    expect(maConn.timeline.open).to.exist()
    expect(maConn.timeline.close).to.not.exist()

    maConn.close()
    expect(maConn.timeline.close).to.exist()
  })
})
