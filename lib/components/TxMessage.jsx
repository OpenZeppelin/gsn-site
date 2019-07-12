import React, { PureComponent } from 'react'

export const TxMessage = class _TxMessage extends PureComponent {
  completelyResetState = (e) => {
    e.preventDefault()

    this.props.resetTxState({ alsoClearValue: true })
  }

  render () {
    let className = 'text-blue-600'
    const { error, completed, inWallet, inFlight, txType, resetTxState } = this.props

    if (inWallet) {
      className = 'text-purple-400'
    }

    if (error) {
      className = 'text-red-600'
    }

    if (completed) {
      className = 'text-green-400'
    }

    return (
      <span className={`${className} font-silkaMedium text-right mt-2`}>
        {error &&
          <>
            {txType} not completed
            <br /><span className='text-sm'>(see JS console for details)</span>
            <br /><a onClick={this.completelyResetState} href=''>Okay</a>
          </>
        }

        {inWallet && 
          <>
            Complete the transaction in your wallet.
          </>
        }

        {inFlight &&
          <>
            Waiting for confirmations ...
          </>
        }

        {completed &&
          <>
            {txType} completed.
            <br /><a onClick={this.completelyResetState} href=''>Done</a>
          </>
        }
      </span>
    )
  }
}
  