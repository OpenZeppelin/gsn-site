import gql from 'graphql-tag'

export const recipientBalanceQuery = gql`
  query recipientBalanceQuery($recipientAddress: String!, $relayHubAddress: String!) {
    RelayHub @contract(address: $relayHubAddress) {
      balance: balanceOf(address: $recipientAddress)
    }
  }
`
