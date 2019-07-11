import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Input, Submit } from 'lib/components/form'

export const InputForm = class _InputForm extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    placeholder: 'enter a value',
    buttonText: 'Submit'
  }

  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleSubmitValue = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.value)
  }

  render () {
    return (
      <form
        onSubmit={this.handleSubmitValue}
        className='mb-10'
      >
        <label htmlFor={this.props.id}>
          {this.props.title}
        </label>

        <div className='flex'>
          <Input
            id={this.props.id}
            className='flex-1'
            type='text'
            required
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={(e) => this.setState({value: e.target.value}) }
          />
          <Submit
            value={this.props.buttonText}
            disabled={!this.state.value}
            className='ml-4 flex-shrink-0'
          />
        </div>
      </form>
    )
  }
}
