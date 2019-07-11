import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { queries } from 'dapp-core'

import { Submit } from 'lib/components/form'
import { ErrorMsg } from 'lib/components/ErrorMsg'
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
        url: ''
      }
    }

    handleRegisterRelay = (e) => {
      e.preventDefault()
      this.props.sendTransaction({
        variables: {
          contractAddress: this.props.relayHubAddress,
          contractName: 'RelayHub',
          method: 'registerRelay',
          args: [this.state.transactionFee, this.state.url]
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
        return <ErrorMsg
          title='The address provided is not a valid recipient.'
          extraText='Perhaps your web3 browser is set to the wrong Ethereum network?'
        />
      } else {
        return (
          <>
            <form onSubmit={this.handleRegisterRelay}>
              <h3 className='font-silkaMedium mb-6 text-black'>
                Register Relay
              </h3>
              <span className='light mb-6'>
                New Relay address: {account}
              </span>

              <label
                htmlFor='transaction-fee'
              >
                Transaction Fee <span className="light">(Whole %, ie. '2.5')</span>
              </label>
              <input
                id='transaction-fee'
                disabled={!ethereumPermission}
                type='number'
                value={this.state.transactionFee}
                onChange={(e) => this.setState({transactionFee: e.target.value })}
                className='mb-6'
                required
              />

              <label htmlFor='transaction-fee'>URL</label>
              <input
                disabled={!ethereumPermission}
                type='text'
                value={this.state.url}
                onChange={(e) => this.setState({url: e.target.value})}
                className='mb-6'
                required
              />

              <Submit 
                disabled={!ethereumPermission}
                value='Register'
              />
            </form>
          </>
        )
      }
    }
  }
))