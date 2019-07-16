import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import { recentRecipientsQuery } from 'lib/queries/recentRecipientsQuery'
import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
import { isAddress } from 'lib/utils/isAddress'
import { GSNSelect } from 'lib/components/GSNSelect'

export const RecipientSelect = withNetworkAccountQuery(
  graphql(recentRecipientsQuery, {
    name: 'recentRecipientsQuery',
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
class _RecipientSelect extends PureComponent {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.object
  }

  render () {
    let options = []
    
    const { recentRecipientsQuery } = this.props
    const { recentRecipients } = recentRecipientsQuery || {}

    if (recentRecipients) {
      options = recentRecipients.map(({ recipientAddress, networkId }) => {
        return {
          label: recipientAddress,
          value: recipientAddress,
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
