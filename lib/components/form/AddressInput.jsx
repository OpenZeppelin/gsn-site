import React from 'react'

import { Input } from './Input'
import { isAddress } from 'lib/utils/isAddress'

export function AddressInput(props) {
  const isError = props.value && !isAddress(props.value)
  const extraProps = {isError}
  return (
    <Input {...props}  {...extraProps} />
  )
}