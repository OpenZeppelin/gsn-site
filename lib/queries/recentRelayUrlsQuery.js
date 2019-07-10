import gql from 'graphql-tag'

import { RECENT_VALUE_TYPE_RELAY_URL } from 'lib/constants'

export const recentRelayUrlsQuery = gql`
  query recentRelayUrlsQuery($networkId: String!) {
    recentRelayUrls: recentValues(networkId: $networkId, type: "${RECENT_VALUE_TYPE_RELAY_URL}") @client
  }
`