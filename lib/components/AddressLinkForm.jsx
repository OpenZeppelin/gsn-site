import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { InputForm } from './InputForm'

export const AddressLinkForm = withRouter(class _AddressLinkForm extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    formatUrl: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    placeholder: 'Enter an address'
  }

  handleSubmitAddress = (address) => {
    const url = this.props.formatUrl(address)
    console.log('navigating to: ', url)
    this.props.router.push(url)
  }

  render () {
    return (
      <InputForm
        id={this.props.id}
        title={this.props.title}
        onSubmit={this.handleSubmitAddress}
        placeholder={this.props.placeholder}
      />
    )
  }
})
