import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'

export const AddressLinkForm = withRouter(class _AddressLinkForm extends PureComponent {
  static propTypes = {
    formatUrl: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    placeholder: 'enter an address'
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
          className='flex-1 bg-white hover:border-gray-300 focus:outline-none focus:shadow-outline focus:border-gray-300 appearance-none border border-transparent rounded w-full py-2 px-4 text-gray-700 leading-tight '
          type='text'
          placeholder={this.props.placeholder}
          value={this.state.address}
          onChange={(e) => this.setState({address: e.target.value}) }
        />
        <input type='submit' value='Access'
          disabled={!this.state.address}
          className='ml-4 flex-shrink-0 bg-blue-500 hover:bg-blue-300 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded cursor-pointer'
        />
      </form>
    )
  }
})
