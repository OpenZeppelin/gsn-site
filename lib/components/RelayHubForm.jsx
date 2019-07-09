import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'

import { formatRelayUrl } from 'lib/utils/formatRelayUrl'
import { RelayUrlForm } from 'lib/components/RelayUrlForm'
import { InputForm } from 'lib/components/InputForm'
import { AddressLinkForm } from 'lib/components/AddressLinkForm'

export const RelayHubForm = withApollo(withRouter(class _RelayHubForm extends PureComponent {
  static propTypes = {
    relayHubAddress: PropTypes.string.isRequired
  }

  handleRelayUrl = (relayUrl) => {
    const { relayHubAddress } = this.props

    this.props.router.push(
      formatRelayUrl({ relayHubAddress, relayUrl })
    )
  }

  render () {
    const { relayHubAddress } = this.props
    return (
      <>
        <h2>Access Relay</h2>
        <AddressLinkForm
          formatUrl={(relayAddress) => formatRelayUrl({ relayHubAddress, relayAddress })}
          />
        <InputForm
          onSubmit={this.handleRelayUrl}
          placeholder='enter relay url'
          />
      </>
    )
  }
}))
