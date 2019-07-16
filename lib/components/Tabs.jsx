import React from 'react'
import classnames from 'classnames'

export function Tabs({ children }) {
  return <nav>
    {children}
  </nav>
}

Tabs.Tab = function Tab({isSelected, onClick, children}) {
  return (
    <a
      href=''
      className={classnames(
        'bg-blue-600 font-silkaMedium text-xs sm:text-base p-2 px-4 sm:p-6 sm:px-10 inline-block border-r border-solid border-gray-100 text-white hover:text-blue-600 hover:bg-white trans trans-fast',
        {
          'is-selected': isSelected
        }
      )}
      onClick={(e) => { e.preventDefault(); onClick() }}>
      {children}
    </a>
  )
}

Tabs.Content = function Content({ children }) {
  return (
    <div className='bg-white py-0 sm:py-6 sm:px-10 sm:pb-20 border-t-2 border-gray-100'>
      {children}
    </div>
  )
}

Tabs.ContentPane = function ContentPane({ children, isSelected }) {
  return (
    <div className={classnames(
        {
          hidden: !isSelected
        }
      )}>
      {children}
    </div>
  )
}