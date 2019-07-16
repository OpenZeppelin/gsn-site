import React, { Component } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { utils } from 'dapp-core'

import { EthereumNetworkStatus } from 'lib/components/EthereumNetworkStatus'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { RelayHubForm } from 'lib/components/RelayHubForm'
import { RelayHubRelayList } from '../../../lib/components/RelayHubRelayList';
import { Tabs } from 'lib/components/Tabs'

const RelayHubDashboard = function () {
  const router = useRouter()
  let { relayHubAddress, listRelays } = router.query
  listRelays = listRelays === 'true'
  
  let relays

  if (listRelays) {
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
            isSelected={!listRelays}
            onClick={() => router.push(`/relay-hubs/${relayHubAddress}`)}>
            Access a Relay
          </Tabs.Tab>
          <Tabs.Tab
            isSelected={listRelays}
            onClick={() => router.push(`/relay-hubs/${relayHubAddress}?listRelays=true`)}>
            List all Relays
          </Tabs.Tab>
        </Tabs>

        <Tabs.Content>
          <Tabs.ContentPane isSelected={!listRelays}>
            <RelayHubForm
              relayHubAddress={relayHubAddress}
            />
          </Tabs.ContentPane>
          <Tabs.ContentPane isSelected={listRelays}>
            {relays}
          </Tabs.ContentPane>
        </Tabs.Content>
      </Section>
    </MainLayout>
  )
}

export default RelayHubDashboard;