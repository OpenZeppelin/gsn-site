import React, { PureComponent } from 'react'
import Creatable from 'react-select/creatable'
import { graphql } from 'react-apollo'
import { omit } from 'lodash'
import PropTypes from 'prop-types'

import { recentRelayAddressesQuery } from 'lib/queries/recentRelayAddressesQuery'
import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
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
      // error toast?
    }
  }

  render () {
    const newProps = omit(this.props, ['onChange', 'onError'])

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
