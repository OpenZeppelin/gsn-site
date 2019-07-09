import gql from 'graphql-tag'

export const relayAddressQuery = gql`
  query relayAddressQuery($url: String!) {
    relayAddress(url: $url) @client
  }
`