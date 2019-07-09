import React from 'react'

import { AddressLinkForm } from 'lib/components/AddressLinkForm'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'

const RecipientsIndex = function() {
  return (
    <MainLayout>
      <Section>
        <AddressLinkForm
          title='Access Recipient'
          formatUrl={(address) => `/recipients/${address}`}
        />
      </Section>
    </MainLayout>
  )
}

export default RecipientsIndex;