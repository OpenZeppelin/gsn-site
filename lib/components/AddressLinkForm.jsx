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
        <input type='text' value={this.state.address} onChange={(e) => this.setState({address: e.target.value}) } />
        <input type='submit' value='Access' />
      </form>
    )
  }
})
