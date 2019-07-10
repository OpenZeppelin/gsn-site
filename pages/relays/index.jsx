import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { isUrl } from 'lib/utils/isUrl'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { formatRelayUrl } from 'lib/utils/formatRelayUrl'
import {
  AddressInput,
  UrlInput,
  Submit,
  Field
} from 'lib/components/form'
import { RelayHubSelect } from 'lib/components/RelayHubSelect'
import { RelayUrlSelect } from 'lib/components/RelayUrlSelect'
import { addRecentRelayHub } from 'lib/services/addRecentRelayHub'
import { addRecentRelayUrl } from 'lib/services/addRecentRelayUrl'

const RelaysIndex = class _RelaysIndex extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      relayUrlOption: null,
      relayHubOption: null
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { relayHubOption, relayUrlOption } = this.state

    if (relayHubOption && relayUrlOption) {
      await addRecentRelayHub({
        relayHubAddress: relayHubOption.value,
        networkId: relayHubOption.networkId
      })
      await addRecentRelayUrl({
        relayUrl: relayUrlOption.value,
        networkId: relayUrlOption.networkId
      })
      this.props.router.push(
        formatRelayUrl({
          relayHubAddress: relayHubOption.value,
          relayUrl: relayUrlOption.value
        })
      )
    }
  }

  render() {
    return (
      <MainLayout>
        <Section>
          <h1>Relay Tool</h1>
          <p>
            To view and manage a GSN Relay please enter the Relay Hub address and the Relay url below.
          </p>

          <DynamicApolloWrapper>
            <form onSubmit={this.handleSubmit}>
              <Field className='flex'>
                <RelayHubSelect
                  className='flex-1'
                  placeholder='enter the Relay Hub address'
                  value={this.state.relayHubOption}
                  onChange={(relayHubOption) => this.setState({relayHubOption}) }
                  />
              </Field>

              <Field className='flex'>
                <RelayUrlSelect
                  className='flex-1'
                  placeholder='enter the Relay url'
                  value={this.state.relayUrlOption}
                  onChange={(relayUrlOption) => this.setState({relayUrlOption})}
                  />
              </Field>

              <Field className='flex'>
                <Submit value='Go' />
              </Field>
            </form>
          </DynamicApolloWrapper>
        </Section>
      </MainLayout>
    )
  }
}

export default withRouter(RelaysIndex);