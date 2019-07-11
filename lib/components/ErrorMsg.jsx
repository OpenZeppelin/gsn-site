import React from 'react'

export const ErrorMsg = ({ title, extraText }) => {
  return (
    <p>
      <span className='text-red-700 font-silkaMedium'>{title}</span>
      <br />
      <span className='text-blue-700 font-silkaLight'>{extraText}</span>
    </p>
  )
}