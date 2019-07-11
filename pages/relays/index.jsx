import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { formatRelayUrl } from 'lib/utils/formatRelayUrl'
import { Submit, Field } from 'lib/components/form'
import { RelayHubSelect } from 'lib/components/RelayHubSelect'
import { RelayUrlSelect } from 'lib/components/RelayUrlSelect'
import { addRecentRelayHub } from 'lib/services/addRecentRelayHub'
import { addRecentRelayUrl } from 'lib/services/addRecentRelayUrl'

const RelaysIndex = class _RelaysIndex extends Component {
  state = {
    relayUrlOption: null,
    relayHubOption: null
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { relayHubOption, relayUrlOption } = this.state

    if (relayHubOption && relayUrlOption) {
      await addRecentRelayHub({
        relayHubAddress: relayHubOption.value,
        networkId: relayHubOption.networkId
      })
      await addRecentRelayUrl({
        relayUrl: relayUrlOption.value,
        networkId: relayUrlOption.networkId
      })
      this.props.router.push(
        formatRelayUrl({
          relayHubAddress: relayHubOption.value,
          relayUrl: relayUrlOption.value
        })
      )
    } else {
      // alert('Please enter both a Relay Hub address and Relay URL')
    }
  }

  render() {
    return (
      <MainLayout>
        <Section>
          <p className='pb-4 font-silkaRegular text-gray-500'>
            <Link href='/relay-hubs'><a>Relays</a></Link>
          </p>

          <p>
            To view and manage a GSN Relay please enter the Relay Hub address and the Relay URL below.
          </p>

          <DynamicApolloWrapper>
            <form onSubmit={this.handleSubmit}>
              <h3 className='font-silkaMedium mb-6'>
                Lookup Relay
              </h3>
              <label htmlFor='relays-relay-hub-address'>
                Parent RelayHub's address
              </label>
              
              <Field>
                <RelayHubSelect
                  id='relays-relay-hub-address'
                  className='flex-1'
                  placeholder='Select or type in ...'
                  value={this.state.relayHubOption}
                  onChange={(relayHubOption) => this.setState({relayHubOption}) }
                />
              </Field>

              <label htmlFor='relays-relay-url' className='mt-4'>
                Relay URL
              </label>
              <Field>
                <RelayUrlSelect
                  id='relays-relay-url'
                  className='flex-1'
                  placeholder='Select or type in ...'
                  value={this.state.relayUrlOption}
                  onChange={(relayUrlOption) => this.setState({relayUrlOption})}
                />
              </Field>

              <Submit
                disabled={!this.state.relayHubOption || !this.state.relayUrlOption}
                value='Go'
              />
            </form>
          </DynamicApolloWrapper>
        </Section>
      </MainLayout>
    )
  }
}

export default withRouter(RelaysIndex);