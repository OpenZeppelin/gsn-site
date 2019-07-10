import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export const InputForm = class _InputForm extends PureComponent {
  static propTypes = {
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
        className='my-10'
      >
        <label className='font-silkaRegular'>
          {this.props.title}
        </label>

        <div className='flex'>
          <input
            type='text'
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={(e) => this.setState({value: e.target.value}) }
          />
          <input type='submit' value={this.props.buttonText}
            disabled={!this.state.value}
          />
        </div>
      </form>
    )
  }
}
