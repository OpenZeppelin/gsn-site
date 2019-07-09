import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { InputForm } from './InputForm'

export const AddressLinkForm = withRouter(class _AddressLinkForm extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    formatUrl: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    placeholder: 'enter an address'
  }

  handleSubmitAddress = (address) => {
    this.props.router.push(
      this.props.formatUrl(address)
    )
  }

  render () {
    return (
      <InputForm
        title={this.props.title}
        onSubmit={this.handleSubmitAddress}
        placeholder={this.props.placeholder}
      />
    )
  }
})
