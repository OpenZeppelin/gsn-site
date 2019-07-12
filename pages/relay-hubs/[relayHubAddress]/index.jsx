import React, { Component } from 'react'
import { withRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'

import { EthereumNetworkStatus } from 'lib/components/EthereumNetworkStatus'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { Field, Submit } from 'lib/components/form'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { RelayHubForm } from 'lib/components/RelayHubForm'
import { RelayAddressSelect } from 'lib/components/RelayAddressSelect'

const RelayHubDashboard = withRouter(
  class _RelayHubDashboard extends Component {
    state = {
      showRegisterControls: false
    }

    render () {
      const { relayHubAddress } = this.props.router.query

      return (
        <MainLayout>
          <EthereumNetworkStatus />
          
          <Section>
            <p className='pb-4 font-silkaRegular text-gray-500'>
              <Link href='/relays'><a>Relay Hubs</a></Link> &raquo;&nbsp;
              <span className='wrap-everything text-gray-900'>{relayHubAddress}</span>
            </p>


            <div className='lg:w-2/3 mb-10'>
              <p>
                View stats on a specific Relay or register your new Relay node.
              </p>
            </div>
    
            <nav>
              <a
                href=''
                className={classnames(
                  'bg-blue-600 font-silkaMedium text-xs sm:text-base p-2 px-4 sm:p-6 sm:px-10 inline-block border-r border-solid border-gray-100 text-white hover:text-blue-600 hover:bg-white trans trans-fast',
                  {
                    'is-selected': !this.state.showRegisterControls
                  }
                )}
                onClick={(e) => {
                  e.preventDefault()
                  this.setState({
                    showRegisterControls: false
                  })
                }}
              >
                Lookup Existing Relay
              </a>
              <a
                href='' 
                className={classnames(
                  'bg-blue-600 font-silkaMedium text-xs sm:text-base p-2 px-4 sm:p-6 sm:px-10 inline-block border-r border-solid border-gray-100 text-white hover:text-blue-600 hover:bg-white trans trans-fast',
                  {
                    'is-selected': this.state.showRegisterControls
                  }
                )}
                onClick={(e) => {
                  e.preventDefault()
                  this.setState({
                    showRegisterControls: true
                  })
                }}
              >
                Register New Relay
              </a>
            </nav>

            <div className='bg-white py-0 sm:py-6 sm:px-10 sm:pb-20 border-t-2 border-gray-100'>

              <div className={classnames(
                {
                  hidden: !this.state.showRegisterControls
                }
              )}>
                <form
                  className='mt-0'
                  onSubmit={this.handleRelayAddress}
                >
                  <label htmlFor='relay-by-address'>
                    New Relay's Contract Address
                  </label>
                  <DynamicApolloWrapper>
                    <Field>
                      <RelayAddressSelect
                        id='relay-by-address'
                        className='flex-1'
                        placeholder='Select or type in ...'
                        value={this.state.relayAddressOption}
                        onChange={(relayAddressOption) => this.setState({ relayAddressOption })}
                      />
                    </Field>

                    <Submit
                      disabled={!this.state.relayAddressOption}
                      value='Go'
                    />
                  </DynamicApolloWrapper>
                </form>
              </div>

              <div className={classnames(
                {
                  hidden: this.state.showRegisterControls
                }
              )}>
                <RelayHubForm
                  relayHubAddress={relayHubAddress}
                />
              </div>
            </div>
          </Section>
        </MainLayout>
      )
    }
  }
)

export default RelayHubDashboard;