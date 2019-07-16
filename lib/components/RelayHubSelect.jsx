import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { recentRelayHubsQuery } from 'lib/queries/recentRelayHubsQuery'
import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
import { isAddress } from 'lib/utils/isAddress'
import { abiMapping } from 'lib/apollo/abiMapping'
import { networkIdToName } from 'lib/utils/networkIdToName'
import { GSNSelect } from 'lib/components/GSNSelect'

export const RelayHubSelect = withNetworkAccountQuery(
  graphql(recentRelayHubsQuery, {
    name: 'recentRelayHubsQuery',
    skip: (props) => !props.networkAccountQuery || !props.networkAccountQuery.networkId,
    options: (props) => {
      return {
        fetchPolicy: 'network-only',
        variables: {
          networkId: props.networkAccountQuery.networkId
        }
      }
    }
  })(
class _RelayHubSelect extends PureComponent {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.object
  }

  // onChange = (option) => {
  //   let newOption = {...option}
  //   if (!newOption.networkId) {
  //     newOption.networkId = this.props.networkAccountQuery.networkId
  //   }
  //   if (isAddress(newOption.value)) {
  //     if (this.props.onChange) {
  //       this.props.onChange(newOption)
  //     }
  //   } else {
  //   }
  // }

  render () {
    let options = []
    
    const { recentRelayHubsQuery, networkAccountQuery } = this.props
    const { recentRelayHubs } = recentRelayHubsQuery || {}
    const { networkId } = networkAccountQuery || {}


    let networkRelayHubAddress
    if (networkId) {
      networkRelayHubAddress = abiMapping.getAddress('RelayHub', parseInt(networkId, 10))
      if (networkRelayHubAddress) {
        const option = {
          label: networkRelayHubAddress,
          value: networkRelayHubAddress,
          networkId
        }
        options.push({
          label: `Relay Hub for ${networkIdToName(networkId)}`,
          options: [option]
        })
      }
    }

    if (recentRelayHubs) {
      options.push({
        label: 'Recent RelayHubs',
        options: recentRelayHubs.reduce((accumulator, { relayHubAddress, networkId }) => {
          if (relayHubAddress !== networkRelayHubAddress) {
            accumulator.push({
              label: relayHubAddress,
              value: relayHubAddress,
              networkId
            })
          }
          return accumulator
        }, [])
      })
    }

    return <GSNSelect
      {...this.props}
      options={options}
      valid={isAddress}
      typeName='address'
    />
  }
}))
