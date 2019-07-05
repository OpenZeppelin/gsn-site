import { graphql } from 'react-apollo'
import { queries } from 'dapp-core'

export function withEthereumPermissionQuery (Component) {
  return graphql(queries.ethereumPermissionQuery, { name: 'ethereumPermissionQuery' })(Component)
}
