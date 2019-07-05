import gql from 'graphql-tag'

export const relayHubTargetSubscription = gql`
  subscription relayHubTargetSubscription($relayHubAddress: String!, $targetAddress: String!) {
    RelayHub @contract(address: $relayHubAddress) {
      allEvents @events(extraTopics: { types: ["address"], values: [ $targetAddress ]})
    }
  }
`