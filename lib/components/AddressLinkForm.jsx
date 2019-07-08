import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'

export const AddressLinkForm = withRouter(class _AddressLinkForm extends PureComponent {
  static propTypes = {
    formatUrl: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      address: ''
    }
  }

  handleSubmitAddress = (e) => {
    e.preventDefault()

    this.props.router.push(
      this.props.formatUrl(this.state.address)
    )
  }

  render () {
    return (
      <form onSubmit={this.handleSubmitAddress}>
        <input
          className='flex-1 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 appearance-none border border-transparent rounded w-full py-2 px-4 text-gray-700 leading-tight '
          type='text'
          value={this.state.address}
          onChange={(e) => this.setState({address: e.target.value}) }
        />
        <input type='submit' value='Access'
          disabled={!this.state.address}
          className='ml-4 flex-shrink-0 bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded'
        />
      </form>
    )
  }
})
