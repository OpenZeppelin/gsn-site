import gql from 'graphql-tag'

export const relayServerInfoQuery = gql`
  query relayServerInfoQuery($url: String!) {
    relayServerInfo(url: $url) @client
  }
`