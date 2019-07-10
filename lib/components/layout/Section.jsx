import React from 'react'

export function Section({ children }) {
  return (
    <div className='bg-gray-100'>
      <div className='container py-20'>
        {children}
      </div>
    </div>
  )
}