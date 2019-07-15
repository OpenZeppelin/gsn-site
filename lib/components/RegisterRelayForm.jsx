import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { queries } from 'dapp-core'

import { STATUS_IS_ZERO, USER_REJECTED_TX } from 'lib/constants'
import { TxMessage } from 'lib/components/TxMessage'
import { ConnectWalletText } from 'lib/components/ConnectWalletText'
import { Submit } from 'lib/components/form'
import { ErrorMsg } from 'lib/components/ErrorMsg'
import { withFormProps } from 'lib/components/hoc/withFormProps'

export const RegisterRelayForm = graphql(
  queries.networkAccountQuery,
  { name: 'networkAccountQuery' }
)(withFormProps(
  class _RegisterRelayForm extends PureComponent {
    state = {
      transactionFee: '',
      url: ''
    }

    static propTypes = {
      relayHubAddress: PropTypes.string.isRequired,
    }

    handleRegisterRelay = (e) => {
      e.preventDefault()
      this.resetRegisterTxState()

      this.props.sendTransaction({
        variables: {
          contractAddress: this.props.relayHubAddress,
          contractName: 'RelayHub',
          method: 'registerRelay',
          args: [this.state.transactionFee, this.state.url]
        }
      }).then(({ data }) => {
        const _this = this

        _this.setState({
          registerTxInWallet: true
        })

        this.props.ee(data.sendTransaction.id)
          .on('sent', function () {
            _this.resetStakeTxState()
            _this.setState({
              registerTxInFlight: true
            })
          })
          .on('receipt', () => {
            _this.resetStakeTxState()
            _this.setState({
              registerTxCompleted: true
            })
          })
          .on('error', function () {
            if (arguments[0].error === USER_REJECTED_TX) {
              _this.resetRegisterTxState()
              return
            }

            console.log('There was an error', arguments)
            console.log(arguments[0].error)
            if (arguments[0].error === STATUS_IS_ZERO) {
              console.warn('Raise the gas amount and try again')
            }

            _this.resetRegisterTxState()
            _this.setState({
              registerTxErrorMsg: true
            })
          })
          
      })
    }

    resetRegisterTxState = ({ clearAll } = { clearAll: false }) => {
      if (clearAll) {
        this.setState({
          transactionFee: '',
          url: ''
        })
      }

      this.setState({
        registerTxInWallet: false,
        registerTxInFlight: false,
        registerTxErrorMsg: false,
        registerTxCompleted: false
      })
    }

    registerFormLocked = () => {
      return this.state.registerTxInWallet ||
        this.state.registerTxInFlight ||
        this.state.registerTxCompleted ||
        this.state.registerTxError
    }

    render () {
      const { ethereumPermissionQuery, networkAccountQuery } = this.props
      const { ethereumPermission, loading, error } = ethereumPermissionQuery || {}
      const { account } = networkAccountQuery || {}

      let connectWalletText
      if (!ethereumPermission) {
        connectWalletText = <ConnectWalletText />
      }

      if (loading) {
        return '...'
      } else if (error) {
        console.error(error)
        return <ErrorMsg
          title='The address provided is not a valid recipient.'
          extraText='Perhaps your web3 browser is set to the wrong Ethereum network?'
        />
      } else {
        return (
          <>
            <form onSubmit={this.handleRegisterRelay}>
              <h3 className='font-silkaMedium mb-8 text-black'>
                Register Relay
              </h3>
              {connectWalletText}

              {account && <span className='light mb-8'>
                New Relay address: {account}
              </span>}
              
              <label
                htmlFor='register-transaction-fee'
              >
                Transaction Fee <span className="light">(Whole %, ie. '2.5')</span>
              </label>
              <input
                id='register-transaction-fee'
                disabled={!ethereumPermission || this.registerFormLocked()}
                type='number'
                value={this.state.transactionFee}
                onChange={(e) => this.setState({transactionFee: e.target.value })}
                className='mb-6 trans'
                required
              />

              <label htmlFor='register-url'>URL</label>
              <input
                id='register-url'
                disabled={!ethereumPermission || this.registerFormLocked()}
                type='text'
                value={this.state.url}
                onChange={(e) => this.setState({url: e.target.value})}
                className='mb-6 trans'
                required
              />

              <Submit 
                disabled={!ethereumPermission ||
                  this.state.transactionFee === '' ||
                  this.state.url === '' ||
                  this.registerFormLocked()
                }
                value={this.state.registerTxInFlight ? `Registering ...` : `Register`}
              />
              <TxMessage
                txType={`Registering`}
                inWallet={this.state.registerTxInWallet}
                inFlight={this.state.registerTxInFlight}
                completed={this.state.registerTxCompleted}
                error={this.state.registerTxErrorMsg}
                resetTxState={this.resetRegisterTxState}
              />
            </form>
          </>
        )
      }
    }
  }
))