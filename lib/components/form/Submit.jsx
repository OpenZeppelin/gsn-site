import React from 'react'

export function Submit(props) {
  const defaultClasses = 'bg-blue-500 hover:bg-blue-300 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded cursor-pointer'
  const className = `${defaultClasses} ${props.className || ''}`
  const type = 'submit'
  return (
    <input
      {...props}
      className={className}
      type={type}
    />
  )
}