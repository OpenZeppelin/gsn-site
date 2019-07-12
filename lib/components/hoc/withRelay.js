import { graphql } from 'react-apollo'

import { relayBalancesQuery } from 'lib/queries/relayBalancesQuery'
import { relayServerInfoQuery } from 'lib/queries/relayServerInfoQuery'
import { relayQuery } from 'lib/queries/relayQuery'
import { ZERO_ADDRESS } from 'lib/constants'

/**
 * @notice Wraps a component with a relayQuery.
 * Requires a relayHubAddress prop and *either* a relayUrl prop or relayAddress prop.
 * 
 * @param Component The component to wrap
 */
export function withRelay(Component) {
  return graphql(relayServerInfoQuery, {
    name: 'relayServerInfoQuery',
    skip: (props) => !props.relayUrl,
    options: (props) => ({
      variables: {
        url: props.relayUrl
      }
    }),
    props: (props) => {
      const { relayServerInfoQuery, ownProps } = props
      const { relayServerInfo } = relayServerInfoQuery || {}
      const { RelayServerAddress } = relayServerInfo || {}

      return {
        relayAddress: ownProps.relayAddress || RelayServerAddress
      }
    }
  })(
  graphql(relayBalancesQuery, {
    name: 'relayBalancesQuery',
    skip: (props) => !props.relayAddress,
    options: (props) => ({
      variables: {
        relayHubAddress: props.relayHubAddress,
        relayAddress: props.relayAddress
      }
    })
  })(
  graphql(relayQuery, {
    name: 'relayQuery',
    skip: (props) => {
      // return true
      const skip =
        !props.relayBalancesQuery ||
        !props.relayBalancesQuery.RelayHub ||
        !props.relayBalancesQuery.RelayHub.owner ||
        props.relayBalancesQuery.RelayHub.owner === ZERO_ADDRESS
      return skip
    },
    options: (props) => {
      const variables = {
        relayHubAddress: props.relayHubAddress,
        relayAddress: props.relayAddress
      }
      return {
        variables
      }
    }
  })(
    Component
  )))
}