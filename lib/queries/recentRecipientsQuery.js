import gql from 'graphql-tag'

export const recentRecipientsQuery = gql`
  query recentRecipientsQuery($networkId: String!) {
    recentRecipients: recentValues(networkId: $networkId, type: "recipient") @client
  }
`