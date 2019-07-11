import React from 'react'
import { EnsName } from 'lib/components/EnsName'
import { EtherscanAddressLink } from 'lib/components/EtherscanAddressLink'

export const EthUserLink = function ({ address, className, shorten = false }) {
  let content = <EnsName address={address} shorten={shorten} />

  return (
    <EtherscanAddressLink address={address} className={className}>
      {content}
    </EtherscanAddressLink>
  )
}
