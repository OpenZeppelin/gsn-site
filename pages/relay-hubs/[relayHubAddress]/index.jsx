import React, { Component } from 'react'
import { withRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { Field, Submit } from 'lib/components/form'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { RelayHubForm } from 'lib/components/RelayHubForm'
import { RelayUrlSelect } from 'lib/components/RelayUrlSelect'

const RelayHubDashboard = withRouter(
  class _RelayHubDashboard extends Component {
    state = {
      showRegisterControls: false
    }

    render () {
      const { relayHubAddress } = this.props.router.query

      return (
        <MainLayout>
          <Section>
            <p className='pb-4 font-silkaRegular text-gray-500'>
              <Link href='/relays'><a>Relay Hubs</a></Link> &raquo;&nbsp;
              <span className='wrap-everything text-gray-900'>{relayHubAddress}</span>
            </p>
    
            <nav>
              <button onClick={(e) => {
                e.preventDefault()
                this.setState({
                  showRegisterControls: false
                })
              }}>
                Lookup Existing Relay
              </button>
              <button onClick={(e) => {
                e.preventDefault()
                this.setState({
                  showRegisterControls: true
                })
              }}>
                Register New Relay
              </button>
            </nav>

            <div className={classnames(
              {
                hidden: !this.state.showRegisterControls
              }
            )}>
              Register Form
            </div>

            <div className={classnames(
              {
                hidden: this.state.showRegisterControls
              }
            )}>
              <label htmlFor='relays-relay-url' className='mt-4'>
                Relay URL
              </label>
              
              <DynamicApolloWrapper>
                <Field>
                  <RelayUrlSelect
                    id='relays-relay-url'
                    className='flex-1'
                    placeholder='Select or type in ...'
                    value={this.state.relayUrlOption}
                    onChange={(relayUrlOption) => this.setState({ relayUrlOption })}
                  />
                </Field>

                <Submit
                  disabled={!this.state.relayHubOption || !this.state.relayUrlOption}
                  value='Go'
                />
              </DynamicApolloWrapper>
              
              <RelayHubForm
                relayHubAddress={relayHubAddress}
              />
            </div>
          </Section>
        </MainLayout>
      )
    }
  }
)

export default RelayHubDashboard;