import gql from 'graphql-tag'

import { RECENT_VALUE_TYPE_RELAY_HUB_ADDRESS } from 'lib/constants'

export const recentRelayHubsQuery = gql`
  query recentRelayHubsQuery($networkId: String!) {
    recentRelayHubs: recentValues(networkId: $networkId, type: "${RECENT_VALUE_TYPE_RELAY_HUB_ADDRESS}") @client
  }
`