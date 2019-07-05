import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'

import { AddressLinkForm } from 'lib/components/AddressLinkForm'

export const RelayHubForm = withRouter(class _RelayHubForm extends PureComponent {
  static propTypes = {
    relayHubAddress: PropTypes.string.isRequired
  }

  render () {
    return (
      <>
        <h2>Access Relay</h2>
        <AddressLinkForm
          formatUrl={(address) => `/relay-hubs/${this.props.relayHubAddress}/relays/${address}`}
          />
      </>
    )
  }
})
