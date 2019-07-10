import React from 'react'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { AddressLinkForm } from 'lib/components/AddressLinkForm'
import { Section } from 'lib/components/layout/Section'

const RelayHubsIndex = function() {
  return (
    <MainLayout>
      <Section>
        <h1>Relay Tool</h1>
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