import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { ethers } from 'ethers'

import { ConnectWallet } from 'lib/components/ConnectWallet'
import { relayBalancesQuery } from 'lib/queries/relayBalancesQuery'
import { relayQuery } from 'lib/queries/relayQuery'
import { relayHubTargetSubscription } from '../subscriptions/relayHubTargetSubscription'
import { ZERO_ADDRESS } from 'lib/constants'
import { withFormProps } from 'lib/components/hoc/withFormProps'
import { RegisterRelayForm } from './RegisterRelayForm';

export const RelayForm = withFormProps(
  graphql(relayBalancesQuery, {
    name: 'relayBalancesQuery',
    options: (props) => ({
      variables: {
        relayHubAddress: props.relayHubAddress,
        relayAddress: props.relayAddress
      }
    })
  })(
  graphql(relayQuery, {
    name: 'relayQuery',
    skip: (props) => {
      const skip =
        !props.relayBalancesQuery ||
        !props.relayBalancesQuery.owner ||
        props.relayBalancesQuery.owner === ZERO_ADDRESS
      return skip
    },
    options: (props) => ({
      variables: {
        relayHubAddress: props.relayHubAddress,
        relayAddress: props.relayAddress
      }
    })
  })(
class _RelayHubForm extends PureComponent {
  static propTypes = {
    relayHubAddress: PropTypes.string.isRequired,
    relayAddress: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      stake: '',
      deposit: '',
      unstakeDelay: ''
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
      this.props.relayBalancesQuery.refetch()
    })
  }

  componentWillUnmount () {
    this.subscription.unsubscribe()
  }

  componentDidUpdate (oldProps) {
    console.log(this.state.unstakeDelay, this.unstakeDelay())
    if (this.state.unstakeDelay === '' && this.unstakeDelay() !== undefined) {
      this.setState({
        unstakeDelay: this.unstakeDelay()
      })
    }
  }

  unstakeDelay () {
    const { relayQuery } = this.props

    let relay
    if (relayQuery && relayQuery.RelayHub) {
      relay = relayQuery.RelayHub.relay
    }

    let unstakeDelay
    if (relay) {
      unstakeDelay = relay.unstakeDelay
    }

    return unstakeDelay
  }

  handleSubmitStake = (e) => {
    e.preventDefault()
    this.props.sendTransaction({
      variables: {
        contractAddress: this.props.relayHubAddress,
        contractName: 'RelayHub',
        method: 'stake',
        args: [this.props.relayAddress, this.state.unstakeDelay],
        value: ethers.utils.parseEther(this.state.stake)
      }
    }).then(({ data }) => {
      this.props.ee(data.sendTransaction.id)
        .on('error', function () {
          console.log('There was an error', arguments)
        })
        .on('receipt', () => {
          console.log('accepted!')
          this.setState({
            stake: ''
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
      value: ethers.utils.parseEther(this.state.deposit)
    }

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
            deposit: ''
          })
        })
    })
  }

  render () {
    const { relayBalancesQuery, ethereumPermissionQuery, relayQuery } = this.props
    const { RelayHub, loading, error } = relayBalancesQuery || {}

    let relay
    if (relayQuery && relayQuery.RelayHub) {
      relay = relayQuery.RelayHub.relay
    }

    const { ethereumPermission } = ethereumPermissionQuery || {}

    let connect
    if (!ethereumPermission) {
      connect = <div>
        <ConnectWallet />
      </div>
    }

    if (loading) {
      return '...'
    } else if (error) {
      console.error(error)
      return 'The address provided is not a valid relay'
    } else {
      let relayForm
      if (!relay) { // then it has been registered as a Relay
        relayForm = <RegisterRelayForm relayHubAddress={this.props.relayHubAddress} />
      }

      const { owner, stake, balance } = RelayHub || {}
      const unstakeDelay = this.unstakeDelay() || '0'

      return (
        <>
          <p>
            Owner: {owner ? owner.toString() : ZERO_ADDRESS}
          </p>  
          <p>
            Stake: {stake ? ethers.utils.formatEther(stake) : '0'}
          </p>
          <p>
            Balance: {balance ? ethers.utils.formatEther(balance) : '0'}
          </p>

          <p>
            Unstake Delay: {unstakeDelay ? unstakeDelay.toString() : '?'}
          </p>

          {connect}

          <form onSubmit={this.handleSubmitDeposit}>
            <input
              placeholder='deposit (eth)'
              disabled={!ethereumPermission} type='number' value={this.state.deposit} onChange={(e) => this.setState({deposit: e.target.value})} />
            <input disabled={!ethereumPermission} type='submit' value='Deposit' />
          </form>

          <form onSubmit={this.handleSubmitStake}>
            <input
              placeholder='stake (eth)'
              disabled={!ethereumPermission}
              type='number'
              value={this.state.stake}
              onChange={(e) => this.setState({stake: e.target.value})} />

            <input
              placeholder='unstake delay (s)'
              disabled={!ethereumPermission}
              type='number'
              value={this.state.unstakeDelay}
              onChange={(e) => this.setState({unstakeDelay: e.target.value})} />

            <input disabled={!ethereumPermission} type='submit' value='Stake' />
          </form>

          {relayForm}
        </>
      )
    }
  }
})))