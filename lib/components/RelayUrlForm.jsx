import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { relayAddressQuery } from 'lib/queries/relayAddressQuery'
import { RelayUrlLink } from 'lib/components/RelayUrlLink'

export const RelayUrlForm = class _RelayUrlForm extends PureComponent {
  static propTypes = {
    relayHubAddress: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      url: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChangeUrl = (e) => {
    this.setState({value: e.target.value})
  }

  render () {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            className='flex-1 bg-white hover:border-gray-300 focus:outline-none focus:shadow-outline focus:border-gray-300 appearance-none border border-transparent rounded w-full py-2 px-4 text-gray-700 leading-tight '
            type='text'
            placeholder={'enter a url'}
            value={this.state.url}
            onChange={(e) => { this.setState({url: e.target.value}) }}
          />
        </form>

        <RelayUrlLink
          relayHubAddress={this.props.relayHubAddress}
          relayUrl={this.state.url}
          />
      </>
    )
  }
}
