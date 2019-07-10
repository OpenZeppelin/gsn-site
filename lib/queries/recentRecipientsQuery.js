import gql from 'graphql-tag'

import { RECENT_VALUE_TYPE_RECIPIENT_ADDRESS } from 'lib/constants'

export const recentRecipientsQuery = gql`
  query recentRecipientsQuery($networkId: String!) {
    recentRecipients: recentValues(networkId: $networkId, type: "${RECENT_VALUE_TYPE_RECIPIENT_ADDRESS}") @client
  }
`