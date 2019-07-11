import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { RelayHubSelect } from 'lib/components/RelayHubSelect'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { addRecentRelayHub } from 'lib/services/addRecentRelayHub'
import {
  Submit,
  Field
} from 'lib/components/form'

const RelayHubsIndex = class _RelayHubsIndex extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      relayHubOption: null
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    
    if (this.state.relayHubOption) {
      await addRecentRelayHub({
        relayHubAddress: this.state.relayHubOption.value,
        networkId: this.state.relayHubOption.networkId
      })
      this.props.router.push(
        `/relay-hubs/${this.state.relayHubOption.value}`
      )
    }
  }

  handleChangeRelayHubOption = (relayHubOption) => {
    this.setState({
      relayHubOption
    })
  }

  render () {
    return (
      <MainLayout>
        <Section>
          <h1>Relay Hub Tool</h1>
          <p>
            To view a Relay Hub enter the contract address below.
          </p>
          <form onSubmit={this.handleSubmit}>
            <DynamicApolloWrapper>
              <Field>
                <RelayHubSelect value={this.state.relayHubOption} onChange={this.handleChangeRelayHubOption} />
              </Field>
            </DynamicApolloWrapper>
            <Submit value='Go' />
          </form>
        </Section>
      </MainLayout>
    )
  }
}

export default withRouter(RelayHubsIndex);