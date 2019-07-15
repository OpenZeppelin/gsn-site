import React, { PureComponent } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { graphql, Query } from 'react-apollo'
import { react } from 'dapp-core'
import { ethers } from 'ethers'

import { STATUS_IS_ZERO, USER_REJECTED_TX } from 'lib/constants'
import { EthTextSymbol } from 'lib/components/EthTextSymbol'
import { TxMessage } from 'lib/components/TxMessage'
import { Submit } from 'lib/components/form'
import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ConnectWalletText } from 'lib/components/ConnectWalletText'
import { ErrorMsg } from 'lib/components/ErrorMsg'
import { recipientQuery } from '../queries/recipientQuery'
import { relayHubQuery } from '../queries/relayHubQuery'
import { withFormProps } from 'lib/components/hoc/withFormProps'
import { withNetworkAccountQuery } from './hoc/withNetworkAccountQuery'
import { relayHubTargetSubscription } from '../subscriptions/relayHubTargetSubscription'

export const RecipientForm = withFormProps(
  withNetworkAccountQuery(
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
    state = {
      depositAmount: ''
    }

    static propTypes = {
      recipientAddress: PropTypes.string.isRequired
    }

    componentDidMount () {
      this.resetTxState()
      this.startSubscription()
    }

    componentDidUpdate () {
      this.startSubscription()
    }

    startSubscription() {
      if (this.subscription) { return }
      if (this.relayHubAddress()) {
        this.subscription = this.props.client.subscribe({
          query: relayHubTargetSubscription,
          variables: {
            relayHubAddress: this.relayHubAddress(),
            targetAddress: this.props.recipientAddress
          }
        }).subscribe(() => {
          this.props.recipientQuery.refetch()
        })
      }
    }

    componentWillUnmount () {
      if (this.subscription) {
        this.subscription.unsubscribe()
      }
    }

    handleSubmitDeposit = (e) => {
      e.preventDefault()
      this.resetTxState()

      if (!this.state.depositAmount) {
        return
      }

      this.props.sendTransaction({
        variables: {
          contractAddress: this.relayHubAddress(),
          contractName: 'RelayHub',
          method: 'depositFor',
          args: [this.props.recipientAddress],
          value: ethers.utils.parseEther(this.state.depositAmount).toString()
        }
      }).then(({ data }) => {
        const _this = this

        _this.setState({
          depositAmountInWallet: true
        })

        this.props.ee(data.sendTransaction.id)
          .on('sent', function () {
            _this.resetTxState()
            _this.setState({
              depositAmountInFlight: true
            })
          })
          .on('receipt', () => {
            _this.resetTxState()
            _this.setState({
              depositAmountCompleted: true
            })
          })
          .on('error', function () {
            if (arguments[0].error === USER_REJECTED_TX) {
              _this.resetTxState()
              return
            }

            console.log('There was an error', arguments)
            console.log(arguments[0].error)
            if (arguments[0].error === STATUS_IS_ZERO) {
              console.warn('Raise the gas amount and try again')
            }

            _this.resetTxState()
            _this.setState({
              depositAmountErrorMsg: true
            })
          })
      })
    }

    relayHubAddress = () => {
      if (this.props.recipientQuery.RelayRecipient) {
        return this.props.recipientQuery.RelayRecipient.relayHubAddress
      }
    }

    resetTxState = ({ clearAll } = { clearAll: false }) => {
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

    formLocked = () => {
      return this.state.depositAmountInWallet ||
        this.state.depositAmountInFlight ||
        this.state.depositAmountCompleted ||
        this.state.depositAmountError
    }

    render () {
      const {
        recipientQuery,
        ethereumPermissionQuery,
        networkAccountQuery
      } = this.props
      const { networkId, account } = networkAccountQuery
      const { RelayRecipient, error, loading } = recipientQuery
      const { ethereumPermission } = ethereumPermissionQuery

      let connect,
        connectWalletText
      if (!ethereumPermission) {
        connect = <ConnectWallet />
        connectWalletText = <ConnectWalletText />
      }

      if (error) {
        console.error(error)
        return <ErrorMsg
          title='This address is not a valid recipient.'
          extraText='Perhaps your web3 browser is set to the wrong Ethereum network?'
        />
      } else if (loading) {
        return '...'
      } else {
        const { balance, relayHubAddress } = RelayRecipient || {}

        return <>
          <dl>
            <dt>Relay Hub</dt>
            <dd>{relayHubAddress ? <Link href={`/relay-hubs/${relayHubAddress}`}><a>{relayHubAddress}</a></Link> : '?'}</dd>
          </dl>

          <dl>
            <dt>Ether Balance </dt>
            <dd>{balance ? ethers.utils.formatEther(balance) : '?'} <EthTextSymbol /></dd>
          </dl>

          {!ethereumPermission && (
            <div className='mt-6 mb-12'>
              {connect}
            </div>
          )}

          <div className='mt-12'>
            <Query query={relayHubQuery} variables={{relayHubAddress}}>
              {({data, loading, error}) => {
                if (loading) {
                  return <></>
                } else if (error) {
                  console.error(error)
                  return <></>
                } else {
                  const { maximumDeposit } = data.RelayHub
                  
                  return (
                    <form
                      onSubmit={this.handleSubmitDeposit}
                    >
                      <h3 className='font-silkaMedium mb-8 text-black'>
                        Increase Ether Balance
                      </h3>

                      {connectWalletText}

                      <label
                        htmlFor='deposit-amount'
                      >
                        Deposit Amount <span className='light'>(in Ether)</span>
                      </label>
                      <input
                        required
                        id='deposit-amount'
                        disabled={!ethereumPermission || this.formLocked()}
                        type='number'
                        min='0'
                        step='.000000001'
                        max={ethers.utils.formatEther(maximumDeposit)}
                        value={this.state.depositAmount}
                        onChange={(e) => this.setState({ depositAmount: e.target.value })}
                        className='mb-2 trans'
                      />

                      <Submit
                        disabled={!ethereumPermission || this.state.depositAmount === '' || this.formLocked()}
                        value={this.state.depositAmountInFlight ? `Depositing ...` : `Deposit`}
                      />

                      <TxMessage
                        txType={`Depositing`}
                        inWallet={this.state.depositAmountInWallet}
                        inFlight={this.state.depositAmountInFlight}
                        completed={this.state.depositAmountCompleted}
                        error={this.state.depositAmountErrorMsg}
                        resetTxState={this.resetTxState}
                      />
                    </form>
                  )
                }
              }}
            </Query>
          </div>
        </>
      }
    }
  }))
)