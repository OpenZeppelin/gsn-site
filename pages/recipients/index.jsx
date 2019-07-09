import React from 'react'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper';
import { AddressLinkForm } from 'lib/components/AddressLinkForm'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'

const RecipientsIndex = function() {
  return (
    <MainLayout>
      <DynamicApolloWrapper>
        <Section>
          <AddressLinkForm
            title='Access Recipient'
            formatUrl={(address) => `/recipients/${address}`}
          />
        </Section>
      </DynamicApolloWrapper>
    </MainLayout>
  )
}

export default RecipientsIndex;