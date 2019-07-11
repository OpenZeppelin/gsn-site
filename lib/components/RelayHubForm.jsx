import React, { Component } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { Submit, Field } from 'lib/components/form'
import { RelayAddressSelect } from 'lib/components/RelayAddressSelect'
import { RelayUrlSelect } from 'lib/components/RelayUrlSelect'
import { formatRelayUrl } from 'lib/utils/formatRelayUrl'
import { addRecentRelayAddress } from 'lib/services/addRecentRelayAddress'
import { addRecentRelayUrl } from 'lib/services/addRecentRelayUrl'

export const RelayHubForm = withRouter(class _RelayHubForm extends Component {
  state = {
    relayAddressOption: null,
    relayUrlOption: null
  }

  static propTypes = {
    relayHubAddress: PropTypes.string.isRequired
  }

  handleRelayAddress = async (e) => {
    e.preventDefault()

    const { relayHubAddress } = this.props
    const { relayAddressOption } = this.state

    const relayAddress = relayAddressOption.value
    const networkId = relayAddressOption.networkId

    if (relayHubAddress && relayAddress) {
      await addRecentRelayAddress({
        relayAddress,
        networkId
      })

      this.props.router.push(
        formatRelayUrl({ relayHubAddress, relayAddress })
      )
    }
  }

  handleRelayUrl = async (e) => {
    e.preventDefault()

    const { relayHubAddress } = this.props
    const { relayUrlOption } = this.state

    const relayUrl = relayUrlOption.value
    const networkId = relayUrlOption.networkId

    if (relayHubAddress && relayUrl) {
      await addRecentRelayUrl({
        relayUrl,
        networkId
      })

      this.props.router.push(
        formatRelayUrl({ relayHubAddress, relayUrl })
      )
    }
  }

  render () {
    return (
      <>
        <div className='lg:w-2/3'>
          <p>
            Use one of the following forms to view stats on a specific Relay which belongs to the currently selected Relay Hub.
          </p>
        </div>

        <form
          onSubmit={this.handleRelayAddress}
        >
          <label htmlFor='relay-by-address'>
            Lookup Relay by Contract Address
          </label>
          <DynamicApolloWrapper>
            <Field>
              <RelayAddressSelect
                id='relay-by-address'
                className='flex-1'
                placeholder='Select or type in ...'
                value={this.state.relayAddressOption}
                onChange={(relayAddressOption) => this.setState({ relayAddressOption })}
              />
            </Field>

            <Submit
              disabled={!this.state.relayAddressOption}
              value='Go'
            />
          </DynamicApolloWrapper>
        </form>


        <form
          onSubmit={this.handleRelayUrl}
        >
          <label htmlFor='relay-by-url'>
            Lookup Relay by URL
          </label>
          <DynamicApolloWrapper>
            <Field>
              <RelayUrlSelect
                id='relay-by-url'
                className='flex-1'
                placeholder='Select or type in ...'
                value={this.state.relayUrlOption}
                onChange={(relayUrlOption) => this.setState({ relayUrlOption })}
              />
            </Field>

            <Submit
              disabled={!this.state.relayUrlOption}
              value='Go' 
            />
          </DynamicApolloWrapper>
        </form>

      </>
    )
  }
})
