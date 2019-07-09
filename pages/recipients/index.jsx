import React from 'react'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper';
import { Query } from 'react-apollo'
import { queries } from 'dapp-core'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { LandingPageForm } from 'lib/components/LandingPageForm'
import { networkIdToName } from 'lib/utils/networkIdToName'

const RecipientsIndex = function() {
  return (
    <MainLayout>
      <DynamicApolloWrapper>
        <p>
          <Query query={queries.networkAccountQuery}>
            {({ data, loading }) => {
              console.log(data)
              var network = 'loading...'
              if (!loading) {
                network =  networkIdToName(data.networkId)
              }

              return <>
                This content is dynamically loaded from Ethereum network {network}
              </>
            }}
          </Query>
        </p>

        <LandingPageForm />
      </DynamicApolloWrapper>
    </MainLayout>
  )
}

export default RecipientsIndex;