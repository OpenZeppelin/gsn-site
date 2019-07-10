import React from 'react'

export function Field(props) {
  const defaultClasses = 'pb-2'
  const className = `${defaultClasses} ${props.className || ''}`
  return (
    <div {...props} className={className}>
      {props.children}
    </div>
  )
}