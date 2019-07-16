import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { utils } from 'dapp-core'

import { EthereumNetworkStatus } from 'lib/components/EthereumNetworkStatus'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { RelayHubForm } from 'lib/components/RelayHubForm'
import { RelayHubRelayList } from '../../../lib/components/RelayHubRelayList';
import { Tabs } from 'lib/components/Tabs'

const RelayHubDashboard = withRouter(
  class _RelayHubDashboard extends Component {
    state = {
      currentTab: 0,
    }

    render () {
      const { relayHubAddress } = this.props.router.query
      let relays

      if (this.state.currentTab === 1) {
        relays =
          <DynamicApolloWrapper>
            <RelayHubRelayList relayHubAddress={relayHubAddress} />
          </DynamicApolloWrapper>
      }

      return (
        <MainLayout>
          <EthereumNetworkStatus />
          
          <Section>
            <p className='pb-4 font-silkaRegular text-gray-500'>
              <Link href='/relays'><a>Relay Hubs</a></Link> &raquo;&nbsp;
              <span className='wrap-everything text-gray-900'>{utils.shortenAddress(relayHubAddress)}</span>
            </p>

            <div className='lg:w-2/3 mb-10'>
              <p>
                View stats on a specific Relay or register your new Relay node.
              </p>
            </div>

            <Tabs>
              <Tabs.Tab
                isSelected={this.state.currentTab === 0}
                onClick={() => this.setState({ currentTab: 0 })}>
                Access a Relay
              </Tabs.Tab>
              <Tabs.Tab
                isSelected={this.state.currentTab === 1}
                onClick={() => this.setState({ currentTab: 1 })}>
                List all Relays
              </Tabs.Tab>
            </Tabs>

            <Tabs.Content>
              <Tabs.ContentPane isSelected={this.state.currentTab === 0}>
                <RelayHubForm
                  relayHubAddress={relayHubAddress}
                />
              </Tabs.ContentPane>
              <Tabs.ContentPane isSelected={this.state.currentTab === 1}>
                {relays}
              </Tabs.ContentPane>
            </Tabs.Content>
          </Section>
        </MainLayout>
      )
    }
  }
)

export default RelayHubDashboard;