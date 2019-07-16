import React, { Component } from 'react'
import { withRouter } from 'next/router'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { addRecentRelayHub } from 'lib/services/addRecentRelayHub'
import { EthereumNetworkStatus } from 'lib/components/EthereumNetworkStatus'
import { RelayHubSearchForm } from 'lib/components/RelayHubSearchForm'

const RelaysIndex = class _RelaysIndex extends Component {
  handleSubmit = async (relayHubOption) => {
    await addRecentRelayHub({
      relayHubAddress: relayHubOption.value,
      networkId: relayHubOption.networkId
    })
    this.props.router.push(
      `/relay-hubs/${relayHubOption.value}`
    )
  }

  render() {
    return (
      <MainLayout title='Relay Access'>
        <EthereumNetworkStatus />
        <Section>
          <p className='pb-4 font-silkaRegular'>
            Relay Hubs
          </p>

          <p>
            To view and manage a GSN Relay start by entering the RelayHub address below.
          </p>

          <DynamicApolloWrapper>
            <RelayHubSearchForm onSubmit={this.handleSubmit} />
          </DynamicApolloWrapper>
          
        </Section>
      </MainLayout>
    )
  }
}

export default withRouter(RelaysIndex);