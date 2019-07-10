import React from 'react'

export function Section({ children }) {
  return (
    <div className='bg-gray-100 section-min-height'>
      <div className='container py-12'>
        {children}
      </div>
    </div>
  )
}