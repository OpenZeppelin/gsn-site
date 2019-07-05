import gql from 'graphql-tag'

export const recipientQuery = gql`
  query recipientQuery($recipientAddress: String!) {
    RelayRecipient @contract(address: $recipientAddress) {
      relayHubAddress: getHubAddr
      balance: getRecipientBalance
    }
  }
`