import React, { PureComponent } from 'react'
import Creatable from 'react-select/creatable'
import { graphql } from 'react-apollo'
import { omit } from 'lodash'
import PropTypes from 'prop-types'

import { recentRelayHubsQuery } from 'lib/queries/recentRelayHubsQuery'
import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
import { isAddress } from 'lib/utils/isAddress'

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
    const newProps = omit(this.props, ['onChange', 'onError'])

    let options = []

    const { recentRelayHubsQuery } = this.props
    const { recentRelayHubs } = recentRelayHubsQuery || {}

    if (recentRelayHubs) {
      options = recentRelayHubs.map(({ relayHubAddress, networkId }) => {
        return {
          label: relayHubAddress,
          value: relayHubAddress,
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
