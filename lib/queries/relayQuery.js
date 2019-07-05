import gql from 'graphql-tag'

export const relayQuery = gql`
  query relayQuery($relayHubAddress: String!, $relayAddress: String!) {
    RelayHub @contract(address: $relayHubAddress) {
      owner: ownerOf(address: $relayAddress)
      stake: stakeOf(address: $relayAddress)
      balance: balanceOf(address: $relayAddress)
      relay: relays(address: $relayAddress)
    }
  }
`