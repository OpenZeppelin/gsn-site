import React from 'react'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { AddressLinkForm } from 'lib/components/AddressLinkForm'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'

const RecipientsIndex = function() {
  return (
    <MainLayout>
      <Section>
        <DynamicApolloWrapper>
          <AddressLinkForm
            title='Access Recipient'
            formatUrl={(address) => `/recipients/${address}`}
          />
        </DynamicApolloWrapper>
      </Section>
    </MainLayout>
  )
}

export default RecipientsIndex;
