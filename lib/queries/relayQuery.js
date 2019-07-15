import gql from 'graphql-tag'

export const relayQuery = gql`
  query relayQuery($relayHubAddress: String!, $relayAddress: String!) {
    RelayHub @contract(address: $relayHubAddress) {
      relay: relays(address: $relayAddress)
      RelayAdded(relay: $relayAddress) @pastEvents
    }
  }
`