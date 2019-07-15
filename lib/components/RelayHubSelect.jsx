import React, { PureComponent } from 'react'
import Creatable from 'react-select/creatable'
import { graphql } from 'react-apollo'
import { omit } from 'lodash'
import PropTypes from 'prop-types'

import { recentRelayHubsQuery } from 'lib/queries/recentRelayHubsQuery'
import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
import { isAddress } from 'lib/utils/isAddress'
import { abiMapping } from 'lib/apollo/abiMapping'
import { networkIdToName } from 'lib/utils/networkIdToName'

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
    onChange: PropTypes.func,
    onError: PropTypes.func
  }

  onChange = (option) => {
    let newOption = {...option}
    if (!newOption.networkId) {
      newOption.networkId = this.props.networkAccountQuery.networkId
    }
    if (isAddress(newOption.value)) {
      if (this.props.onChange) {
        this.props.onChange(newOption)
      }
    } else if (this.props.onError) {
      this.props.onError(newOption)
    }
  }

  render () {
    const { recentRelayHubsQuery, networkAccountQuery } = this.props
    const { recentRelayHubs } = recentRelayHubsQuery || {}
    const { networkId } = networkAccountQuery || {}

    const newProps = omit(this.props, ['onChange', 'onError'])


    let options = []

    let networkRelayHubAddress
    if (networkId) {
      networkRelayHubAddress = abiMapping.getAddress('RelayHub', parseInt(networkId, 10))
      const option = {
        label: networkRelayHubAddress,
        value: networkRelayHubAddress,
        networkId
      }
      options.push({
        label: `Relay Hub for ${networkIdToName(networkId)}`,
        options: [option]
      })

      if (!newProps.value) {
        newProps.value = option
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

    return (
      <Creatable
        {...newProps}
        placeholder='Select or type ...'
        className='react-select'
        classNamePrefix='react-select'
        allowCreateWhileLoading={true}
        formatCreateLabel={(inputValue) => `Use ${inputValue}...`}
        options={options}
        onChange={this.onChange}
      />
    )
  }
}
))
