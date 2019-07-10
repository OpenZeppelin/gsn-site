import React from 'react'

export function NavLink({href, children}) {
  return (
    <a href={href} className='inline-block font-silkaMedium text-bold text-sm pl-8 py-2 leading-none border rounded text-black border-white hover:text-indigo-500 mt-4 lg:mt-0'>
      {children}
    </a>
  )
}