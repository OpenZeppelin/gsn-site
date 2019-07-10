import { graphql } from 'react-apollo'
import { queries } from 'dapp-core'

export function withNetworkAccountQuery (Component) {
  return graphql(queries.networkAccountQuery, { name: 'networkAccountQuery' })(Component)
}
