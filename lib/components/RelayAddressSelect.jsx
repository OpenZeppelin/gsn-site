import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { recentRelayAddressesQuery } from 'lib/queries/recentRelayAddressesQuery'
import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
import { GSNSelect } from 'lib/components/GSNSelect'
import { isAddress } from 'lib/utils/isAddress'

export const RelayAddressSelect = withNetworkAccountQuery(
  graphql(recentRelayAddressesQuery, {
    name: 'recentRelayAddressesQuery',
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
class _RelayAddressSelect extends PureComponent {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.object
  }

  render () {
    let options = []

    const { recentRelayAddressesQuery } = this.props
    const { recentRelayAddresses } = recentRelayAddressesQuery || {}

    if (recentRelayAddresses) {
      options = recentRelayAddresses.map(({ relayAddress, networkId }) => {
        return {
          label: relayAddress,
          value: relayAddress,
          networkId
        }
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
