import { graphql } from 'react-apollo'

import { relayBalancesQuery } from 'lib/queries/relayBalancesQuery'
import { relayServerInfoQuery } from 'lib/queries/relayServerInfoQuery'
import { relayQuery } from 'lib/queries/relayQuery'
import { ZERO_ADDRESS } from 'lib/constants'
import { findLastRelayAddedUrl } from 'lib/queries/helpers/findLastRelayAddedUrl'

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
        relayAddress: ownProps.relayAddress || RelayServerAddress,
        relayServerInfoQuery
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
    },
    props: (props) => {
      const { relayQuery, ownProps } = props
      const { RelayHub, loading, error } = relayQuery || {}

      const newProps = {
        ...ownProps,
        relayQuery
      }

      if (RelayHub) {
        const { RelayAdded } = RelayHub
        newProps.relayUrl = ownProps.relayUrl || findLastRelayAddedUrl(RelayAdded)
      }

      return newProps
    }
  })(
    Component
  )))
}