import React from 'react'
import { Query } from 'react-apollo'
import { queries } from 'dapp-core'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { networkIdToName } from 'lib/utils/networkIdToName'
import { EtherscanAddressLink } from 'lib/components/EtherscanAddressLink'

export const EthereumNetworkStatus = function _EthereumNetworkStatus({ networkAccountQuery }) {
  return (
    <div className='text-sm bg-blue-700 p-3 text-white text-center font-silkaMedium tracking-wide'>
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
                content = <span className='opacity-80 hover:opacity-100 trans'>
                  Using account {<EtherscanAddressLink className='text-blue-300' address={account}>{account}</EtherscanAddressLink>} on network <strong className='font-silkaBold capitalize'>'{networkIdToName(networkId)}'</strong>
                </span>
              }

              return content
            }}
          </Query>
        </DynamicApolloWrapper>
      </div>
    </div>
  )
}