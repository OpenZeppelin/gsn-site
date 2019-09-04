import React, { PureComponent } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { ethers } from 'ethers'

import { EthTextSymbol } from 'lib/components/EthTextSymbol'
import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ErrorMsg } from 'lib/components/ErrorMsg'
import { recipientQuery } from '../queries/recipientQuery'
import { recipientBalanceQuery } from '../queries/recipientBalanceQuery'
import { withFormProps } from 'lib/components/hoc/withFormProps'
import { withNetworkAccountQuery } from './hoc/withNetworkAccountQuery'
import { relayHubTargetSubscription } from '../subscriptions/relayHubTargetSubscription'
import { RecipientDepositForm } from './RecipientDepositForm';

const RecipientBalance = withFormProps(
  withNetworkAccountQuery(
    graphql(recipientBalanceQuery, {
      name: 'recipientBalanceQuery',
      options: (props) => {
        const { recipientAddress, relayHubAddress } = props;
        return { recipientAddress, relayHubAddress };
      }
    })
    (class _RecipientBalance extends PureComponent {
      render() {
        const { RelayHub } = this.props.recipientBalanceQuery;
        if (RelayHub === undefined) {
          return ["..."];
        } else {
          return [ethers.utils.formatEther(RelayHub.balance)];
        }
      }
    })
  )
);

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
      currentTab: 0
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

    relayHubAddress = () => {
      if (this.props.recipientQuery.RelayRecipient) {
        return this.props.recipientQuery.RelayRecipient.relayHubAddress
      }
    }

    render () {
      const {
        recipientQuery,
        recipientAddress,
        ethereumPermissionQuery
      } = this.props
      const { RelayRecipient, error, loading } = recipientQuery
      const { ethereumPermission } = ethereumPermissionQuery

      let connect
      if (!ethereumPermission) {
        connect = <ConnectWallet />
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
        let depositers
        if (this.state.currentTab === 1) {
          depositers = <RecipientDepositers relayHubAddress={relayHubAddress} recipientAddress={recipientAddress} />
        }

        return <>
          <dl>
            <dt>Relay Hub</dt>
            <dd>{relayHubAddress ? <Link href={`/relay-hubs/${relayHubAddress}`}><a>{relayHubAddress}</a></Link> : '?'}</dd>
          </dl>

          <dl>
            <dt>Ether Balance </dt>
            <dd><RecipientBalance relayHubAddress={relayHubAddress} recipientAddress={recipientAddress} /> <EthTextSymbol /></dd>
          </dl>

          {!ethereumPermission && (
            <div className='mt-6 mb-12'>
              {connect}
            </div>
          )}
  
          <RecipientDepositForm recipientAddress={recipientAddress} />
        </>
      }
    }
  }))
)
