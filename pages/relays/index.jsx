import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'

import { isAddress } from 'lib/utils/isAddress'
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

const RelaysIndex = class _RelaysIndex extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      relayHubAddress: '',
      relayUrl: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { relayHubAddress, relayUrl } = this.state

    if (isAddress(relayHubAddress) && isUrl(relayUrl)) {
      this.props.router.push(formatRelayUrl({ relayHubAddress, relayUrl }))
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

          <form onSubmit={this.handleSubmit}>
            <Field className='flex'>
              <AddressInput
                className='flex-1'
                type='text'
                required
                placeholder='enter the Relay Hub address'
                value={this.state.relayHubAddress}
                onChange={(e) => this.setState({relayHubAddress: e.target.value}) }
                />
            </Field>

            <Field className='flex'>
              <UrlInput
                className='flex-1'
                type='text'
                required
                placeholder='enter the Relay url'
                value={this.state.relayUrl}
                onChange={(e) => this.setState({relayUrl: e.target.value})}
                />
            </Field>

            <Field className='flex'>
              <Submit value='Go' />
            </Field>
          </form>
        </Section>
      </MainLayout>
    )
  }
}

export default withRouter(RelaysIndex);