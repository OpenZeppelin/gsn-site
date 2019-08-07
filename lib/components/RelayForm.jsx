import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ethers } from 'ethers'

import { STATUS_IS_ZERO, USER_REJECTED_TX } from 'lib/constants'
import { TxMessage } from 'lib/components/TxMessage'
import { EthTextSymbol } from 'lib/components/EthTextSymbol'
import { EthUserLink } from 'lib/components/EthUserLink'
import { Submit } from 'lib/components/form'
import { ErrorMsg } from 'lib/components/ErrorMsg'
import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ConnectWalletText } from 'lib/components/ConnectWalletText'
import { relayHubTargetSubscription } from '../subscriptions/relayHubTargetSubscription'
import { ZERO_ADDRESS } from 'lib/constants'
import { withFormProps } from 'lib/components/hoc/withFormProps'
import { RegisterRelayForm } from './RegisterRelayForm'
import { withRelay } from 'lib/components/hoc/withRelay'
import { RelayUrlTestForm } from 'lib/components/RelayUrlTestForm'

export const RelayForm = withFormProps(withRelay(
  class _RelayHubForm extends Component {
    state = {
      stakeAmount: '',
      depositAmount: '',
      unstakeDelay: '',
      relayAddress: ''
    }

    static propTypes = {
      relayHubAddress: PropTypes.string.isRequired,
      relayAddress: PropTypes.string,
      relayUrl: PropTypes.string
    }

    componentDidMount () {
      this.subscription = this.props.client.subscribe({
        query: relayHubTargetSubscription,
        variables: {
          relayHubAddress: this.props.relayHubAddress,
          targetAddress: this.props.relayAddress
        }
      }).subscribe(() => {
        if (this.props.relayBalancesQuery) {
          this.props.relayBalancesQuery.refetch()
        }
      })
    }

    componentWillUnmount () {
      this.subscription.unsubscribe()
    }

    componentDidUpdate (oldProps) {
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
      this.resetStakeTxState()
      this.props.sendTransaction({
        variables: {
          contractAddress: this.props.relayHubAddress,
          contractName: 'RelayHub',
          method: 'stake',
          args: [this.props.relayAddress, this.state.unstakeDelay],
          value: ethers.utils.parseEther(this.state.stakeAmount)
        }
      }).then(({ data }) => {
        const _this = this

        _this.setState({
          stakeAmountInWallet: true
        })

        this.props.ee(data.sendTransaction.id)
          .on('sent', function () {
            _this.resetStakeTxState()
            _this.setState({
              stakeAmountInFlight: true
            })
          })
          .on('receipt', () => {
            _this.resetStakeTxState()
            _this.setState({
              stakeAmountCompleted: true
            })
          })
          .on('error', function () {
            if (arguments[0].error === USER_REJECTED_TX) {
              _this.resetStakeTxState()
              return
            }

            console.log('There was an error', arguments)
            console.log(arguments[0].error)
            if (arguments[0].error === STATUS_IS_ZERO) {
              console.warn('Raise the gas amount and try again')
            }

            _this.resetStakeTxState()
            _this.setState({
              stakeAmountErrorMsg: true
            })
          })
      })
    }

    handleSubmitDeposit = (e) => {
      e.preventDefault()
      this.resetDepositTxState()
      const variables = {
        contractAddress: this.props.relayHubAddress,
        contractName: 'RelayHub',
        method: 'depositFor',
        args: [this.props.relayAddress],
        value: ethers.utils.parseEther(this.state.depositAmount)
      }

      this.props.sendTransaction({
        variables
      }).then(({ data }) => {
        const _this = this

        _this.setState({
          depositAmountInWallet: true
        })

        this.props.ee(data.sendTransaction.id)
          .on('sent', function () {
            _this.resetDepositTxState()
            _this.setState({
              depositAmountInFlight: true
            })
          })
          .on('receipt', () => {
            _this.resetDepositTxState()
            _this.setState({
              depositAmountCompleted: true
            })
          })
          .on('error', function () {
            if (arguments[0].error === USER_REJECTED_TX) {
              _this.resetDepositTxState()
              return
            }

            console.log('There was an error', arguments)
            console.log(arguments[0].error)
            if (arguments[0].error === STATUS_IS_ZERO) {
              console.warn('Raise the gas amount and try again')
            }

            _this.resetDepositTxState()
            _this.setState({
              depositAmountErrorMsg: true
            })
          })
      })
    }

    resetDepositTxState = ({ clearAll } = { clearAll: false }) => {
      if (clearAll) {
        this.setState({
          depositAmount: ''
        })
      }

      this.setState({
        depositAmountInWallet: false,
        depositAmountInFlight: false,
        depositAmountErrorMsg: false,
        depositAmountCompleted: false
      })
    }

    resetStakeTxState = ({ clearAll } = { clearAll: false }) => {
      if (clearAll) {
        this.setState({
          stakeAmount: ''
        })
      }

      this.setState({
        stakeAmountInWallet: false,
        stakeAmountInFlight: false,
        stakeAmountErrorMsg: false,
        stakeAmountCompleted: false
      })
    }

    depositFormLocked = () => {
      return this.state.depositAmountInWallet ||
        this.state.depositAmountInFlight ||
        this.state.depositAmountCompleted ||
        this.state.depositAmountError
    }

    stakeFormLocked = () => {
      return this.state.stakeAmountInWallet ||
        this.state.stakeAmountInFlight ||
        this.state.stakeAmountCompleted ||
        this.state.stakeAmountError
    }

    render () {
      const { relayBalancesQuery, ethereumPermissionQuery, relayQuery } = this.props
      const { RelayHub, loading, error } = relayBalancesQuery || {}

      let relay
      if (relayQuery) {
        let { RelayHub, loading, error } = relayQuery
        if (error) {
          console.error(error)
        } else if (RelayHub) {
          relay = RelayHub.relay
        }
      }

      const { ethereumPermission } = ethereumPermissionQuery || {}

      let connect,
        connectWalletText
      if (!ethereumPermission) {
        connect = <ConnectWallet />
        connectWalletText = <ConnectWalletText />
      }

      if (!this.props.relayAddress && !this.props.relayUrl) {
        return <ErrorMsg
          title='No Relay Address or Relay URL was provided.'
          extraText='Please provide one or the other.'
        />
      }

      if (loading) {
        return '...'
      } else if (error) {
        console.error(error)
        return <ErrorMsg
          title='The address provided is not a valid relay.'
          extraText='Perhaps your web3 browser is set to the wrong Ethereum network?'
        />
      } else {
        let registerRelayForm
        if (relay === undefined || relay.state.toString() === '1') { // then it needs to be registered
          registerRelayForm = <RegisterRelayForm
            relayHubAddress={this.props.relayHubAddress}
          />
        }

        const { relay, balance } = RelayHub || {}
        let owner = null
        let stake = 0
        if (relay) {
          owner = relay.owner
          stake =relay.totalStake
        }
        const unstakeDelay = this.unstakeDelay() || '0'

        return (
          <>
            <dl>
              <dt>Full Address / URL</dt>
              <dd className='break-all'>
                {this.props.relayAddress ?
                  <EthUserLink address={this.props.relayAddress} /> :
                  this.props.relayUrl
                }
              </dd>
            </dl>

            <dl>
              <dt>Owner</dt>
              <dd className='break-all'>
                {owner ?
                  <EthUserLink address={owner.toString()} /> :
                  ZERO_ADDRESS
                }
              </dd>
            </dl>

            <dl>
              <dt>Stake</dt>
              <dd>{stake ? ethers.utils.formatEther(stake) : '0'} <EthTextSymbol /></dd>
            </dl>

            <dl>
              <dt>Balance</dt>
              <dd>{balance ? ethers.utils.formatEther(balance) : '0'} <EthTextSymbol /></dd>
            </dl>

            <dl>
              <dt>Unstake Delay</dt>
              <dd>{unstakeDelay ? unstakeDelay.toString() : '?'} <span className='light'>seconds</span></dd>
            </dl>

            {!ethereumPermission && (
              <div className='mt-6 mb-12'>
                {connect}
              </div>
            )}

            <form>
              <RelayUrlTestForm relayUrl={this.props.relayUrl} />
            </form>

            <form onSubmit={this.handleSubmitDeposit}>
              <h3 className='font-silkaMedium mb-8 text-black'>
                Increase Ether Balance
              </h3>
              {connectWalletText}

              <label htmlFor='relay-form-deposit'>
                Deposit Amount <span className='light'>(In Ether)</span>
              </label>
              <input
                id='relay-form-deposit'
                disabled={!ethereumPermission || this.depositFormLocked()}
                type='number'
                value={this.state.depositAmount}
                onChange={(e) => this.setState({depositAmount: e.target.value})}
                className='mb-6 trans'
                required
              />
            
              <Submit
                disabled={!ethereumPermission || this.state.depositAmount === '' || this.depositFormLocked()}
                value={this.state.depositAmountInFlight ? `Depositing ...` : `Deposit`}
              />
              <TxMessage
                txType={`Depositing`}
                inWallet={this.state.depositAmountInWallet}
                inFlight={this.state.depositAmountInFlight}
                completed={this.state.depositAmountCompleted}
                error={this.state.depositAmountErrorMsg}
                resetTxState={this.resetDepositTxState}
              />
            </form>

            <form onSubmit={this.handleSubmitStake}>
              <h3 className='font-silkaMedium mb-8'>
                Increase Stake &amp; Update Stake Delay
              </h3>
              {connectWalletText}

              <label htmlFor='relay-form-stake'>
                Stake Amount <span className='light'>(In Ether)</span>
              </label>
              <input
                id='relay-form-stake'
                disabled={!ethereumPermission || this.stakeFormLocked()}
                type='number'
                value={this.state.stakeAmount}
                onChange={(e) => this.setState({ stakeAmount: e.target.value })}
                className='mb-6 trans'
                required
              />

              <label htmlFor='relay-form-unstake-delay'>
                Stake Delay <span className='light'>(In Seconds)</span>
              </label>
              <input
                id='relay-form-unstake-delay'
                disabled={!ethereumPermission || this.stakeFormLocked()}
                type='number'
                value={this.state.unstakeDelay}
                onChange={(e) => this.setState({unstakeDelay: e.target.value})}
                className='mb-6 trans'
                required
              />

              <Submit
                disabled={!ethereumPermission || this.state.stakeAmount === '' || this.stakeFormLocked()}
                value={this.state.stakeAmountInFlight ? `Staking ...` : `Stake`}
              />
              <TxMessage
                txType={`Staking`}
                inWallet={this.state.stakeAmountInWallet}
                inFlight={this.state.stakeAmountInFlight}
                completed={this.state.stakeAmountCompleted}
                error={this.state.stakeAmountErrorMsg}
                resetTxState={this.resetStakeTxState}
              />
            </form>

            {registerRelayForm}
          </>
        )
      }
    }
  }))