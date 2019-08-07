import gql from 'graphql-tag'

export const relayBalancesQuery = gql`
  query relayQuery($relayHubAddress: String!, $relayAddress: String!) {
    RelayHub @contract(address: $relayHubAddress) {
      relay: getRelay(address: $relayAddress)
      balance: balanceOf(address: $relayAddress)
    }
  }
`
