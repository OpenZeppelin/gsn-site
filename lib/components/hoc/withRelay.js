import { graphql } from 'react-apollo'

import { relayBalancesQuery } from 'lib/queries/relayBalancesQuery'
import { relayAddressQuery } from 'lib/queries/relayAddressQuery'
import { relayQuery } from 'lib/queries/relayQuery'
import { ZERO_ADDRESS } from 'lib/constants'

/**
 * @notice Wraps a component with a relayQuery.
 * Requires a relayHubAddress prop and *either* a relayUrl prop or relayAddress prop.
 * 
 * @param Component The component to wrap
 */
export function withRelay(Component) {
  return graphql(relayAddressQuery, {
    name: 'relayAddressQuery',
    skip: (props) => !props.relayUrl,
    options: (props) => ({
      variables: {
        url: props.relayUrl
      }
    }),
    props: (props) => {
      const { relayAddressQuery, ownProps } = props
      const { relayAddress } = relayAddressQuery || {}

      return {
        relayAddress: ownProps.relayAddress || relayAddress
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