import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

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
          <p className='pb-4 font-silkaRegular text-gray-500'>
            <Link href='/relay-hubs'><a>Relay Hubs</a></Link>
          </p>

          <p>
            To view a Relay Hub enter it's contract address below:
          </p>
          <form onSubmit={this.handleSubmit}>
            <DynamicApolloWrapper>
              <Field>
                <label htmlFor='relay-hubs-relay-hub-address'>
                  Relay Hub address
                </label>
                <RelayHubSelect
                  id='relay-hubs-relay-hub-address'
                  value={this.state.relayHubOption}
                  onChange={this.handleChangeRelayHubOption}
                  placeholder={`Select or type in ...`}
                />
              </Field>

              <Submit
                disabled={!this.state.relayHubOption}
                value='Go'
              />
            </DynamicApolloWrapper>
          </form>
        </Section>
      </MainLayout>
    )
  }
}

export default withRouter(RelayHubsIndex);