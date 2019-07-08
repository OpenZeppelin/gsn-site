import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { queries } from 'dapp-core'
import { ethers } from 'ethers'

import { ConnectWallet } from 'lib/components/ConnectWallet'
import { withFormProps } from 'lib/components/hoc/withFormProps'

export const RegisterRelayForm = graphql(queries.networkAccountQuery, { name: 'networkAccountQuery' })(withFormProps(
  class _RegisterRelayForm extends PureComponent {
    static propTypes = {
      relayHubAddress: PropTypes.string.isRequired,
    }

    constructor (props) {
      super(props)
      this.state = {
        transactionFee: '0',
        url: '',
        stake: '0'
      }
    }

    handleRegisterRelay = (e) => {
      e.preventDefault()
      this.props.sendTransaction({
        variables: {
          contractAddress: this.props.relayHubAddress,
          contractName: 'RelayHub',
          method: 'registerRelay',
          args: [this.state.transactionFee, this.state.url],
          value: ethers.utils.parseEther(this.state.stake)
        }
      }).then(({ data }) => {
        this.props.ee(data.sendTransaction.id)
          .on('error', function () {
            console.log('There was an error', arguments)
          })
          .on('receipt', () => {
            console.log('accepted!')
          })
      })
    }

    render () {
      const { ethereumPermissionQuery, networkAccountQuery } = this.props
      const { ethereumPermission, loading, error } = ethereumPermissionQuery || {}
      const { account } = networkAccountQuery || {}

      if (loading) {
        return '...'
      } else if (error) {
        console.error(error)
        return 'The address provided is not a valid relay'
      } else {
        return (
          <>

            <form onSubmit={this.handleRegisterRelay}>
              <div>
                Relay address: {account}
              </div>

              <div>
                <label htmlFor='transaction-fee'>Stake (Eth)</label>
                <input disabled={!ethereumPermission} type='number' value={this.state.stake} onChange={(e) => this.setState({stake: e.target.value })} />
              </div>

              <div>
                <label htmlFor='transaction-fee'>Transaction Fee (whole %)</label>
                <input disabled={!ethereumPermission} type='number' value={this.state.transactionFee} onChange={(e) => this.setState({transactionFee: e.target.value })} />
              </div>

              <div>
                <label htmlFor='transaction-fee'>URL</label>
                <input disabled={!ethereumPermission} type='text' value={this.state.url} onChange={(e) => this.setState({url: e.target.value})} />
              </div>

              <input disabled={!ethereumPermission} type='submit' value='Register' />
            </form>
          </>
        )
      }
    }
  }
))