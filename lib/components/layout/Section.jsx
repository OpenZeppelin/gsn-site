import React from 'react'

export function Section({ children }) {
  return (
    <div className='container bg-gray-100 pt-4 pb-4'>
      {children}
    </div>
  )
}