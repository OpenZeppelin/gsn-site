import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { graphql, withApollo } from 'react-apollo'
import { react } from 'dapp-core'

import { ConnectWallet } from 'lib/components/ConnectWallet'
import { withSendTransaction } from './hoc/withSendTransaction'
import { withEthereumPermissionQuery } from './hoc/withEthereumPermissionQuery';
import { relayQuery } from 'lib/queries/relayQuery'
import { relayHubTargetSubscription } from '../subscriptions/relayHubTargetSubscription'

export const RelayForm = react.withTransactionEe(withSendTransaction(withApollo(withRouter(withEthereumPermissionQuery(graphql(relayQuery, {
  name: 'relayQuery',
  options: (props) => ({
    variables: {
      relayHubAddress: props.relayHubAddress,
      relayAddress: props.relayAddress
    }
  })
})(class _RelayHubForm extends PureComponent {
  static propTypes = {
    relayHubAddress: PropTypes.string.isRequired,
    relayAddress: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      stake: '0',
      deposit: '0'
    }
  }

  componentDidMount () {
    this.subscription = this.props.client.subscribe({
      query: relayHubTargetSubscription,
      variables: {
        relayHubAddress: this.props.relayHubAddress,
        targetAddress: this.props.relayAddress
      }
    }).subscribe(() => {
      this.props.relayQuery.refetch()
    })
  }

  componentWillUnmount () {
    this.subscription.unsubscribe()
  }

  handleSubmitStake = (e) => {
    e.preventDefault()
    this.props.sendTransaction({
      variables: {
        contractAddress: this.props.relayHubAddress,
        contractName: 'RelayHub',
        method: 'stake',
        args: [this.props.relayAddress, '30'],
        value: this.state.stake
      }
    }).then(({ data }) => {
      this.props.ee(data.sendTransaction.id)
        .on('error', function () {
          console.log('There was an error', arguments)
        })
        .on('receipt', () => {
          console.log('accepted!')
          this.setState({
            stake: '0'
          })
        })
    })
  }

  handleSubmitDeposit = (e) => {
    e.preventDefault()
    const variables = {
      contractAddress: this.props.relayHubAddress,
      contractName: 'RelayHub',
      method: 'depositFor',
      args: [this.props.relayAddress],
      value: this.state.deposit
    }

    console.log(variables)

    this.props.sendTransaction({
      variables
    }).then(({ data }) => {
      this.props.ee(data.sendTransaction.id)
        .on('error', function () {
          console.log('There was an error', arguments)
        })
        .on('receipt', () => {
          console.log('accepted!')
          this.setState({
            deposit: '0'
          })
        })
    })
  }

  render () {
    const { relayQuery, ethereumPermissionQuery } = this.props
    const { RelayHub, loading, error } = relayQuery

    const { ethereumPermission } = ethereumPermissionQuery

    let connect
    if (!ethereumPermission) {
      connect = <div>
        <ConnectWallet />
      </div>
    }

    if (loading) {
      return '...'
    } else if (error) {
      return 'The address provided is not a valid relay'
    } else {
      const { owner, stake, balance, relay } = RelayHub

      const { unstakeDelay } = relay

      return (
        <>
          <p>
            Owner: {owner.toString()}
          </p>  
          <p>
            Stake: {stake.toString()}
          </p>
          <p>
            Balance: {balance.toString()}
          </p>

          <p>
            Unstake Delay: {unstakeDelay.toString()}
          </p>

          {connect}

          <form onSubmit={this.handleSubmitStake}>
            <input disabled={!ethereumPermission} type='number' value={this.state.stake} onChange={(e) => this.setState({stake: e.target.value})} />
            <input disabled={!ethereumPermission} type='submit' value='Stake' />
          </form>

          <form onSubmit={this.handleSubmitDeposit}>
            <input disabled={!ethereumPermission} type='number' value={this.state.deposit} onChange={(e) => this.setState({deposit: e.target.value})} />
            <input disabled={!ethereumPermission} type='submit' value='Deposit' />
          </form>
        </>
      )
    }
  }
}))))))