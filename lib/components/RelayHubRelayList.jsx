import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import Link from 'next/link'
import { utils } from 'dapp-core'

import { relayHubEventsQuery } from 'lib/queries/relayHubEventsQuery'
import { projectActiveRelays } from 'lib/projections/projectActiveRelays'

export const RelayHubRelayList = graphql(relayHubEventsQuery, {
  name: 'relayHubEventsQuery',
  options: (props) => {
    return {
      variables: {
        relayHubAddress: props.relayHubAddress
      }
    }
  }
})(
  class _RelayHubRelayList extends PureComponent {
    static propTypes = {
      relayHubAddress: PropTypes.string.isRequired
    }

    render () {

      const { relayHubAddress, relayHubEventsQuery } = this.props
      const { RelayHub } = relayHubEventsQuery || {}
      const { allEvents } = RelayHub || {}

      const relays = allEvents ? projectActiveRelays(allEvents) : []

      return (
        <div className='p-1'>
          <div className='hidden sm:flex p-4'>
            <div className='w-1/4'>
              <span className='font-silkaMedium'>Address</span>
            </div>

            <div className='w-2/4'>
              <span className='font-silkaMedium'>URL</span>
            </div>

            <div className='w-1/4'>
              <span className='font-silkaMedium'>View</span>
            </div>
          </div>

          {relays.map(({ address, url }) => {
            return (
              <div key={address} className='sm:flex mb-2 p-4 border-2 border-gray-100 hover:bg-gray-300 trans'>
                <div className='w-1/4'>
                  <Link
                    href={`/relay-hubs/${relayHubAddress}/relay?relayAddress=${address}`}
                  >
                    <a className='font-silkaMedium'>
                      {utils.shortenAddress(address)}
                    </a>
                  </Link>
                </div>

                <div className='w-2/4'>
                  <Link
                    href={`/relay-hubs/${relayHubAddress}/relay?relayUrl=${url}`}
                  >
                    <a className='font-silkaMedium'>
                      {url}
                    </a>
                  </Link>
                </div>

                <div className='w-1/4'>
                  <Link
                    href={`/relay-hubs/${relayHubAddress}/relay?relayUrl=${url}`}
                  >
                    <a className='font-silkaMedium text-xs rounded bg-blue-600 hover:bg-blue-500 text-white hover:text-white p-2 mt-2 block sm:inline text-center'>
                      See Details
                    </a>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }
)