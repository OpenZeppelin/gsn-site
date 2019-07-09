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
        <h3>
          {this.props.title}
        </h3>
        <input
          className='flex-1 bg-white hover:border-gray-300 focus:outline-none focus:shadow-outline focus:border-gray-300 appearance-none border border-transparent rounded py-2 px-4 text-gray-700 leading-tight '
          type='text'
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={(e) => this.setState({value: e.target.value}) }
        />
        <input type='submit' value={this.props.buttonText}
          disabled={!this.state.value}
          className='ml-4 flex-shrink-0 bg-blue-500 hover:bg-blue-300 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded cursor-pointer'
        />
      </form>
    )
  }
}
