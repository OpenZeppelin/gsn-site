// 404 and 500
import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

import { Meta } from 'lib/components/layout/Meta'
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

        <MainLayout title={`${this.props.statusCode || ''}`}>
          <EthereumNetworkStatus />
          <Section>
            <button
              onClick={this.props.router.back}
              style={{
                backgroundColor: 'transparent !important',
                color: 'blue',
                padding: 0,
                minWidth: 'auto'
              }}
            >
              {'<'} Back
            </button>

            <h1 className='font-silkaSemiBold mt-10'>
              {this.props.statusCode
                ? ` ${this.props.statusCode} !`
                : `An error occurred on the client's browser.`
              }
            </h1>

            <p className='font-silkaRegular'>
              {this.props.statusCode
                ? `A ${this.props.statusCode} error occurred on the server. Either this URL is missing or there was an error.`
                : ''
              }
            </p>

            <br />
            <button>
              <Link
                href={'/'}
              >
                <a className='font-silkaMedium text-white hover:text-white'>Return Home</a>
              </Link>
            </button>
          </Section>
        </MainLayout>
        
        <Footer />
      </div>
    )
  }
})