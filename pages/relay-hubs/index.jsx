import React from 'react'
import Link from 'next/link'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { AddressLinkForm } from 'lib/components/AddressLinkForm'
import { Section } from 'lib/components/layout/Section'

const RelayHubsIndex = function() {
  return (
    <MainLayout>
      <Section>
        <p>
          <Link href='/relay-hubs'><a>Relay Hubs</a></Link>
        </p>
        <p>
          
        </p>
        <AddressLinkForm
          title='Access Relay Hub'
          formatUrl={(address) => `/relay-hubs/${address}`}
        />
      </Section>
    </MainLayout>
  )
}

export default RelayHubsIndex;