import React, { Component } from 'react'
import { withRouter } from 'next/router'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { Submit, Field } from 'lib/components/form'
import { RelayHubSelect } from 'lib/components/RelayHubSelect'
import { addRecentRelayHub } from 'lib/services/addRecentRelayHub'
import { EthereumNetworkStatus } from 'lib/components/EthereumNetworkStatus'

const RelaysIndex = class _RelaysIndex extends Component {
  state = {
    relayHubOption: null
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { relayHubOption } = this.state

    if (relayHubOption) {
      await addRecentRelayHub({
        relayHubAddress: relayHubOption.value,
        networkId: relayHubOption.networkId
      })
      this.props.router.push(
        `/relay-hubs/${this.state.relayHubOption.value}`
      )
    }
  }

  render() {
    return (
      <MainLayout>
        <EthereumNetworkStatus />
        <Section>
          <p className='pb-4 font-silkaRegular'>
            Relay Hubs
          </p>

          <p>
            To view and manage a GSN Relay start by entering the RelayHub address below.
          </p>

          <form onSubmit={this.handleSubmit}>
            <h3 className='font-silkaMedium mb-6'>
              Lookup RelayHub &amp; Relay Nodes
            </h3>
            <label htmlFor='relays-relay-hub-address'>
              RelayHub address
            </label>

            <DynamicApolloWrapper>
              <Field>
                <RelayHubSelect
                  id='relays-relay-hub-address'
                  className='flex-1'
                  placeholder='Select or type ...'
                  value={this.state.relayHubOption}
                  onChange={(relayHubOption) => this.setState({ relayHubOption })}
                />
              </Field>

              <Submit
                disabled={!this.state.relayHubOption}
                value='Go'
              />
            </DynamicApolloWrapper>
          </form>
          
        </Section>
      </MainLayout>
    )
  }
}

export default withRouter(RelaysIndex);