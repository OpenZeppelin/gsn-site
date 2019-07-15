import React from 'react'
import { web3 } from 'dapp-core'

export function ConnectWalletText() {
  return (
    <span className='font-silkaMedium text-center text-sm text-red-600 mb-6 -mt-4 bg-white py-4'>
      To make transactions <a
        href='#'
        onClick={(e) => {
          e.preventDefault()
          web3.askEthereumPermissions()
        }}
        className='text-blue-300'
      >
        connect your wallet
      </a>.
    </span>
  )
}