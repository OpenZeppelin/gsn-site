import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'

import { formatRelayUrl } from 'lib/utils/formatRelayUrl'
import { InputForm } from 'lib/components/InputForm'
import { AddressLinkForm } from 'lib/components/AddressLinkForm'

export const RelayHubForm = withRouter(class _RelayHubForm extends PureComponent {
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
      <div className='lg:w-2/3'>
        <p className='pb-10'>
          Use one of the following forms to view stats on a specific Relay which belongs to the currently selected Relay Hub: <strong>{relayHubAddress}</strong>
        </p>

        <AddressLinkForm
          id='relay-by-address'
          title='Lookup Relay by Address'
          formatUrl={(relayAddress) => formatRelayUrl({ relayHubAddress, relayAddress })}
        />
        <InputForm
          id='relay-by-url'
          title='Lookup Relay by URL'
          onSubmit={this.handleRelayUrl}
          placeholder='Enter relay URL'
        />
      </div>
    )
  }
})
