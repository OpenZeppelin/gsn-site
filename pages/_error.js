// 404 and 500
import React from 'react'
import { withRouter } from 'next/router'

import Meta from 'lib/components/layout/Meta'
import Footer from 'lib/components/layout/Footer'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { EthereumNetworkStatus } from 'lib/components/EthereumNetworkStatus'

import 'assets/styles/index.css'
import 'assets/styles/animations.css'
import 'assets/styles/fonts.css'
import 'assets/styles/loader.css'
import 'assets/styles/transitions.css'

export default withRouter(class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <div>
        <Meta />

        <MainLayout>
          <EthereumNetworkStatus />
          <Section>
            <button
              onClick={this.props.router.back}
              className='button is-small is-dark'
            >
              {'<'} Back
            </button>

            <h1 className='font-silkaSemiBold mt-10'>
              Uh-oh, {this.props.statusCode} !
            </h1>
            <p className='font-silkaRegular'>
              {this.props.statusCode
                ? `A ${this.props.statusCode} error occurred on the server. Either this URL is missing or there was an error.`
                : 'An error occurred on client.'}
            </p>
          </Section>
        </MainLayout>
        
        <Footer />
      </div>
    )
  }
})