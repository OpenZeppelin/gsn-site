import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { ConnectWallet } from 'lib/components/ConnectWallet'

import { recipientQuery } from '../queries/recipientQuery'
import { withSendTransaction } from './hoc/withSendTransaction'
import { withEthereumPermissionQuery } from './hoc/withEthereumPermissionQuery';

export const RecipientForm = withSendTransaction(
  withEthereumPermissionQuery(
  graphql(recipientQuery, {
    name: 'recipientQuery',
    options: (props) => {
      return {
        variables: {
          address: props.recipientAddress
        }
      }
    }
  })
(class _RecipientForm extends PureComponent {
  static propTypes = {
    recipientAddress: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      depositAmount: 0
    }
  }

  handleSubmitDeposit = (e) => {
    e.preventDefault()
    console.log('submit deposit ', this.state.depositAmount)

    this.props.sendTransaction({
      variables: {
        contractAddress: this.relayHubAddress(),
        contractName: 'RelayHub',
        method: 'depositFor',
        args: [this.props.recipientAddress],
        value: 1000000000
      }
    })
  }

  relayHubAddress = () => {
    return this.props.recipientQuery.RelayRecipient.relayHubAddress
  }

  render () {
    const { recipientQuery, ethereumPermissionQuery } = this.props
    const { RelayRecipient, error, loading } = recipientQuery
    const { ethereumPermission } = ethereumPermissionQuery

    let connect
    if (!ethereumPermission) {
      connect = <div>
        <ConnectWallet />
      </div>
    }

    if (error) {
      console.error(error)
      return error.message
    } else if (loading) {
      return '...'
    } else {
      return <>
        <p>
          Recipient balance is {RelayRecipient.balance.toString()}
        </p>
        <p>
          Relay Hub is {RelayRecipient.relayHubAddress.toString()}
        </p>

        {connect}

        <form onSubmit={this.handleSubmitDeposit}>
          <input disabled={!ethereumPermission} type='number' value={this.state.depositAmount} onChange={(e) => this.setState({depositAmount: e.target.value})} />
          <input disabled={!ethereumPermission} type='submit' value='Deposit' />
        </form>
      </>
    }
  }
})))