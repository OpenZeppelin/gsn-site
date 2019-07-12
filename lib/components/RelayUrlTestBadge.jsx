import React from 'react'
import { graphql } from 'react-apollo'
import FeatherIcon from 'feather-icons-react'

import { relayServerInfoQuery } from 'lib/queries/relayServerInfoQuery'

export const RelayUrlTestBadge = graphql(relayServerInfoQuery, {
  name: 'relayServerInfoQuery',
  skip: (props) => !props.relayUrl,
  options: (props) => {
    return {
      variables: {
        url: props.relayUrl
      }
    }
  }
})(
  function _RelayUrlTestBadge({ relayUrl, relayServerInfoQuery }) {

    const { relayServerInfo } = relayServerInfoQuery || {}
    const { Ready } = relayServerInfo || {}

    if (Ready) {
      return (
        <div className='text-green-500 flex items-center'>
          <FeatherIcon
            icon='check-circle'
            className='w-12 h-12 p-2'
            />
          <span>Relay is ready</span>
        </div>
        
      )
    } else {
      return (
        <span className='text-red-500 flex items-center'>
          <FeatherIcon
            icon='x-square'
            className='w-12 h-12 p-2'
            />
          <span>Relay is not ready</span>
        </span>
      )
    }
  }
)