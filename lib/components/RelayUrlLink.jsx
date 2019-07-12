import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import Link from 'next/link'
import parse from 'url-parse'

import { formatRelayUrl } from 'lib/utils/formatRelayUrl'
import { relayServerInfoQuery } from 'lib/queries/relayServerInfoQuery'

export const RelayUrlLink = graphql(relayServerInfoQuery, {
  name: 'relayServerInfoQuery',
  skip: (props) => {
    const parsed = parse(props.relayUrl, {})
    return !parsed.host
  },
  options: (props) => {
    return {
      variables: {
        url: props.relayUrl
      }
    }
  }
})(
class _RelayUrlLink extends PureComponent {
  static propTypes = {
    relayHubAddress: PropTypes.string.isRequired,
    relayUrl: PropTypes.string.isRequired
  }

  handleClick = (e) => {
    this.setState({value: e.target.value})
  }

  render () {
    const { relayServerInfoQuery, relayHubAddress } = this.props
    const { relayServerInfo } = relayServerInfoQuery || {}
    const { RelayServerAddress } = relayServerInfo || {}

    if (RelayServerAddress) {
      return (
        <>
          <Link href={formatRelayUrl({ relayHubAddress, relayAddress: RelayServerAddress })}>
            <a>Go to Relay</a>
          </Link>
        </>
      )
    } else {
      return <></>
    }
  }
})