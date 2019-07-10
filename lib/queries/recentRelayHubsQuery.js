import gql from 'graphql-tag'

export const recentRelayHubsQuery = gql`
  query recentRelayHubsQuery($networkId: String!) {
    recentRelayHubs: recentValues(networkId: $networkId, type: "relay-hub") @client
  }
`