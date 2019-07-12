import React from 'react'
import { Query } from 'react-apollo'
import { queries } from 'dapp-core'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { networkIdToName } from 'lib/utils/networkIdToName'
import { EtherscanAddressLink } from 'lib/components/EtherscanAddressLink'

export const EthereumNetworkStatus = function _EthereumNetworkStatus({ networkAccountQuery }) {
  return (
    <div className='text-sm bg-indigo-900 p-3 text-indigo-100 text-center'>
      <div className='container'>
        <DynamicApolloWrapper>
          <Query query={queries.networkAccountQuery}>
            {({ data }) => {
              const { networkId, account, loading, error } = data

              let content
              if (loading) {
                content = '...'
              } else if (error) {
                console.error(error)
                content = <div>
                  {error.message}
                </div>
              } else {
                content = <div>
                  Using account {<EtherscanAddressLink address={account}>{account}</EtherscanAddressLink>} on network {networkIdToName(networkId)}
                </div>
              }

              return content
            }}
          </Query>
        </DynamicApolloWrapper>
      </div>
    </div>
  )
}