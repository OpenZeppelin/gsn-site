import React, { PureComponent } from 'react'

export const TxMessage = class _TxMessage extends PureComponent {
  render () {
    const className = this.props.className || 'text-blue-600'

    return (
      <span className={`${className} font-silkaMedium text-right mt-2`}>
        {this.props.children}
      </span>
    )
  }
}
  