import gql from 'graphql-tag'

import { RECENT_VALUE_TYPE_RELAY_ADDRESS } from 'lib/constants'

export const recentRelayAddressesQuery = gql`
  query recentRelayAddressesQuery($networkId: String!) {
    recentRelayAddresses: recentValues(networkId: $networkId, type: "${RECENT_VALUE_TYPE_RELAY_ADDRESS}") @client
  }
`