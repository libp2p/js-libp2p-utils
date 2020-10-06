'use strict'

const isIpPrivate = require('private-ip')

module.exports = (multiaddr) => {
  const { address } = multiaddr.nodeAddress()

  return isIpPrivate(address)
}
