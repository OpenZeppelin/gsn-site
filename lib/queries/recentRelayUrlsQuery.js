import gql from 'graphql-tag'

export const recentRelayUrlsQuery = gql`
  query recentRelayUrlsQuery($networkId: String!) {
    recentRelayUrls: recentValues(networkId: $networkId, type: "relay-url") @client
  }
`