import React, { Component } from 'react'

import { Submit, Field } from 'lib/components/form'
import { RelayHubSelect } from 'lib/components/RelayHubSelect'
import { abiMapping } from 'lib/apollo/abiMapping'
import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'

export const RelayHubSearchForm = withNetworkAccountQuery(class _RelaysIndex extends Component {
  state = {
    relayHubOption: null
  }

  componentDidMount () {
    this.checkRelayHubDefault()
  }

  componentDidUpdate () {
    this.checkRelayHubDefault()
  }

  checkRelayHubDefault = () => {
    const { networkAccountQuery } = this.props
    const { networkId } = networkAccountQuery || {}

    if (networkId) {
      const relayHubAddress = abiMapping.getAddress('RelayHub', networkId)
      if (relayHubAddress && !this.state.relayHubOption) {
        this.setState({
          relayHubOption: {
            value: relayHubAddress,
            label: relayHubAddress,
            networkId
          }
        })
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.relayHubOption && this.props.onSubmit) {
      this.props.onSubmit(this.state.relayHubOption)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className='font-silkaMedium mb-6'>
          Lookup RelayHub &amp; Relay Nodes
        </h3>
        <label htmlFor='relays-relay-hub-address'>
          RelayHub address
        </label>

        <Field>
          <RelayHubSelect
            id='relays-relay-hub-address'
            className='flex-1'
            placeholder='Select or type ...'
            value={this.state.relayHubOption}
            handleChange={(relayHubOption) => this.setState({ relayHubOption })}
          />
        </Field>

        <Submit
          disabled={!this.state.relayHubOption}
          value='Go'
        />
      </form>
    )
  }
})
