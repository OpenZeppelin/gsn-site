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
        <form
          onSubmit={this.handleRelayUrl}
          className='mt-0'
        >
          <label htmlFor='relay-by-url'>
            Access Relay by URL
          </label>
          <DynamicApolloWrapper>
            <Field>
              <RelayUrlSelect
                id='relay-by-url'
                className='flex-1'
                value={this.state.relayUrlOption}
                handleChange={(relayUrlOption) => this.setState({ relayUrlOption })}
              />
            </Field>

            <Submit
              disabled={!this.state.relayUrlOption}
              value='Go' 
            />
          </DynamicApolloWrapper>
        </form>

        <form
          onSubmit={this.handleRelayAddress}
          className='mt-2 sm:mt-10'
        >
          <label htmlFor='relay-by-address'>
            Access Relay by Address
          </label>
          <DynamicApolloWrapper>
            <Field>
              <RelayAddressSelect
                id='relay-by-address'
                className='flex-1'
                placeholder='Select or type ...'
                value={this.state.relayAddressOption}
                handleChange={(relayAddressOption) => this.setState({ relayAddressOption })}
              />
            </Field>

            <Submit
              disabled={!this.state.relayAddressOption}
              value='Go'
            />
          </DynamicApolloWrapper>
        </form>

      </>
    )
  }
})
