import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import Link from 'next/link'
import parse from 'url-parse'

import { relayAddressQuery } from 'lib/queries/relayAddressQuery'

export const RelayUrlLink = graphql(relayAddressQuery, {
  name: 'relayAddressQuery',
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
    const { relayAddressQuery, relayHubAddress } = this.props
    const { relayAddress, loading, error } = relayAddressQuery || {}

    if (relayAddress) {
      return (
        <>
          <Link href={`/relay-hubs/${relayHubAddress}/relays/${relayAddress}`}>
            Go to Relay
          </Link>
        </>
      )
    } else {
      return <></>
    }
  }
})