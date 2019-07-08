import React from 'react'
import { react } from 'dapp-core'
import { withApollo } from 'react-apollo'

import { withSendTransaction } from 'lib/components/hoc/withSendTransaction'
import { withEthereumPermissionQuery } from 'lib/components/hoc/withEthereumPermissionQuery';

export function withFormProps(Component) {
  return react.withTransactionEe(
    withSendTransaction(
      withApollo(
        withEthereumPermissionQuery(
          Component
        )
      )
    )
  )  
}