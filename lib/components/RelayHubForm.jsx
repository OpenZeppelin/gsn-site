import React, { Component } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { Submit, Field } from 'lib/components/form'
import { RelayAddressSelect } from 'lib/components/RelayAddressSelect'
import { RelayUrlSelect } from 'lib/components/RelayUrlSelect'
import { formatRelayUrl } from 'lib/utils/formatRelayUrl'

export const RelayHubForm = withRouter(class _RelayHubForm extends Component {
  state = {
    relayAddressOption: null,
    relayUrlOption: null
  }

  static propTypes = {
    relayHubAddress: PropTypes.string.isRequired
  }

  handleRelayUrl = (relayUrl) => {
    const { relayHubAddress } = this.props

    this.props.router.push(
      formatRelayUrl({ relayHubAddress, relayUrl })
    )
  }

  handleRelayAddress = (relayAddress) => {
    const url = this.props.formatUrl(relayAddress)
    // console.log('navigating to: ', url)
    this.props.router.push(url)
  }

  render () {
    const { relayHubAddress } = this.props

    return (
      <>
        <div className='lg:w-2/3'>
          <p className='pb-4'>
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
                placeholder='Select or type in the Relay Address'
                value={this.state.relayAddressOption}
                onChange={(relayAddressOption) => this.setState({ relayAddressOption })}
              />
            </Field>

            <Submit
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
                placeholder='Select or type in the Relay URL'
                value={this.state.relayUrlOption}
                onChange={(relayUrlOption) => this.setState({ relayUrlOption })}
              />
            </Field>

            <Submit
              value='Go' 
            />
          </DynamicApolloWrapper>
        </form>

      </>
    )
  }
})
