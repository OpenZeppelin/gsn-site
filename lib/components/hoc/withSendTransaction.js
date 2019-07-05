import { graphql } from 'react-apollo'
import { sendTransactionMutation } from 'apollo-link-ethereum-mutations-ethersjs'

export function withSendTransaction(Component) {
  return graphql(sendTransactionMutation, {
    name: 'sendTransaction'
  })(Component)
}