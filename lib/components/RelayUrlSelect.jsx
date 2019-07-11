import React, { PureComponent } from 'react'
import Creatable from 'react-select/creatable'
import { graphql } from 'react-apollo'
import { omit } from 'lodash'
import PropTypes from 'prop-types'

import { recentRelayUrlsQuery } from 'lib/queries/recentRelayUrlsQuery'
import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
import { isUrl } from 'lib/utils/isUrl'

export const RelayUrlSelect = withNetworkAccountQuery(
  graphql(recentRelayUrlsQuery, {
    name: 'recentRelayUrlsQuery',
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
class _RelayUrlSelect extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    onError: PropTypes.func
  }

  onChange = (option) => {
    let newOption = {...option}
    if (!newOption.networkId) {
      newOption.networkId = this.props.networkAccountQuery.networkId
    }
    if (isUrl(newOption.value)) {
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

    const { recentRelayUrlsQuery } = this.props
    const { recentRelayUrls } = recentRelayUrlsQuery || {}

    if (recentRelayUrls) {
      options = recentRelayUrls.map(({ relayUrl, networkId }) => {
        return {
          label: relayUrl,
          value: relayUrl,
          networkId
        }
      })
    }

    return (
      <Creatable
        {...newProps}
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
