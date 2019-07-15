import React, { Component } from 'react'
import Creatable from 'react-select/creatable'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { omit } from 'lodash'

export const GSNSelect = class _GSNSelect extends Component {
  state = {}

  static defaultProps = {
    options: [],
  }

  static propTypes = {
    options: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    valid: PropTypes.func.isRequired,
    typeName: PropTypes.string.isRequired
  }

  onChange = (option) => {
    let newOption = { ...option }
    if (!newOption.networkId) {
      newOption.networkId = this.props.networkAccountQuery.networkId
    }

    this.setState({
      error: null
    })
    
    if (this.props.valid(newOption.value)) {
      this.props.handleChange(newOption)
    } else {
      this.setState({
        error: `Please enter a valid ${this.props.typeName}.`
      })
    }
  }

  render() {
    const newProps = omit(this.props, ['className'])

    const classNameProps = {
      className: classnames('react-select', this.props.className),
      classNamePrefix: 'react-select'
    }

    return (
      <>
        <Creatable
          {...newProps}
          {...classNameProps}
          placeholder='Select or type ...'
          allowCreateWhileLoading={true}
          formatCreateLabel={(inputValue) => `Use ${inputValue}...`}
          options={this.props.options}
          onChange={this.onChange}
        />
        <span className='text-red-600 pt-2 block font-silkaMedium'>
          {this.state.error}
        </span>
      </>
    )
  }
}