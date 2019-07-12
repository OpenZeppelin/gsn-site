import React from 'react'

export const Card = ({ img, text, url, large }) => {

  const horizontalPadding = large ? 'px-6 sm:px-10 lg:px-16' : 'px-6 sm:px-10'
  const verticalPadding = large ? 'py-6 sm:py-8 lg:pt-10 lg:pb-24' : 'py-6 sm:py-8'

  return (
    <a href={url} target='_blank' rel='noreferrer' className='relative flex-grow bg-white overflow-hidden shadow-md hover:shadow-lg trans trans-fast lg:pb-10'>
      <div className='text-center flex justify-center p-6 lg:p-12 h-30 border-solid border-b border-gray-400'>
        {img}
      </div>

      <div className={`${horizontalPadding} ${verticalPadding}`}>
        <p className='text-sm'>
          {text}
        </p>
      </div>
    </a>
  )
}