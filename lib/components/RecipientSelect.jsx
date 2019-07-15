import React, { PureComponent } from 'react'
import Creatable from 'react-select/creatable'
import { graphql } from 'react-apollo'
import { omit } from 'lodash'
import PropTypes from 'prop-types'

import { recentRecipientsQuery } from 'lib/queries/recentRecipientsQuery'
import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
import { isAddress } from 'lib/utils/isAddress'

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

    return (
      <Creatable
        {...newProps}
        className='react-select'
        classNamePrefix='react-select'
        placeholder='Select or type ...'
        allowCreateWhileLoading={true}
        formatCreateLabel={(inputValue) => `Use ${inputValue}...`}
        options={options}
        onChange={this.onChange}
      />
    )
  }
}
))
