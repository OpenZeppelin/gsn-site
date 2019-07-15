import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { recentRelayUrlsQuery } from 'lib/queries/recentRelayUrlsQuery'
import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
import { GSNSelect } from 'lib/components/GSNSelect'
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
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.object
  }

  render () {
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

    return <GSNSelect
      {...this.props}
      options={options}
      valid={isUrl}
      typeName='URL'
    />
  }
}))
