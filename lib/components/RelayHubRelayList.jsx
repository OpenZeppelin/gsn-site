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
        <div>
          <div className='flex'>
            <div className='w-1/4'>
              <b>Address</b>
            </div>

            <div className='w-3/4'>
              <b>URL</b>
            </div>
          </div>
          {relays.map(({ address, url }) => {
            return (
              <div key={address} className='flex pb-4'>
                
                <div className='w-1/4'>
                  <Link href={`/relay-hubs/${relayHubAddress}/relay?relayAddress=${address}`}>
                    <a>
                      {utils.shortenAddress(address)}
                    </a>
                  </Link>
                </div>

                <div className='w-3/4'>
                  <Link href={`/relay-hubs/${relayHubAddress}/relay?relayUrl=${url}`}>
                    <a>
                      {url}
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