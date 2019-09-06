import gql from 'graphql-tag'

export const recipientQuery = gql`
  query recipientQuery($address: String!) {
    RelayRecipient @contract(address: $address) {
      relayHubAddress: getHubAddr
    }
  }
`
