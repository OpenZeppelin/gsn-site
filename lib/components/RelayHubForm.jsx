import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'

import { RelayUrlForm } from 'lib/components/RelayUrlForm'
import { AddressLinkForm } from 'lib/components/AddressLinkForm'

export const RelayHubForm = withApollo(withRouter(class _RelayHubForm extends PureComponent {
  static propTypes = {
    relayHubAddress: PropTypes.string.isRequired
  }

  handleRelayUrl = (url) => {
    this.props.client.query(relayAddressQuery)
  }

  render () {
    return (
      <AddressLinkForm
        title='Access Relay'
        formatUrl={(address) => `/relay-hubs/${this.props.relayHubAddress}/relays/${address}`}
      />

      <RelayUrlForm
        relayHubAddress={this.props.relayHubAddress}
      />
    )
  }
}))
