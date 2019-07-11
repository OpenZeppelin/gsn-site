import React, { PureComponent } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { graphql, withApollo, Query } from 'react-apollo'
import { react } from 'dapp-core'
import { ethers } from 'ethers'

import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ErrorMsg } from 'lib/components/ErrorMsg'
import { recipientQuery } from '../queries/recipientQuery'
import { relayHubQuery } from '../queries/relayHubQuery'
import { withSendTransaction } from './hoc/withSendTransaction'
import { withEthereumPermissionQuery } from './hoc/withEthereumPermissionQuery'
import { withNetworkAccountQuery } from './hoc/withNetworkAccountQuery'
import { relayHubTargetSubscription } from '../subscriptions/relayHubTargetSubscription'

import EthTextSymbol from 'lib/components/EthTextSymbol'

export const RecipientForm = react.withTransactionEe(withApollo(withSendTransaction(
  withNetworkAccountQuery(
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
      depositAmount: ''
    }
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
      this.props.ee(data.sendTransaction.id)
        .on('error', function () {
          console.log('There was an error', arguments)
        })
        .on('receipt', () => {
          console.log('accepted!')
          this.setState({
            depositAmount: ''
          })
        })
    })
  }

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
                    className='w-1/2'
                  >
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
                      max={ethers.utils.formatEther(maximumDeposit)}
                      value={this.state.depositAmount}
                      onChange={(e) => this.setState({depositAmount: e.target.value})}
                    />

                    <div className='text-right mt-2'>
                      <input
                        disabled={!ethereumPermission}
                        type='submit'
                        value='Deposit'
                      />
                    </div>
                  </form>
                )
              }
            }}
          </Query>
        </div>
      </>
    }
  }
}))))))