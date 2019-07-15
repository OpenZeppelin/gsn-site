import gql from 'graphql-tag'

export const relayHubEventsQuery = gql`
  query relayHubEventsQuery($relayHubAddress: String!) {
    RelayHub @contract(address: $relayHubAddress) {
      allEvents @pastEvents
    }
  }
`