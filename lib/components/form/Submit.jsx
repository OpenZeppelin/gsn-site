import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export const Submit = class _Submit extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
  }

  render () {
    const className = `${this.props.className} trans`

    return (
      <div className='text-right mt-2'>
        <input
          {...this.props}
          className={className}
          type='submit'
        />
      </div>
    )
  }

}