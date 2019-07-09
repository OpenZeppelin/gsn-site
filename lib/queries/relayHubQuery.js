import gql from 'graphql-tag'

export const relayHubQuery = gql`
  query relayHubQuery($relayHubAddress: String!) {
    RelayHub @contract(address: $relayHubAddress) {
      maximumDeposit
      minimumStake
      minimumRelayBalance
    }
  }
`