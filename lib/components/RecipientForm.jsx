import React, { PureComponent } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { graphql, Query } from 'react-apollo'
import { react } from 'dapp-core'
import { ethers } from 'ethers'

import { EthTextSymbol } from 'lib/components/EthTextSymbol'
import { Submit } from 'lib/components/form'
import { ConnectWallet } from 'lib/components/ConnectWallet'
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
      depositAmount: '',
      depositAmountInFlight: false,
      depositAmountErrorMsg: ''
    }

    static propTypes = {
      recipientAddress: PropTypes.string.isRequired
    }

    componentDidMount () {
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

        this.props.ee(data.sendTransaction.id)
          .on('receipt', () => {
            console.log('accepted!')
            _this.setState({
              depositAmount: '',
              depositAmountInFlight: true
            })
          })
          .on('sent', function () {
            console.log('SENT!')
          })
          .on('error', function () {
            console.log('There was an error', arguments)

            _this.setState({
              depositAmountErrorMsg: true
            })
          })
      })
    }

    // .then(({ data }) => {
    //   this.props.ee(data.sendTransaction.id)
    //     .on('error', (t) => {
    //       debug('error: ', t)
    //     })
    //     .on('receipt', (t) => {
    //       debug('receipt: ', t)
    //     })
    // })

    relayHubAddress = () => {
      if (this.props.recipientQuery.RelayRecipient) {
        return this.props.recipientQuery.RelayRecipient.relayHubAddress
      }
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

      let connect
      if (!ethereumPermission) {
        connect = <div>
          <ConnectWallet />
        </div>
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

          {connect}

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

                      <label
                        htmlFor='deposit-amount'
                      >
                        Deposit Amount <span className='light'>(in Ether)</span>
                      </label>
                      <input
                        required
                        id='deposit-amount'
                        disabled={!ethereumPermission}
                        type='number'
                        min='0'
                        step='.000000001'
                        max={ethers.utils.formatEther(maximumDeposit)}
                        value={this.state.depositAmount}
                        onChange={(e) => this.setState({ depositAmount: e.target.value })}
                        className='mb-2'
                      />

                      <Submit
                        disabled={!ethereumPermission || this.state.depositAmount === '' || this.state.depositAmountInFlight}
                        value={this.state.depositAmountInFlight ? `Depositing ...` : `Deposit`}
                      />
                      {this.state.depositAmountErrorMsg && 
                        <span className='text-red-600 text-sm font-silkaMedium'>
                          There was an error. <a onClick={(e) => {
                            e.preventDefault()
                            this.setState({
                              depositAmountErrorMsg: false
                            })
                          }} href=''>Okay</a>
                        </span>
                      }
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