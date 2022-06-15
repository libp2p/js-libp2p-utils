/* eslint-env mocha */

import { expect } from 'aegir/chai'
import { multiaddr } from '@multiformats/multiaddr'
import { publicAddressesFirst } from '../src/address-sort.js'

describe('address-sort', () => {
  it('should sort public addresses first', () => {
    const addresses = [
      {
        multiaddr: multiaddr('/ip4/127.0.0.1/tcp/4000'),
        isCertified: false
      },
      {
        multiaddr: multiaddr('/ip4/30.0.0.1/tcp/4000'),
        isCertified: false
      },
      {
        multiaddr: multiaddr('/ip4/31.0.0.1/tcp/4000'),
        isCertified: false
      }
    ]

    const sortedAddresses = addresses.sort(publicAddressesFirst)
    expect(sortedAddresses[0].multiaddr.equals(multiaddr('/ip4/30.0.0.1/tcp/4000'))).to.eql(true)
    expect(sortedAddresses[1].multiaddr.equals(multiaddr('/ip4/31.0.0.1/tcp/4000'))).to.eql(true)
    expect(sortedAddresses[2].multiaddr.equals(multiaddr('/ip4/127.0.0.1/tcp/4000'))).to.eql(true)
  })

  it('should sort public certified addresses first', () => {
    const addresses = [
      {
        multiaddr: multiaddr('/ip4/127.0.0.1/tcp/4000'),
        isCertified: false
      },
      {
        multiaddr: multiaddr('/ip4/30.0.0.1/tcp/4000'),
        isCertified: false
      },
      {
        multiaddr: multiaddr('/ip4/31.0.0.1/tcp/4000'),
        isCertified: true
      }
    ]

    const sortedAddresses = addresses.sort(publicAddressesFirst)
    expect(sortedAddresses[0].multiaddr.equals(multiaddr('/ip4/31.0.0.1/tcp/4000'))).to.eql(true)
    expect(sortedAddresses[1].multiaddr.equals(multiaddr('/ip4/30.0.0.1/tcp/4000'))).to.eql(true)
    expect(sortedAddresses[2].multiaddr.equals(multiaddr('/ip4/127.0.0.1/tcp/4000'))).to.eql(true)
  })
})
