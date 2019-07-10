import React from 'react'
import classnames from 'classnames'
import { omit } from 'lodash'

export function Input(props) {
  const { isError } = props

  const defaultClasses = 'bg-white hover:border-gray-300 focus:outline-none focus:shadow-outline focus:border-gray-300 appearance-none border border-transparent rounded py-2 px-4 text-gray-700 leading-tight'

  const className = classnames(defaultClasses, props.className, { 'text-red-500': isError })

  const newProps = omit(props, ['isError'])

  return (
    <input
      {...newProps} className={className}
    />
  )
}