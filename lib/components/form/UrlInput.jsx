import React from 'react'

import { Input } from './Input'
import { isUrl } from 'lib/utils/isUrl'

export function UrlInput(props) {
  const isError = props.value && !isUrl(props.value)
  const extraProps = {isError}
  return (
    <Input {...props}  {...extraProps} />
  )
}